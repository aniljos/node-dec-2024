import chalk from "chalk";
import { parentPort, workerData } from "node:worker_threads";

// cpu-intensive
function compute(){

    console.log(chalk.red("Starting worker with array size: ", workerData));
    const array = Array.from({length: workerData}, (i, index) => index + 1);//[1,2,3,4,5,6...]
    const sqaures = array.map(i => i * i);
    return sqaures;
}

const results = compute();
parentPort.postMessage(results.length);