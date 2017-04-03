// const path = require('path');
// const express = require('express');
// const ELEMENTS = require('./elements');
// const {Http} = require('./http');
// const {ELEMENT_SEARCH_BUTTON, ELEMENT_SEARCH_CITY, ELEMENT_LOADING_TEXT, ELEMENT_WEATHER_BOX, ELEMENT_WEATHER_CITY, ELEMENT_WEATHER_DESCRIPTION, ELEMENT_WEATHER_TEMPERATURE } = require('./weather');
//
// const port = process.env.PORT || 3000;
// let app = express();
// app.use(express);

// import es6 modules
import * as ELEMENTS from 'elements.js';
import {Http} from 'http.js';
import {WeatherData, WEATHER_PROXY_HANDLER} from 'weather.js';

// set openweather api key
const APP_ID = 'fffb28c516b89a140482b2f6698dfffa';

//select dom elements for weather requests
ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function searchWeather() {
    //remove spaces
    const CITY_NAME = ELEMENTS.ELEMENT_SEARCH_CITY.value.trim();
    //can't be blank
    if (CITY_NAME.length === 0)  {
        return alert('pick something dude');
    }

    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'block';
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'none';

    //return weather query
    const URL = `https://openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=metric&appid=${APP_ID}`;
    Http.fetchData(URL)
        .then(responseData => {
            const WEATHER_DATA = new WeatherData(CITY_NAME, responseData.weather[0].description.toUpperCase());
            //convert weather through proxy if necessary
            const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
            WEATHER_PROXY.temperature = responseData.main.temp;
            //update weather data
            updateWeather(WEATHER_PROXY);
        })
        .catch(error => alert(error));
    };

    function updateWeather(weatherData) {
        console.log(weatherData);
        ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
        ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
        ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temperature;

        ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
        ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
    }
    // 
    // app.listen(port, () => {
    //   console.log(`Application launched on port:${port}`);
    // });
