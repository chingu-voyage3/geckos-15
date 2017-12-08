/* ***** APP BUTTONS STARTS ***** */
$("#calculator").on("click", function(){
  $(".feature").removeClass("active");
  $(".feature").addClass("hidden");
  $("#calculatorApp").addClass("active");
});

$("#tomatoClock").on("click", function(){
  $(".feature").removeClass("active");
  $(".feature").addClass("hidden");
  $("#pomodoro").addClass("active");
});
/* ***** APP BUTTONS ENDS ***** */

/* ***** TIME AND DATE STARTS ***** */
// This app runs on page load and needs no user input to trigger it
function clock(){
  // Requesting Date data and defining them
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // Update #date li with value
  document.getElementById("date").innerText = day + " " + months[month] + " " + year;
  // Update #time li with value
  if (minutes < 10){
      document.getElementById("time").innerText = hours + ":0" + minutes;
  } else {
      document.getElementById("time").innerText = hours + ":" + minutes;
  }
  // Update greetings message depending on the time of the day
  if (hours < 12){
    document.getElementById("greet").innerText = "Good morning";
  }
  else if (hours >= 12 && hours < 18){
    document.getElementById("greet").innerText = "Good afternoon";
  }
  else {
    document.getElementById("greet").innerText = "Good evening";
  }
}
// Run the clock function every second to update html with real-time data
setInterval(clock, 1000);
/*
FUTURE FEATURE:
# Allow users to pick a timezone from a drop-down manu..
*/
/* ***** TIME AND DATE ENDS ***** */

/* ***** POMODORO TIMER STARTS ***** */
// Store value selected by user 
let pomodoroTimer = parseInt(document.getElementById("pomodoroTimer").innerHTML);
// Create switch that will be used to stop the counter from running
let pomodoroSw = "off";
// Subtract function for timer starting point
pomodoroSub.onclick = function(){
  // Allow using this function only if the counter is not running
  if(pomodoroSw === "off"){
    pomodoroTimer -= 1;
    // Grab our HTML timer and stopwatch elements and decrement them by 1 for each click
    document.getElementById("pomodoroTimer").innerHTML = pomodoroTimer;
    document.getElementById("pomodoroStopwatch").innerHTML = pomodoroTimer + ":00";
    // Prevent the timer from going below 1
    if (pomodoroTimer === 0){
      // If timer becomes 0, it brings it back up to 1
      pomodoroTimer += 1;
      alert("Time is relative.. but not THAT relative :D");
      // Update our HTML to match mytimer variable
      document.getElementById("pomodoroTimer").innerHTML = pomodoroTimer;
      document.getElementById("pomodoroStopwatch").innerHTML = pomodoroTimer + ":00";
    }
  }
}
// Addition function for timer starting point
pomodoroAdd.onclick = function(){
  // Create switch that will be used to stop the counter from running
  if(pomodoroSw === "off"){
    pomodoroTimer += 1;
    // Grab our HTML timer and stopwatch elements and increment them by 1 for each click
    document.getElementById("pomodoroTimer").innerHTML = pomodoroTimer;
    document.getElementById("pomodoroStopwatch").innerHTML = pomodoroTimer + ":00";
    // Prevent the timer from going above 60
    if (pomodoroTimer >= 60){
      // If timer becomes 60, it brings it back 59
      pomodoroTimer -= 1;
      alert("Who on earth would make pomodoro longer than one hour?!");
      // Update our HTML to match mytimer variable
      document.getElementById("pomodoroTimer").innerHTML = pomodoroTimer;
      document.getElementById("pomodoroStopwatch").innerHTML = pomodoroTimer + ":00";
    }
  } 
}
// Countdown function
pomodoroStart.onclick = function(){
  // Prevents starting the function while it's already running
  if(pomodoroSw === "off"){
    let stopwatch = setInterval (time, 1000); // 1000ms = 1s; meaning we run this function every 1 sec
    pomodoroSw = "on";  
    pomodoroTimer *= 60; // mytimer is acting like a minute on our html, we gotta transform it to seconds for itteration
    function time(){
      pomodoroTimer -= 1; // Every second we decrement by one
      if(pomodoroTimer < 1 || pomodoroSw === "off"){ // If countdown finishes (reaches 0) or someone pushes off on the switch (e.g. Reset button)
        clearInterval(stopwatch); // Stops the countdown
        pomodoroSw = "off"; // Puts the switch to off so it doesn't start counting again on it's own
        pomodoroTimer = document.getElementById("pomodoroTimer").innerHTML; // Transform timer back into minutes
        document.getElementById("pomodoroStopwatch").innerHTML = pomodoroTimer + ":00";
      }
      if(pomodoroTimer % 60 >= 10 && pomodoroSw === "on"){ // If seconds are greater than 10 and switch is on, print mins+sec
        document.getElementById("pomodoroStopwatch").innerHTML = Math.floor(pomodoroTimer/60)+ ":" + Math.floor(pomodoroTimer%60);
      }
      else if(pomodoroTimer % 60 < 10 && pomodoroSw === "on"){ // If seconds are less than 10 and switch is on, print mins+"0"+sec so it doesn't look like "3:1"
        document.getElementById("pomodoroStopwatch").innerHTML = Math.floor(pomodoroTimer/60)+ ":" + "0" + Math.floor(pomodoroTimer%60);
      }
      else { // If switch is off, print mins+":00" so it doesn't look like "0:25"
        document.getElementById("pomodoroStopwatch").innerHTML = pomodoroTimer + ":00";
      }
    }
  }
}
// Reset countdown timer
pomodoroReset.onclick = function (){
  pomodoroTimer /= 60; // Bring timer back to minutes
  pomodoroTimer = 25;
  pomodoroSw = "off"; // Turn the switch off to stop countdown
  // Update our HTML with new values
  document.getElementById("pomodoroTimer").innerHTML = 25;
  document.getElementById("pomodoroStopwatch").innerHTML = "25:00";
}
/* FUTURE FEATURES:
# Add sound when timer runs out
*/
/* ***** POMODORO TIMER ENDS ***** */

/* ***** CALCULATOR STARTS ***** */
let calcDisplay = "";

$("a").on("click", function(){
  if(this.id === "calculatorClear"){
    calcDisplay = "";
    document.getElementById("calculatorDisplay").innerHTML = calcDisplay;
  }
  else if (this.id === "calculatorEquals"){
    calcDisplay = eval(calcDisplay);
    document.getElementById("calculatorDisplay").innerHTML = calcDisplay;
  }
  else {
    calcDisplay += this.id;
    document.getElementById("calculatorDisplay").innerHTML = calcDisplay;
  }
});
/* ***** CALCULATOR STARTS ***** */

