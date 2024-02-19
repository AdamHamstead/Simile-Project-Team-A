let numconcepts = 0;
let numtriples = 0;
let triple: number[][] = [];
let TARGET = 2;
let input_concepts: number[] = [];
let SOURCE = 0;
let output_concepts: number[] = [];
let numOutputs = 0;
let numInputs = 0;
let concepts: string[];

import * as fs from 'fs'


export function reportInputAndOuputConcepts(rfname:string){ //Creates and writes to the report.txt file 


	//find input concepts (the start nodes)
	for(let i:number=0; i < numconcepts; i++){
		let j:number;
		for(j = 0; j < numtriples; j++){
			if(i == triple[j][TARGET]) break;
		}
		if(j == numtriples){
			input_concepts[numInputs++]=i;
		}
	}

	//find output concepts (the end nodes)
	for(let i:number=0; i < numconcepts; i++){
		let j:number;
		for(j = 0; j < numtriples; j++){
			if(i == triple[j][SOURCE]) break;
		}
		if(j == numtriples){
			output_concepts[numOutputs++]=i; //Globab Variables...
		}
	}

	//report input concepts
	if(numInputs==0){
        console.log("\n\nThere are no inputs");
        fs.writeFileSync(rfname, "\n\nThere are no inputs");
	}
	else {
        console.log("\n\nInputs: ");
        fs.writeFileSync(rfname, "\n\nInputs: ")
		for(let i:number = 0; i < numInputs; i++){
            console.log("\"" + concepts[input_concepts[i]] + "\" ");
            fs.writeFileSync(rfname, '\"' + concepts[input_concepts[i]] + "\" ") 
		}
	}

	//report output concepts
	if(numOutputs==0){
        console.log("\n\nThere are no outputs.");
        fs.writeFileSync(rfname, "\n\nThere are no outputs.");
	}
	else {
        console.log("\n\nOutputs: ");
        fs.writeFileSync(rfname, "\n\nOutputs: ");
		for(let i:number = 0; i < numOutputs; i++) {
            console.log('\"' + concepts[output_concepts[i]] + "\" ")
            fs.writeFileSync(rfname, '\"' + concepts[output_concepts[i]] + "\" ");
		}
	}
}