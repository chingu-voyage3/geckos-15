'use strict';

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
	return "http://openweathermap.org/img/w/" + icon + ".png";
};



/* 'Core' functions */

// function to get current & forecast weather data based on user's (browser) geolocation
const getLocalWeather = function(position) {

	// sets coordinates returned from 'getPosition' function (above) to variables for API use
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;

	// gets current weather at geolocation
	const currentXHR = new XMLHttpRequest();
	currentXHR.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + pick(), true);
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
	forecastXHR.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + pick(), true);
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
	currentXHR.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + city + pick(), true);
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
	forecastXHR.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + pick(), true);
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