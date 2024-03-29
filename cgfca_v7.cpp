//Conceptual Graph to Formal Context Program: cgfca_v7.cpp
//
//Copyright (c) 2017 Simon Andrews, Sheffield Hallam University s.andrews@shu.ac.uk
//
//Converts .cgif files to .cxt files and reports CG features
//
//cgfca_v7.cpp is distributed under the following MIT 'permissive' free & open-source software license:
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in
//all copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//THE SOFTWARE.9899
//

/* A CG Target Concept becomes an FCA object								*/
/* A GC Source Concept concatenated with its GC relation					*/
/* becomes an FCA attribute													*/
/* Thus a CG (SourceConcept,relation,TargetConcept) triple becomes an FCA	*/
/* binary relation in the form ((SourceConcept^relation),TargetConcept)		*/
/* Indirect chaining forms the sub-concept/super-concept links			    */
/* in the FCA,maintaining the hierarchical dependencies in the CG.			*/
/*																			*/
/* cgfa accepts cgif files in its 'lite' format								*/
/* i. e. without the Charger visualisation information. 					*/

#include<iostream>
#include <fstream>
#include <conio.h>
#include <string>
using namespace std;

#define MAX_ROWS 1000	//Max rows (objects) in context
#define MAX_COLS 1000	//Max columns (attributes) in context
#define SOURCE 0		//source concept index of triple - in object
#define RELATION 1		//relation index of triple - in object
#define TARGET 2		//target concept index of triple - in object

//for recording and counting repeated binaries
#define ATTRIBUTE 0
#define OBJECT 1
#define TIMES 2

int triple[5000][3];		//SourceConcept|relation|TargetConcept		//Used literally everywhere - in object
int numtriples = 0;			//number of triples 

string referents[1000];	//CG Concept labels in cgif file - handled by object
string concepts[1000];	//FCA formal object name = GC Target Concept - handled by object

int numrelations = 0; //Is defined then never used?????????*

string relation_labels[1000]; // - handled by object
string relation_referent_lists[1000]; // - handled by object
int number_of_relations = 0;

int numconcepts = 0;	//number of FCA formal objects = number of CG Target Concepts

bool context[MAX_ROWS][MAX_COLS]; //FCA formal context			//Define in main pass through to the two functions that need it

string fname;			//cgif or csv file name
string rfname;			//report file name
string cfname;			//cxt file name			//None of these should be global

int cyclepaths[10000][10000]; //to record each cycle path
int cpathsizes[10000];
int numcpaths = 0;
int repeats[1000][3]; //ATTRIBUTE/OBJECT/TIMES
int numreps = 0;
int input_concepts[1000];
int numinputs = 0;
int output_concepts[1000];
int numoutputs = 0;

ofstream report_file; //ofstream for operating on files

//redo all varaibles so they're easier to read ie numOutputs or num_outputs not numoutputs**** and get rid of global varibales 

void main(){
	void input_cgif_file(string);
	void input_csv_file(string);
	void triples_to_binaries(void); //convert CG triples into FCA binary relations
	void reportInputAndOuputConcepts();
	void output_cxt_file(void);

	for(int p = 0; p < 100; p++) cpathsizes[p]=0; 

	cout << "\n\nEnter cgif or delimiter separated triples file name including extension: ";
	cin >> fname;

	//find out if file is cgif or csv format
	if(fname.substr( fname.length() - 3 ) == "gif")
		input_cgif_file(fname); //Rewrite this to intake xml files
	else
		input_csv_file(fname); //Can mostly leave this with csv files just rewrite for nodejs

	int pos = fname.find(".");
	rfname = fname.substr(0,pos);
	rfname+="_report.txt";
	report_file.open(rfname);

	report_file << "Triples to Binaries Report for " << fname << "\n\n";

	reportInputAndOuputConcepts(); //writes data to report txt file

	triples_to_binaries();

	output_cxt_file(); //Can keep this just make sure it works the same with xml files
	cout << "\n\nHit <enter> to finish";
	while ( !_kbhit()); //_kbhit just checks for a keyboard input to close program

	report_file.close();
}

