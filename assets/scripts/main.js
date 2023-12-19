// Variáveis e seleção de elementos
const apiKey = '';
const apiCountryURL = 'https://countryflagsapi.com/png'

const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature');
const tempMaxElement = document.querySelector('#tempMax');
const tempMinElement = document.querySelector('#tempMin');
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
    tempElement.innerHTML = parseInt(data.main.temp);
    descriptionElement = data.weather[0]
    tempMaxElement.innerHTML = ("Max: " + parseInt(data.main.temp_max) + " º");
    tempMinElement.innerHTML = ("Min: " + parseInt(data.main.temp_min) + " º");
};

//Eventos
searchButton.addEventListener('click', (e) => {
    e.preventDefault();

    const city = searchInput.value;

    showWeatherData(city);
});
