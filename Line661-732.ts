
let ATTRIBUTE = 0;
let TIMES = 0;
let OBJECT = 0;
let SOURCE = 0;

let numOutput = 0;
let numInputs = 0;
let numReps = 0;
let output_concepts: number[] = [];
let repeats: number[][] = [];
let cyclePaths: number[][] = [];
let cpathSizes: number[] = [];

let input_concepts: number[] = [];



function target_already_in_pathway(target: number, path:number[][] ,pathSize: number){
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
    for(let i = 0; i < numInputs; i++){
		if(triple[attribute][SOURCE] == input_concepts[i]) return true;
	}
	return false;

}

function add_to_repeats(target: number, attribute: number){
	var i:number = 0;
	for(let i = 0; i < numReps; i++){
		if(attribute == repeats[i][ATTRIBUTE] && target == repeats[i][OBJECT]){
			repeats[i][TIMES]++;
			break;
		}
	}
	if(i == numReps){
		repeats[numReps][ATTRIBUTE] = attribute;
		repeats[numReps][OBJECT] = target;
		repeats[numReps][TIMES] = 1;
		numReps++;
	}
}

function repeat_is_not_in_a_cycle(target:number, source:number){
	for(let p = 0; p < numcpaths; p++){
		for(let i = 0; i < cpathSizes[p]; i++){
			if(target == cyclePaths[p][i]){
				for(let j = 0; j < cpathSizes[p]; j++){
					if(source == cyclePaths[p][j]) return false;
				}
			}
		}
	}
	return true;
}

function is_new_cycle(path:number[][], pathsize:number){
	for(let p=0; p<numcpaths; p++){
		if(pathsize == cpathSizes[p]){
			var found = 0;
			for(let i = 0; i < pathsize; i++){
				for(let j = 0; j < pathsize; j++){
					if(path[i][0] == cyclePaths[p][j]){
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
