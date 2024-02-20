import * as fs from 'fs'

class Output {
    private position: number;
    private cfname: string;
    private numberOfConcepts: number;

    constructor(cfname: string, position: number, numberOfConcepts: number) {
        this.cfname = cfname;
        this.position = position;
        this.numberOfConcepts = numberOfConcepts
    }

    public output_cxt_file(fname:string): void {  //Just makes cxt file dont need to change much exept global variables
        fs.writeFileSync(this.cfname, "B\n\n");
        fs.appendFileSync(this.cfname, this.numberOfConcepts + "\n");
        fs.appendFileSync(this.cfname, gb.numtriples + "\n\n");
        for(let i: number = 0; i < gb.numconcepts; i++){
            fs.appendFileSync(this.cfname, gb.concepts[i] + "\n");
        }
        for(let j: number = 0; j < gb.numtriples; j++){
            fs.appendFileSync(this.cfname, gb.concepts[gb.triple[j][gb.SOURCE]] + " " + gb.relation_labels[gb.triple[j][gb.RELATION]] + "\n");
        }
        for(let i: number = 0; i < gb.numconcepts; i++){
            for(let j: number = 0; j < gb.numtriples; j++){
                if(gb.context[i][j]){
                    fs.appendFileSync(this.cfname, "X");
                }
                else {
                    fs.appendFileSync(this.cfname, "\n");
                }
            }
        }
    }
        
}

class Input {
    constructor(parameters) {
        
    }
}
