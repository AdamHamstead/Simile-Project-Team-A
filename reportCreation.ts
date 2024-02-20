import { Concept, Relation } from './ConceptObjects';
import * as fs from 'fs';

function writeConcepts(InputConcepts : Concept[][])
{
    var concepts : string="";
    for(let i = 0; i < InputConcepts[0].length; i++)
    {
        for(let j = 0; j < InputConcepts[1].length; j++)
        {
            concepts + InputConcepts[i][j].getValue();
        }
        fs.writeFileSync("./report.txt", concepts);
    }
}

function WriteCycle()
{

}

function DirectPathway()
{
    
}


