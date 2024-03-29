import * as gb from './GlobalVariables'
import * as csv from './input_csv_file'
import * as fs from 'fs'
import * as triplesBinaries from "./triples_to_binaries+add_binaries"
import * as cxt from "./Output_cxt_file" 
import * as concepts2 from "./reportInputAndOutputConcepts"

let fname:string;

main();
function main(){

	for(let p:number = 0; p < 100; p++) {
        gb.cpathsizes[p]=0; 
    }
	//cin >> fname;
	console.log("\n\nEnter cgif or delimiter separated triples file name including extension: ");

	fname = "buiness.csv";
	//find out if file is xml or csv format
	if(fname.substring( fname.length - 3 ) == "xml")
		console.log("XML");
	else
	csv.input_csv_file(fname);

	let pos:number = fname.indexOf(".");
	let rfname:string = fname.substring(0,pos);
	rfname+="_report.txt";
	//report_file.open(rfname);

    fs.writeFileSync(rfname, "Triples to Binaries Report for " + fname + "\n\n");

	concepts2.reportInputAndOuputConcepts(rfname); //writes data to report txt file

	triplesBinaries.triples_to_binaries(rfname);

	cxt.output_cxt_file(fname); //Can keep this just make sure it works the same with xml files
    console.log("\n\nHit <enter> to finish");

	//while ( !_kbhit()); //_kbhit just checks for a keyboard input to close program
}
process.exit();
