
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
    let container = [[],[]];
    let output;
    let Concepts= new Array();
    rootids.forEach(element => {
        container[0].push(CreateConcept(element,data,Concepts,container));
    });
    return container
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

function CreateConcept(id ,data,Concepts,container){
    let node = new Concept(SearchForValue(id,data));
    Concepts.push(node);
    let endnode = 0;
    data.forEach(element => {
        if(element.includes('source="'+id+'"')) {
            endnode++;
            let IDofTarget = element.slice(element.lastIndexOf('target="')+8, element.indexOf('"',element.lastIndexOf('target=""')+9));
            let temp = SearchForNode(IDofTarget ,data)
            CreateRelation(node,temp,data,Concepts,container);

        }
    });
    return node;
}
function CreateRelation(source,mxCell,data,Concepts,container){
    let value = mxCell.slice(mxCell.lastIndexOf('value="')+8, mxCell.indexOf('"',mxCell.lastIndexOf('value="')+9))
    let target;
    Concepts.forEach(element => {
        if(element.value = value){
            target = value;
        }
        else{
            target =  new Concept(mxCell.slice(mxCell.lastIndexOf('value="')+8, mxCell.indexOf('"',mxCell.lastIndexOf('value="')+9)));
        }
    });
    //source.AddRelation(new Relation(source,CreateConcept(mxCell.slice(mxCell.lastIndexOf('value="')+8, mxCell.indexOf('"',mxCell.lastIndexOf('value="')+9)),data) ,mxCell.slice(mxCell.lastIndexOf('value="')+8, mxCell.indexOf('"',mxCell.lastIndexOf('value="')+9))));//your guess is as good as mine - come to adam i will show you the amazing world of oneliners  
    //a relic of the past :)
    container[1] = new Relation(source,value,data)
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
        if (strArray[j].match('id='+str)) return strArray[j];
    }
}
