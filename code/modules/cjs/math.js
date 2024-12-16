
console.log("in math.js");


var x = 10; //node.js module scope
function multiply(a, b){
    return a * b;
}

function add(a, b){
    return a + b;
}

module.exports = {
    add, multiply
}

console.log("math module", module);