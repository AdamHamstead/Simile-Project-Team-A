export let cpathsizes : number[] = [10000];

export let RELATION = 1;		//relation index of triple
export let TARGET = 2;		//target concept index of triple
export let ATTRIBUTE = 0;
export let TIMES = 0;
export let OBJECT = 0;
export let SOURCE = 0;
export let numReps = 0;
export let repeats: number[][] = [];
export let cyclepaths: number[][] = [];
//let cpathsizes: number[] = [];
export let numcpaths:number = 0; 
export let referents:string[];


export let triple: number[][] = [];


export let numtriples:number = 0;	
export let relation_labels: string[1000];


export let MAX_ROWS = 1000;
export let MAX_COLS = 1000;
//bool context[MAX_ROWS][MAX_COLS];
export let context: boolean[][];
export let concepts: string[];	//FCA formal object name = GC Target Concept

export let numconcepts = 0;
//let numtriples = 0;
//let triple: number[][] = [];
//let TARGET = 2;
export let input_concepts: number[] = [];
//let SOURCE = 0;
export let output_concepts: number[] = [];
export let numOutputs = 0;
export let numInputs = 0;
//let concepts: string[];