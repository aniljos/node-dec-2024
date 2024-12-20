import chalk from "chalk";

// cpu-intensive
function compute(){

    console.log(chalk.red("Starting child process with process-id ", process.pid));
    const array = Array.from({length: 100000000}, (i, index) => index + 1);//[1,2,3,4,5,6...]
    const sqaures = array.map(i => i * i);
    return sqaures;
}

const result = compute();
process.send(result.length);