void input_csv_file(string fname){  //done by sinead
	int find_concept(string);
	int find_relation(string);

	ifstream csvfile;
	csvfile.open(fname);

	if(csvfile.fail()){
		cout << "file does not exist!";
		cout << "\nHit <enter> to finish";
		while ( !_kbhit());
		exit(0);
	}

	string line, source, relation, target;
	string soreltar[3]; //Source, Relation, Target - naming of this variable is horrible
	int n = 0;
	char charline[1024];
	char a;
	bool escaped = false;

	char delim;  //For Delimiter
	cout << "\nEnter delimiter character (enter t if delimiter is the tab character, enter s if delimiter is the space character):";
	cin >> delim;
	if (delim == 't')delim = '\t';
	if (delim == 's')delim = ' ';

	while (getline(csvfile, line, '\n')) // read whole line into line
	{
		strcpy(charline, line.c_str());

		n = 0;
		escaped = false;
		soreltar[0] = "";
		soreltar[1] = "";
		soreltar[2] = "";

		//extract source, relation and target from csv line
		for(int i=0; i < strlen(charline); i++){
			a = line[i];
			if(a=='"' && !escaped) {
				escaped = true;
			}
			else {
				if(a=='"' && escaped){
					escaped = false;
				}
				else {
					if(a==delim && !escaped){
						n++;
					}
					else{
						soreltar[n] = soreltar[n] + a;
					}
				}
			}
		}

		source = soreltar[0];
		relation = soreltar[1];
		target = soreltar[2];

		/*int pos = line.find(',');
		source = line.substr(0,pos);
		line = line.substr(pos+1,string::npos);
		pos = line.find(',');
		relation = line.substr(0,pos);
		target = line.substr(pos+1,string::npos);*/

		/* CREATE CONCEPT AND RELATION LISTS AND CREATE TRIPLES */
		int pos = find_concept(source);
		if(pos == -1){
			//add new concept to list
			pos = numconcepts;
			concepts[numconcepts++] = source;
		}
		triple[numtriples][0] = pos;

		pos = find_relation(relation);
		if(pos == -1){
			//add new relation to list
			pos = number_of_relations;
			relation_labels[number_of_relations++] = relation;
		}
		triple[numtriples][1] = pos;

		pos = find_concept(target);
		if(pos == -1){
			//add new concept to list
			pos = numconcepts;
			concepts[numconcepts++] = target;
		}
		triple[numtriples++][2] = pos;
	}
	/*for(int i = 0; i<numtriples; i++){
		cout << triple[i][0] << " " << triple[i][1] << " " << triple[i][2] << "\n";
	}
		while ( !_kbhit());*/
}

int find_concept(string concept){  //doing by daniel
	int pos = -1;
	for(int i = 0; i < numconcepts; i++){
		if(concept == concepts[i]){
			pos = i;
			break;
		}
	}
	return(pos);
}

int find_relation(string relation){ //doing by daniel
	int pos = -1;
	for(int i = 0; i < number_of_relations; i++){
		if(relation == relation_labels[i]){
			pos = i;
			break;
		}
	}
	return(pos);
}

