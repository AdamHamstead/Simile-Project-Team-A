import { Readline } from "node:readline/promises";

fs = require('fs');


function XMLParserEntry(){
    var callback;
    let source = "C:\Users\adamh\OneDrive\Documents\GitHub\Simile-Project-Team-A\XMLExamples\CatOnMat.xml"
    let data = ReadXML(source);
    //find rootnode 
    data.forEach(element => {
        
    });
}

async function ReadXML(source: any){
    let usefulData :any[]= [];
    fetch(source)
        .then((res) => res.text())
        .then((text) => {
            const words = text.split('/n');
            words.forEach(element => {
            if(element.search("mxCell")&&element.search("value")){
                usefulData.push(usefulData);
            }  
            });

        })
    .catch((e) => console.error(e));
    return usefulData;
}