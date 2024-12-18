import express from 'express';
import chalk from 'chalk';

const app = express();

//middleware(logging the requests)
app.use((req, res, next) => {

    console.log(chalk.yellowBright(`request received with path ${req.url} at ${new Date().toLocaleString()}`));
    next();
})

//middleware(handling static resources)
app.use(express.static("public"));

app.get("/", (req, res) => {

    res.json({message: "Hello World Express"})
});
app.get("/about", (req, res) => {

    //res.writeHead(200, "OK");
    res.setHeader("content-type", "text/plain");
    res.status(200);
    res.send("This is an application built on Node Express");

})
app.get("/products", (req, resp) => {

    

})

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Express application running on POST: ${PORT}`);
})