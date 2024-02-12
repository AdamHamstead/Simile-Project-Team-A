let ATTRIBUTE = 0;
let TIMES = 0;
let OBJECT = 0;
let SOURCE = 0;

let numOutput = 0;
let numinputs = 0;
let numreps = 0;
let numcpaths = 0; 
let output_concepts: number[] = [];
let repeats: number[][] = [];
let cyclepaths: number[][] = [];
let cpathsizes: number[] = [];

let input_concepts: number[] = [];
let triple: number[][] = [];


function target_already_in_pathway(target: number, path ,pathSize: number){
    var count = 0;
    for (let p = 0; p<pathSize; p++){
        if(target==path[p][0]) count++;
    }
    return count;
}

function is_output(target:number){
    for (let i = 0; i <numOutput; i++){
        if(target == output_concepts[i]) return true;
    }
    return false;
}

function is_input(attribute:number){
    for(let i = 0; i < numinputs; i++){
		if(triple[attribute][SOURCE] == input_concepts[i]) return true;
	}
	return false;

}

function add_to_repeats(target: number, attribute: number){
	var i:number = 0;
	for(let i = 0; i < numreps; i++){
		if(attribute == repeats[i][ATTRIBUTE] && target == repeats[i][OBJECT]){
			repeats[i][TIMES]++;
			break;
		}
	}
	if(i == numreps){
		repeats[numreps][ATTRIBUTE] = attribute;
		repeats[numreps][OBJECT] = target;
		repeats[numreps][TIMES] = 1;
		numreps++;
	}
}

function repeat_is_not_in_a_cycle(target:number, source:number){
	for(let p = 0; p < numcpaths; p++){
		for(let i = 0; i < cpathsizes[p]; i++){
			if(target == cyclepaths[p][i]){
				for(let j = 0; j < cpathsizes[p]; j++){
					if(source == cyclepaths[p][j]) return false;
				}
			}
		}
	}
	return true;
}

function is_new_cycle(path, pathsize:number){
	for(let p=0; p<numcpaths; p++){
		if(pathsize == cpathsizes[p]){
			var found = 0;
			for(let i = 0; i < pathsize; i++){
				for(let j = 0; j < pathsize; j++){
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
