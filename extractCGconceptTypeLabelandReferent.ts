let numconcepts=0;
let referents;	//CG Concept labels in cgif file
let concepts;	//FCA formal object name = GC Target Concept

function extractCGconceptTypeLabelandReferent(type_and_referent){

	let startofreferent = type_and_referent.find(":", 0);
	let typelabel = type_and_referent.substr(0,startofreferent);
	let referent = type_and_referent.substr(startofreferent+2);
	if(referent[0]=='*' || referent[0]=='?'){ //if the referent is a generic referent
		referent[0]='?';
		let pos = searchforreferent(referent); //search for co-referent
		if(pos == numconcepts){	//if no co-referent, then add new concept
			referents[numconcepts]=referent;
			concepts[numconcepts]=typelabel;
			numconcepts++;
		}
		else{ //if there is a co-referent, concattenate concept type labels if they are different
				//unpick coreferent type labels from current possibly concatenatned type labels
				let numcorefs = 0;
				let corefs; //max 20 differently named corefs!
				for(let x=0; x<20; x++) corefs[x]="";
				    let con;

                concepts = concepts.slice(pos) + con+concepts.slice(pos+1)
				let p;
				for(p=0; p<concepts[pos].length(); p++){
					if(con[p] != ';')
						corefs[numcorefs].append(1,con[p]);
					else
						numcorefs++;
				}
				numcorefs++;
                for (let p = 0; p < numcorefs; p++) {
                    if (typelabel === corefs[p]) {
                        break;
                    }
                }
                
                if (p === numcorefs) {
                    let con: string = concepts[pos];
                    let typlbl: string = typelabel + ";";
                    concepts[pos] = typlbl + con;
                }
			}
	}
	else //if there is an indivdual referent
		if(referent[0]!='?'){
			let pos = searchforreferent(referent); //seach for co-referent
			if(pos == numconcepts){ //if no co-referent, then add new concept
				concepts[numconcepts]=type_and_referent;
				referents[numconcepts]=referent;
				numconcepts++;
			}
			else{ //if there is a co-referent, concattenate concept type labels if they are different
				//unpick coreferent type labels from current possibly concatenatned type labels
				let numcorefs = 0;
				let corefs; //max 20 differently named corefs!
				for(let x=0; x<20; x++) corefs[x]="";
				let con;
                concepts = concepts.slice(pos) + con+concepts.slice(pos+1)
				let p;
				for(p=0; p<concepts[pos].length(); p++){
					if(con[p] != ';' && con[p] != ':')
						corefs[numcorefs].append(1,con[p]);
					else if(con[p] == ':'){
						numcorefs++;
						break;
					}
					else
						numcorefs++;
				}
                for (let p = 0; p < numcorefs; p++) {
                    if (typelabel === corefs[p]) {
                        break;
                    }
                }
                
                if (p === numcorefs) {
                    let con: string = concepts[pos];
                    let typlbl: string = typelabel + ";";
                    concepts[pos] = typlbl + con;
                }
			
			}
		}

}
function searchforreferent(referent)
{
	let pos=0;
	for(pos = 0; pos<numconcepts; pos++)
	{
		if(referent.compare(referents[pos]) == 0) break;
	}
	return pos;
}