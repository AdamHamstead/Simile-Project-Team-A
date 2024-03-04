import * as fs from 'fs';
import { Concept } from './ConceptObjects.js';
import { Relation } from "./ConceptObjects.js";

export function triplesToBinariesEntry(container)
{
    container.forEach(element => {
        element.searchEntry();
    });

}