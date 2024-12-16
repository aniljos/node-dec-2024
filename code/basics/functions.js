// Functions 
// 	there is no function overloading, its always overriding
//  implicit args: this, arguments : implicit args are not applicable to arrow functions
// explicit args: passed to the argument list

//function declaration

// function sum(){
//     console.log("in sum no args...");
// }

console.log(this);
function sum(x, y){
    console.log("in sum...", arguments);
}
sum(3, 4);
sum(3, 4, 5, 6);
sum();

//function expression
const add  = function addNumbers(x, y){
    console.log("in add function expression...");
    return x + y;
}
console.log("add", add(3, 4));

//arrow function
const calc = (x, y) => {
    console.log("in call arrow function...");
    return x + y;
}
console.log("calc", calc(3, 4));

//functional programming
const numbers = [2, 7, 9, 12, 17, 10, 5];
// filter and get all the even numbers and calculate the square.

// const results = numbers
//                     .filter(function(item){ return item % 2 === 0})
//                     .map(function(item){ return item * item});
const results = numbers
                    .filter(item =>  item % 2 === 0)
                    .map(item => item * item);
console.log("results", results);

let obj = {
    id: 100,
    print: function(){
        console.log("id: ", this.id);
        var _this  = this;
        setTimeout(function(){
            console.log("id after 2 secs: ", _this.id);
        }, 2000);
        setTimeout(()=>{
            console.log("id after 2 secs: ", this.id);
        }, 2000);
    }
}

obj.print();



