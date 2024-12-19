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

export async function saveProduct(product){

    try {
        const db = await connect();
        const productsCollections = db.collection("products");
        const document = await productsCollections.insertOne(product);
        return {...product, ...document};

    } catch (error) {
        console.log("Failed to save product", product);
        throw error;
    }
}

export async function fetchProductById(id){
    
    try {
        const db = await connect();
        const collection = db.collection("products");
        const doc = await collection.findOne({id: Number(id)});    
        return new Product(doc.id, doc.name, doc.price, doc.description);
    } catch (error) {
        console.log("Failed to fetch product", error);
        throw error;
    }
}

export async function deleteProductById(id){

    try {
        const db = await connect();
        const collection = db.collection("products");
        const result = await collection.deleteOne({id: Number(id)});
        return result;

    } catch (error) {
        console.log("Failed to delete product", error);
        throw error;
    }
}

export async function registerUser(user){

    try {
        const db = await connect();
        const collection = db.collection("users");
        const document = await collection.insertOne(user);
        return {...user, ...document};

    } catch (error) {
        console.log("Failed to create user", error);
        throw error;
    }
}

export async function validateUser(loginId, password) {
    
    try {
        const db = await connect();
        const collection = db.collection("users");
        console.log("loginId", loginId);
        const document = await collection.findOne({loginId, password});
        return document;
        
        return document;
    } catch (error) {
        console.log("Failed to validate user", error);
        throw error;
    }
}