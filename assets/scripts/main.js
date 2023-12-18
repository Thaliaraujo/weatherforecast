// Variáveis e seleção de elementos
const apiKey = 'c93c1f54b865a94eec32533acaccfb1e';
const apiCountryURL = 'https://countryflagsapi.com/png'

const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');

//Funções
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    console.log(data);
};

const showWeatherData = (city) => {
    getWeatherData(city);
};

//Eventos
searchButton.addEventListener('click', (e) => {
    e.preventDefault();

    const city = searchInput.value;

    showWeatherData(city);
});