// Variáveis e seleção de elementos
const apiKey = "c0ff4e1edf5f6a03b52c78d36e7edc82";
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const countryElement = document.querySelector("#country");
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherDataContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");




//Funções
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    console.log(data)

    return(data);
}

//ERROR
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
    weatherDataContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    if(data.cod === "404"){
        showErrorMessage();
        return;
    } else{
    errorMessageContainer.classList.add("hide");
    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    countryElement.setAttribute("src", `https://countryflagsapi.com/png/${data.sys.country}`);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    humidityElement.innerText = `${data.main.humidity}%`; 
    windElement.innerText = `${data.wind.speed}km/h`


    // Change bg image
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
    weatherDataContainer.classList.remove("hide");
    }
}   

//Eventos

// Captura nome cidade
searchBtn.addEventListener("click", function (event){
    event.preventDefault();
    const city = cityInput.value;
    console.log(city)
    showWeatherData(city);
}); 

cityInput.addEventListener("keyup", (e) =>{
    if(e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
    }
});
