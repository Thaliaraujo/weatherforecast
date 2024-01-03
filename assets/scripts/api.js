const apiKey = 'c93c1f54b865a94eec32533acaccfb1e';

export const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
};


export const getForecastData = async (city) => {
    const apiForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=en`;
  
    const res = await fetch(apiForecastURL);
    const data = await res.json();
  
    return data;
};
  