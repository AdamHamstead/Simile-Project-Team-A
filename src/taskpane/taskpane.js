/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global console, document, Excel, Office */


//GLOBAL VARIABLES




Office.onReady((info) => {
  if (info.host === Office.HostType.Excel) {

    document.getElementById("CG-FCA").onclick = run;

    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";

   // document.getElementById("run").onclick = run;
  }
});


//Text Download


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


//import * as fs from 'fs';





var fname = "buissines."
export async function run() {
    await Excel.run(async (context) => {


        const file = context.workbook.getSelectedRange();

        // Read the range address
        file.load("text");
  
        // Update the fill color
        //range.format.fill.color = "yellow";
  
        await context.sync(); 

        //var file = context.workbook.getSelectedRange()
        //file.load("text");

        //console.log(`The range address was ${file.text}.`);

        var fileData = file.text

        //input_csv_file(fname, fileData)
        
        //CGFCA CODE
        var reporttxt = [fileData.length];

        reporttxt[0] = ("Triples to Binaries Report for " + fname + "\n\n");
        reporttxt[1] = ("Force#1--")

        reporttxt = input_csv_file(fileData) //get data into array thing

        var pos = fname.indexOf(".");
        var rfname = fname.substring(0, pos);
        rfname += "_report.txt";



    
        download(reporttxt, rfname, 'text/plain');

      
    


        //var report = new File(["foo"], rfname);
     //   reportInputAndOuputConcepts(rfname)
       // triples_to_binaries(rfname)
        //output_cxt_file(fname)
        //CGFCA CODE
      
    });

}

