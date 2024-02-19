import * as Line661 from "./Line661-732"


let RELATION = 1;		//relation index of triple
let TARGET = 2;		//target concept index of triple
let ATTRIBUTE = 0;
let TIMES = 0;
let OBJECT = 0;
let SOURCE = 0;
let numReps = 0;
let repeats: number[][] = [];
let cyclepaths: number[][] = [];
let cpathsizes: number[] = [];
let numcpaths = 0; 


let triple: number[][] = [];


let numtriples:number = 0;	
let relation_labels: string[1000];


let MAX_ROWS = 1000;
let MAX_COLS = 1000;
//bool context[MAX_ROWS][MAX_COLS];
let context: boolean[][];
let concepts: string[];	//FCA formal object name = GC Target Concept

import * as f from "./Line661-732"
import * as fs from 'fs'; //File reading and writing

let fname:string = ""



export function triples_to_binaries(){
    let path:number[][] = []; //to record each transitive path through triples
    let pathSize:number = 0;

	//converts (source,relation,target) triples to ((source^relation),target) binary relations
    for(let attribute:number = 0; attribute<numtriples; attribute++){
        let target:number = triple[attribute][TARGET];
        let relation:number = triple[attribute][RELATION];
        let source = triple[attribute][SOURCE];
        add_binary(attribute, source, relation, target, path, pathSize);
    }

    //output repeats
    for(let i:number = 0; i<numReps; i++){
        let source:number = triple[repeats[i][ATTRIBUTE]][SOURCE];
        let relation:number = triple[repeats[i][ATTRIBUTE]][RELATION];
        let output:number = repeats[i][OBJECT];
        let target:number = triple[repeats[i][ATTRIBUTE]][TARGET];
        let times:number = repeats[i][TIMES] + 1;
        console.log("\n\n" + times + " direct pathways from \"" + concepts[source] + " - " + relation_labels[relation] + " - " + concepts[target] + "\" to \"" + concepts[output] + "\"");
        fs.writeFileSync(fname, "\n\n " + times + " direct pathways from \"" + concepts[source] + " - " + relation_labels[relation] + " - " + concepts[target] + "\" to \"" + concepts[output] + "\"");
    }
}

function add_binary(attribute:number, source:number, relation:number, target:number, path:number[][], pathSize:number){

	//add source and relation to current pathway
    path[pathSize][0] = source;
    path[pathSize][1] = relation;
    pathSize++;

    //repeated output targets
    if(context[target][attribute] == true){
        if(f.repeat_is_not_in_a_cycle(target, triple[attribute][SOURCE])){
            if(f.is_output(target) && f.is_input(attribute)){
                f.add_to_repeats(target, attribute);
            }
        }
    }
    else{
        //add a cross in the formal context for the attribute and target (object)
        context[target][attribute] = true;

        //if object is an output and attribute involves an input then report pathway
        if(f.is_output(target) && f.is_input(attribute)){
            console.log("\n\nDirect Pathway: ");
            fs.writeFileSync(fname, "\n\nDirect Pathway: ");
            for (let p = 0; p < pathSize; p++){
                console.log(concepts[path[p][0]] + " - " + relation_labels[path[p][1]] + " - ");
                fs.writeFileSync(fname, concepts[path[p][0]] + " - " + relation_labels[path[p][1]] + " - ");
            }
            console.log(concepts[target]);
            fs.writeFileSync(fname, concepts[target]);
        }

        if (triple[attribute][SOURCE] == target){ //if source is its own target, its a cycle!
            if (f.is_new_cycle(path, pathSize)){
                cpathsizes[numcpaths] = pathSize;
                console.log("\n\nCycle: ");
                fs.writeFileSync(fname, "\n\nCycle: ");
                for (let p = 0; p<pathSize; p++){
                    console.log(concepts[path[p][0]] + " - " + relation_labels[path[p][1]] + " - ");
                    fs.writeFileSync(fname, concepts[path[p][0]] + " - " + relation_labels[path[p][1]] + " - ");
                    cyclepaths[numcpaths][p] = path[p][0];
                }
                console.log(concepts[path[0][0]]);
                fs.writeFileSync(fname, concepts[path[0][0]]);
                numcpaths++;
            }
        }

        if(!f.target_already_in_pathway(target, path, pathSize)){
            for (let k = 0; k<numtriples; k++) {
                if(target == triple[k][SOURCE]){
                    add_binary(attribute, triple[k][SOURCE], triple[k][RELATION], triple[k][TARGET], path, pathSize);
                }
            }
        }
    }
}
