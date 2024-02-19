var number_of_relations: number = 0;
var numconcepts: number = 0;
var concepts: string;
var relation_labels: string;

function find_concept(concept: string): number{
    let pos: number = -1;
	for(let i: number = 0; i < numconcepts; i++){
		if(concept == concepts[i]){
			pos = i;
			break;
		}
	}
	return(pos);
}

function find_relation(relation: string): number{
    let pos: number = -1;
	for(let i: number = 0; i < number_of_relations; i++){
		if(relation == relation_labels[i]){
			pos = i;
			break;
		}
	}
	return(pos);
}
