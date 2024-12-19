import {MongoClient} from 'mongodb';
import { Product } from '../model/product.js';

const mongodb_url = "mongodb://localhost:27017";
const databaseName = "productsdb";

export async function  connect(){

    try { 
        const client = new MongoClient(mongodb_url, {});
        await client.connect();
        const database = client.db(databaseName);
        return database;

    } catch (error) {
        console.log("connection to mongodb failed");
        throw error;
    }
}

export async function fetchAllProducts(){

    try {
        
        const db = await connect();
        const productsCollection = db.collection("products");
        const documents = await productsCollection.find({}).toArray();
        return documents.map(doc => new Product(doc.id, doc.name, doc.price,doc.description));
        
    } catch (error) {
        console.log("Failed to fetch products");
        throw error;
    }
}