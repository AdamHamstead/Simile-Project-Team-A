import * as fs from 'fs';
import { Concept } from './ConceptObjects.js';
import { Relation } from "./ConceptObjects.js";

// XMLParserEntry(); dont need this entry - called in main
export function XMLParserEntry(source){
    //source of XML file - will be  dynamic later
    let data = ReadXML(source);
    const rootids = FindRootNode(data);
    let container = [[],[]]; //first array is roots, second array is triples
    let output;
    let Concepts= new Array();
    rootids.forEach(element => {
        container[0].push(CreateConcept(element,data,Concepts,container));
    });
    return container
}

function ReadXML(source){ 
    let usefulData = [];
    var data;
    try
    {
        data = fs.readFileSync(source).toString();
    }
    catch(err)
    {
        console.log(err);
    }
     //Reads the XML file and then converts it into a string
    const words = data.split('\n'); //splits the text on new line
    words.forEach(element => {
        if(element.includes("mxCell")&&element.includes("value")){
            usefulData.push(element); //finds all data that is an mxCell and has a value
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
    return IDs.filter((element) => !targets.includes(element)); //filters the array getting rid of all the repeated elements between arrays
}

function CreateConcept(id ,data,Concepts,container){
    let node = new Concept(SearchForValue(id,data));
    Concepts.push(node);
    data.forEach(element => {
        if(element.includes('source="'+id+'"')) {
            let IDofTarget = element.slice(element.indexOf('target="')+8, element.indexOf('"',element.indexOf('target="')+9));
            let temp = SearchForNode(IDofTarget ,data)
            CreateRelation(node,temp,data,Concepts,container);
        }
    });
    return node;
}
function CreateRelation(source,mxCell,data,Concepts,container){
    let value = mxCell.slice(mxCell.indexOf('value="')+8, mxCell.indexOf('"',mxCell.indexOf('value="')+9));
    let id = SearchForSource(mxCell.slice(mxCell.indexOf('id="')+4, mxCell.indexOf('"',mxCell.indexOf('id="')+5)), data);
    id = id.slice(id.indexOf('target="')+8, id.indexOf('"',id.indexOf('target="')+9));
    Concepts.forEach(element => {
        if(element.value == id){
            container[1].push(new Relation(source,element,value))

        }
        else{
            CreateConcept(id ,data,Concepts,container)
        }
    });
    //source.AddRelation(new Relation(source,CreateConcept(mxCell.slice(mxCell.lastIndexOf('value="')+8, mxCell.indexOf('"',mxCell.lastIndexOf('value="')+9)),data) ,mxCell.slice(mxCell.lastIndexOf('value="')+8, mxCell.indexOf('"',mxCell.lastIndexOf('value="')+9))));//your guess is as good as mine - come to adam i will show you the amazing world of oneliners  
    //a relic of the past :)
    source.AddRelation(container.slice(-1));  
}

function SearchForValue(str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) break;
    }
    let atBumbles = strArray[j].slice(strArray[j].lastIndexOf('value="')+7, strArray[j].indexOf('"',strArray[j].lastIndexOf('value="')+8));
    return atBumbles; // viribal named as such coz of a weird bug that made the return value not return the first chatactor of the string so a little easter egg - adam
}
function SearchForNode (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match('id="'+str)) return strArray[j];
    }
}
function SearchForSource(str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match('source="'+str)) return strArray[j];
    }
}