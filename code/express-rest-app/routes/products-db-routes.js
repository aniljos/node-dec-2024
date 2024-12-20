import {Router} from 'express';
import {fetchAllProducts, saveProduct, fetchProductById, deleteProductById} from '../repository/mongodb-connect.js';
import { verifyJwtToken } from '../middleware/jwt-verification.js';

export const productsdbRouter = Router();


//productsdbRouter.use(verifyJwtToken);


//fetch all products
productsdbRouter.get("/", async (req, resp) => {

    try {       
        const products = await fetchAllProducts();
        if(products.length === 0){
            //no content
            resp.status(204).send();
        }
        else{
            resp.json(products);
        }
        

    } catch (error) {      
        resp.status(500).send(error);
    }
})

productsdbRouter.post("/", async (req, resp) => {

    try {
        const product = req.body;
        if(!product.id || !product.name || !product.price){
            resp.status(400).send();
        }
        else{
            const result = await saveProduct(product);
            resp.status(201).send(result);
        }
        
    } catch (error) {
        resp.status(500).send(error);
    }

});

//GET http://localhost:9010/products/10

productsdbRouter.get("/:id", async(req, resp) => {

    try {
        const id = req.params.id;
        const product = await fetchProductById(id);
        
        if(result){
            resp.json(product).send();
        }
        else{
            resp.status(404).send();
        }

    } catch (error) {
        resp.status(500).send(error);
    }
})

productsdbRouter.delete("/:id", async(req, resp) => {

    try {
        const id = req.params.id;
        const result = await deleteProductById(id);
        if(result.deletedCount > 0){
            resp.status(200).send();
        }
        else{
            resp.status(404).send();
        }

    } catch (error) {
        console.log(error);
        resp.status(500).send(error);
    }
})