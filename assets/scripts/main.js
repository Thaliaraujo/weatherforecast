import { getWeatherData } from './api.js';
import {getTime}  from './module.js'
import { getDate } from './module.js';
import { getHours } from './module.js';

// Variáveis e seleção de elementos
const apiCountryURL = 'https://flagsapi.com/';

const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');

const weatherContainer = document.querySelector('#weatherData');
const modalContainer = document.querySelector('#modalData');
const cityElement = document.querySelector('#city');
const countryIconElement = document.querySelector('#countryIcon')
const tempElement = document.querySelector('#temperature');
const tempMaxElement = document.querySelector('#tempMax');
const tempMinElement = document.querySelector('#tempMin');
const weatherIconElement = document.querySelector('#weatherIcon');
const feelsElement = document.querySelector('#feels');
const sunriseElement = document.querySelector('#sunrise');
const sunsetElement = document.querySelector('#sunset');
const rainElement = document.querySelector('#rain');
const humidityElement = document.querySelector('#humidity');
const cloudinessElement = document.querySelector('#cloudiness');
const windElement = document.querySelector('#wind');

let descriptionElement = document.querySelector('#description');

//Funções

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    countryIconElement.setAttribute('src', `${apiCountryURL}${data.sys.country}/flat/24.png`);
    tempElement.innerText = `${parseInt(data.main.temp)}º`;
    descriptionElement.innerText = data.weather[0].description;
    tempMaxElement.innerText = `Max: ${parseInt(data.main.temp_max)}º - `;
    tempMinElement.innerText = `Min: ${parseInt(data.main.temp_min)}º`;
    weatherIconElement.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    
    // Converter o timestamp de sunrise e sunset para hora e minutos
    const sunriseTime = getTime(data.sys.sunrise, data.timezone);
    sunriseElement.innerHTML = `${sunriseTime}`;

    const sunsetTime = getTime(data.sys.sunset, data.timezone);
    sunsetElement.innerHTML = `Por do sol: ${sunsetTime}`;

    feelsElement.innerText = `${parseInt(data.main.feels_like)}º`;

    const rain1h = data.rain ? `${parseInt(data.rain['1h'])}mm` : 'Sem chuva';
    rainElement.innerHTML = rain1h;

    humidityElement.innerHTML = `${parseInt(data.main.humidity)}%`;
    cloudinessElement.innerHTML = `${parseInt(data.clouds.all)}%`;
    windElement.innerHTML = `${parseInt(data.wind.speed)}m/s`;
    
    weatherContainer.classList.remove('hide');
    modalContainer.classList.remove('hide');
};

//Eventos
searchButton.addEventListener('click', (e) => {
    e.preventDefault();

    const city = searchInput.value;

    showWeatherData(city);
});
