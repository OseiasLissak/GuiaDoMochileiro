// Variáveis e seleção de elementos
const apiKeyWeather = "c0ff4e1edf5f6a03b52c78d36e7edc82";
const apiKeyTimeZoneDb = "OF6CZ95QMSQJ"
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";
const apiKeyIpGeolocation = "39dfe0024e624b7f902b4842d618d946";
const apiKeyApiNinjas = "HH5+R9kHiPWwfD5ObdlaUw==gO377eLIHNbxaX3D";
const apiKeyBigData = "bdc_a82aaa0389c04063a35f56a20aa81d61";

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

const timezoneElement = document.querySelector("#time-details span");
const dateElement = document.querySelector("#date span");

const populationElement = document.querySelector("#population span");

const languageElement = document.querySelector("#language span");
const coinElement = document.querySelector("#coin span");
const codeElement = document.querySelector("#code-calling span");




//Funções
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyWeather}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    console.log(data)

    getPopulation(data.name), getTimeZoneDate(data.name), getCountry(data.sys.country);  
    return(data);   
}

const getTimeZoneDate = async (city) => {
    
    const apiTimeZoneDateURL = `https://api.api-ninjas.com/v1/worldtime?city=${city}`

    const initNinjas = {
        headers: { 'X-Api-Key': 'HH5+R9kHiPWwfD5ObdlaUw==gO377eLIHNbxaX3D'},
        contentType: 'application/json',
    }

    const responseTimeZoneDate = await fetch(apiTimeZoneDateURL, initNinjas) ;
    const apiTimeZoneDateData = await responseTimeZoneDate.json();

    timezoneElement.innerText = `${apiTimeZoneDateData.hour}:${apiTimeZoneDateData.minute}:${apiTimeZoneDateData.second}`;
    dateElement.innerText = `${apiTimeZoneDateData.day_of_week}, ${apiTimeZoneDateData.day}-${apiTimeZoneDateData.month}-${apiTimeZoneDateData.year}`;

    console.log(apiTimeZoneDateData);

    return(apiTimeZoneDateData);
}


const getPopulation = async (city) => {
    
    const apiPopulationURL = `https://api.api-ninjas.com/v1/city?name=${city}`

    const initNinjas = {
        headers: { 'X-Api-Key': 'HH5+R9kHiPWwfD5ObdlaUw==gO377eLIHNbxaX3D'},
        contentType: 'application/json',
    }

    const responsePopulation = await fetch(apiPopulationURL, initNinjas) ;
    const populationData = await responsePopulation.json();
    console.log(populationData);

    populationElement.innerText = populationData[0].population;

    return(populationData);

}

const getCountry = async (country) => {

    const apiBigDataURL = `https://api.bigdatacloud.net/data/country-info?code=${country}&key=${apiKeyBigData}`;

    const responseInfoCountries = await fetch(apiBigDataURL);
    const countriesData = await responseInfoCountries.json();

    console.log(countriesData);

    languageElement.innerText = countriesData.isoAdminLanguages[0].isoName;
    coinElement.innerText = `${countriesData.currency.code}, ${coinElement.innerText = countriesData.currency.name}`;
    codeElement.innerText = `DDI:${countriesData.callingCode}`;
    
}

//ERROR
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
    weatherDataContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    console.log(data.cod)
   
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
        windElement.innerText = `${data.wind.speed}km/h`;

        
        
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
    showWeatherData(city), getTimeApi(city);
}); 

cityInput.addEventListener("keyup", (e) =>{
    if(e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
    }
});
