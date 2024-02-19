import { DOMParser } from 'xmldom'
fs = require('fs');


function XMLParserEntry(){
    var callback;
    let source = "C:\Users\adamh\OneDrive\Documents\GitHub\Simile-Project-Team-A\XMLExamples\CatOnMat.xml"
    let data:string = FileToString(source);
    const doc = new DOMParser().parseFromString(data, 'text/xml')


    var nodesByName = document.getElementsByTagName('value');


}

function FileToString(source: any){
    const fs = require('fs');
    // Open the file stream
        const stream = fs.createReadStream(source);
    
    // Create a string variable to store the data
        let data = '';
    
    // Listen for the 'data' event and append the data to the string variable
        stream.on('data', (chunk: { toString: () => string; }) => {
            data += chunk.toString();
        });
    // Listen for the 'end' event and log the final string value
    stream.on('end', () => {
      console.log(data);
    });
    return data;

}