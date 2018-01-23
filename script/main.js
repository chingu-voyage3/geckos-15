/* ***** APP BUTTONS STARTS ***** */
$("#calculator").on("click", function(){
  $(".feature").addClass("hidden");
  $("#calculatorApp").removeClass("hidden");
});

$("#weatherIcon").on("click", function(){
  $(".feature").addClass("hidden");
  $("#weather").removeClass("hidden");
});

$("#tomatoClock").on("click", function(){
  $(".feature").addClass("hidden");
  $("#pomodoroApp").removeClass("hidden");
});

$("#bookmarks").on("click", function(){
  $(".feature").addClass("hidden");
  $("#bookmarksApp").removeClass("hidden");
  bookmarksDisplay();
});

$("#quiz").on("click", function(){
  $(".feature").addClass("hidden");
  $("#movieQuiz").removeClass("hidden");
});

$("#todoapp").on("click", function(){
  $(".feature").addClass("hidden");
  $("#todo").removeClass("hidden");
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
  // Update #date with value
  document.getElementById("date").innerText = day + " " + months[month] + " " + year;
  // Update #time with value
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

/* ***** TODO STARTS ***** */
document.addEventListener("load", displayTodos());

document.querySelector("#addTodos").addEventListener("click", addTodo);

document.querySelector("#clearTodos").addEventListener("click", removeAllTodos);

// Add items to the list & localStorage
function addTodo(){
  let input = document.querySelector(".form-control").value;
  if(localStorage.getItem("todos") === null) {
    let todos = [];
    todos.push(input);
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(input);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  document.querySelector(".form-control").value = "";
  displayTodos();
}

// Remove items from the list & localStorage
function removeTodos(e){
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(e, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodos();
}

function removeCompleted(e){
  let completed = JSON.parse(localStorage.getItem("completed"));
  completed.splice(e, 1);
  localStorage.setItem("completed", JSON.stringify(completed));
  displayTodos();
}

// Remove all data from the list & localStorage
function removeAllTodos(){
  localStorage.removeItem("todos");
  localStorage.removeItem("completed");
  displayTodos();
}

// Mark completed todos
function doneTodos(e){
  let todos = JSON.parse(localStorage.getItem("todos"));
  if(localStorage.getItem("completed") === null){
    let completed = [];
    completed.push(todos.splice(e, 1));
    localStorage.setItem("completed", JSON.stringify(completed));
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    let completed = JSON.parse(localStorage.getItem("completed"));
    completed.push(todos.splice(e, 1));
    localStorage.setItem("completed", JSON.stringify(completed));
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  displayTodos();
}

// Display localStorage data to the user
function displayTodos(){
  let todos = JSON.parse(localStorage.getItem("todos"));
  let completed = JSON.parse(localStorage.getItem("completed"));
  document.getElementById("todosList").innerHTML = "";
  document.getElementById("todosCompleted").innerHTML = "";

  if (localStorage.getItem("todos")){
    for (let i = 0; i < todos.length; i++){
      document.getElementById("todosList").innerHTML += '<li>' + todos[i] + '<i onclick="removeTodos(' + i + ')" class="fa fa-times pull-right"></i><i onclick="doneTodos(' + i + ')" class="fa fa-check pull-right"></i></li>';
    }
  } else {
    document.getElementById("todosList").innerHTML += "<p>What are you going to do today?</p>";
  }

  if (localStorage.getItem("completed")){
    for (let i = 0; i < completed.length; i++){
      document.getElementById("todosCompleted").innerHTML += '<li>' + completed[i] + '<i onclick="removeCompleted(' + i + ')" class="fa fa-times pull-right"></i></li>';
    }
  } else {
    document.getElementById("todosCompleted").innerHTML += "<p>You don't have any completed activities, yet!</p>";
  }
}
/* ***** TODO ENDS ***** */

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
      pomodoroTimer = 1;
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
      pomodoroTimer = 59;
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
// Calculator display value
let calcDisplay = "";
// Click functions
$("a").on("click", function(){
  // Clear all button
  if(this.id === "calculatorClear"){
    calcDisplay = "";
    document.getElementById("calculatorDisplay").innerHTML = calcDisplay;
  }
  // = button, doing the calculation using eval
  else if (this.id === "calculatorEquals"){
    calcDisplay = eval(calcDisplay);
    if (calcDisplay % 1 != 0) {
      document.getElementById("calculatorDisplay").innerHTML = calcDisplay.toFixed(3);
    } else {
      document.getElementById("calculatorDisplay").innerHTML = calcDisplay;
    }
  }
  // Other buttons, adding them as a string for later eval
  else {
    calcDisplay += this.id;
    document.getElementById("calculatorDisplay").innerHTML = calcDisplay;
  }
});
/* ***** CALCULATOR ENDS ***** */

/* ***** BOOKMARKS STARTS ***** */
document.getElementById("bmForm").addEventListener("submit", bmSubmit);
// Function to add a bookmark
function bmSubmit(pd){
  var bmName = document.getElementById("bmName").value;
  var bmUrl = document.getElementById("bmUrl").value;
// Validation function, to check if the input is valid url
  if(!bmValidate(bmName, bmUrl)){
    if (!bmName) {
      pd.preventDefault();
    }
    return false;
  }

  var bookmark = {
    name: bmName,
    url: bmUrl
  };

  if(localStorage.getItem("bookmarks") === null){
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  else {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  document.getElementById("bmForm").reset();
  bookmarksDisplay();
  // Prevents page from reloading
  pd.preventDefault();
}
// Delete the bookmark
function bmDelete(url){
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  bookmarksDisplay();
}

// Add bookmark to the HTML and print it on the screen
function bookmarksDisplay(){
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  var bmDisplay = document.getElementById("bmDisplay");
  bmDisplay.innerHTML = "";

  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bmDisplay.innerHTML +=  "<div class='col-3'>"+
                            name+
                            ' <a target="_blank" href="https://'+url+'"><i class="fa fa-globe pull-right"></i></a> ' +
                            " <a onclick='bmDelete(\""+url+"\") 'href='#'><i class='fa fa-times pull-right'></i></a> "+
                            "</div>";
                          }
}
// Validation function
function bmValidate(bmName, bmUrl){
  if(!bmName || !bmUrl){
    alert('Please fill in the form.');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!bmUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }
  return true;
}

/* ***** BOOKMARKS ENDS ***** */

/* ***** MOVIE QUIZ STARTS ***** */

// ***** STARTING VALUES ***** //

let quizScore = 0; // local value of quiz score
let quizProgress = 0; // max progress 10 = when you answer 10 questions quiz is over and you can start again
let quizMovie; // local movie used for answer comparrison
let quizRecord; // highest score picked up from local storage

// ***** RESTART THE QUIZ ***** //
function quizReset(){
  quizScore = 0;
  quizProgress = 0;
  quizMovie = "";
  quizRecord = 0;
  document.getElementById("movieQuote").innerHTML = "PRESS START TO BEGIN!";
  quizUpdate();
}

// ***** UPDATE HTML WITH NEW VALUES *****/
function quizUpdate(){
  document.getElementById("quizProgress").innerHTML = quizProgress;
  document.getElementById("quizAnswer").value = "";
}

document.getElementById("quizStart").addEventListener("click", function quizStart(){
  quizUpdate();
  getQuote();
});

// ***** PICK A RANDOM QUOTE AND PRINT IT *****/
function getQuote(){
  let randomNumber = Math.round(Math.random() * (movies.length-1));
  document.getElementById("movieQuote").innerHTML = movies[randomNumber].quote;
  quizMovie = movies[randomNumber].movie;
}

// ***** PREVENT SUBMIT/RELOAD ON ENTER-KEY !!! credits to Kailas Mane !!! ***** //
function stopReloadKey(evt) {
  var evt = (evt) ? evt : ((event) ? event : null);
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
  if (evt.keyCode == 13)  {
      return false;
  }
}
document.onkeypress = stopReloadKey;

// ***** MAIN FUNCTION TRIGGERED BY SUBMIT ANSWER BUTTON CLICK *****/
document.getElementById("quizSubmit").addEventListener("click", function quizSubmit(){
  // Stores the user input
  let quizAnswer = document.getElementById("quizAnswer").value;
  // Checks if the answer is correct & if the game is over
  if(quizAnswer.toLowerCase() == quizMovie.toLowerCase() && quizProgress < 10){
    quizScore += 10; // Add points
    quizProgress += 1; // Go to the next step
    document.getElementById("quizCorrect").classList.remove("hidden"); // Messages
    document.getElementById("quizWrong").classList.add("hidden"); // Messages
    quizUpdate();
    getQuote();
  } else if (quizAnswer.toLowerCase() !== quizMovie.toLowerCase() && quizProgress < 10){
    // quizScore -= 5; <= commenting out negative points
    quizProgress += 1;
    document.getElementById("quizWrong").classList.remove("hidden");
    document.getElementById("quizCorrect").classList.add("hidden");
    quizUpdate();
    getQuote();
  } else { // If user plays 10 steps, the game is over
    // Stores current score
    storeQuizScore();
    // Uses function that gets highest score from local storage
    quizHighestScore();
    // Alerts user of his current and highest score
    alert("Your score is " + quizScore + ", and your highest score is " + quizRecord);
    // Restarts the game
    quizReset();
  }
});

// ***** SAVE SCORE TO THE LOCAL STORAGE ***** //

function storeQuizScore(){
  // Object literar for storing scores in local storage
  let quizHistory = {
    score: quizScore
  }
  // If local storage object doesn't exist, create one
  if(localStorage.getItem("highestScore") === null){
    let highestScore = [];
    highestScore.push(quizHistory);
    // Add the value to local storage as JSON object
    localStorage.setItem("highestScore", JSON.stringify(highestScore));
  } else { // If local storage has object in it
    // Transform JSON object to javascript object and store it inside our variable
    let highestScore = JSON.parse(localStorage.getItem("highestScore"));
    highestScore.push(quizHistory);
    localStorage.setItem("highestScore", JSON.stringify(highestScore));
  }
}

// ***** FIND THE HIGHEST SCORE ***** //

function quizHighestScore(){
  let scoreArray = [];
  let quizStorage = JSON.parse(localStorage.getItem("highestScore"));
  // Push all scores into scoreArray
  for(let i = 0; i < quizStorage.length; i++){
    scoreArray.push(quizStorage[i].score);
  }
  // Find max value and store it in global variable for later printing
  quizRecord = Math.max(...scoreArray);
}

/* ***** MOVIE QUIZ ENDS ***** */

/* ***** WEATHER STARTS ***** */
/* 'Non-core' functions */

// function for requesting user's (browser) geolocation
const getPosition = function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getLocalWeather);
	}
	else {
		alert("Unable to retrieve your current positon");
	}
};


// function for converting temperature to celsius & farhenheit from kelvin
const tempConvert = function(kelvin) {
	const temp = {
		celsius: Math.round(kelvin - 273.15) + "°C",
		fahrenheit: Math.round(((kelvin - 273.15) * 1.8) + 32) + "°F"
	};
	return temp;
};


// function for getting date info for 3 day forecast
const getDateInfo = function(numDays) {
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const newDay = new Date();
	const days = [];

	// creates objects of date details for specified number of days ahead & pushes to 'days' array
	for (let i = 0; i < numDays; i++) {
		newDay.setDate(newDay.getDate() + 1);
		let day = {
			day: weekdays[newDay.getDay()],
			date: newDay.getDate(),
			month: months[newDay.getMonth()],
			year: newDay.getFullYear()
		}
		days.push(day);
	}
	return days;
};


// function holding API key
const pick = function() {
	return "&appid=5300f8bc54b3884e3240c056f4d4617a";
};

// function for retrieving weather-related icon to display
const getIcon = function(icon) {
	return "https://openweathermap.org/img/w/" + icon + ".png";
};



/* 'Core' functions */

// function to get current & forecast weather data based on user's (browser) geolocation
const getLocalWeather = function(position) {

	// sets coordinates returned from 'getPosition' function (above) to variables for API use
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;

	// gets current weather at geolocation
	const currentXHR = new XMLHttpRequest();
	currentXHR.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + pick(), true);
	currentXHR.onload = function() {
		if (this.status === 200) {
			const currentData = JSON.parse(this.responseText);
			displayCurrent(currentData); // data sent to display function
		}
	};
	currentXHR.onerror = function() {
		alert("Sorry, there was a Request Error. Please try again");
	};
	currentXHR.send();


	// gets weather forecast for geolocation 
	const forecastXHR = new XMLHttpRequest();
	forecastXHR.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + pick(), true);
	forecastXHR.onload = function() {
		if (this.status === 200) {
			const forecastData = JSON.parse(this.responseText);
			sortForecastData(forecastData); // data sent to be curated before displaying
		}
	};
	forecastXHR.onerror = function() {
		alert("Sorry, there was a Request Error. Please try again");
	};
	forecastXHR.send();
};


// function to get current & forecast weather data based on a specified city
const getCityWeather = function() {
	let city = document.getElementById('cityInput').value;

	// gets current weather in specified city
	const currentXHR = new XMLHttpRequest();
	currentXHR.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + city + pick(), true);
	currentXHR.onload = function() {
		if (this.status === 200) {
			const currentData = JSON.parse(this.responseText);
			displayCurrent(currentData); // data sent to display function
		}
	};
	currentXHR.onerror = function() {
		alert("Sorry, there was a Request Error. Please try again");
	};
	currentXHR.send();


	// gets weather forecast data for specified city
	const forecastXHR = new XMLHttpRequest();
	forecastXHR.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + pick(), true);
	forecastXHR.onload = function() {
		if (this.status === 200) {
			const forecastData = JSON.parse(this.responseText);
			sortForecastData(forecastData); // data sent to be curated before displaying
		}
	};
	forecastXHR.onerror = function() {
		alert("Sorry, there was a Request Error. Please try again");
	};
	forecastXHR.send();
};


