// this js file along with "geocode(opencage).js" are for the functionality of the map such like adding
// the current position of the user by accessing the gbs on the computer also in this file we can adda path of the locations
// provided as input by the user.

mapboxgl.accessToken =
  "pk.eyJ1IjoiZmF0aHktYSIsImEiOiJjbHJ6d3Q5dHcxa3dtMnFvNXQzaWt4Z3BrIn0.havexQQgUtpVfdiZYPaoKw";
let map = new mapboxgl.Map({
  container: "map",
  center: [144.9341008, -37.8010007], //starting position monash
  zoom: 10,
  style: "mapbox://styles/mapbox/streets-v9",
});


// name:getLocation()
// parameters: NONE
// purpose: this fucntions calls on showposition function to trigger it to work in the case that the broweser does support
// geocode the apprach taken was higly similair to the local storage checker.
// returns: nothing

function getLocation() {
  let x = document.getElementById("place");
  // if the browser allows gbs to be accesed
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

const markerhis = [];
const doublecheck = []

// Name: showPosition()
// parameters:  (position)
// purpose: it uses the api to get the current lat and lng of the user after agreeing to allow the computer to do so to pinpoint a place on the map
// return: it returns back a marker of the current position with a blue circle to surrond the marker

function showPosition(position) {
  let marker = new mapboxgl.Marker({ color: "3370FF" });
  let location = {
    current: [position.coords.longitude, position.coords.latitude],
    description: "Your Position",
  };
  marker.setLngLat(location.current);
  let popup = new mapboxgl.Popup({ offset: 45 });
  popup.setText(location.description);

  marker.setPopup(popup);

  // this is used so the starting address on the html file can be either current position or a searched position 
  // not either not both its one or the other and the order of entry does not matter as the user can input at whichever order
  // the outcome will be the same 2 starting location
  if (doublecheck.length>0){
    markerhistory[0].remove();
    markerhistory.shift();
    locations.shift();
    if (markerhis.length > 0) {
    markerhis[0].remove();
    markerhis.shift();
    markerhistory[0].remove();
    markerhistory.shift();
    locations.shift();
  }
  if(locations.length>1){showPath()}
}
  // Display the marker.
  doublecheck.push(marker)
  markerhis.push(marker);
  marker.addTo(map);
  // Display the popup.
  popup.addTo(map);

  removeLayerWithId("circle");
  map.addSource("circle", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: location.current,
      },
      properties: {},
    },
  });

  map.addLayer({
    id: "circle",
    type: "circle",
    source: "circle",
    paint: {
      "circle-color": "#00b7bf",
      "circle-radius": 40,
      "circle-opacity": 0.2,
      "circle-stroke-width": 2,
      "circle-stroke-color": "#333",
    },
  });
  // after we add the marker and the popup and circle respectively
  // we pan to the location of the user
  locations.push(location);
  map.panTo(location.current);
}


// Name: removeLayerWithId() 
// parameters: idToRemove
// purpose: is to remove the layer with a certian id that
// return: it doesnt return anything 

function removeLayerWithId(idToRemove) {
  let hasPoly = map.getLayer(idToRemove);
  if (hasPoly !== undefined) {
    map.removeLayer(idToRemove);
    map.removeSource(idToRemove);
  }
}
let locations = [];
// Name: showPath() 
// parameters: NONE
// purpose: is to draw a line between the marker placed by the user's search in the right order of input 
// return: it returns a line on the map
function showPath() {
  let object = {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    },
  };

  for (let i = 0; i < locations.length; i++) {
    object.data.geometry.coordinates.push(locations[i].current);
  }
  removeLayerWithId("routes");
  map.addLayer({
    id: "routes",
    type: "line",
    source: object,
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": "#888", "line-width": 6 },
  });
}
