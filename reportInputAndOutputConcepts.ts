import * as gb from './GlobalVariables'
import * as fs from 'fs'


export function reportInputAndOuputConcepts(rfname:string){ //Creates and writes to the report.txt file 


	//find input concepts (the start nodes)
	for(let i:number=0; i < numconcepts; i++){
		let j:number;
		for(j = 0; j < numtriples; j++){
			if(i == gb.triple[j][gb.TARGET]) break;
		}
		if(j == numtriples){
			gb.input_concepts[gb.numInputs++]=i;
		}
	}

	//find output concepts (the end nodes)
	for(let i:number=0; i < numconcepts; i++){
		let j:number;
		for(j = 0; j < numtriples; j++){
			if(i == gb.triple[j][gb.SOURCE]) break;
		}
		if(j == numtriples){
			gb.output_concepts[gb.numOutputs++]=i; //Globab Variables...
		}
	}

	//report input concepts
	if(gb.numInputs==0){
        console.log("\n\nThere are no inputs");
        fs.writeFileSync(rfname, "\n\nThere are no inputs");
	}
	else {
        console.log("\n\nInputs: ");
        fs.writeFileSync(rfname, "\n\nInputs: ")
		for(let i:number = 0; i < gb.numInputs; i++){
            console.log("\"" + gb.concepts[gb.input_concepts[i]] + "\" ");
            fs.writeFileSync(rfname, '\"' + gb.concepts[gb.input_concepts[i]] + "\" ") 
		}
	}

	//report output concepts
	if(gb.numOutputs==0){
        console.log("\n\nThere are no outputs.");
        fs.writeFileSync(rfname, "\n\nThere are no outputs.");
	}
	else {
        console.log("\n\nOutputs: ");
        fs.writeFileSync(rfname, "\n\nOutputs: ");
		for(let i:number = 0; i < gb.numOutputs; i++) {
            console.log('\"' + gb.concepts[gb.output_concepts[i]] + "\" ")
            fs.writeFileSync(rfname, '\"' + gb.concepts[gb.output_concepts[i]] + "\" ");
		}
	}
}