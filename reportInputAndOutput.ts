import * as fs from 'fs';
let numConcepts : number;
let numTriples : number;
const TARGET : number = 2;
const SOURCE : number = 0;

class triple
{
    private SourceConcept: string;
    private relation: string;
    private targetConcept: string;

    public constructor(SourceConcept: string, relation: string, targetConcept: string)
    {
        this.SourceConcept = SourceConcept;
        this.relation = relation;
        this.targetConcept = targetConcept;
    }
    
}
var triples = new Array(5000);
for(let i = 0; i < 5000; i++)
{
    var test = new triple("a","b","c");
    triples.push(test);

}

function reportInputAndOutputConcepts()
{
    
    for(let i = 0; i < numConcepts; i++)
    {
        var j : number = 0;
        for(j; j < numtriples; j++)
        {
        }
    }
}

reportInputAndOutputConcepts();