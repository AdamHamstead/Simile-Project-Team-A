class Triples{
    constructor(numberOfConcepts, referents, triple, numberOfTriples){
        this.numberOfConcepts = numberOfConcepts;
        this.referents = referents;
        this.triple = triple;
        this.numberOfTriples = numberOfTriples;
    }

    referent = ""; // CG concept referent
    numSourceConcInRelation = 0;
    sourceConceptIndex = [];
    SOURCE = 0;		
    RELATION = 1;		
    TARGET = 2;

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
    
}