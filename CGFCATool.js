var cpathsizes = [10000];
    var RELATION = 1; //relation index of triple
    var TARGET = 2; //target concept index of triple
    var ATTRIBUTE = 0;
    var TIMES = 0;
    var OBJECT = 0;
    var SOURCE = 0;
    var numReps = 0;
    var setnumReps = setnumReps;
    var repeats = Array.from(Array(10000), function () { return new Array(3).fill(0); });
    var cyclePaths = Array.from(Array(10000), function () { return new Array(10000).fill(0); });
    var numcpaths = 0;
    var setnumcpaths = setnumcpaths;
    var triple = Array.from(Array(5000), function () { return new Array(3).fill(0); });
    var numtriples = 0;
    var setnumtriples = setnumtriples;
    var relation_labels = new Array(1000);
    var setrelationlabels = setrelationlabels;
    var MAX_ROWS = 1000;
    var MAX_COLS = 1000;
    var context = Array.from(Array(MAX_ROWS), function () { return new Array(MAX_COLS).fill(0); });
    var concepts = new Array(1000); //FCA formal object name = GC Target Concept
    var setconcepts = setconcepts;
    var numconcepts = 0;
    var setnumconcepts = setnumconcepts;
    var input_concepts = new Array(1000);
    var output_concepts = new Array(1000);
    var numOutputs = 0;
    var numInputs = 0;
    var setnumInputs = setnumInputs;
    var setnumOutputs = setnumOutputs;
    var number_of_relations = 0;
    var setnumber_of_relations = setnumber_of_relations;
    //GLOABAL VARIABLES

    const fs = require('fs');

    let fname;
    let rfname;

    var reporttxt = "";
    var ctxreport = "";


document.getElementById("CGFCA").addEventListener("click", myFunction);

var selectedFile; 

function myFunction(){

    selectedFile = document.getElementById("file").files[0];

    for(let p = 0; p < 100; p++) {
        cpathsizes[p]=0; }

        //fname = "Reports+Cxt\\"
        fname = selectedFile.name;//get file name 
        let pos = fname.indexOf(".");
        rfname = fname;
        rfname = fname.substring(0,pos) + "_report.txt";
        let cfname = fname.substring(0,pos) + ".cxt";
    
        reporttxt += ("Triples to Binaries Report for " + fname + "\n\n" + "\n");

        //select the file path
        var fileExists = true;
        if (!fs.existsSync(selectedFile.path)) {
            console.log("File does not exist!")
            fileExists = false;
        } 

    
        if (fileExists == true){
            if (fname.substring(fname.length-3, fname.length) == 'csv'){
                input_csv_file(fname) 
                reportInputAndOuputConcepts();
                triples_to_binaries();
                output_cxt_file();    
            }
            else if (fname.substring(fname.length-3, fname.length) == 'xml'){
                console.log("xml")
                reportInputAndOuputConcepts();
                triples_to_binaries();
                output_cxt_file();    
            }
            else{
                console.log("File is not a csv or xml file")
            }
        } else{
            console.log("File doesnt exist");
        }


        download(reporttxt, rfname, 'text/plain');
        download(ctxreport, cfname, 'text/plain');      

}

function download(strData, strFileName, strMimeType) {

    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);


    if (window.MSBlobBuilder) { // IE10
        var bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    } /* end if(window.MSBlobBuilder) */



    if ('download' in a) { //FF20, CH19
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    }
    //do iframe dataURL download: (older W3)
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
}


function input_csv_file(fname) {

    var pos;
    var source;
    var relation;
    var target;
    var tripleThing = ["", "", ""]; // source-relation-target
    var n = 0;
    var a;
    var escaped;
    var delim = ""; // delimiter
    delim = ",";
    var input = ","; 
    if (input == 't') //automatically recognise delim!!
        delim = '\t';
    if (input == 's')
        delim = ' ';


    let fileContent = fs.readFileSync(selectedFile.path, 'utf8')
    for (const line of fileContent.split(/[\r\n]+/)){
        if (line != '') {
            n = 0;
            escaped = false;
            tripleThing[0] = "";
            tripleThing[1] = "";
            tripleThing[2] = "";
            for (var char = 0; char < line.length; char++) {
                a = line[char];
                if (a == '"' && !escaped) {
                    escaped = true;
                }
                else {
                    if (a == '"' && escaped) {
                        escaped = false;
                    }
                    else {
                        if (a == delim && !escaped) {
                            n++;
                        }
                        else {
                            tripleThing[n] = tripleThing[n] + a;
                        }
                    }
                }
            }
            source = tripleThing[0];
            relation = tripleThing[1];
            target = tripleThing[2];
            // create triples //
            pos = find_concept(source);
            if (pos == -1) {
                // add new concept to list
                pos = numconcepts;
                concepts[numconcepts++] = source;
                //concepts[numconcepts] = source
            }
            triple[numtriples][0] = pos;
            pos = find_relation(relation);
            if (pos == -1) {
                // add new relation to list
                pos = number_of_relations;
                relation_labels[number_of_relations++] = relation;
                //relation_labels[number_of_relations] = relation
            }
            triple[numtriples][1] = pos;
            pos = find_concept(target);
            if (pos == -1) {
                // add new concept to list
                pos = numconcepts;
                concepts[numconcepts++] = target;
                //concepts[numconcepts] = target
            }
            triple[numtriples++][2] = pos;
        }
    }
}



