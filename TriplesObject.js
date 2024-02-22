class Triples{
    numberOfConcepts = 0;
    numberOfTriples = 0;
    numberOfRepeats = 0;
    referent = ""; // CG concept referent
    numSourceConcInRelation = 0;
    sourceConceptIndex = [];
    SOURCE = 0;		
    RELATION = 1;		
    TARGET = 2;
    ATTRIBUTE = 0;
    OBJECT = 1;
    TIMES = 2;

    constructor(concepts, referents, triple, repeats, relationLabels){
        this.concepts = concepts;
        this.referents = referents;
        this.triple = triple;
        this.repeats = repeats;
        this.relationLabels = relationLabels;
    }

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

    setNumberOfRepeats(){
        this.repeats.forEach(() =>{
            this.numberOfRepeats++;
        });
    }

    makeTriples(rel, ref_list){
        for(let i = 0; i < ref_list.length; i++) {
            if(ref_list[i]!=' '){ // spaces
                this.referent += ref_list[i];
            }
            else { // space indicates end of a referent - find the corresponding cg source concept
                for(let j = 0; j < this.numconcepts; j++) {
                    if(this.referents[j] == this.referent) {
                        let k = 0;
                        // check for a repeated source concept
                        for(k = 0; k < this.numSourceConcInRelation; k++) {
                            if(this.sourceConceptIndex[k] == j) {
                                break;
                            }
                        }
                        if(k == this.numSourceConcInRelation){
                            this.sourceConceptIndex[this.numSourceConcInRelation++] = j;
                            break;
                        }
                    }
                }
                this.referent = "" // reset CG concept referent
            }
        }
    
        let targetConceptIndex;
        for(let j = 0; j < this.numconcepts; j++) {
            if(this.referents[j] == this.referent) {
                targetConceptIndex = j;
                break;
            }
        }
    
        for(let i = 0; i < this.numSourceConcInRelation; i++) {
            this.triple[this.numtriples][this.SOURCE]= this.sourceConceptIndex[i];
            this.triple[this.numtriples][this.RELATION]=rel;
            this.triple[this.numtriples][this.TARGET]=targetConceptIndex;
            this.numtriples++;
        }

        return this.triple;
    }

    triples_to_binaries(rfname){
        let path = Array.from(Array(100000), () => new Array(2).fill(0)); //Look at this later**
        //let path:number[100000][]; //to record each transitive path through triples
        let pathSize = 0;
    
        //converts (source,relation,target) triples to ((source^relation),target) binary relations
        for(let attribute = 0; attribute<this.numberOfTriples; attribute++){
            let target = this.triple[attribute][this.TARGET];
            let relation = this.triple[attribute][this.RELATION];
            let source = this.triple[attribute][this.SOURCE];
            add_binary(attribute, source, relation, target, path, pathSize, rfname);
        }
    
        //output repeats
        for(let i = 0; i<this.numberOfRepeats; i++){
            let source = this.triple[this.repeats[i][this.ATTRIBUTE]][this.SOURCE];
            let relation = this.triple[this.repeats[i][this.ATTRIBUTE]][this.RELATION];
            let output = this.repeats[i][this.OBJECT];
            let target = this.triple[this.repeats[i][this.ATTRIBUTE]][this.TARGET];
            let times = this.repeats[i][this.TIMES] + 1;
            console.log("\n\n" + times + " direct pathways from \"" + this.concepts[source] + " - " + this.relationLabels[relation] + " - " + this.concepts[target] + "\" to \"" + this.concepts[output] + "\"");
            fs.appendFileSync(rfname, "\n\n " + times + " direct pathways from \"" + this.concepts[source] + " - " + this.relationLabels[relation] + " - " + this.concepts[target] + "\" to \"" + this.concepts[output] + "\"");
        }
    }
    
}