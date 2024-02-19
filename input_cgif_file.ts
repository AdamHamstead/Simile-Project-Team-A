let fname
import * as fs from 'fs'
const readline = require('readline');
async function input_cgif_file(fname){


    const fileStream = fs.createReadStream(fname);

        const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    
    
  }
}