function find_concept(concept){
    var pos = -1;
    for (var i = 0; i < numconcepts; i++) {
        if (concept == concepts[i]) {
            pos = i;
            break;
        }
    }
    return (pos);
  }
  
  function find_relation(relation){
    var pos = -1;
    for (var i = 0; i < number_of_relations; i++) {
        if (relation == relation_labels[i]) {
            pos = i;
            break;
        }
    }
    return (pos);
  }
  
   function reportInputAndOuputConcepts(){
    for (var i = 0; i < numconcepts; i++) {
      var j = 0;
      for (j = 0; j < numtriples; j++) {
          if (i == triple[j][TARGET]) {
              break;
          }
          ;
      }
      if (j == numtriples) {
          input_concepts[numInputs++] = i;
      }
  }
  //find output concepts (the end nodes)
  for (var i = 0; i < numconcepts; i++) {
      var j = 0;
      for (j = 0; j < numtriples; j++) {
          if (i == triple[j][SOURCE]) {
              break;
          }
      }
      if (j == numtriples) {
          output_concepts[numOutputs++] = i;
      }
  }
  //report input concepts
  if (numInputs == 0) {
        reporttxt += ("\n\nThere are no inputs");
    }
  else {
        reporttxt += ("\n\nInputs: ");

      for (var i = 0; i < numInputs; i++) {
        reporttxt += ('\"' + concepts[input_concepts[i]] + "\" ");

      }
  }
  //report output concepts
  if (numOutputs == 0) {
    reporttxt += ("\n\nThere are no outputs.");
  }
  else {
    reporttxt += ("\n\nOutputs: ");
      for (var i = 0; i < numOutputs; i++) {
        reporttxt += ('\"' + concepts[output_concepts[i]] + "\" ");
      }
  }
  
  }
  
   function triples_to_binaries(){
    var path = Array.from(Array(100000), function () { return new Array(2).fill(0); });
    //let path:number[100000][]; //to record each transitive path through triples
    var pathSize = 0;
    //converts (source,relation,target) triples to ((source^relation),target) binary relations
    for (var attribute = 0; attribute < numtriples; attribute++) {
        var target = triple[attribute][TARGET];
        var relation = triple[attribute][RELATION];
        var source = triple[attribute][SOURCE];
        add_binary(attribute, source, relation, target, path, pathSize);
    }
    //output repeats
    for (var i = 0; i < numReps; i++) {
        var source = triple[repeats[i][ATTRIBUTE]][SOURCE];
        var relation = triple[repeats[i][ATTRIBUTE]][RELATION];
        var output = repeats[i][OBJECT];
        var target = triple[repeats[i][ATTRIBUTE]][TARGET];
        var times = repeats[i][TIMES] + 1;
        reporttxt += ("\n\n " + times + " direct pathways from \"" + concepts[source] + " - " + relation_labels[relation] + " - " + concepts[target] + "\" to \"" + concepts[output] + "\"");
    }
  }
  
   function add_binary(attribute, source, relation, target, path, pathSize){
    //add source and relation to current pathway
    path[pathSize][0] = source;
    path[pathSize][1] = relation;
    pathSize++;
    //repeated output targets
    if (context[target][attribute] == true) {
        if (repeat_is_not_in_a_cycle(target, triple[attribute][SOURCE])) {
            if (is_output(target) && is_input(attribute)) {
                add_to_repeats(target, attribute);
            }
        }
    }
    else {
        //add a cross in the formal context for the attribute and target (object)
        context[target][attribute] = true; //This line somhow gets executed out of order with the above this is somhow set to true and above is done before direct oathwat is done
        //if object is an output and attribute involves an input then report pathway
        if (is_output(target) && is_input(attribute)) {
            reporttxt += ("\n\nDirect Pathway: ");
            for (var p = 0; p < pathSize; p++) {
                reporttxt += (concepts[path[p][0]] + " - " + relation_labels[path[p][1]] + " - ");
            }
            reporttxt += (concepts[target]);
        }
        if (triple[attribute][SOURCE] == target) { //if source is its own target, its a cycle!
            if (is_new_cycle(path, pathSize)) {
                cpathsizes[numcpaths] = pathSize;
                reporttxt += ("\n\nCycle: ");
                for (var p = 0; p < pathSize; p++) {
                    reporttxt += (concepts[path[p][0]] + " - " + relation_labels[path[p][1]] + " - ");
                    cyclePaths[numcpaths][p] = path[p][0];
                }
                reporttxt += (concepts[path[0][0]]);
                numcpaths++;
            }
        }
        if (!target_already_in_pathway(target, path, pathSize)) {
            for (var k = 0; k < numtriples; k++) {
                if (target == triple[k][SOURCE]) {
                    add_binary(attribute, triple[k][SOURCE], triple[k][RELATION], triple[k][TARGET], path, pathSize);
                }
            }
        }
    }
  
  }
  function target_already_in_pathway(target, path, pathSize) {
    if (path === void 0) { path = Array.from(Array(), function () { return new Array(2).fill(0); }); }
    var count = 0;
    for (var p = 0; p < pathSize; p++) {
        if (target == path[p][0]) {
            count++;
        }
    }
    return count;
  }
  function is_output(target) {
    for (var i = 0; i < numOutputs; i++) {
        if (target == output_concepts[i]) {
            return true;
        }
    }
    return false;
  }
  function is_input(attribute) {
    for (var i = 0; i < numInputs; i++) {
        if (triple[attribute][SOURCE] == input_concepts[i]) {
            return true;
        }
    }
    return false;
  }
  function add_to_repeats(target, attribute) {
    var i = 0;
    for (i = 0; i < numReps; i++) {
        if (attribute == repeats[i][ATTRIBUTE] && target == repeats[i][OBJECT]) {
            repeats[i][TIMES]++;
            break;
        }
    }
    if (i == numReps) {
        repeats[numReps][ATTRIBUTE] = attribute;
        repeats[numReps][OBJECT] = target;
        repeats[numReps][TIMES] = 1;
        numReps++;
    }
  }
  function repeat_is_not_in_a_cycle(target, source) {
    for (var p = 0; p < numcpaths; p++) {
        for (var i = 0; i < cpathsizes[p]; i++) {
            if (target == cyclePaths[p][i]) {
                for (var j = 0; j < cpathsizes[p]; j++) {
                    if (source == cyclePaths[p][j]) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
  }
  function is_new_cycle(path, pathsize) {
    if (path === void 0) { path = Array.from(Array(), function () { return new Array(2).fill(0); }); }
    for (var p = 0; p < numcpaths; p++) {
        if (pathsize == cpathsizes[p]) {
            var found = 0;
            for (var i = 0; i < pathsize; i++) {
                for (var j = 0; j < pathsize; j++) {
                    if (path[i][0] == cyclePaths[p][j]) {
                        found++;
                        //this break is to avoid double-counting of a CG concept if it appears more than once in the cycle
                        //this is possible if a concept is at the cross-roads of a figure-of-eight cycle, for example.
                        break;
                    }
                }
            }
            if (found == pathsize) {
                return false;
            }
            ;
        }
    }
    return true;
  }
  
  function output_cxt_file() {
    ctxreport += ("B\n\n");
    ctxreport += (numconcepts + "\n");
    ctxreport += (numtriples + "\n\n");

      for (var i = 0; i < numconcepts; i++) {
        ctxreport += (concepts[i] + "\n");
      }
      for (var j = 0; j < numtriples; j++) {
        ctxreport += (concepts[triple[j][SOURCE]] + " " + relation_labels[triple[j][RELATION]] + "\n");
      }
      for (var i = 0; i < numconcepts; i++) {
          for (var j = 0; j < numtriples; j++) {
              if (context[i][j]) {
                ctxreport += ("X");
              }
              else {
                ctxreport += (".");
              }
          }
          ctxreport += ("\n");
        }
  }