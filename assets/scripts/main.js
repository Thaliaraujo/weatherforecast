// Variáveis e seleção de elementos
const apiKey = 'c93c1f54b865a94eec32533acaccfb1e';
const apiCountryURL = 'https://flagsapi.com/';

const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');

const cityElement = document.querySelector('#city');
const countryIconElement = document.querySelector('#countryIcon')
const tempElement = document.querySelector('#temperature');
const tempMaxElement = document.querySelector('#tempMax');
const tempMinElement = document.querySelector('#tempMin');
const weatherIconElement = document.querySelector('#weatherIcon');
let descriptionElement = document.querySelector('#description');

//Funções
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    countryIconElement.setAttribute('src', `${apiCountryURL}${data.sys.country}/flat/24.png`);
    tempElement.innerText = (parseInt(data.main.temp) + 'º');
    descriptionElement.innerText = data.weather[0].description;
    tempMaxElement.innerText = ('Max: ' + parseInt(data.main.temp_max) + ' º');
    tempMinElement.innerText = ('Min: ' + parseInt(data.main.temp_min) + ' º');
    weatherIconElement.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
};

//Eventos
searchButton.addEventListener('click', (e) => {
    e.preventDefault();

    const city = searchInput.value;

    showWeatherData(city);
});
