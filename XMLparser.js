
//const Concept = await import("./ConceptObjects");
//const Relation = await import("./ConceptObjects");
import * as fs from 'fs';
import { Concept } from './ConceptObjects';
import { Relation } from "./ConceptObjects";

XMLParserEntry();
function XMLParserEntry(){
    console.log("kys")  
    // let source = fs.readFileSync('foo.txt','utf8'); //source of XML file - will be  dynamic later
    // let data = ReadXML(source);
    // const rootids = FindRootNode(data);
    // let roots = [];
    // rootids.forEach(element => {
    //     roots.push(CreateConcept(element,data));
    // });
}

function ReadXML(source){
    let usefulData = [];
            // const words = source.split('/n'); //splits the text on new line
            // words.forEach(element => {
            // if(element.includes("mxCell")&&element.includes("value")){
            //     usefulData.push(element);
            // }  
            // }
    return usefulData;
}
function FindRootNode(data){

    let IDs=[];
    let targets=[];
    data.forEach(element => {
        IDs.push(element.slice(element.indexOf('"'), element.indexOf('"',element.indexOf('"')+2))); 
        //Pushes the text inside the ID tag of the MXcell to IDs - does this by slicing between the index of the first and second " found 
        if(element.includes('target="')){
            targets.push(element.slice(element.lastIndexOf('target="'), element.indexOf('"',element.lastIndexOf('target="')+2)));
        }
    });
    return IDs.filter((element) => !targets.includes(element));
}

function CreateConcept(id ,data){
    let node = new Concept(SearchForValue(id,data));
    let endnode = 0;
    data.forEach(element => {
        if(element.includes('source="'+id+'"')) {
            endnode++;
            let IDofTarget = element.slice(element.lastIndexOf('target="'), element.indexOf('"',element.lastIndexOf('target=""')+1));
            let temp = SearchForNode(IDofTarget ,data)
            CreateRelation(node,temp,data);

        }
    });
    if(!endnode){
        return node;
    }
}
function CreateRelation(source,mxCell,data){
    //mxcell is target
    //need value 
    //create the target if id does not exists
    mxCell.slice(mxCell.lastIndexOf('value="'), mxCell.indexOf('"',mxCell.lastIndexOf('value="')+1));//gets value 
    let target = CreateConcept(mxCell.slice(mxCell.lastIndexOf('value="'), mxCell.indexOf('"',mxCell.lastIndexOf('value="')+1)),data);
    let relation = new Relation(source,target ,mxCell.slice(mxCell.lastIndexOf('value="'), mxCell.indexOf('"',mxCell.lastIndexOf('value="')+1)));
    return 1;
}
function SearchForValue (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) break;
    }
    return strArray[j].slice(strArray[j].lastIndexOf('value="'), strArray[j].indexOf('"',strArray[j].lastIndexOf('value="')+1));
}
function SearchForNode (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return strArray[j];
    }
}
