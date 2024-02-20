import * as gb from './GlobalVariables'



import * as f from "./Line661-732 Functions"
import * as fs from 'fs'; //File reading and writing



export function triples_to_binaries(rfname:string){
    let path: number[][] = Array.from(Array(100000), () => new Array(2).fill(0)); //Look at this later**
    //let path:number[100000][]; //to record each transitive path through triples
    let pathSize:number = 0;

	//converts (source,relation,target) triples to ((source^relation),target) binary relations
    for(let attribute:number = 0; attribute<gb.numtriples; attribute++){
        let target:number = gb.triple[attribute][gb.TARGET];
        let relation:number = gb.triple[attribute][gb.RELATION];
        let source = gb.triple[attribute][gb.SOURCE];
        add_binary(attribute, source, relation, target, path, pathSize, rfname);
    }

    //output repeats
    for(let i:number = 0; i<gb.numReps; i++){
        let source:number = gb.triple[gb.repeats[i][gb.ATTRIBUTE]][gb.SOURCE];
        let relation:number = gb.triple[gb.repeats[i][gb.ATTRIBUTE]][gb.RELATION];
        let output:number = gb.repeats[i][gb.OBJECT];
        let target:number = gb.triple[gb.repeats[i][gb.ATTRIBUTE]][gb.TARGET];
        let times:number = gb.repeats[i][gb.TIMES] + 1;
        console.log("\n\n" + times + " direct pathways from \"" + gb.concepts[source] + " - " + gb.relation_labels[relation] + " - " + gb.concepts[target] + "\" to \"" + gb.concepts[output] + "\"");
        fs.appendFileSync(rfname, "\n\n " + times + " direct pathways from \"" + gb.concepts[source] + " - " + gb.relation_labels[relation] + " - " + gb.concepts[target] + "\" to \"" + gb.concepts[output] + "\"");
    }
}

function add_binary(attribute:number, source:number, relation:number, target:number, path:number[][], pathSize:number, rfname:string){

	//add source and relation to current pathway
    path[pathSize][0] = source;
    path[pathSize][1] = relation;
    pathSize++;

    //repeated output targets
    if(gb.context[target][attribute] == true){
        if(f.repeat_is_not_in_a_cycle(target, gb.triple[attribute][gb.SOURCE])){
            if(f.is_output(target) && f.is_input(attribute)){
                f.add_to_repeats(target, attribute);
            }
        }
    }
    else{
        //add a cross in the formal context for the attribute and target (object)
        gb.context[target][attribute] = true;

        //if object is an output and attribute involves an input then report pathway
        if(f.is_output(target) && f.is_input(attribute)){
            console.log("\n\nDirect Pathway: ");
            fs.appendFileSync(rfname, "\n\nDirect Pathway: ");
            for (let p = 0; p < pathSize; p++){
                console.log(gb.concepts[path[p][0]] + " - " + gb.relation_labels[path[p][1]] + " - ");
                fs.appendFileSync(rfname, gb.concepts[path[p][0]] + " - " + gb.relation_labels[path[p][1]] + " - ");
            }
            console.log(gb.concepts[target]);
            fs.appendFileSync(rfname, gb.concepts[target]);
        }

        if (gb.triple[attribute][gb.SOURCE] == target){ //if source is its own target, its a cycle!
            if (f.is_new_cycle(path, pathSize)){
                gb.cpathsizes[gb.numcpaths] = pathSize;
                console.log("\n\nCycle: ");
                fs.appendFileSync(rfname, "\n\nCycle: ");
                for (let p = 0; p<pathSize; p++){
                    console.log(gb.concepts[path[p][0]] + " - " + gb.relation_labels[path[p][1]] + " - ");
                    fs.appendFileSync(rfname, gb.concepts[path[p][0]] + " - " + gb.relation_labels[path[p][1]] + " - ");
                    gb.cyclePaths[gb.numcpaths][p] = path[p][0]; //ERRORS HERE *****
                }
                console.log(gb.concepts[path[0][0]]);
                fs.appendFileSync(rfname, gb.concepts[path[0][0]]);
                gb.setnumcpaths(gb.numcpaths + 1)
                //numcpaths++;
            }
        }

        if(!f.target_already_in_pathway(target, path, pathSize)){
            for (let k = 0; k<gb.numtriples; k++) {
                if(target == gb.triple[k][gb.SOURCE]){
                    add_binary(attribute, gb.triple[k][gb.SOURCE], gb.triple[k][gb.RELATION], gb.triple[k][gb.TARGET], path, pathSize, rfname);
                }
            }
        }
    }
}