void input_cgif_file(string fname){ //Need to rewrite this for xml files
	void extractCGconceptTypeLabelandReferent(string type_and_referent);
	void makeTriples(int rel, string ref_list);

	ifstream cgifFile;

	cgifFile.open(fname);

	if(cgifFile.fail()){
		cout << "file does not exist!";
		cout << "\nHit <enter> to finish";
		while ( !_kbhit());
		exit(0);
	}

	//get CG Concept names & labels (CG Target Concepts become FCA formal objects)
	string cgconcepts;
	getline(cgifFile,cgconcepts,'\n');
	int start =  cgconcepts.find('[');
	int end = cgconcepts.find(']');
	while(start!=string::npos){
		string type_and_referent = cgconcepts.substr(start+1,end-start-1);
		extractCGconceptTypeLabelandReferent(type_and_referent);
		cgconcepts = cgconcepts.substr(end+1);
		start =  cgconcepts.find('[');
		end = cgconcepts.find(']');
	}

	//extract relation labels and their lists of concept referents
	string cgrelations;
	getline(cgifFile,cgrelations,'\n');
	start =  cgrelations.find('(');
	end = cgrelations.find(')');
	while(start!=string::npos){
		string crelation = cgrelations.substr(start+1,end-start-1);
		int end_of_label = crelation.find(' ');
		relation_labels[number_of_relations] = crelation.substr(0,end_of_label);
		relation_referent_lists[number_of_relations++] = crelation.substr(end_of_label+1);
		cgrelations = cgrelations.substr(end+1);
		start =  cgrelations.find('(');
		end = cgrelations.find(')');
	}

	//find co-referent relations (removing redundant copies)
	string co_ref_labels[50];
	for(int rel = 0; rel < number_of_relations; rel++){
		int num_co_ref_labels = 0;
		string ref_list = relation_referent_lists[rel];
		for(int rel2 = rel+1; rel2 < number_of_relations; rel2++){
			if(ref_list.compare(relation_referent_lists[rel2])==0){
				co_ref_labels[num_co_ref_labels++]=relation_labels[rel2];
				for(int rel3 = rel2; rel3 < number_of_relations-1; rel3++){
					relation_labels[rel3]=relation_labels[rel3+1];
					relation_referent_lists[rel3]=relation_referent_lists[rel3+1];
				}
				number_of_relations--;
				rel2--;
			}
		}

		//concatenate distinct co-referent relation labels
		co_ref_labels[num_co_ref_labels++] = relation_labels[rel];
		relation_labels[rel] = "";
		for(int coref = 0; coref < num_co_ref_labels; coref++){
			//if new relation label
			int i;
			for(i = 0; i < coref; i++){
				if(co_ref_labels[coref].compare(co_ref_labels[i])==0) break;
			}
			if(i==coref){
				if(coref==0){
					relation_labels[rel] = co_ref_labels[coref];
				}
				else{
					relation_labels[rel] = relation_labels[rel] + ';' + co_ref_labels[coref];
				}
			}
		}
		makeTriples(rel, relation_referent_lists[rel]);
	}
	cgifFile.close();
}


void makeTriples(int rel, string ref_list){ //DONE
	int i=0; //index for ref_list (pointer to each char in the string)

	string referent=""; //reset CG Concept referent
	int numSourceConsInRelation=0;
	int SourceConceptIndex[100]; //lookup indexes for source concepts
	while(i < ref_list.length()){
		if(ref_list[i]!=' '){
			referent+=ref_list[i];
		}
		else { //a space indicates end of a referent, so find the corresponding cg source concept
			int j = 0;
			while(j<numconcepts){
				if(referents[j]==referent){
					int k;
					//check for a repeated source concept
					for(k = 0; k < numSourceConsInRelation; k++){
						if(SourceConceptIndex[k]==j) break;
					}
					if(k==numSourceConsInRelation){
						SourceConceptIndex[numSourceConsInRelation++]=j;
						break;
					}
				}
				j++;
			}
			referent=""; //reset CG Concept referent
		}
		i++;
	}

	int TargetConceptIndex;
	int j = 0;
	while(j<numconcepts){
		if(referents[j]==referent){
			TargetConceptIndex=j;
			break;
		}
		j++;
	}

	for(int i=0;i<numSourceConsInRelation;i++){
		triple[numtriples][SOURCE]=SourceConceptIndex[i];
		triple[numtriples][RELATION]=rel;
		triple[numtriples][TARGET]=TargetConceptIndex;
		numtriples++;
	}
}

void reportInputAndOuputConcepts(){ //Creates and writes to the report.txt file //DONE
	/*int input_concepts[1000];
	int numinputs = 0;
	int output_concepts[1000];
	int numoutputs = 0;*/

	//find input concepts (the start nodes)
	for(int i=0; i < numconcepts; i++){
		int j;
		for(j = 0; j < numtriples; j++){
			if(i == triple[j][TARGET]) break;
		}
		if(j == numtriples){
			input_concepts[numinputs++]=i;
		}
	}

	//find output concepts (the end nodes)
	for(int i=0; i < numconcepts; i++){
		int j;
		for(j = 0; j < numtriples; j++){
			if(i == triple[j][SOURCE]) break;
		}
		if(j == numtriples){
			output_concepts[numoutputs++]=i; //Globab Variables...
		}
	}

	//report input concepts
	if(numinputs==0){
		cout << "\n\nThere are no inputs.";
		report_file << "\n\nThere are no inputs.";
	}
	else {
		cout << "\n\nInputs: ";
		report_file << "\n\nInputs: ";
		for(int i = 0; i < numinputs; i++){
			cout << '\"' << concepts[input_concepts[i]] << "\" ";
			report_file << '\"' << concepts[input_concepts[i]] << "\" "; //More glabal variables...
		}
	}

	//report output concepts
	if(numoutputs==0){
		cout << "\n\nThere are no outputs.";
		report_file << "\n\nThere are no outputs.";
	}
	else {
		cout << "\n\nOutputs: ";
		report_file << "\n\nOutputs: ";
		for(int i = 0; i < numoutputs; i++) {
			cout << '\"' << concepts[output_concepts[i]] << "\" ";  ////even more global variables...
			report_file << '\"' << concepts[output_concepts[i]] << "\" ";  
		}
	}
}


