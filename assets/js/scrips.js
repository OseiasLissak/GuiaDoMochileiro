// Variáveis e seleção de elementos
const apiKeyWeather = "c0ff4e1edf5f6a03b52c78d36e7edc82";
const apiKeyTimeZoneDb = "OF6CZ95QMSQJ"
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplashKey = "GyrBDpBL0sgOOTSghSb7tgGcif-t7JRhM8fr1Bh0Vlg";
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

// Funções
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyWeather}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    console.log(data)

    getPopulation(data.name), getTimeZoneDate(data.name), getCountry(data.sys.country);
    return(data);
}


//Fuso horário
const getTimeZoneDate = async (city) => {
    const apiTimeZoneDateURL = `https://api.api-ninjas.com/v1/worldtime?city=${encodeURIComponent(city)}`;
    const initNinjas = {
        method: 'GET',
        headers: { 'X-Api-Key': apiKeyApiNinjas },
    };

    try {
        const response = await fetch(apiTimeZoneDateURL, initNinjas);
        if (!response.ok) {
            throw new Error(`Erro ao buscar fuso horário: ${response.status}`);
        }
        const data = await response.json();

        if (data.hour !== undefined && data.minute !== undefined && data.second !== undefined) {
            timezoneElement.innerText = `${data.hour}:${data.minute}:${data.second}`;
            dateElement.innerText = `${data.day_of_week}, ${data.day}-${data.month}-${data.year}`;
        } else {
            timezoneElement.innerText = "N/A";
            dateElement.innerText = "N/A";
        }

        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        timezoneElement.innerText = "Erro";
        dateElement.innerText = "Erro";
        return null;
    }
}

//População
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

//País
const getCountry = async (country) => {

    const apiBigDataURL = `https://api.bigdatacloud.net/data/country-info?code=${country}&key=${apiKeyBigData}`;

    const responseInfoCountries = await fetch(apiBigDataURL);
    const countriesData = await responseInfoCountries.json();

    console.log(countriesData);

    languageElement.innerText = countriesData.isoAdminLanguages[0].isoName;
    coinElement.innerText = `${countriesData.currency.code}, ${coinElement.innerText = countriesData.currency.name}`;
    codeElement.innerText = `DDI:${countriesData.callingCode}`;
    
}

//Imagem de fundo
const getUnsplashImage = async(city) => {
    const apiUnsplashURL = `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiUnsplashKey}`;

    try {
        const res = await fetch(apiUnsplashURL);
        const data = await res.json();
        
        if (data.results && data.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const imageUrl = data.results[randomIndex].urls.full;
            return imageUrl;
        } else {
            return null; // Retorna null se não houver resultados
        }
    } catch (error) {
        console.error("Erro ao buscar imagem do Unsplash:", error);
        return null;
    }
};

//ERROR
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
    weatherDataContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    console.log(data)
    
    if(data.cod === "404"){
        showErrorMessage();
        return;
    } else{
        errorMessageContainer.classList.add("hide");
        cityElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp);
        // Exemplo: tamanho de largura 160px
        const countryCode = data.sys.country;
        countryElement.setAttribute("src", `https://flagcdn.com/w160/${countryCode.toLowerCase()}.png`);
        /* countryElement.setAttribute("src", `https://countryflagsapi.com/png/${data.sys.country}`); */
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        humidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = `${data.wind.speed}km/h`;
        
        // Change bg image
        const imageUrl = await getUnsplashImage(city);
        if (imageUrl) {
            document.body.style.backgroundImage = `url("${imageUrl}")`;
        }

        weatherDataContainer.classList.remove("hide");
    }
}

//Eventos

// Captura nome cidade
searchBtn.addEventListener("click", function (event){
    event.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) =>{
    if(e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
    }
});