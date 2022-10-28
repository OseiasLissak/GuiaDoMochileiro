// Variáveis e seleção de elementos
const apiKeyWeather = "c0ff4e1edf5f6a03b52c78d36e7edc82";
const apiKeyTimeZoneDb = "OF6CZ95QMSQJ"
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";
const apiKeyIpGeolocation = "39dfe0024e624b7f902b4842d618d946";

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
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyWeather}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    console.log(data)

    return(data);   
}

const getTimeApi = async (nameCity,nameCountry) => {
    /* const lat = latCity;
    const lon = lonCity; */
    
   /*  const apiTimeZoneURL =   `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKeyTimeZoneDb}&format=json&by=position&lat=${lat}&lng=${lon}`;

    console.log(apiTimeZoneURL)

   const responseTimeZone = await fetch(apiTimeZoneURL);
   const TimeZoneData = await responseTimeZone.json();
   console.log(TimeZoneData); */

   const city = nameCity;
   const country = nameCountry;
   const apiIpGeolocation = `https://api.ipgeolocation.io/timezone?apiKey=${apiKeyIpGeolocation}&location=${city},%20${country}`;
console.log(apiIpGeolocation)
   const responseIpGeoLocation = await fetch(apiIpGeolocation);
   const responseIpGeoLocationData = await responseIpGeoLocation.json();
   console.log(responseIpGeoLocationData);

     

}

//ERROR
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
    weatherDataContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);
 
    
   /*  const lonCity = data.coord.lon;
    const latCity = data.coord.lat; */
    const nameCountry = data.sys.country;
    const nameCity = data.name;
    console.log(nameCity, nameCountry)
    
    getTimeApi(nameCity, nameCountry);
   
    
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
