
var require: any 
var fs = require('fs');

var fname : string;			
var rfname : string;			
var cfname : string;	
var cyclepaths : number = [10000][10000]; //to record each cycle path
var cpathsizes : number[] = [10000];
var numcpaths : number = 0;
var numtriples: number = 0;
var triple: number = [5000][3];
var context: boolean;
var relation_labels: string;

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

function output_cxt_file(): void {  //Just makes cxt file dont need to change much exept global variables
	let pos: number = fname.search(".");
	cfname = fname.substr(0,pos);
	cfname += ".cxt";
	let outcxt: any = fs.readFile(cfname);
	let content = outcxt + "B\n\n";
	content += numconcepts + "\n";
	content += numtriples + "\n\n";
	for(let i: number = 0; i < numtriples; i++){
		content += concepts[i] + "\n";
	}
	for(let j: number = 0; j < numtriples; j++){
		content += concepts[triple[j][SOURCE]] + " " + relation_labels[triple[j][RELATION]] + "\n";
	}
	for(let i: number = 0; i < numconcepts; i++){
		for(let j: number = 0; j < numtriples; j++){
			if(context[i][j]){
				content += "X";
			}
			else {
				content += ".";
			}
		}
		content += "\n";
	}
	fs.writeFile(cfname, content, function (err) {
		if (err) throw err;
		console.log('Saved!');
	});
	fs.close();
}