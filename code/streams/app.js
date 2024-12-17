const fs = require('fs');
console.log("Streams application");



// process.stdin.on("data", (input) => {
//     console.log("The user inputted: ",   input.toString());

//     if(input.toString().trim() === "exit"){
//         process.exit();
//     }
// })


function readFileInFlowMode(){

        // Mode is by default paused mode
        const stream = fs.createReadStream("data.txt", {encoding: "utf8", highWaterMark: 2000});

        // registering for the data event the mode switched to the flow mode.
        stream.on("data", (chunk)=> {
            console.log(chunk);
            console.log("****************************************************************************");
        })

        stream.on("error", () => {
            console.log("error reading the stream")
        })

        stream.on("end", () => {
            console.log("Finished reading the stream")
        })
}

function readFileinPausedMode(){

    // Mode is by default paused mode
    const stream = fs.createReadStream("data.txt", 
                {encoding: "utf8", highWaterMark: 2000});

    stream.on('readable', () => {

        let chunck = stream.read();
        //console.log(chunck);
        while(chunck !== null){
            console.log(chunck);
            chunck = stream.read();
        }

    })
    

}
//readFileInFlowMode();
readFileinPausedMode();