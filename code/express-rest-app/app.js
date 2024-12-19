import chalk from 'chalk';
import express from 'express';
import { productRouter } from './routes/products-routes.js';
import { productsdbRouter } from './routes/products-db-routes.js';
import { authRouter } from './routes/auth-routes.js';

const app = express();

// marshalling the json to js objects 
app.use(express.json());
// static files in the public folder
app.use(express.static("public"));

app.use("/products", productRouter);
app.use("/productsdb", productsdbRouter);
app.use("/auth", authRouter);

const PORT = 9010;
app.listen(PORT, () => {
    console.log(chalk.yellow.inverse(`Express REST API's started on port ${PORT}`))
})