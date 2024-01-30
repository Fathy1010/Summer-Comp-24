const {MongoClient} = require('mongodb');

(async () => {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://churchFinder:rBVasUDo9cTsnZni@cluster0.szgbxv7.mongodb.net/test?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('🍃 Connected to DB.');
  
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();
