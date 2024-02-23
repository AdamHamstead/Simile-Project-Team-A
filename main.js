import * as XML from './XMLparser.js'
import * as binary from './binaries.js'
import promptSync from 'prompt-sync';
const prompt = promptSync();
main()
function main()
{
    var source = prompt('What is your filename');
    let container = [[],[]]
    container = XML.XMLParserEntry(source);
    binary.triplesToBinariesEntry(container);
    
}