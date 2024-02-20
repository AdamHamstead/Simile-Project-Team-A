import * as fs from 'fs'

class Output {
    private numberOfConcepts: number = 0;
    //(replace)private numberOfTriples: number;
    private concepts: string[];
    //(replace)private triple: ;
    private context: boolean[][];
    //(not used till triples are replaced)private relationLabels: ;
    //(not used till triples are replaced)private RELATION: ;
    //(not used till triples are replaced)private SOURCE: ;

    constructor(concepts: string[], context: boolean[][]) {
        this.concepts = concepts;
        this.context = context; // Not sure if this is best way to set context???
    }

    private setNumberOfConcepts(){
        this.concepts.forEach(() =>{ // Loop through concepts
            this.numberOfConcepts++; // Count number of concepts
        });
    }

    public output_cxt_file(cfname:string): void {  //Just makes cxt file dont need to change much exept global variables
        this.setNumberOfConcepts();
        fs.writeFileSync(cfname, "B\n\n");
        fs.appendFileSync(cfname, this.numberOfConcepts + "\n");
        //(replace)fs.appendFileSync(this.cfname, gb.numtriples + "\n\n");
        for(let i: number = 0; i < this.numberOfConcepts; i++){
            fs.appendFileSync(cfname, this.concepts[i] + "\n");
        }
        //(replace)for(let j: number = 0; j < gb.numtriples; j++){
        //    fs.appendFileSync(this.cfname, gb.concepts[gb.triple[j][gb.SOURCE]] + " " + gb.relation_labels[gb.triple[j][gb.RELATION]] + "\n");
        //}
        for(let i: number = 0; i < this.numberOfConcepts; i++){
            //(replace)for(let j: number = 0; j < gb.numtriples; j++){
                if(this.context[i]){
                    fs.appendFileSync(cfname, "X");
                }
                else {
                    fs.appendFileSync(cfname, "\n");
                }
            //}
        }
    }
        
}

class Input {
    constructor(parameters) {
        
    }
}
