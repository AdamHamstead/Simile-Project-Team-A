import { Readline } from "node:readline/promises";

fs = require('fs');


function XMLParserEntry(){
    var callback;
    let source = "C:\Users\adamh\OneDrive\Documents\GitHub\Simile-Project-Team-A\XMLExamples\CatOnMat.xml"
    let data:string[] = ReadXML(source);
    let IDs:string[];
    //find rootnode 
    data.forEach(element => {
        IDs.push(element.slice(element.indexOf('"'), element.indexOf('"',element.indexOf('"')+2))); 
    });
    
}

function ReadXML(source: any){
    let usefulData :string[]= [];
    fetch(source)
        .then((res) => res.text())
        .then((text) => {
            const words = text.split('/n');
            words.forEach(element => {
            if(element.search("mxCell")&&element.search("value")){
                usefulData.push(element);
            }  
            });

        })
    .catch((e) => console.error(e));
    return usefulData;
}