export async function download(strData, strFileName, strMimeType) {

    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    var text;
    for(var i = 0; i < strData.length; i++){
        text += strData[i] + "\n"
        console.log(text);
        console.log("Text");
    }
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(text);


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

export async function input_csv_file(fileData) {
    //if (!fs.existsSync(fname)) {
    //    console.log("File does not exist!");
    //    process.exit();
    //}



    var source;
    var relation;
    var target;
    var tripleThing = ["", "", ""]; // source-relation-target
    var n = 0;
    var a;
    var escaped;
    var delim = ""; // delimiter
    delim = ",";
    var input = ","; //TEMP
    //let input  = prompt("\nEnter delimiter character (enter t if delimiter is the tab character, enter s if delimiter is the space character):")
    if (input == 't')
        delim = '\t';
    if (input == 's')
        delim = ' ';
    //var fileContent = fs.readFileSync(fname, 'utf8');

    for (var i = 0; i < fileData.length; i++){ //Loops through every row of data
        //console.log(fileData[i]);
     
        var line = fileData[i].toString();
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
            var pos = find_concept(source);
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

async function find_relation(relation){
  var pos = -1;
  for (var i = 0; i < number_of_relations; i++) {
      if (relation == relation_labels[i]) {
          pos = i;
          break;
      }
  }
  return (pos);
}

 function reportInputAndOuputConcepts(rfname){
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
    console.log("\n\nThere are no inputs");
    //fs.appendFileSync(rfname, "\n\nThere are no inputs");
}
else {
    console.log("\n\nInputs: ");
    //fs.appendFileSync(rfname, "\n\nInputs: ");
    for (var i = 0; i < numInputs; i++) {
        console.log(input_concepts[i]);
        console.log(concepts[input_concepts[i]]);
        console.log(concepts[1]);
        console.log("\"" + concepts[input_concepts[i]] + "\" ");
      //  fs.appendFileSync(rfname, '\"' + concepts[input_concepts[i]] + "\" ");
    }
}
//report output concepts
if (numOutputs == 0) {
    console.log("\n\nThere are no outputs.");
   // fs.appendFileSync(rfname, "\n\nThere are no outputs.");
}
else {
    console.log("\n\nOutputs: ");
    //fs.appendFileSync(rfname, "\n\nOutputs: ");
    for (var i = 0; i < numOutputs; i++) {
        console.log('\"' + concepts[output_concepts[i]] + "\" ");
      //  fs.appendFileSync(rfname, '\"' + concepts[output_concepts[i]] + "\" ");
    }
}

}

 function triples_to_binaries(rfname){
  var path = Array.from(Array(100000), function () { return new Array(2).fill(0); });
  //let path:number[100000][]; //to record each transitive path through triples
  var pathSize = 0;
  //converts (source,relation,target) triples to ((source^relation),target) binary relations
  for (var attribute = 0; attribute < numtriples; attribute++) {
      var target = triple[attribute][TARGET];
      var relation = triple[attribute][RELATION];
      var source = triple[attribute][SOURCE];
      add_binary(attribute, source, relation, target, path, pathSize, rfname);
  }
  //output repeats
  for (var i = 0; i < numReps; i++) {
      var source = triple[repeats[i][ATTRIBUTE]][SOURCE];
      var relation = triple[repeats[i][ATTRIBUTE]][RELATION];
      var output = repeats[i][OBJECT];
      var target = triple[repeats[i][ATTRIBUTE]][TARGET];
      var times = repeats[i][TIMES] + 1;
      console.log("\n\n" + times + " direct pathways from \"" + concepts[source] + " - " + relation_labels[relation] + " - " + concepts[target] + "\" to \"" + concepts[output] + "\"");
    //  fs.appendFileSync(rfname, "\n\n " + times + " direct pathways from \"" + concepts[source] + " - " + relation_labels[relation] + " - " + concepts[target] + "\" to \"" + concepts[output] + "\"");
  }
}

 function add_binary(attribute, source, relation, target, path, pathSize, rfname){
  //add source and relation to current pathway
  path[pathSize][0] = source;
  path[pathSize][1] = relation;
  pathSize++;
  console.log(relation_labels[path[0][1]]);
  console.log(relation_labels[path[1][1]]);
  console.log(relation_labels[path[2][1]]);
  //repeated output targets
  console.log(context[6][1]);
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
          console.log("\n\nDirect Pathway: ");
       //   fs.appendFileSync(rfname, "\n\nDirect Pathway: ");
          for (var p = 0; p < pathSize; p++) {
              console.log(concepts[path[p][0]] + " - " + relation_labels[path[p][1]] + " - ");
            //  fs.appendFileSync(rfname, concepts[path[p][0]] + " - " + relation_labels[path[p][1]] + " - ");
          }
          console.log(concepts[target]);
   //       fs.appendFileSync(rfname, concepts[target]);
      }
      if (triple[attribute][SOURCE] == target) { //if source is its own target, its a cycle!
          if (is_new_cycle(path, pathSize)) {
              cpathsizes[numcpaths] = pathSize;
              console.log("\n\nCycle: ");
      //        fs.appendFileSync(rfname, "\n\nCycle: ");
              for (var p = 0; p < pathSize; p++) {
                  console.log(concepts[path[p][0]] + " - " + relation_labels[path[p][1]] + " - ");
        //          fs.appendFileSync(rfname, concepts[path[p][0]] + " - " + relation_labels[path[p][1]] + " - ");
                  cyclePaths[numcpaths][p] = path[p][0];
              }
              console.log(concepts[path[0][0]]);
          //    fs.appendFileSync(rfname, concepts[path[0][0]]);
               numcpaths++;
          }
      }
      if (!target_already_in_pathway(target, path, pathSize)) {
          for (var k = 0; k < numtriples; k++) {
              if (target == triple[k][SOURCE]) {
                  add_binary(attribute, triple[k][SOURCE], triple[k][RELATION], triple[k][TARGET], path, pathSize, rfname);
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
          console.log(repeats[i][TIMES]);
          repeats[i][TIMES]++;
          console.log(repeats[i][TIMES]);
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

function output_cxt_file(fname) {
    var pos = fname.indexOf(".");
    var cfname = fname.substring(0, pos) + ".cxt";
 //   fs.writeFileSync(cfname, "B\n\n");
  //  fs.appendFileSync(cfname, numconcepts + "\n");
   // fs.appendFileSync(cfname, numtriples + "\n\n");
    for (var i = 0; i < numconcepts; i++) {
     //   fs.appendFileSync(cfname, concepts[i] + "\n");
    }
    for (var j = 0; j < numtriples; j++) {
       // fs.appendFileSync(cfname, concepts[triple[j][SOURCE]] + " " + relation_labels[triple[j][RELATION]] + "\n");
    }
    for (var i = 0; i < numconcepts; i++) {
        for (var j = 0; j < numtriples; j++) {
            if (context[i][j]) {
             //   fs.appendFileSync(cfname, "X");
            }
            else {
               // fs.appendFileSync(cfname, ".");
            }
        }
        //fs.appendFileSync(cfname, "\n");
    }
}

