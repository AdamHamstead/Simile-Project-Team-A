import * as gb from './GlobalVariables'
import * as fs from 'fs'


export function reportInputAndOuputConcepts(rfname:string){ //Creates and writes to the report.txt file 


	//find input concepts (the start nodes)
	for(let i:number=0; i < gb.numconcepts; i++){
		let j:number;
		for(j = 0; j < gb.numtriples; j++){
			if(i == gb.triple[j][gb.TARGET]) break;
		}
		if(j == gb.numtriples){
			gb.setnumInputs(gb.numInputs + 1)
			gb.input_concepts[gb.numInputs]=i;
		}
	}

	//find output concepts (the end nodes)
	for(let i:number=0; i < gb.numconcepts; i++){
		let j:number;
		for(j = 0; j < gb.numtriples; j++){
			if(i == gb.triple[j][gb.SOURCE]) break;
		}
		if(j == gb.numtriples){
			gb.setnumInputs(gb.numInputs + 1)
			gb.output_concepts[gb.numOutputs]=i; //Globab Variables...
		}
	}

	//report input concepts
	if(gb.numInputs==0){
        console.log("\n\nThere are no inputs");
        fs.appendFileSync(rfname, "\n\nThere are no inputs");
	}
	else {
        console.log("\n\nInputs: ");
        fs.appendFileSync(rfname, "\n\nInputs: ")
		for(let i:number = 0; i < gb.numInputs; i++){
            console.log("\"" + gb.concepts[gb.input_concepts[i]] + "\" ");
            fs.appendFileSync(rfname, '\"' + gb.concepts[gb.input_concepts[i]] + "\" ") 
		}
	}

	//report output concepts
	if(gb.numOutputs==0){
        console.log("\n\nThere are no outputs.");
        fs.appendFileSync(rfname, "\n\nThere are no outputs.");
	}
	else {
        console.log("\n\nOutputs: ");
        fs.appendFileSync(rfname, "\n\nOutputs: ");
		for(let i:number = 0; i < gb.numOutputs; i++) {
            console.log('\"' + gb.concepts[gb.output_concepts[i]] + "\" ")
            fs.appendFileSync(rfname, '\"' + gb.concepts[gb.output_concepts[i]] + "\" ");
		}
	}
}