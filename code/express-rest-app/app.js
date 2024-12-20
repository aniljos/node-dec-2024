import chalk from 'chalk';
import express from 'express';
import { productRouter } from './routes/products-routes.js';
import { productsdbRouter } from './routes/products-db-routes.js';
import { authRouter } from './routes/auth-routes.js';
import {Worker} from 'node:worker_threads';
import childprocess from 'node:child_process';



const app = express();

// marshalling the json to js objects 
app.use(express.json());
// static files in the public folder
app.use(express.static("public"));

//logging
app.use((req, resp, next) => {

    
    console.log(chalk.greenBright.inverse(`Handling request(${req.url}) on process(${process.pid})`));
    next();

})

app.use("/products", productRouter);
app.use("/productsdb", productsdbRouter);
app.use("/auth", authRouter);

app.get("/task", (req, resp) => {

    setImmediate(() => {
        //simulate a cpu-intensive task
        const array = Array.from({length: 100000000}, (i, index) => index + 1);//[1,2,3,4,5,6...]
        const sqaures = array.map(i => i * i);
        resp.json({result: sqaures.length});
    });
    
});

app.get("/worker-task", (req, resp) => {

    const {arraySize} = req.query;
    if(!arraySize){
        resp.status(400).send("Provide the arraySize param");
        return;
    }
    const worker = new Worker("./workers/compute.js", {workerData: arraySize});

    worker.on("message", (result) => {
        resp.json({result});
    })

    worker.on("error", (error) => {
        resp.status(500).send(error);
    })
})

app.get("/childprocess", (req, resp) => {

    console.log("in the app.js starting child proces with process id", process.pid)
    const cp =  childprocess.fork("./child-process/compute.js");
    cp.on("error", (error) => {
        resp.status(500).send(error)
    })

    cp.on("message", (result) => {
        resp.json({result});
    })

});

const PORT = 9010;
app.listen(PORT, () => {
    console.log(chalk.yellow.inverse(`Express REST API's started on port ${PORT}`))
})