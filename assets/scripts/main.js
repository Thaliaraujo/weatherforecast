import { getWeatherData, getForecastData } from './api.js';
import {weekDayNames, getTime, getHours}  from './module.js'

// Variáveis e seleção de elementos
const apiCountryURL = 'https://flagsapi.com/';

const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');

const cityElement = document.querySelector('#city');
const countryIconElement = document.querySelector('#countryIcon')
const tempElement = document.querySelector('#temperature');
const weatherIconElement = document.querySelector('#weatherIcon');
const tempMaxElement = document.querySelector('#tempMax');
const tempMinElement = document.querySelector('#tempMin');
const weatherContainer = document.querySelector('#weatherData');
const modalContainer = document.querySelector('#modalData');
const hourlyForecastElement = document.querySelector('#hourlyForecast');
const dailyForecastElement = document.querySelector('#dailyForecast');
const feelsElement = document.querySelector('#feels');
const sunriseElement = document.querySelector('#sunrise');
const sunsetElement = document.querySelector('#sunset');
const rainElement = document.querySelector('#rain');
const humidityElement = document.querySelector('#humidity');
const cloudinessElement = document.querySelector('#cloudiness');
const windElement = document.querySelector('#wind');
let descriptionElement = document.querySelector('#description');

//Funções
// Exibir previsão do tempo atual
const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    countryIconElement.setAttribute('src', `${apiCountryURL}${data.sys.country}/flat/24.png`);
    tempElement.innerText = `${parseInt(data.main.temp)}º`;
    descriptionElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    tempMaxElement.innerText = `Max: ${parseInt(data.main.temp_max)}º - `;
    tempMinElement.innerText = `Min: ${parseInt(data.main.temp_min)}º`;
    
    weatherContainer.classList.remove('hide');
    modalContainer.classList.remove('hide');
};

// Exibir previsão horária para as próximas 24 horas (cada 3 horas)
const showForecastData = async (city) => {
    const data = await getForecastData(city);
  
    const hourlyForecast = data.list.slice(0, 5); // Considerando as próximas 8 entradas
    hourlyForecastElement.innerHTML = ''; 
  
    hourlyForecast.forEach((hourlyData) => {
      const hour = getHours(hourlyData.dt, data.city.timezone);
      const temperature = parseInt(hourlyData.main.temp);
      const iconURL = `https://openweathermap.org/img/wn/${hourlyData.weather[0].icon}.png`;
  
      const listItem = document.createElement('li');
      listItem.classList.add('segmentControl__item');
      listItem.innerHTML = `
        <div class="segmentControl__item--content">
          <p>${hour}</p>
          <img src="${iconURL}" alt="Condição do tempo" />
          <p>${temperature}°</p>
        </div>
      `;
  
      hourlyForecastElement.appendChild(listItem);
    });
};

// Exibir previsão para os próximos dias
const showDailyForecastData = async (city) => {
    const data = await getForecastData(city);
    
    const dailyForecast = data.list.filter((dailyData,index) => index % 8 === 0);
    dailyForecastElement.innerHTML = '';

    dailyForecast.forEach((dailyData) => {
        const weekDay = weekDayNames[new Date(dailyData.dt * 1000).getUTCDay()];
        const temperature = parseInt(dailyData.main.temp);
        const iconURL = `https://openweathermap.org/img/wn/${dailyData.weather[0].icon}.png`;

        const listItem = document.createElement('li');
        listItem.classList.add('segmentControl__item');
        listItem.innerHTML = `
        <div class="segmentControl__item--content">
            <p>${weekDay}</p>
            <img src="${iconURL}" alt="Condição do tempo" />
            <p>${temperature}°</p>
        </div>
        `;

        dailyForecastElement.appendChild(listItem);
    });
};

// Exibir parâmetros (sunrise, sunset, rain etc)
const showParametersData = async (city) => {
    const data = await getWeatherData(city);

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
};

// Exibir cidade padrão ou última cidade buscada pelo usúario
const loadCityData = async () => {
    try {
        // Recuperar a lista de cidades buscadas do localStorage
        const storedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];

        if (storedCities.length > 0) {
            // Se houver cidades armazenadas, retorne a última cidade da lista
            const lastSearchedCity = storedCities[storedCities.length - 1];
            searchInput.value = lastSearchedCity;
            await showWeatherData(lastSearchedCity);
            showForecastData(lastSearchedCity);
            showDailyForecastData(lastSearchedCity);
            showParametersData(lastSearchedCity);
        } else {
            // Se não houver cidades armazenadas, utiliza a padrão
            const defaultCity = 'Sao Paulo';
            searchInput.value = defaultCity;
            await showWeatherData(defaultCity);
            showForecastData(defaultCity);
            showDailyForecastData(defaultCity);
            showParametersData(defaultCity);
            storedCities.push(defaultCity);
            localStorage.setItem('searchedCities', JSON.stringify(storedCities));
        }
    } catch (error) {
        console.error('Erro ao obter ou mostrar dados da cidade:', error);
    };
};
  

//Eventos
searchButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const city = searchInput.value;

    await showWeatherData(city);
    showForecastData(city);
    showDailyForecastData(city);
    showParametersData(city);

    // Armazenar a cidade atual no localStorage
    try {
        const storedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];
        // Adicionar a cidade atual à lista
        storedCities.push(city);
        // Armazenar a lista atualizada no localStorage
        localStorage.setItem('searchedCities', JSON.stringify(storedCities));
    } catch (error) {
        console.error('Erro ao armazenar a cidade no localStorage:', error);
    };
});

// Evento de carga da página
window.addEventListener('load', async () => {
    await loadCityData();
});