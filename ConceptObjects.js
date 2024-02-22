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

    constructor(value)
    {
        this.value = value;
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
    
    getValue()
    {
        return this.value;
    }

    searchEntry()
    {
        let path = [[]]
        let tempPath = []
        this.searchForTarget(this.value, path, tempPath)
    }

    searchForTarget(sourceValue, path, tempPath) //# = cycle, | = direct path
    {
        this.relationsnew.forEach(element => //loop through all relations 
        {
            tempPath.push(element.getSource().getValue());

            if(element.getTarget().getValue() == sourceValue) //checks for cycles (if originalValue is the same as the value were on)
            {
                tempPath.push("|")
                path.push(tempPath);
                tempPath.pop();
                path.push(tempPath);
                tempPath = [];
            }
            else if (element.isRelationsEmpty()) //checks for an output node as it wont have any connections
            {
                //depth search - have 2d array, at splits just get to the end of one and copy to next array 
                //then remove the ones til the split and then add the new ones to the end of that array 
                tempPath.push("#")
                path.push(tempPath);
                tempPath.pop();
                path.push(tempPath);
                tempPath = [];
            }
            else
            {
                //should run searchfortarget recursively to find either direct paths or for loops
                element.getTarget().searchForTarget(sourceValue);
                path.slice(-1).pop(); //pops off already visited nodes. Makes sure nodes aren't visited twice.
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
    
    getValue()
    {
        return this.value
    }

    getTarget()
    {
        return this.target;
    }

    getSource()
    {
        return this.source
    }
}