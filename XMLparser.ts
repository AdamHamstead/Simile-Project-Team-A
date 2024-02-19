import { Readline } from "node:readline/promises";

fs = require('fs');


function XMLParserEntry(){
    var callback;
    let source = "C:\Users\adamh\OneDrive\Documents\GitHub\Simile-Project-Team-A\XMLExamples\CatOnMat.xml"
    let data:string[] = ReadXML(source);
    let IDs:string[]=[];
    let targets:string[]=[];

    //find rootnode 
    data.forEach(element => {
        IDs.push(element.slice(element.indexOf('"'), element.indexOf('"',element.indexOf('"')+2))); 
        if(element.includes('target="')){
            element.lastIndexOf('target="');
            targets.push(element.slice(element.lastIndexOf('target="'), element.indexOf('"',element.lastIndexOf('target="')+2)))
        }
    });
    const roots = IDs.filter((element) => !targets.includes(element));


}

function ReadXML(source: any){
    let usefulData :string[]= [];
    fetch(source)
        .then((res) => res.text())
        .then((text) => {
            const words = text.split('/n');
            words.forEach(element => {
            if(element.includes("mxCell")&&element.includes("value")){
                usefulData.push(element);
            }  
            });

        })
    .catch((e) => console.error(e));
    return usefulData;
}