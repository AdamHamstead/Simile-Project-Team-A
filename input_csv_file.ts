
import fs from 'fs'
import * as readline from 'readline'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

let concepts: string[]
let number_of_relations: number
let relation_labels: string[]


function input_csv_file(fname: string) {
    let find_concept: string
    let find_relation: string

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
    
    let input  = prompt("\nEnter delimiter character (enter t if delimiter is the tab character, enter s if delimiter is the space character):")

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
        let pos = find_concept(source)
        if (pos == -1){
            // add new concept to list
            pos = numconcepts
            concepts[numconcepts++] = source
        }
        triple[numtriples][0] = pos

        pos = find_relation(relation)
        if (pos == -1){
            // add new relation to list
			pos = number_of_relations
			relation_labels[number_of_relations++] = relation
        }
        triple[numtriples][1] = pos

        pos = find_concept(target)
        if(pos == -1){
            // add new concept to list
            pos = numconcepts
            concepts[numconcepts++] = target
		}
		triple[numtriples++][2] = pos
    }
}
