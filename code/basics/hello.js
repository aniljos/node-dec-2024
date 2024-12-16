// Hoisting
// var x = undefined, y=undefined

console.log("Hello World Node.js");

console.log("x", x); 
var x =  10; // module scope
console.log("x", x); 

var y; // module scope
console.log("y", y); 

//console.log("z", z);  Reference error

globalThis.a = 100; // global scope
console.log("global. a", globalThis.a); 

foo();

// the foo function is also hoisted
function foo(){
    // Hoisted: var a

    var a = 100; // function scope
    console.log("in foo", a);

    if( x >= 10){
        let msg = "Hello scopes";
        console.log("In foo msg: ", msg);
    }
    //console.log("In foo msg: ", msg); // reference error when use let/const 
}

console.log("App over");