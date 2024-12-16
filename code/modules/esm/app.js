
// default import
import calc from './math.js';
//named imports
import {add, multiply} from './math.js';

 console.log("in app.js");

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
console.log("fileName", __filename);
import {dirname} from 'path'
const __dirname = dirname(__filename);
console.log("dirName", __dirname);

console.log("math multiply", multiply(8, 3));
console.log("math add", add(8, 3));
console.log("math calc", calc(8, 3));

//async loading
import('./process.cjs')
            .then(processModule => {
                processModule.process();
            });



