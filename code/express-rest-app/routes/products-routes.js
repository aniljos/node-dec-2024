import { Router } from 'express';
import { ProductRepository } from '../repository/product-repository.js';

export const productRouter = Router();
const repository = new ProductRepository();

// GET /products
productRouter.get("/", (req, resp) => {

    resp.json(repository.fetchAll());

})

// GET /products/id
productRouter.get("/:id", (req, resp) => {

    const id = req.params.id;
    if (id) {
        const products = repository.fetchAll();
        const index = products.findIndex(product => product.id.toString() === id.toString());
        if (index !== -1) {
            const product = products[index];
            resp.json(product);
        }
        else {
            //product not found
            resp.status(404);
            resp.end();
        }
    }
    else {
        // bad request
        resp.status(400);
        resp.end();
    }

})

productRouter.post("/", (req, resp) => {

    try {
        //Get the product from the request body
        const nProduct = req.body;

        //validations
        if (!nProduct.id || !nProduct.name || !nProduct.price) {
            resp.status(400);
        }
        else {
            //save the product
            const products = repository.fetchAll();
            products.push(nProduct);
            resp.status(201);
        }
    } catch (error) {
        console.log("error is savig the product", error);
        resp.status(500);
    }
    resp.end();
})