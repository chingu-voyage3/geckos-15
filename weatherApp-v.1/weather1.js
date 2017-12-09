'use strict';

const getLocation = function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getWeather);
	}
	else {
		document.getElementById("temperature").innerHTML = "Sorry your browser doesn't support geolocation"
	}
};


const getWeather = function(position) {

	// assigns user's coordinates to variables - used in 'request.open'
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;

	// AJAX request for weather data
	const request = new XMLHttpRequest();
	request.open('GET', "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + '&lon=' + longitude, true);

	request.onload = function() {
		if (this.status === 200) {
			const data = JSON.parse(this.responseText);


			const tempCelcius = Math.round(data.main.temp) + "°C";
			const tempFahrenheit = Math.round((data.main.temp * 1.8 + 32)) + "°F";


			document.getElementById("currentLocation").innerHTML = data.name + ", " + data.sys.country;
			document.getElementById("temperature").innerHTML = "Temperature: " + tempCelcius + " / " + tempFahrenheit;
			document.getElementById("weather").innerHTML = data.weather[0].main + " - " + data.weather[0].description;
			document.getElementById("weatherIcon").innerHTML = '<img src=' + data.weather[0].icon + ' alt="Icon depicting current weather">';

		}
		else {
			document.getElementById("temperature").innerHTML = "Sorry There was an error with your request - please try again later"
		}
	}
	request.send();
};

document.getElementById("getWeatherButton").addEventListener('click', getLocation);