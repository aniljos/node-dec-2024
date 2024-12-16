
const math = require('./math');
console.log("in app.js");


console.log("fileName", __filename);
console.log("dirName", __dirname);
console.log("module", module);
var x = 10; //node.js module scope

console.log("math multiply", math.multiply(3, 4));
console.log("math add", math.add(3, 4));

import('./process.mjs')
        .then(processModule => {
            processModule.process();
        })