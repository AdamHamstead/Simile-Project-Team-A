fs = require('fs');
import { Readline } from "node:readline/promises";
import { Concept } from './ConceptObjects';
import { Relation } from "./ConceptObjects";


function XMLParserEntry(){
    let source = "C:\Users\adamh\OneDrive\Documents\GitHub\Simile-Project-Team-A\XMLExamples\CatOnMat.xml" //source of XML file - will be  dynamic later
    let data:string[] = ReadXML(source);
    const roots = FindRootNode(data);
    roots.forEach(element => {
        CreateNodes(element,data);
    });
}

function ReadXML(source: any){
    let usefulData :string[]= [];
    fetch(source) //gets the file
        .then((res) => res.text()) //waits for response and changes it to text
        .then((text) => {
            const words = text.split('/n'); //splits the text on new line
            words.forEach(element => {
            if(element.includes("mxCell")&&element.includes("value")){
                usefulData.push(element);
            }  
            });

        })
    .catch((e) => console.error(e));
    return usefulData;
}
function FindRootNode(data:string[]){

    let IDs:string[]=[];
    let targets:string[]=[];
    data.forEach(element => {
        IDs.push(element.slice(element.indexOf('"'), element.indexOf('"',element.indexOf('"')+2))); 
        //Pushes the text inside the ID tag of the MXcell to IDs - does this by slicing between the index of the first and second " found 
        if(element.includes('target="')){
            targets.push(element.slice(element.lastIndexOf('target="'), element.indexOf('"',element.lastIndexOf('target="')+2)))
        }
    });
    return IDs.filter((element) => !targets.includes(element));
}

function CreateNodes(node:string ,data:string[]){

}