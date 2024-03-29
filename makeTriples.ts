import * as gb from './GlobalVariables'

function makeTriples(rel: number, ref_list: string): void {

	let referent = "" // CG concept referent
	let numSourceConcInRelation = 0
	let sourceConceptIndex = [100]
	for(let i = 0; i < ref_list.length; i++) {
		if(ref_list[i]!=' '){ // spaces
			referent += ref_list[i]
		}
		else { // space indicates end of a referent - find the corresponding cg source concept
			for(let j = 0; j < numconcepts; j++) {
				if(gb.referents[j] == referent) {
					let k: number;
					// check for a repeated source concept
					for(k = 0; k < numSourceConcInRelation; k++) {
						if(sourceConceptIndex[k] == j) {
							break
						}
					}
					if(k == numSourceConcInRelation){
						sourceConceptIndex[numSourceConcInRelation++] = j
						break
					}
				}
			}
			referent = "" // reset CG concept referent
		}
	}

	let targetConceptIndex
	for(let j = 0; j < numconcepts; j++) {
		if(gb.referents[j] == referent) {
			targetConceptIndex = j
			break
		}
	}

	for(let i = 0; i < numSourceConcInRelation; i++) {
		gb.triple[gb.numtriples][gb.SOURCE]=sourceConceptIndex[i]
		gb.triple[gb.numtriples][gb.RELATION]=rel
		gb.triple[gb.numtriples][gb.TARGET]=targetConceptIndex
		gb.numtriples++;
	}
}
