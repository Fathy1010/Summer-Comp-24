"use strict";
// Keys for localstorage
const BOOKING_KEY = "bookingStorage";
const BOOKINGBOOK_KEY = "bookingBookStorage";

// Classes

class Travel {

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



