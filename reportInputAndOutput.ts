class Concept
{
    private value: string;
    private relations = new Array<Relation>;

    public constructor(value:string)
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
}

class Relation
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
}