void extractCGconceptTypeLabelandReferent(string type_and_referent){ //only called from input_cgif_file - which we're redoing for xml
	int searchforreferent(string);

	int startofreferent = type_and_referent.find(":", 0);
	string typelabel = type_and_referent.substr(0,startofreferent);
	string referent = type_and_referent.substr(startofreferent+2);
	if(referent[0]=='*' || referent[0]=='?'){ //if the referent is a generic referent
		referent[0]='?';
		int pos = searchforreferent(referent); //search for co-referent
		if(pos == numconcepts){	//if no co-referent, then add new concept
			referents[numconcepts]=referent;
			concepts[numconcepts]=typelabel;
			numconcepts++;
		}
		else{ //if there is a co-referent, concattenate concept type labels if they are different
				//unpick coreferent type labels from current possibly concatenatned type labels
				int numcorefs = 0;
				string corefs[20]; //max 20 differently named corefs!
				for(int x=0; x<20; x++) corefs[x]="";
				char con[200];
				strcpy(con,concepts[pos].c_str());
				int p;
				for(p=0; p<concepts[pos].length(); p++){
					if(con[p] != ';')
						corefs[numcorefs].append(1,con[p]);
					else
						numcorefs++;
				}
				numcorefs++;
				for(p=0; p<numcorefs; p++)
					if(typelabel.compare(corefs[p])==0) break;
				if(p==numcorefs){
					char con[200];
					strcpy(con,concepts[pos].c_str());
					char typlbl[200];
					strcpy(typlbl,typelabel.c_str());
					strcat(typlbl,";");
					concepts[pos] = strcat(typlbl,con);
				}
			}
	}
	else //if there is an indivdual referent
		if(referent[0]!='?'){
			int pos = searchforreferent(referent); //seach for co-referent
			if(pos == numconcepts){ //if no co-referent, then add new concept
				concepts[numconcepts]=type_and_referent;
				referents[numconcepts]=referent;
				numconcepts++;
			}
			else{ //if there is a co-referent, concattenate concept type labels if they are different
				//unpick coreferent type labels from current possibly concatenatned type labels
				int numcorefs = 0;
				string corefs[20]; //max 20 differently named corefs!
				for(int x=0; x<20; x++) corefs[x]="";
				char con[200];
				strcpy(con,concepts[pos].c_str());
				int p;
				for(p=0; p<concepts[pos].length(); p++){
					if(con[p] != ';' && con[p] != ':')
						corefs[numcorefs].append(1,con[p]);
					else if(con[p] == ':'){
						numcorefs++;
						break;
					}
					else
						numcorefs++;
				}
				for(p=0; p<numcorefs; p++)
					if(typelabel.compare(corefs[p])==0) break;
				if(p==numcorefs){
					char con[200];
					strcpy(con,concepts[pos].c_str());
					char typlbl[200];
					strcpy(typlbl,typelabel.c_str());
					strcat(typlbl,";");
					concepts[pos] = strcat(typlbl,con);
				}
			}
		}
}

int searchforreferent(string referent) //DONE
{
	int pos;
	for(pos = 0; pos<numconcepts; pos++)
	{
		if(referent.compare(referents[pos]) == 0) break;
	}
	return pos;
}

