import * as gb from './GlobalVariables'
import { Concept } from  './ConceptObjects'
import { Relation } from './ConceptObjects'


let foo: Concept = new Concept("foo");
let bar: Concept = new Concept("bar");
let foobar: Relation = new Relation(foo,bar,"foobar")

// export function target_already_in_pathway(target: number, path:number[][] ,pathSize: number){
//     var count = 0;
//     for (let p = 0; p<pathSize; p++){
//         if(target==path[p][0]) count++;
//     }
//     return count;
// }

function target_already_in_pathway_object(target: Concept, path: Concept[])
{
	var count = 0;
	for(let i = 0; i < path.length; i++)
	{
		if(target == path[i]) count++;
	}
	return count;
}

// export function is_output(target:number){
//     for (let i = 0; i < gb.numOutputs; i++){
//         if(target == gb.output_concepts[i]) return true;
//     }
//     return false;
// }

function is_output_object(target:Concept)
{
	for(let i = 0; i < gb.numOutputs; i++)
	{
		if(target == gb.output_concepts[i]) return true
	}
	return false
}

// export function is_input(attribute:number){
//     for(let i = 0; i < gb.numInputs; i++){
// 		if(gb.triple[attribute][gb.SOURCE] == gb.input_concepts[i]) return true;
// 	}
// 	return false;

// }

function is_input_object(concept:Concept){
    for(let i = 0; i < gb.numInputs; i++){
		if(concept == gb.input_concepts[i]) return true;
	}
	return false;
}

export function add_to_repeats(target: number, attribute: number){
	var i:number = 0;
	for(let i = 0; i < gb.numReps; i++){
		if(attribute == gb.repeats[i][gb.ATTRIBUTE] && target == gb.repeats[i][gb.OBJECT]){
			gb.repeats[i][gb.TIMES]++;
			break;
		}
	}
	if(i == gb.numReps){
		gb.repeats[gb.numReps][gb.ATTRIBUTE] = attribute;
		gb.repeats[gb.numReps][gb.OBJECT] = target;
		gb.repeats[gb.numReps][gb.TIMES] = 1;
		gb.setnumReps(gb.numReps + 1);
		//gb.numReps++;
	}
}

function add_to_repeats_objects(target: Concept, attribute:number)
{
	var i:number = 0;
	for(let i = 0; i < gb.numReps; i++){
		if(attribute == gb.repeats[i][gb.ATTRIBUTE] && target == gb.repeats[i][gb.OBJECT]){
			gb.repeats[i][gb.TIMES]++;
			break;
		}
	}
	if(i == gb.numReps){
		gb.repeats[gb.numReps][gb.ATTRIBUTE] = attribute;
		gb.repeats[gb.numReps][gb.OBJECT] = target;
		gb.repeats[gb.numReps][gb.TIMES] = 1;
		gb.setnumReps(gb.numReps + 1);
		//gb.numReps++;
	}
}

export function repeat_is_not_in_a_cycle(target:number, source:number){
	for(let p = 0; p < gb.numcpaths; p++){
		for(let i = 0; i < gb.cpathsizes[p]; i++){
			if(target == gb.cyclePaths[p][i]){
				for(let j = 0; j < gb.cpathsizes[p]; j++){
					if(source == gb.cyclePaths[p][j]) return false;
				}
			}
		}
	}
	return true;
}

export function is_new_cycle(path:number[][], pathsize:number){
	for(let p=0; p<gb.numcpaths; p++){
		if(pathsize == gb.cpathsizes[p]){
			var found = 0;
			for(let i = 0; i < pathsize; i++){
				for(let j = 0; j < pathsize; j++){
					if(path[i][0] == gb.cyclePaths[p][j]){
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