const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const churchList = require('./churchList'); //Testing purposes
const churchModel = require('./churchModel');

(async () => {
    const uri = "mongodb+srv://churchFinder:rBVasUDo9cTsnZni@cluster0.szgbxv7.mongodb.net/test?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('🍃 Connected to DB.');
        
        // Access the database
        const database = client.db("Churches"); // Replace with your actual database name

        // Access the collection
        const collection = database.collection('Churches');

        // Query and log the result
        const result = await collection.find().toArray();
        console.log(result);
        
  
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();
