
//const Concept = await import("./ConceptObjects");
//const Relation = await import("./ConceptObjects");
import * as fs from 'fs';
import { Concept } from './ConceptObjects.js';
import { Relation } from "./ConceptObjects.js";
import { arrayBuffer } from 'stream/consumers';

XMLParserEntry();
function XMLParserEntry(){  
    let source = "CatOnMat.xml"; //source of XML file - will be  dynamic later
    let data = ReadXML(source);
    
    const rootids = FindRootNode(data);
    let roots = [];
    let output;
    let Concepts= new Array();
    rootids.forEach(element => {
        roots.push(CreateConcept(element,data,Concepts));
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

function CreateConcept(id ,data,Concepts){
    let node = new Concept(SearchForValue(id,data));
    Concepts = node.push 
    let endnode = 0;
    data.forEach(element => {
        if(element.includes('source="'+id+'"')) {
            endnode++;
            let IDofTarget = element.slice(element.lastIndexOf('target="')+8, element.indexOf('"',element.lastIndexOf('target=""')+9));
            let temp = SearchForNode(IDofTarget ,data)
            CreateRelation(node,temp,data,Concepts);

        }
    });
    return node;
}
function CreateRelation(source,mxCell,data,Concepts){
    let value = mxCell.slice(mxCell.lastIndexOf('value="')+8, mxCell.indexOf('"',mxCell.lastIndexOf('value="')+9))
    Concepts.forEach(element => {
        if(element.value = value){
            target = value;
        }
        else{
            target = mxCell.slice(mxCell.lastIndexOf('value="')+8, mxCell.indexOf('"',mxCell.lastIndexOf('value="')+9));
        }
    });
    //source.AddRelation(new Relation(source,CreateConcept(mxCell.slice(mxCell.lastIndexOf('value="')+8, mxCell.indexOf('"',mxCell.lastIndexOf('value="')+9)),data) ,mxCell.slice(mxCell.lastIndexOf('value="')+8, mxCell.indexOf('"',mxCell.lastIndexOf('value="')+9))));//your guess is as good as mine - come to adam i will show you the amazing world of oneliners  
    //a relic of the past :)
    source.AddRelation(new Relation(source,value,data) ,target);  
}   CreateConcept()

function SearchForValue(str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) break;
    }
    let atBumbles = strArray[j].slice(strArray[j].lastIndexOf('value="')+7, strArray[j].indexOf('"',strArray[j].lastIndexOf('value="')+8));
    return atBumbles; // viribal named as such coz of a weird bug that made the return value not return the first chatactor of the string so a little easter egg - adam
}
function SearchForNode (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return strArray[j];
    }
}
