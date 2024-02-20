import * as gb from './GlobalVariables'

import * as conceptRelation from './FindConceptFindRelation'

import * as fs from 'fs'
import * as readline from 'readline'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });



export function input_csv_file(fname: string) {

    if (!fs.existsSync(fname)) {
        console.log("File does not exist!")
        process.exit()
    } 

    let source: string
    let relation: string
    let target: string
    let tripleThing: string[] // source-relation-target
    let n = 0
    let a: string
    let escaped: boolean

    let delim = "" // delimiter
    delim = ",";
    var input = "," //TEMP
    //let input  = prompt("\nEnter delimiter character (enter t if delimiter is the tab character, enter s if delimiter is the space character):")

    if (input == 't') 
        delim = '\t'
    if (input == 's') 
        delim = ' '

    let fileContent = fs.readFileSync(fname, 'utf8')
    for (const line of fileContent.split(/[\r\n]+/)){
        
        n = 0
        escaped = false
        tripleThing = ["","",""]
        
        for (let char = 0; char < line.length; char++){
            a = line[char]
            if (a == '"' && !escaped) {
                escaped = true
            }
            else {
                if (a=='"' && escaped){
                    escaped = false
                }
                else {
                    if (a==delim && !escaped){
                        n++
                    }
                    else {
                        tripleThing[n] = tripleThing[n] + a
                    }
                }

            }
        }

        source = tripleThing[0]
        relation = tripleThing[1];
		target = tripleThing[2];

        // create triples //
        let pos = conceptRelation.find_concept(source)
        if (pos == -1){
            // add new concept to list
            pos = gb.numconcepts
            gb.setnumconcepts(gb.numconcepts + 1)
            gb.setconcepts(source,gb.numconcepts);
            //gb.concepts[gb.numconcepts] = source
        }
        gb.triple[gb.numtriples][0] = pos

        pos = conceptRelation.find_relation(relation)
        if (pos == -1){
            // add new relation to list
			pos = gb.number_of_relations
            gb.setrelationlabels(relation, gb.number_of_relations)
			//gb.relation_labels[gb.number_of_relations] = relation
        }
        gb.triple[gb.numtriples][1] = pos

        pos = conceptRelation.find_concept(target)
        if(pos == -1){
            // add new concept to list
            pos = gb.numconcepts
            gb.setnumconcepts(gb.numconcepts + 1)
            gb.setconcepts(target, gb.numconcepts);
            //gb.concepts[gb.numconcepts] = target
		}
        gb.setnumtriples(gb.numtriples + 1);
		gb.triple[gb.numtriples][2] = pos
    }
}