// function for displaying current weather - by geolocation or specified city
const displayCurrent = function(data) {
	const currentTemp = tempConvert(data.main.temp); // converts temperature from kelvin to celsius & fahrenheit

	// DOM selectors for displaying current weather data
	document.getElementsByClassName('display')[0].style.display = 'block';
	document.getElementById('location').innerHTML = data.name + ", " + data.sys.country;
	document.getElementById('currentTemp').innerHTML = currentTemp.celsius + " / " + currentTemp.fahrenheit;
	document.getElementById('currentWeather').innerHTML = data.weather[0].description;
	document.getElementById('currentIcon').src = getIcon(data.weather[0].icon);
};


// function for curating forcast data to get daily forecast for noon (12AM) 3 days ahead
const sortForecastData = function(data) {

	const dateInfo = getDateInfo(3); // gets date info for 3 days ahead
	const allForecasts = data.list.length; // variable only used in for-loop below
	const dayForecast = []; // forecast data for 12AM (noon) pushed to this array in for-loop below
	
	// filters forecast data for next 5 days at 12AM (noon) and pushes to array 'dayForecast'
	for (let i = 0; i < allForecasts; i++) {
		if (data.list[i].dt_txt.includes('12:00')) {
			dayForecast.push(data.list[i]);
		}
	};

	// creates an array of objects with relevant date- & weather data to be displayed for 3-day forecast
	const forecasts = [
		{
			day: dateInfo[0],
			temp: tempConvert(dayForecast[0].main.temp),
			weather: dayForecast[0].weather[0].main,
			description: dayForecast[0].weather[0].description,
			icon: getIcon(dayForecast[0].weather[0].icon)
		},
		{
			day: dateInfo[1],
			temp: tempConvert(dayForecast[1].main.temp),
			weather: dayForecast[1].weather[0].main,
			description: dayForecast[1].weather[0].description,
			icon: getIcon(dayForecast[1].weather[0].icon)
		},
		{
			day: dateInfo[2],
			temp: tempConvert(dayForecast[2].main.temp),
			weather: dayForecast[2].weather[0].main,
			description: dayForecast[2].weather[0].description,
			icon: getIcon(dayForecast[2].weather[0].icon)
		}
	];
	return displayForecast(forecasts); // array of objects containing weather & date data sent to display function
}; 