void triples_to_binaries(){ //DONE
	void add_binary(int, int, int, int, int[][2], int);

	int path[100000][2]; //to record each transitive path through triples
	int pathsize = 0;

	//converts (source,relation,target) triples to ((source^relation),target) binary relations
	for(int attribute=0;attribute<numtriples;attribute++){
		int target = triple[attribute][TARGET];
		int relation = triple[attribute][RELATION];
		int source = triple[attribute][SOURCE];

		add_binary(attribute, source, relation, target, path, pathsize);
	}


	//output repeats
	for(int i = 0; i < numreps; i++){
		int source = triple[repeats[i][ATTRIBUTE]][SOURCE];
		int relation = triple[repeats[i][ATTRIBUTE]][RELATION];
		int output = repeats[i][OBJECT];
		int target = triple[repeats[i][ATTRIBUTE]][TARGET];
		int times = repeats[i][TIMES] + 1;
		cout << "\n\n" << times << " direct pathways from \"" << concepts[source] << " - " << relation_labels[relation] << " - " << concepts[target] << "\" to \"" << concepts[output] << "\"";
		report_file <<"\n\n " << times << " direct pathways from \"" << concepts[source] << " - " << relation_labels[relation] << " - " << concepts[target] << "\" to \"" << concepts[output] << "\"";
	}
}


void add_binary(int attribute, int source, int relation, int target, int path[][2], int pathsize) { //DONE

	bool is_new_cycle(int[][2], int);
	bool repeat_is_not_in_a_cycle(int, int);
	void add_to_repeats(int target, int attribute);
	bool is_output(int target);
	bool is_input(int attribute);
	int target_already_in_pathway(int target, int path[][2], int pathsize);
	bool source_relation_already_in_pathway(int source, int relation, int path[][2], int pathsize);
	bool in_a_spin(int path[][2], int pathsize);
	bool source_relation_already_in_pathway_twice(int source, int relation, int path[][2], int pathsize);

	//if(!source_relation_already_in_pathway(source, relation, path, pathsize)){

	//cout << source << '\t' << relation << '\t' << target << '\n';

	//add source and relation to current pathway
	path[pathsize][0] = source;
	path[pathsize][1] = relation;
	pathsize++;

	//repeated output targets
	if (context[target][attribute] == true) {
		if (repeat_is_not_in_a_cycle(target, triple[attribute][SOURCE])) {
			if (is_output(target) && is_input(attribute)) {
				add_to_repeats(target, attribute);
			}
		}
	}
	else {

		//add a cross in the formal context for the attribute and target (object)
		context[target][attribute] = true;

		//if object is an output and attribute involves an input then report pathway
		if (is_output(target) && is_input(attribute)) {
			cout << "\n\nDirect Pathway: ";
			report_file << "\n\nDirect Pathway: ";
			for (int p = 0; p < pathsize; p++) {
				cout << concepts[path[p][0]] << " - " << relation_labels[path[p][1]] << " - ";
				report_file << concepts[path[p][0]] << " - " << relation_labels[path[p][1]] << " - ";
			}
			cout << concepts[target];
			report_file << concepts[target];
		}

		//if(source==target){
		if (triple[attribute][SOURCE] == target) { //if source is its own target, its a cycle!
			if (is_new_cycle(path, pathsize)) {
				cpathsizes[numcpaths] = pathsize;
				cout << "\n\nCycle: ";
				report_file << "\n\nCycle: ";
				for (int p = 0; p < pathsize; p++) {
					cout << concepts[path[p][0]] << " - " << relation_labels[path[p][1]] << " - ";
					report_file << concepts[path[p][0]] << " - " << relation_labels[path[p][1]] << " - ";
					cyclepaths[numcpaths][p] = path[p][0];
				}
				cout << concepts[path[0][0]];
				report_file << concepts[path[0][0]];
				numcpaths++;
			}
		}

		if (!target_already_in_pathway(target, path, pathsize)) {
			for (int k = 0; k < numtriples; k++) {
				if (target == triple[k][SOURCE]) {
					add_binary(attribute, triple[k][SOURCE], triple[k][RELATION], triple[k][TARGET], path, pathsize);
				}
			}
		}
	}
}

//bool source_relation_already_in_pathway_twice(int source, int relation, int path[][2], int pathsize){
//	int count = 0;
//	for(int p=0; p<pathsize; p++){
//		if(path[p][0]==source && path[p][1]==relation) count++;
//	}
//	if(count==3)
//		return true;
//	else
//		return false;
//}

