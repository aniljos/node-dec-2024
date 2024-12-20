import chalk from 'chalk';
import cluster from 'node:cluster';
import os from 'node:os';

// node cluster-app.js:  run the the cluster-app.js with isPrmary: true
// Test the code using Apache benchmark: ab -c 100 -n 1000 -r http://localhost:9010/products
if(cluster.isPrimary){

    console.log(chalk.yellowBright("Starting the cluster module in the Primary section"));
    const no_of_cpus = os.cpus().length;
    console.log(chalk.blueBright("No of cpus: " + no_of_cpus));
    for (let i = 0; i < no_of_cpus; i++) {
        const worker = cluster.fork(); // run the the cluster-app.js with isPrmary: false, isWorker: true

        worker.on("error", (err) => {
            console.log(chalk.redBright("Error in worker", error));
        })

        worker.on("exit", () => {
            console.log(chalk.redBright("Worker exiting"));
        })
        worker.on("online", () => {
            console.log(chalk.greenBright("Worker in online with process-id: ", worker.process.pid));
        })
    }
}
else{

    console.log(chalk.yellowBright("In cluster module in the Worker section"));
    // start the child-process
    import('./app.js')
}