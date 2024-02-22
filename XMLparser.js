
//const Concept = await import("./ConceptObjects");
//const Relation = await import("./ConceptObjects");
import * as fs from 'fs';
import { Concept } from './ConceptObjects.js';
import { Relation } from "./ConceptObjects.js";

XMLParserEntry();
function XMLParserEntry(){  
    let source = "CatOnMat.xml"; //source of XML file - will be  dynamic later
    let data = ReadXML(source);
    
    const rootids = FindRootNode(data);
    let roots = [];
    let output;
    rootids.forEach(element => {
        roots.push(CreateConcept(element,data));
    });
    return roots
}

function ReadXML(source){
    let usefulData = [];
    let data = fs.readFileSync(source).toString()
    const words = data.split('\n'); //splits the text on new line
    words.forEach(element => {
        if(element.includes("mxCell")&&element.includes("value")){
            usefulData.push(element);
        }  
    });
    return usefulData;
}
function FindRootNode(data){

    let IDs=[];
    let targets=[];
    data.forEach(element => {
        //Pushes the text inside the ID tag of the MXcell to IDs - does this by slicing between the index of the first and second " found 
        if(element.includes('target="')){
            targets.push(element.slice(element.lastIndexOf('target="')+8, element.indexOf('"',element.lastIndexOf('target="')+10)));
        }
        else {
            IDs.push(element.slice(element.indexOf('"')+1, element.indexOf('"',element.indexOf('"')+2))); 
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
    return node;
}
function CreateRelation(source,mxCell,data){
    
    new Relation(source,CreateConcept(mxCell.slice(mxCell.lastIndexOf('value="'), mxCell.indexOf('"',mxCell.lastIndexOf('value="')+1)),data) ,mxCell.slice(mxCell.lastIndexOf('value="'), mxCell.indexOf('"',mxCell.lastIndexOf('value="')+1)));//your guess is as good as mine
    source.AddRelation(new Relation(source,CreateConcept(mxCell.slice(mxCell.lastIndexOf('value="'), mxCell.indexOf('"',mxCell.lastIndexOf('value="')+1)),data) ,mxCell.slice(mxCell.lastIndexOf('value="'), mxCell.indexOf('"',mxCell.lastIndexOf('value="')+1))));//your guess is as good as mine
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
