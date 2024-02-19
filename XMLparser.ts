import { DOMParser } from 'xmldom'
fs = require('fs');


function XMLParserEntry(){
    var callback;
    let source = "C:\Users\adamh\OneDrive\Documents\GitHub\Simile-Project-Team-A\XMLExamples\CatOnMat.xml"
    
    const doc = new DOMParser().parseFromString(source, 'text/xml')

    var nodesByName = document.getElementsByTagName('value');


}