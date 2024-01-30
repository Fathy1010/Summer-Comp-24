"use strict";
// header: this file is for the booking by address link it checks all the fields have been provided inorder to check 
// out and book the booking with no missing the required data

let newBooking = new Booking();

// Name: doBooking 
// parameters: NONE
// purpose: it looks at the input provided and then checks it has been fulfilled 
// return: nothing it just leads to a different page
function doBooking() {
  //REFS
  let nameOfUserRef = document.getElementById("nameOfUser");
  let dateRef = document.getElementById("dateInputOfBooking");
  let startingAddressRef = document.getElementById("address");
  let endAddressRef = document.getElementById("finalAddress");
  let iTimeRef = document.getElementById("timeInputOfBooking");

  let nameOfUser = nameOfUserRef.value;
  let date = dateRef.value;
  let startingAddress = startingAddressRef.value;
  let endAddress = [];
  endAddress.push(endAddressRef.value);
  let iTime = iTimeRef.value;

  //Alerts
  if (!nameOfUser) {
    return alert("Please insert a username");
  }
  if (!date) {
    return alert("Please Select a Date ");
  }
  if (!iTime) {
    return alert("Please Select A Time");
  }
  if (locations>0&&!startingAddress) {
    return alert("Please either use your current location or search one ");
  }
  if (!endAddress) {
    return alert("please Select a LOCATION");
  }
  else {

    newBooking.startAddressDesc = startingAddress;
    newBooking.stopsDesc = endAddress;
    newBooking.fullName = nameOfUser;
    newBooking.bookingDate = date;
    newBooking.bookingTime = iTime;
    newBooking.startAddress = locations[0].current;
    //adding new stop coordinates
    for(let i = 1 ; i < locations.length; i++)
    {
      newBooking.addStops(locations[i].current);
    }
    let newBookingBook = new BookingBook;
    //checking for scheduled booking
    let now = new Date();
    if(iTime != now.toTimeString)
    {
      newBooking.toggleScheduledStatus();
      newBookingBook.addBooking(newBooking);
    }
    else
    {
      newBookingBook.addBooking(newBooking);
    }

    // Update local storage
    localStorageUpdate(BOOKING_KEY, newBooking);
    localStorageUpdate(BOOKINGBOOK_KEY, newBookingBook);

    // HTML outputs and user ting
    showPath(); // this only works when u cancel twice
    if (confirm("Are you sure you would like to make a booking?") == true) {
      alert("booked sucessfully");
      window.location = "vehicleOptionPage.html"
    } else {
      if (confirm("Are you sure you would want to cancel /n cancelling will terminate all the data you have input ") == true) {
        alert("BOOKING HAS BEEN CANCELED");
        window.location = "homePage.html";
      }
      else {
        return;
      }
      return;
    }
    return;
  }
};