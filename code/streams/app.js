const fs = require('fs');
console.log("Streams application");

const streams = require("node:stream")
const pipeline = streams.pipeline;
const Transform = streams.Transform;
//import {pipeline, Transform} from 'node:stream'; // esm
const zlib = require('node:zlib');
const gzip = zlib.createGzip();
//import {gzip} from 'node:zlib'





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

function pipeStdProcessStreams(){
    process.stdin.pipe(process.stdout);
}
function copyFile(source, destination){
    fs.createReadStream(source).pipe(fs.createWriteStream(destination));
}

const uppercaseTransform = new Transform({
    transform: (chunk, encoding, callback ) => {

         callback(null, chunk.toString().toUpperCase());
    }
})

function copyFileToUppercaseAndCompresses(source, destination){
    pipeline(
        fs.createReadStream(source),
        uppercaseTransform,
        gzip,
        fs.createWriteStream(destination),
        (err) => {
            if (err) {
              console.error('Pipeline failed.', err);
            } else {
              console.log('Pipeline succeeded.');
            }
          },
    )
}

//readFileInFlowMode();
//readFileinPausedMode();
//pipeStdProcessStreams();

//copyFile("data.txt", "data-copy.txt")
copyFileToUppercaseAndCompresses("data.txt", "data-copy-1.gz");