//bool in_a_spin(int path[][2], int pathsize){
//	for(int n = 1; n <= pathsize/2; n++){
//		int count = 0;
//		for(int p = pathsize-1; p >= pathsize-n; p--){
//			if(path[p][0]==path[p-n][0] && path[p][1]==path[p-n][1]) count++;
//		}
//		if(count==n) return true;
//	}
//	return false;
//}

//bool source_relation_already_in_pathway(int source, int relation, int path[][2], int pathsize){
//	for(int p=0; p<pathsize; p++){
//		if(path[p][0]==source && path[p][1]==relation) return true;
//	}
//	return false;
//}

int target_already_in_pathway(int target, int path[][2], int pathsize){ //DONE
	int count = 0;
	for(int p=0; p<pathsize; p++){
		if(target==path[p][0]) count++;
	}
	return count;
}

bool is_output(int target){ //DONE
	for(int i=0; i<numoutputs; i++){
		if(target == output_concepts[i]) return true;
	}
	return false;
}

bool is_input(int attribute){ //DONE
	for(int i=0; i<numinputs; i++){
		if(triple[attribute][SOURCE] == input_concepts[i]) return true;
	}
	return false;
}

void add_to_repeats(int target, int attribute){ //DONE
	int i;
	for(i = 0; i < numreps; i++){
		if(attribute == repeats[i][ATTRIBUTE] && target == repeats[i][OBJECT]){
			repeats[i][TIMES]++;
			break;
		}
	}
	if(i == numreps){
		repeats[numreps][ATTRIBUTE] = attribute;
		repeats[numreps][OBJECT] = target;
		repeats[numreps][TIMES] = 1;
		numreps++;
	}

}

bool repeat_is_not_in_a_cycle(int target, int source){ //DONE
	for(int p=0; p<numcpaths; p++){
		for(int i = 0; i < cpathsizes[p]; i++){
			if(target == cyclepaths[p][i]){
				for(int j = 0; j < cpathsizes[p]; j++){
					if(source == cyclepaths[p][j]) return false;
				}
			}
		}
	}
	return true;
}

bool is_new_cycle(int path[][2], int pathsize){ //DONE
	for(int p=0; p<numcpaths; p++){
		if(pathsize == cpathsizes[p]){
			int found = 0;
			for(int i = 0; i < pathsize; i++){
				for(int j = 0; j < pathsize; j++){
					if(path[i][0] == cyclepaths[p][j]){
						found++;
						//this break is to avoid double-counting of a CG concept if it appears more than once in the cycle
						//this is possible if a concept is at the cross-roads of a figure-of-eight cycle, for example.
						break;
					}
				}
			}
			if(found == pathsize) return false;
		}
	}
	return true;
}

//bool is_new_cycle(int path[][2], int pathsize){
//	for(int p=0; p<numcpaths; p++){
//		//if(pathsize == cpathsizes[p]){
//			int found = 0;
//			for(int i = 0; i < pathsize; i++){
//				for(int j = 0; j < cpathsizes[p]; j++){
//					if(path[i][0] == cyclepaths[p][j]){
//						found++;
//						//this break is to avoid double-counting of a CG concept if it appears more than once in the cycle
//						//this is possible if a concept is at the cross-roads of a figure-of-eight cycle, for example.
//						break;
//					}
//				}
//			}
//			if(found == pathsize) return false;
//		//}
//	}
//	return true;
//}


void output_cxt_file() {  //Just makes cxt file dont need to change much exept global variables //DONE
	int pos = fname.find(".");
	cfname = fname.substr(0,pos);
	cfname+=".cxt";
	ofstream outcxt;
	outcxt.open(cfname);
	outcxt << "B\n\n";
	outcxt << numconcepts << "\n";
	outcxt << numtriples << "\n\n";
	for(int i=0;i<numconcepts;i++)
		outcxt << concepts[i] << "\n";

	for(int j=0;j<numtriples;j++)
		outcxt << concepts[triple[j][SOURCE]] << " " << relation_labels[triple[j][RELATION]] << "\n";

	for(int i=0;i<numconcepts;i++){
		for(int j=0;j<numtriples;j++){
			if(context[i][j])outcxt << "X";
			else outcxt << ".";
		}
		outcxt << "\n";
	}
	outcxt.close();
}
