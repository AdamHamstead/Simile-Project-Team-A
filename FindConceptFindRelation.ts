import * as gb from './GlobalVariables';

//var number_of_relations: number = 0;
//var numconcepts: number = 0;
//var concepts: string;
//var relation_labels: string;

export function find_concept(concept: string): number{
    let pos: number = -1;
	for(let i: number = 0; i < gb.numconcepts; i++){
		if(concept == gb.concepts[i]){
			pos = i;
			break;
		}
	}
	return(pos);
}

export function find_relation(relation: string): number{
    let pos: number = -1;
	for(let i: number = 0; i < gb.number_of_relations; i++){
		if(relation == gb.relation_labels[i]){
			pos = i;
			break;
		}
	}
	return(pos);
}
