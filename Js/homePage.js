"use strict";
function updateDayTime() {
    let today = new Date();
    let timeNow = `${today.toLocaleTimeString()}`;
    let currentTimeRef = document.getElementById("currentTime");
    currentTimeRef.innerText = timeNow;
    let intervalHandle = setInterval(updateDayTime, 1000);
}

function moveToMap() {
    window.location = "searchPage.html";
}


window.onload = function () { updateDayTime() };

