'use strict';

const tempConvert = function(kelvin) {
	const temp = {
		celsius: Math.round(kelvin - 273.15) + "°C",
		fahrenheit: Math.round(((kelvin - 273.15) * 1.8) + 32) + "°F"
	};
	return temp;
};


const getDateInfo = function(numDays) {
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const newDay = new Date();
	const days = [];

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


const getPosition = function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getLocalWeather);
	}
	else {
		return "Unable to retrieve your current positon";
	}
};


const pick = function() {
	return "&appid=5300f8bc54b3884e3240c056f4d4617a";
};


const getIcon = function(icon) {
	return "http://openweathermap.org/img/w/" + icon + ".png";
};


const getLocalWeather = function(position) {

	const lat = position.coords.latitude;
	const lon = position.coords.longitude;


	const locCurrentXHR = new XMLHttpRequest();
	locCurrentXHR.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + pick(), true);
	

	locCurrentXHR.onload = function() {
		if (this.status === 200) {
			const currentData = JSON.parse(this.responseText);
			const currentTemp = tempConvert(currentData.main.temp);
			
			document.getElementsByClassName('display')[0].style.display = 'block';
			document.getElementById('location').innerHTML = currentData.name + ", " + currentData.sys.country;
			document.getElementById('currentTemp').innerHTML = currentTemp.celsius + " / " + currentTemp.fahrenheit;
			document.getElementById('currentWeather').innerHTML = currentData.weather[0].description;
			document.getElementById('currentIcon').src = getIcon(currentData.weather[0].icon);
		}
	}
	locCurrentXHR.send();



	const locForecastXHR = new XMLHttpRequest();
	locForecastXHR.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + pick(), true);
	
	locForecastXHR.onload = function() {
		if (this.status === 200) {
			const forecastData = JSON.parse(this.responseText);
			
			const totalForecasts = forecastData.list.length; 
			const dailyForecasts = [];
			for (let i = 0; i < totalForecasts; i++) {
				if (forecastData.list[i].dt_txt.includes('12:00')) {
					dailyForecasts.push(forecastData.list[i]);
				}
			}

			const dateInfo = getDateInfo(3);
			
			const forecasts = [
				{
					day: dateInfo[0],
					temp: tempConvert(dailyForecasts[0].main.temp),
					weather: dailyForecasts[0].weather[0].main,
					description: dailyForecasts[0].weather[0].description,
					icon: getIcon(dailyForecasts[0].weather[0].icon)
				},
				{
					day: dateInfo[1],
					temp: tempConvert(dailyForecasts[1].main.temp),
					weather: dailyForecasts[1].weather[0].main,
					description: dailyForecasts[1].weather[0].description,
					icon: getIcon(dailyForecasts[1].weather[0].icon)
				},
				{
					day: dateInfo[2],
					temp: tempConvert(dailyForecasts[2].main.temp),
					weather: dailyForecasts[2].weather[0].main,
					description: dailyForecasts[2].weather[0].description,
					icon: getIcon(dailyForecasts[2].weather[0].icon)
				}
			];


			document.getElementById('day0Info').innerHTML = forecasts[0].day.day + ", " + forecasts[0].day.date + " " + forecasts[0].day.month;
			document.getElementById('day0Forecast').innerHTML = forecasts[0].temp.celsius + " / " + forecasts[0].temp.fahrenheit + " - " + forecasts[0].description;
			document.getElementById('day0Icon').src = forecasts[0].icon;

			document.getElementById('day1Info').innerHTML = forecasts[1].day.day + ", " + forecasts[1].day.date + " " + forecasts[1].day.month;
			document.getElementById('day1Forecast').innerHTML = forecasts[1].temp.celsius + " / " + forecasts[1].temp.fahrenheit + " - " + forecasts[1].description;;
			document.getElementById('day1Icon').src = forecasts[1].icon;

			document.getElementById('day2Info').innerHTML = forecasts[2].day.day + ", " + forecasts[2].day.date + " " + forecasts[2].day.month;
			document.getElementById('day2Forecast').innerHTML = forecasts[2].temp.celsius + " / " + forecasts[2].temp.fahrenheit + " - " + forecasts[2].description;;
			document.getElementById('day2Icon').src = forecasts[2].icon;
		}
	};
	locForecastXHR.send();
};



