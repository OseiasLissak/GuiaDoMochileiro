// Variáveis e seleção de elementos
const apiKey = "c0ff4e1edf5f6a03b52c78d36e7edc82";
/* const apiCountryURL = "https://countryflagsapi.com/png/"; */

const cityInput = document.querySelector("#city-input");
const countryElement = document.querySelector("#country");
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const umidtyElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");




//Funções
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    console.log(data)

    return(data);
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);
    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    countryElement.setAttribute("src", `https://countryflagsapi.com/png/${data.sys.country}`);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
/*     umidtyElement.innerText = `${(data.main.umidity)}%`; */


//Eventos

// Captura nome cidade
searchBtn.addEventListener("click", function (event){
    event.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});