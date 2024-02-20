
import * as gb from './GlobalVariables'

import * as fs from 'fs'


/*
function repeat_is_not_in_a_cycle(target: number, source: number): boolean{
	for (let p : number = 0; p < numcpaths; p++){
		for(let i : number = 0; i < cpathsizes[p]; i++){
			if(target == cyclepaths[p][i]){
				for(let j : number = 0; j < cpathsizes[p]; j++){
					if(source == cyclepaths[p][j]) return false;
				}
			}
		}
	}
	return true;
}

function is_new_cycle(path,[],[]: number[][], pathsize: number): boolean{
	for (let p: number = 0; p < numcpaths; p++) {
		if(pathsize == cpathsizes[p]){
			let found: number = 0;
			for(let i: number = 0; i < pathsize; i++){
				for(let j:number = 0; j < pathsize; j++){
					if(path[i][0] == cyclepaths[p][j]){
						found++;
						//this break is to avoid double-counting of a CG concept if it appears more than once in the cycle
						//this is possible if a concept is at the cross-roads of a figure-of-eight cycle, for example.
						break;
					}
				}
			}
			if(found == pathsize) return false;
		}
	}
	return true;
}
*/
export function output_cxt_file(fname:string): void {  //Just makes cxt file dont need to change much exept global variables
	let pos: number = fname.indexOf(".");
	let cfname:string = fname.substring(0,pos) + ".cxt";
	fs.writeFileSync(cfname, "B\n\n");
	fs.appendFileSync(cfname, gb.numconcepts + "\n");
	fs.appendFileSync(cfname, gb.numtriples + "\n\n");
	for(let i: number = 0; i < gb.numconcepts; i++){
		fs.appendFileSync(cfname, gb.concepts[i] + "\n");
	}
	for(let j: number = 0; j < gb.numtriples; j++){
		fs.appendFileSync(cfname, gb.concepts[gb.triple[j][gb.SOURCE]] + " " + gb.relation_labels[gb.triple[j][gb.RELATION]] + "\n");
	}
	for(let i: number = 0; i < gb.numconcepts; i++){
		for(let j: number = 0; j < gb.numtriples; j++){
			if(gb.context[i][j]){
				fs.appendFileSync(cfname, "X");
			}
			else {
				fs.appendFileSync(cfname, "\n");
			}
		}
	}
}