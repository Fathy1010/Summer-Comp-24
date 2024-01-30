"use strict";
// Keys for localstorage
const BOOKING_KEY = "bookingStorage";
const BOOKINGBOOK_KEY = "bookingBookStorage";

// Classes

class Booking {
    constructor() {
        this._fullName = "";
        this._startAddress = "";
        this._startAddressDesc = "";
        this._stops = [];
        this._stopsDesc = [];
        this._estimatedFare = 0;
        this._taxiType = "";
        this._distance = 0;
        this._isScheduled = false;
        this._bookingDate = "";
        this._bookingTime ="";
        this._isCompleted = false;
    }
    // Accessors
    get fullName() {
        return this._fullName;
    }
    get startAddress() {
        return this._startAddress;
    }
    get startAddressDesc() {
        return this._startAddressDesc;
    }
    get stops() {
        return this._stops;
    }
    get stopsDesc() {
        return this._stopsDesc;
    }

    get estimatedFare() {
        return this._estimatedFare;
    }

    get taxiType() {
        return this._taxiType;
    }
    get distance() {
        return this._distance;
    }

    get isScheduled() {
        return this._isScheduled;
    }

    get bookingDate() {
        return this._bookingDate;
    }

    get bookingTime() {
        return this._bookingTime;
    }

    get isCompleted() {
        return this._isCompleted;
    }

    //Mutators
    set fullName(newFullName) {
        this._fullName = newFullName;
    }
    set startAddress(newAddress) {
        this._startAddress = newAddress;
    }
    set startAddressDesc(newAddressDesc) {
        this._startAddressDesc = newAddressDesc;
    }
    set stops(newStop) {
        this._stops = newStop;
    }
    set stopsDesc(newStopDesc) {
        this._stopsDesc = newStopDesc;
    }
    set taxiType(newTaxiType) {
        this._taxiType = newTaxiType;
    }
    set distance(newDistance) {
        this._distance = newDistance;
    }
    set bookingDate(newBookingDate) {
        this._bookingDate = newBookingDate;
    }

    set bookingTime(newBookingTime) {
        this._bookingTime = newBookingTime;
    }
    //Methods
    toggleScheduledStatus() {
        if (this._isScheduled == true) {
            this._isScheduled = false;
        }
        else {
            this._isScheduled == true;
        }
    }

    toggleCompletedStatus() {
        if (this._isCompleted == true) {
            this._isCompleted = false;
        }
        else {
            this._isCompleted == true;
        }
    }

    calculateFare(taxiType, distance) {
        let flagRate = 4.20;
        let distanceRate = 1.622;
        let commercialLevy = 1.10;
        let fare = flagRate + (distance * distanceRate) + commercialLevy;
        let nightLevy = 0.2

        let timeArray = this._bookingTime.split(":");
        if (parseInt(timeArray[0])> 17 || parseInt(timeArray[0])< 9) {
            fare += fare * nightLevy;
        }

        if(taxiType == "Sedan")
        {
            fare = fare;
        }
        else if (taxiType == "SUV") {
            fare += 3.50;
        }
        else if (taxiType == "Van") {
            fare += 6;
        }
        else if (taxiType = "Minibus") {
            fare += 10;
        }

        this._estimatedFare = fare.toFixed(2);
    }
    calculateDistance(lat1, lng1, lat2, lng2) {

        const R = 6371; // Earth radius in km
        const lat1Radians = lat1 * Math.PI / 180; // φ, λ in radians
        const lat2Radians = lat2 * Math.PI / 180;
        const deltaLat = (lat2 - lat1) * Math.PI / 180; // Δφ
        const deltaLng = (lng2 - lng1) * Math.PI / 180; // Δλ
    
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1Radians) * Math.cos(lat2Radians) *
            Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        let distance = (R * c).toFixed(2); // in km
        this._distance = distance;
    }
   
    addStops(stops) {
        this._stops.push(stops);
    }

    removeDestinationAddress(index) {
        this._stops.splice(index, 1)
    }

    fromData(dataObject) {
        this._fullName = dataObject._fullName;
        this._startAddress = dataObject._startAddress;
        this._startAddressDesc = dataObject._startAddressDesc
        this._stops = dataObject._stops;
        this._stopsDesc = dataObject._stopsDesc;
        this._estimatedFare = dataObject._estimatedFare;
        this._taxiType = dataObject._taxiType;
        this._isScheduled = dataObject._isScheduled;
        this._bookingDate = dataObject._bookingDate;
        this._bookingTime = dataObject._bookingTime;
        this._isCompleted = dataObject._isCompleted;
    }

}

class BookingBook {
    constructor() {
        this._ongoingBookings = [];
        this._scheduledBookings = [];
        this._completedBookings = [];
    }

    //Accessors
    get ongoingBookings() {
        return this._ongoingBookings;
    }

    get scheduledBookings() {
        return this.scheduledBookings;
    }

    get completedBookings() {
        return this.completedBookings;
    }

    addBooking(Booking) {
        if (Booking.isCompleted == false) {
            this._ongoingBookings.push(Booking);
            if (Booking.isScheduled == true) {
                this._scheduledBookings.push(Booking);
            }
        }
        else {
            this._completedBookings.push(Booking);
        }
    }
}

//Functions - Buttons
function viewAllBookingsButton() {
    window.location = "bookingsPage.html";
}

function homeButton() {
    window.location = "homePage.html";
}

// Functions = Local storage
function localStorageCheck(key) {
    if (localStorage.getItem(key) === undefined) {
        return false;
    }
    else {
        return true;
    }
}

function localStorageUpdate(key, data) {
    let jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
}

// function localStorageRetrieve(key) {
//     let data = localStorage.getItem(key);
//     try {
//         data = JSON.parse(data);
//     }
//     catch (e) {

//     }
//     finally {
//         return data;
//     }
// }

// Functions = Retrival

// function getBooking(BOOKING_KEY) {
//     let data = localStorageRetrieve(BOOKING_KEY);
//     let retrievedBooking = new Booking();
//     retrievedBooking.fromData(data);
//     return retrievedBooking;
// }