// function for displaying 3-day forecast weather data - by geolocation or specified city
const displayForecast = function(data) {
	document.getElementById('day0Info').innerHTML = data[0].day.day + ", " + data[0].day.date + " " + data[0].day.month;
	document.getElementById('day0Forecast').innerHTML = data[0].temp.celsius + " / " + data[0].temp.fahrenheit + " - " + data[0].description;
	document.getElementById('day0Icon').src = data[0].icon;

	document.getElementById('day1Info').innerHTML = data[1].day.day + ", " + data[1].day.date + " " + data[1].day.month;
	document.getElementById('day1Forecast').innerHTML = data[1].temp.celsius + " / " + data[1].temp.fahrenheit + " - " + data[1].description;;
	document.getElementById('day1Icon').src = data[1].icon;

	document.getElementById('day2Info').innerHTML = data[2].day.day + ", " + data[2].day.date + " " + data[2].day.month;
	document.getElementById('day2Forecast').innerHTML = data[2].temp.celsius + " / " + data[2].temp.fahrenheit + " - " + data[2].description;;
	document.getElementById('day2Icon').src = data[2].icon;
};


// Immediately invoked function expression setting event handlers on button - controls initiation of all other weatherApp functions
const main = (function() {
	// eventlistener to display / hide text input field for city selection, depending on whether radio button is checked
	document.getElementsByClassName('radioBtns')[0].addEventListener('click', function() {
		const cityInput = document.getElementById('cityInput');
		document.getElementById('cityBtn').checked ? cityInput.style.display = 'inline' : cityInput.style.display = 'none';
	});

	// eventlistener that determines whether user is requesting local weather or by city name
	document.getElementById('getWeatherButton').addEventListener('click', function() {
		document.getElementById('localBtn').checked ? getPosition() : getCityWeather();
	});
})();
/* ***** WEATHER ENDS ***** */

