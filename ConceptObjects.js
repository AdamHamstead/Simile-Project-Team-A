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
    value;
    relationsnew = Array();
    visited = false;

    constructor(value)
    {
        this.value = value;
    }

    getValue()
    {
        return this.value;
    }

    AddRelation(relation)
    {
        this.relationsnew.push(relation);
    }

    isRelationsEmpty()
    {
        if(this.relationsnew.length = 0) return true 
        else return false
    }

    getVisited()
    {
        return this.visited;
    }

    setVisited()
    {
        this.visited = !this.visited;
    }

    searchEntry()
    {
        let path = [[]]
        let tempPath = []
        this.searchForCycleAndDirectPath(path, tempPath)
    }

    searchForCycleAndDirectPath(path, tempPath) //
    {
        this.relationsnew.forEach(element => //loop through all relations 
        {
            this.setVisited() //changes visited 

            if((element[0].getTarget()).getVisited()) //checks for cycles 
            {
                this.setVisited();
                tempPath.push("Cycle:");
                return element.getTarget().getValue();
            }
            else if (element.getTarget().isRelationsEmpty()) //checks for an output node as it wont have any connections
            {
                //depth search - have 2d array, at splits just get to the end of one and copy to next array 
                //then remove the ones til the split and then add the new ones to the end of that array
                this.setVisited();
                tempPath.push("Direct Path:")
                return;
            }
            else
            {
                let value = element.getTarget().searchForCycleAndDirectPath();
                if(this.value == value)
                {
                    return;
                }
                else
                {
                    tempPath.push(this.value);
                }
            }
        });
    }
}
export class Relation
{
    value;
    source;
    target;

    constructor(source, target, value)
    {
        this.source = source;
        this.target = target;
        this.value = value;
    }

    getSource()
    {
        return this.source;
    }
    
    getValue()
    {
        return this.value;
    }

    getTarget()
    {
        return this.target;
    }
}