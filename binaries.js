import * as fs from 'fs';
import { Concept } from './ConceptObjects.js';
import { Relation } from "./ConceptObjects.js";

//this file needs to convert all the triples (source, relation, target) to binaries (source-relation, target)
//mainly just used for outputting the cxt file as that is what is used in the original program.

export function triplesToBinariesEntry(container) //container[0] = roots, container[1] = triples
{
    let binaries = new Array();
    container.forEach(element => {
        element.forEach(root => {
            root.searchEntry(); //searches for all output nodes and cycles from every root
        });
    });

    container[2].foreach(element =>
        {
            let sourceRelationPair = element.getSource().getValue() + "-" + element.getValue(); //creates a sourceRelationPair 
            //called an attribute in the original program
            //unsure how to store these pairs as they need to be stored with their target. could store in diff arrays and match indexes?
            //need to create the FC which adds crosses in a table where the pairs and targets match. any targets that follow that target also add a match
            
        })
}