/* ***** DATABASE STARTS ***** */

// ***** Q/A DATABASE ***** //
var movies = [
  { 	
    "movie": "The Big Lebawski",
    "quote": "I don't roll on the sabbath"
  },
  {
    "movie": "Superbad",
    "quote": "Sorry the Cohen brothers don't direct my porn"
  
  },
  {
    "movie": "Lord of the Rings",
    "quote": "One ring to rule them all"
  },
  {
    "movie": "Animal House",
    "quote": "Fat, drunk, and stupid is no way to go through life, son."
  
  },
  {
    "movie": "Zoolander",
    "quote": "What is this?? A school for ants??"
  
  },
  {
    "movie": "Blues Brothers",
    "quote": "They’re not gonna catch us. We’re on a mission from God."
  
  },
  {
    "movie": "Dr. Stangelove",
    "quote": "Gentlemen, you can’t fight in here! this is the War Room."
  
  },
  {
    "movie": "Dodgeball",
    "quote": "Oh, I don’t think I’m a lot dumber than you think that I thought that I thought I was once."
  
  },
  {
    "movie": "Home Alone",
    "quote": "I believe you but my tommy gun don't"
  
  },
  {
    "movie": "Blade Runner",
    "quote": "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die"
  
  },
  {
    "movie": "They Live",
    "quote": "I have come here to chew bubblegum and kick ass... and I'm all out of bubblegum"
  
  },
  {
    "movie": "Ghostbusters",
    "quote": "when someone asks you if you are a god, you say yes ..."
  
  },
  {
    "movie": "Christmas Vacation",
    "quote": "The little lights aren’t twinkling Clark"
  
  },
  {
    "movie": "Tropic Thunder",
    "quote": "I don't read the script, the script reads me"
  
  },
  {
    "movie": "Predator",
    "quote": "There's something out there waiting for us.... and it ain't no man"
  
  },
  {
    "movie": "The Good The Bad And The Ugly",
    "quote": "When you have to shoot, shoot, don’t talk"
  
  },
  {
    "movie": "Dispicable me",
    "quote": "IT'S SO FLUFFY!!"
  
  },
  {
    "movie": "Zootopia",
    "quote": "... and how did you repay my generosity? With a rug, made from the butt of a skunk... a skunk-butt-rug"
  
  },
  {
    "movie": "The Other Guys",
    "quote": "...Gator never been about that, never, never been about playin' no sh**!"
  
  },
  {
    "movie": "The Dark Knight Rises",
    "quote": "...you think your darkness is your ally? You merely adopted the dark. I was born in it. Moulded by it"
  
  },
  {
    "movie": "Terminator",
    "quote": "Come with me if you want to live"
  
  },
  {
    "movie": "Predator",
    "quote": "Get to the chopper!"
  
  },
  {
    "movie": "Pulp Fiction",
    "quote": "A royal with cheese"
  
  },
  {
    "movie": "Forrest Gump",
    "quote": "...shrimp is the fruit of the sea; you can BBQ it, broil it, bake it, sauté it... shrimp kebabs, shrimp creole, shrimp gumbo.."
  
  },
  {
    "movie": "The Dark Knight",
    "quote": "Why so serious?"
  
  },
  {
    "movie": "The lord of the rings",
    "quote": "So do all who live to see such times, but that is not for them to decide. All we have to decide is what to do with the time that is given to us"
  
  },
  {
    "movie": "Harry Potter",
    "quote": "Of course it is happening inside your head, but why on earth should that mean that it is not real?"
  
  },
  {
    "movie": "Harry Potter",
    "quote": "It does not dwell on dreams and forget to live"
  
  },
  {
    "movie": "The Goonies",
    "quote": "heeeeyyyyyy youuuuuuu guyyyyssss"
  
  },
  {
    "movie": "Saving Private Ryan",
    "quote": "F.U.B.A.R. Fucked Up Beyond All Recognition"
  
  },
  {
    "movie": "Star Wars",
    "quote": "May the Force be with you"
  
  },
  {
    "movie": "The Godfather",
    "quote": "I’m going to make him an offer he can’t refuse"
  },
  {
    "movie": "Taxi Driver",
    "quote": "You talkin’ to me?"
  },
  ];


/* ***** DATABASE ENDS ***** */