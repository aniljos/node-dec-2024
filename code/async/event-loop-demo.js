import fs from 'node:fs';

console.log("App Started");

setTimeout(() => {
    console.log("timeout of 1 sec ")
}, 1000)

setTimeout(() => {
    console.log("timeout of 0 sec ")
}, 0)
setImmediate(() => {
    console.log("setImmediate 1")
})
setImmediate(() => {
    console.log("setImmediate 2")
})

process.nextTick(() => {
    console.log("process.nextTick microtask")
})

new Promise(resolve => resolve())
        .then(() => console.log("promise.then microtask"));

fs.writeFile("sample.txt", "Hello", () => {

    console.log("in i/o callback");

    setTimeout(() => {
        console.log("timeout of 0 sec ìn i/o callback")
    }, 0)

    setImmediate(() => {
        console.log("setImmediate in i/o callback 1")
    })
    setImmediate(() => {
        console.log("setImmediate in i/o callback 2")
    })

});



console.log("App over")

