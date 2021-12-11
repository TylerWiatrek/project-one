var searchCityEl = document.querySelector("#sunrise-form");
var cityInputEl = document.querySelector("#city");
var civilTwilightEl = document.getElementById("civil-twilight");
var nauticalTwilightEl = document.getElementById("nautical-twilight");
var astroTwilightEl = document.getElementById("astro-twilight");

var getCityCoordinates = function(city) {
    
    var apiCoordURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2ea8fea258bbf4c7d30e6cc6067e3356`
    fetch(apiCoordURL)
    .then(function(response) {
        return response.json()
    }).then(function(data){
        console.log(data);
        console.log(data.coord)
        getSunriseSunset(data.coord)
        console.log(city)
        });
};




var getSunriseSunset = function(coordinates) {
    var {lat} = coordinates;
    var {lon} = coordinates;
    //console.log(lat);
    //console.log(lon);
    var apiSunrise = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}`
    fetch(apiSunrise)
    .then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data)
        getCivilTwilight(city, data);
        getNauticalTwilight(city, data);
        getAstroTwilight(city, data);
        //console.log(data.results.sunrise)
    });
};

var getCivilTwilight = function(city, data) {
    var civilTitle = document.createElement("h2");
    // need to add classes here for the title of each civil, nautical, astro div
    //civilTitle.classList.add("");
    civilTitle.textContent = "Civil Twilight";
    var civilTimeStart = document.createElement("p");
    var civilTimeEnd = document.createElement("p");
    civilTimeStart.textContent = `Civil Twilight Start: ${data.results.civil_twilight_begin}`
    civilTimeEnd.textContent = `Civil Twilight End: ${data.results.civil_twilight_end}`
    civilTwilightEl.append(civilTitle, civilTimeStart, civilTimeEnd);








}

var getNauticalTwilight = function(city, data) {
    var nauticalTitle = document.createElement("h2");
    // need to add classes here for the title of each civil, nautical, astro div
    //civilTitle.classList.add("");
    nauticalTitle.textContent = "Nautical Twilight";
    var nauticalTimeStart = document.createElement("p");
    var nauticalTimeEnd = document.createElement("p");
    nauticalTimeStart.textContent = `Nautical Twilight Start: ${data.results.nautical_twilight_begin}`
    nauticalTimeEnd.textContent = `Nautical Twilight End: ${data.results.nautical_twilight_end}`
    nauticalTwilightEl.append(nauticalTitle, nauticalTimeStart, nauticalTimeEnd);





}

var getAstroTwilight = function(city, data) {
    var astroTitle = document.createElement("h2");
    // need to add classes here for the title of each civil, nautical, astro div
    //civilTitle.classList.add("");
    astroTitle.textContent = "Astronomical Twilight";
    var astroTimeStart = document.createElement("p");
    var astroTimeEnd = document.createElement("p");
    astroTimeStart.textContent = `Astronomical Twilight Start: ${data.results.astronomical_twilight_begin}`
    astroTimeEnd.textContent = `Astronomical Twilight End: ${data.results.astronomical_twilight_end}`
    astroTwilightEl.append(astroTitle, astroTimeStart, astroTimeEnd);



}


var getSearch = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    getCityCoordinates(cityName);
}

searchCityEl.addEventListener("submit", getSearch);