require('dotenv').config();
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const churchList = require('./churchList'); //Testing purposes
const churchModel = require('./churchModel');

(async () => {
    const uri = process.env.MONGODB_URI;

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('🍃 Connected to DB.');
        
        // Access the database
        const database = client.db("Churches");

        // Access the collection
        const collection = database.collection('Churches');

        // Query and log the result (Testing)
        var query = { name: "St George Coptic Orthodox Church" };
        const result = await collection.find(query).toArray();
        console.log(result);

        // Log specific object (Testing)
        result.forEach(db => {
            console.log("Name: ", db.name);
          })
        
  
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();


