"use strict";
// https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=f07fefeb9dea4cad9799e4f4d2abd825
let geourl = "https://api.opencagedata.com/geocode/v1/json";
let geoAPI = "f07fefeb9dea4cad9799e4f4d2abd825";

function compilesData(data) {
  let compile = `${geourl}?q=${data.q}&key=${geoAPI}&callback=${data.callback}`;
  console.log(compile);
  let script = document.createElement("script");
  script.src = compile;
  document.body.appendChild(script);
}

// the reverse function
function callBackReverse(Object) {
  let reverseAddress = Object.results[0].formatted;
  return reverseAddress;
}

let markerhistory = [];

function callBackForward(Object) {
  let forwardlat = Object.results[0].geometry.lat;
  let forwardlng = Object.results[0].geometry.lng;

  // return forwardlat , forwardlng;
  let Marker = new mapboxgl.Marker({ color: "#4E5056" });
  let location = {
    current: [forwardlng, forwardlat],
    description: Object.results[0].formatted
  };
  
  Marker.setLngLat(location.current);
  let popup = new mapboxgl.Popup({ offset: 45 });
  popup.setText(location.description);

  Marker.setPopup(popup);
  // checking to see if the amount of stops are reached 
  if (markerhistory.length > 5) {
    markerhistory[markerhistory.length - 1].remove();
  }

  markerhistory.push(Marker);
  doublecheck.push(Marker);
  // Display the marker.
  Marker.addTo(map);

   // this is used so the starting address on the html file can be either current position or a searched position 
  // not either not both its one or the other and the order of entry does not matter as the user can input at whichever order
  // the outcome will be the same 2 starting location
  if(markerhistory.length>1){
  if (doublecheck.length > 0) {
    if (markerhis.length > 0) {
      markerhis[0].remove();
      markerhis.shift();
      locations.shift();
      removeLayerWithId("circle");
    }
  }
  }
  // Display the popup.
  popup.addTo(map);
  map.panTo(location.current);
  // adding the current location to an array where the data can be acessed.

  locations.push(location);
  if(locations.length>1){showPath()}
}

function drff() {
  // get the user input of the desired address
  let address = document.getElementById("address").value;
  // data for the forward function
  let dataFor = {
    q: `${address}`,
    key: geoAPI,
    callback: "callBackForward",
  };
  compilesData(dataFor);
}

function drfffinal() {
  // get the user input of the desired address
  let address = document.getElementById("finalAddress").value;
  // data for the forward function
  let dataFor = {
    q: `${address}`,
    key: geoAPI,
    callback: "callBackForward",
  };
  compilesData(dataFor);
}

function drfr() {
  let lat = document.getElementById("lat").value;
  let lng = document.getElementById("lng").value;
  // data for the reverse function
  let dataRev = {
    q: `${lat}+${lng}`,
    key: geoAPI,
    callback: "callBackReverse",
  };
  compilesData(dataRev);
}
