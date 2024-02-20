export let cpathsizes : number[] = [10000];

export let RELATION = 1;		//relation index of triple
export let TARGET = 2;		//target concept index of triple
export let ATTRIBUTE = 0;
export let TIMES = 0;
export let OBJECT = 0;
export let SOURCE = 0;
export let numReps = 0;

export function setnumReps(value:number){
    numReps = value;
}


export let repeats: number[][] = Array.from(Array(10000), () => new Array(3).fill(0));
//export let cyclePaths: number[][] = [];
export let cyclePaths: number[][] = Array.from(Array(10000), () => new Array(10000).fill(0));

//let cpathsizes: number[] = [];
export let numcpaths:number = 0; 
export let referents:string[];

export function setnumcpaths(value:number){
    numcpaths = value;
}


//export let triple: number[][];
//let triple: number[][] = [];
//export let triple: number[][] = [[5000],[3]];

export let triple: number[][] = Array.from(Array(5000), () => new Array(3).fill(0));


export let numtriples:number = 0;	

export function setnumtriples(value:number){
    console.log(numtriples);
    numtriples = value;
}
export let relation_labels: string[] = new Array(1000);

export function setrelationlabels(value:string, index:number){
relation_labels[index] = value;
}


export let MAX_ROWS = 1000;
export let MAX_COLS = 1000;
//bool context[MAX_ROWS][MAX_COLS];
//export let context: boolean[][];
export let context: boolean[][] = Array.from(Array(MAX_ROWS), () => new Array(MAX_COLS).fill(0));

export let concepts: string[] = new Array(1000);	//FCA formal object name = GC Target Concept

export function setconcepts(value:string, index:number){
    concepts[index] = value;
}


export let numconcepts = 0;

export function setnumconcepts(value:number){
    numconcepts = value;
}
//let numtriples = 0;
//let TARGET = 2;
export let input_concepts: number[] = [];
//let SOURCE = 0;
export let output_concepts: number[] = [];
export let numOutputs = 0;
export let numInputs = 0;

export function setnumInputs(value:number){
    numInputs = value;
}

export function setnumOutputs(value:number){
    numOutputs = value;
}
//let concepts: string[];



//var cyclepaths : number = [10000][10000]; //to record each cycle path
//var numcpaths : number = 0;
//var numtriples: number = 0;
//let context: boolean[][];
//var relation_labels: string;
//var concepts: string;
//var numconcepts: number = 0;


//let SOURCE = 0		//source concept index of triple - in object
//let RELATION = 1		//relation index of triple - in object

//let ATTRIBUTE = 0;
//let TIMES = 0;
//let OBJECT = 0;
//let SOURCE = 0;

//let numInputs = 0;
//let numReps = 0;
//let numcpaths = 0; 
//let output_concepts: number[] = [];
//let repeats: number[][] = [];
//let cyclePaths: number[][] = [];
//let cpathSizes: number[] = [];

//let input_concepts: number[] = [];
//let triple: number[][] = [];

export let number_of_relations: number = 0;

export function setnumber_of_relations(value:number){
    number_of_relations = value;
}
