
//const Concept = await import("./ConceptObjects");
//const Relation = await import("./ConceptObjects");
const fs = require('fs');
import { Concept } from './ConceptObjects';
import { Relation } from "./ConceptObjects";

XMLParserEntry();
function XMLParserEntry(){ 
    let source = "\CatOnMat.xml" //source of XML file - will be  dynamic later
    let data:string[] = ReadXML(source);
    const rootids = FindRootNode(data);
    let roots = new Array<Concept>;
    rootids.forEach(element => {
        roots.push(CreateConcept(element,data) as Concept);
    });
}

function ReadXML(source: any){
    let usefulData :string[]= [];
    let allFileContents:string = fs.readFileSync(source);
    let lines:string[] = allFileContents.split(/\r?\n/)
    lines.forEach(line => {
        console.log(`Line from file: ${line}`);
        if(line.includes("mxCell")&&line.includes("value"))
          usefulData.push(line);
    });
    return usefulData;
}
function FindRootNode(data:string[]){

    let IDs:string[]=[];
    let targets:string[]=[];
    data.forEach(element => {
        IDs.push(element.slice(element.indexOf('"'), element.indexOf('"',element.indexOf('"')+2))); 
        //Pushes the text inside the ID tag of the MXcell to IDs - does this by slicing between the index of the first and second " found 
        if(element.includes('target="')){
            targets.push(element.slice(element.lastIndexOf('target="'), element.indexOf('"',element.lastIndexOf('target="')+2)));
        }
    });
    return IDs.filter((element) => !targets.includes(element));
}

function CreateConcept(id:string ,data:string[]){
    let node = new Concept(SearchForValue(id,data));
    let endnode = 0;
    data.forEach(element => {
        if(element.includes('source="'+id+'"')) {
            endnode++;
            let IDofTarget = element.slice(element.lastIndexOf('target="'), element.indexOf('"',element.lastIndexOf('target=""')+1));
            let temp = SearchForNode(IDofTarget ,data)
            CreateRelation(node,temp as string,data);

        }
    });
    if(!endnode){
        return node;
    }
}
function CreateRelation(source:Concept,mxCell:string,data:string[]){
    //mxcell is target
    //need value 
    //create the target if id does not exists
    mxCell.slice(mxCell.lastIndexOf('value="'), mxCell.indexOf('"',mxCell.lastIndexOf('value="')+1));//gets value 
    let target = CreateConcept(mxCell.slice(mxCell.lastIndexOf('value="'), mxCell.indexOf('"',mxCell.lastIndexOf('value="')+1)),data);
    let relation = new Relation(source,target as Concept,mxCell.slice(mxCell.lastIndexOf('value="'), mxCell.indexOf('"',mxCell.lastIndexOf('value="')+1)));
    return 1;
}
function SearchForValue (str:string, strArray:string[]) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) break;
    }
    return strArray[j].slice(strArray[j].lastIndexOf('value="'), strArray[j].indexOf('"',strArray[j].lastIndexOf('value="')+1));
}
function SearchForNode (str:string, strArray:string[]) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return strArray[j];
    }
}
