import {Router} from 'express';
import {fetchAllProducts} from '../repository/mongodb-connect.js';

export const productsdbRouter = Router();

//fetch all products
productsdbRouter.get("/", async (req, resp) => {

    try {       
        const products = await fetchAllProducts();
        resp.json(products);

    } catch (error) {      
        resp.status(500).send(error);
    }
})