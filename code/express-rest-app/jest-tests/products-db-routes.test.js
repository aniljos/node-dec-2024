import { productsdbRouter } from '../routes/products-db-routes';
import express from 'express';
import request from 'supertest';
import { fetchAllProducts, saveProduct } from '../repository/mongodb-connect';
import { Product } from '../model/product';

jest.mock('../repository/mongodb-connect');

const app = express();
app.use(express.json());
app.use("/productsdb", productsdbRouter);

describe("products routes", () => {

    test("GET products", async () => {

        const mockProducts = [
            new Product(1, "p1", 1000, "d1"),
            new Product(2, "p2", 2000, "d2"),
        ]
        fetchAllProducts.mockResolvedValue(mockProducts);

        const resp = await request(app).get("/productsdb");

        expect(resp.status).toBe(200);
        //expect(resp.body).toBe(mockProducts);
        expect(fetchAllProducts).toHaveBeenCalled();


    })

    test("GET products fail", async () => {


        fetchAllProducts.mockRejectedValue(new Error("DB Error"));

        const resp = await request(app).get("/productsdb");

        expect(resp.status).toBe(500);
        //expect(resp.body).toBe(mockProducts);
        expect(fetchAllProducts).toHaveBeenCalled();
    })

    test("POST a product successfully", async () => {

        const product = {id: 1, name: "p1", price: 1000, description: "d1"};

        saveProduct.mockResolvedValue({...product});
        const resp = await request(app).post("/productsdb").send(product);

        expect(resp.status).toBe(201);
        expect(resp.body.id).toBe(1);
        expect(resp.body.name).toBe("p1");
        expect(saveProduct).toHaveBeenCalled();
    })

    test("POST a invalid product ", async () => {

        const product = {id: 1};

        saveProduct.mockResolvedValue({...product});
        const resp = await request(app).post("/productsdb").send(product);

        expect(resp.status).toBe(400);
        //expect(saveProduct).toHaveBeenCalled();
    })

});
