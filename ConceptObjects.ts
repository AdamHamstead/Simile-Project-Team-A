/* 
    These are mainly to replace the triples. Instead of a 2d array storing the values, we can have the objects do it.

    Source Concept -> relation(s) -> Target Concept

    Concept - similar to a node in a graph. Basically stores all data about the concept itself (e.g Cat: Bumbles). They also
    store an array of Relation objects which connect them to other concepts. Generally most functions will probably go into
    this Obejct.

    Relation - similar to an edge in a graph. Stores the source concept, target concept (both concept objects and the value of that relation 
    (e.g sits on). Don't expect many functions to be included in these relations. 

    Add any functions you think will be useful and explain why you are using them in comments as best you can. We want these to basically 
    replace most helper functions and global variables (but it wont get them all).

*/

export class Concept
{
    private value: string;
    private relations = new Array<Relation>;

    public constructor(value:string) //Don't really want to change the constructor, the concept object just wants to keep track of a value and its relations
    {
        this.value = value;
    }

    public AddRelation(relation: Relation)
    {
        this.relations.push(relation);
    }
    
    public getValue()
    {
        return this.value;
    }

    public searchForTarget(value: string)
    {
        this.relations.forEach(element => //loop through all relations 
        {
            if(element.getTarget().getValue() == value) //gets the value of the target at that relation
            {
                return element.getTarget() //if value matches, returns that target
            }
            else
            {
                element.getTarget().searchForTarget(value); 
                //else calls the function on the target
            }
        });
    }

    //Does same thing as searchForTarget
    /*public find_relation(relation: string): number{
        for(let i: number = 0; i < this.numberOfRelations; i++){
            if(relation == this.relationLabels[i]){
                this.position = i;
                break;
            }
        }
        return(this.position);
    }*/

    //Does same thing as searchForTarget maybe???
    // public find_concept(concept: string): number{
    //     for(let i: number = 0; i < this.numberOfConcepts; i++){
    //         if(concept == this.relations[i].toString()){
    //             this.position = i;
    //             break;
    //         }
    //     }
    //     return(this.position);
    // }

}

export class Relation
{
    private value: string;
    private source: Concept;
    private target: Concept;

    public constructor(source: Concept, target: Concept, value: string)
    {
        this.source = source;
        this.target = target;
        this.value = value;
    }
    
    public getValue()
    {
        return this.value
    }

    public getTarget()
    {
        return this.target;
    }

    public getSource()
    {
        return this.source
    }
    
}


