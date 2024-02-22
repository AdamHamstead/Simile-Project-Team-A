import * as fs from 'fs'

class Output {

    constructor(concepts, context, triple, relationLables) {
        this.concepts = concepts;
        this.context = context; // Not sure if this is best way to set context???
        this.triple = triple;
        this.relationLabels = relationLables; // Not sure if this is best way to set relationLabels??
    }

    numberOfTriples = 0;
    numberOfConcepts = 0;
    SOURCE = 0;
    RELATION = 1;

    setNumberOfConcepts(){
        this.concepts.forEach(() =>{ // Loop through concepts
            this.numberOfConcepts++; // Count number of concepts
        });
    }

    setNumberOfTriples(){
        this.triple.forEach(() =>{ // Loop through triples
            this.numberOfTriples++; // Count number of triples
        });
    }

    output_cxt_file(cfname) {  //Just makes cxt file dont need to change much exept global variables
        this.setNumberOfConcepts();
        this.setNumberOfTriples();
        fs.writeFileSync(cfname, "B\n\n");
        fs.appendFileSync(cfname, this.numberOfConcepts + "\n"); 
        fs.appendFileSync(cfname, this.numberOfTriples + "\n\n");
        for(let i = 0; i < this.numberOfConcepts; i++){
            fs.appendFileSync(cfname, this.concepts[i] + "\n");
        }
        for(let j = 0; j < this.numberOfTriples; j++){
            fs.appendFileSync(cfname, this.concepts[this.triple[j][this.SOURCE]] + " " + this.relationLabels[this.triple[j][this.RELATION]] + "\n");
        }
        for(let i = 0; i < this.numberOfConcepts; i++){
            for(let j = 0; j < this.numberOfTriples; j++){
                if(this.context[i]){
                    fs.appendFileSync(cfname, "X");
                }
                else {
                    fs.appendFileSync(cfname, "\n");
                }
            }
        }
    }
        
}

class Input { // Needs to work for XML

    constructor(){

    }

    source = "";
    relation = "";
    target = "";
    tripleThing = [];
    n = 0;
    a = "";
    escaped = false;
    delim = "";
    input = ",";//TEMP
    //private input: string = prompt("\nEnter delimiter character (enter t if delimiter is the tab character, enter s if delimiter is the space character):")

    getInput(){
        return this.input;
    }

    inputXmlFile(fname) {

        if (!fs.existsSync(fname)) {
            console.log("File does not exist!")
            process.exit()
        } 
    
        if (this.input == 't') 
            this.delim = '\t'
        if (this.input == 's') 
            this.delim = ' '
    
        let fileContent = fs.readFileSync(fname, 'utf8')
        for (const line of fileContent.split(/[\r\n]+/)){
            
            this.n = 0
            this.escaped = false
            this.tripleThing = ["","",""]
            
            for (let char = 0; char < line.length; char++){
                this.a = line[char]
                if (this.a == '"' && !this.escaped) {
                    this.escaped = true
                }
                else {
                    if (this.a=='"' && this.escaped){
                        this.escaped = false
                    }
                    else {
                        if (this.a==this.delim && !this.escaped){
                            this.n++
                        }
                        else {
                            this.tripleThing[n] = this.tripleThing[n] + a
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
}