const getCityWeather = function() {
	let city = document.getElementById('cityInput').value;

	const cityCurrentXHR = new XMLHttpRequest();
	cityCurrentXHR.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + city + pick(), true);

	cityCurrentXHR.onload = function() {
		if (this.status === 200) {
			const currentData = JSON.parse(this.responseText);
			const currentTemp = tempConvert(currentData.main.temp);
			
			//console.log(currentData);

			document.getElementsByClassName('display')[0].style.display = 'block';
			document.getElementById('location').innerHTML = currentData.name + ", " + currentData.sys.country;
			document.getElementById('currentTemp').innerHTML = currentTemp.celsius + " / " + currentTemp.fahrenheit;
			document.getElementById('currentWeather').innerHTML = currentData.weather[0].description;
		}
	}
	cityCurrentXHR.send();


	const cityForecastXHR = new XMLHttpRequest();
	cityForecastXHR.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + pick(), true);

	cityForecastXHR.onload = function() {
		if (this.status === 200) {
			const forecastData = JSON.parse(this.responseText);

			const totalForecasts = forecastData.list.length; 
			const dailyForecasts = [];
			for (let i = 0; i < totalForecasts; i++) {
				if (forecastData.list[i].dt_txt.includes('12:00')) {
					dailyForecasts.push(forecastData.list[i]);
				}
			}

			const dateInfo = getDateInfo(3);
			
			const forecasts = [
				{
					day: dateInfo[0],
					temp: tempConvert(dailyForecasts[0].main.temp),
					weather: dailyForecasts[0].weather[0].main,
					description: dailyForecasts[0].weather[0].description,
					icon: getIcon(dailyForecasts[0].weather[0].icon)
				},
				{
					day: dateInfo[1],
					temp: tempConvert(dailyForecasts[1].main.temp),
					weather: dailyForecasts[1].weather[0].main,
					description: dailyForecasts[1].weather[0].description,
					icon: getIcon(dailyForecasts[1].weather[0].icon)
				},
				{
					day: dateInfo[2],
					temp: tempConvert(dailyForecasts[2].main.temp),
					weather: dailyForecasts[2].weather[0].main,
					description: dailyForecasts[2].weather[0].description,
					icon: getIcon(dailyForecasts[2].weather[0].icon)
				}
			];

			document.getElementById('day0Info').innerHTML = forecasts[0].day.day + ", " + forecasts[0].day.date + " " + forecasts[0].day.month;
			document.getElementById('day0Forecast').innerHTML = forecasts[0].temp.celsius + " / " + forecasts[0].temp.fahrenheit + " - " + forecasts[0].description;
			document.getElementById('day0Icon').src = forecasts[0].icon;

			document.getElementById('day1Info').innerHTML = forecasts[1].day.day + ", " + forecasts[1].day.date + " " + forecasts[1].day.month;
			document.getElementById('day1Forecast').innerHTML = forecasts[1].temp.celsius + " / " + forecasts[1].temp.fahrenheit + " - " + forecasts[1].description;;
			document.getElementById('day1Icon').src = forecasts[1].icon;

			document.getElementById('day2Info').innerHTML = forecasts[2].day.day + ", " + forecasts[2].day.date + " " + forecasts[2].day.month;
			document.getElementById('day2Forecast').innerHTML = forecasts[2].temp.celsius + " / " + forecasts[2].temp.fahrenheit + " - " + forecasts[2].description;;
			document.getElementById('day2Icon').src = forecasts[2].icon;
		}
	}
	cityForecastXHR.send();
};



document.getElementsByClassName('radioBtns')[0].addEventListener('click', function() {
	const cityInput = document.getElementById('cityInput');
	document.getElementById('cityBtn').checked ? cityInput.style.display = 'inline' : cityInput.style.display = 'none';
});


document.getElementById('getWeatherButton').addEventListener('click', function() {
	document.getElementById('localBtn').checked ? getPosition() : getCityWeather();
});