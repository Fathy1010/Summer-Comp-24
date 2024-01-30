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
        const database = client.db("Churches");

        // Access the collection
        const collection = database.collection('Churches');

        // Query and log the result (Testing)
        var query = { name: "St George Coptic Orthodox Church" };
        const result = await collection.find(query).toArray();
        console.log(result);
        
  
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();



// let bookingNameRef = document.getElementById("bookingName");
// let dateRef = document.getElementById("date");
// let timeRef = document.getElementById("time");
// let startLocationRef = document.getElementById("startLocation");
// let destinationRef = document.getElementById("destination");
// let distanceRef = document.getElementById("distance");
// let vehicleTypeRef = document.getElementById("vehicleType");
// let costRef = document.getElementById("cost");
//
// function displayDetailedBookingData() {
//     let retrievedData = JSON.parse(localStorage.getItem("bookingStorage"))
//     let newBooking = new Booking();
//     newBooking.fromData(retrievedData);
//     bookingNameRef.innerText = newBooking.fullName;
//     dateRef.innerText = newBooking.bookingDate;