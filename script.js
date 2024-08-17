function getWeather() {
    const apiKey = '3f80b75215a824888e85e3dfb5cc734d';
    const city = document.getElementById('city').value;

    if (city === '') {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey;

    fetch(currentWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayWeather(data);
        })
        .catch(function (error) {
            console.log('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayHourlyForecast(data.list);
        })
        .catch(function (error) {
            console.log('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = '<p>' + data.message + '</p>';
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = 'https://openweathermap.org/img/wn/' + iconCode + '@4x.png';

        tempDivInfo.innerHTML = '<p>' + temperature + '°C</p>';
        weatherInfoDiv.innerHTML = '<p>' + cityName + '</p><p>' + description + '</p>';
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(function (item) {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = 'https://openweathermap.org/img/wn/' + iconCode + '.png';

        const hourlyItemHtml = '<div class="hourly-item">' +
            '<span>' + hour + ':00</span>' +
            '<img src="' + iconUrl + '" alt="Hourly Weather Icon">' +
            '<span>' + temperature + '°C</span>' +
            '</div>';

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}
