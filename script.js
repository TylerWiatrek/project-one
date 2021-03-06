localStorage.setItem("city", cityInputEl)
localStorage.getItem("cityInputEl")
window.localStorage.setItem("searchInputEl", JSON.stringify(cityInputEl));
let cityName = window.localStorage.getItem("cityInputEl");
console.log(JSON.parse(cityName));


var searchCityEl = document.querySelector("#sunrise-form");
var cityInputEl = document.querySelector("#city");
var civilTwilightEl = document.getElementById("civil-twilight");
var nauticalTwilightEl = document.getElementById("nautical-twilight");
var astroTwilightEl = document.getElementById("astro-twilight");
var sunriseEl = document.getElementById("sunrise");
var sunsetEl = document.getElementById("sunset");
var civilButtonEl = document.getElementById("civil-button");
var nauticalButtonEl = document.getElementById("nautical-button");
var astroButtonEl = document.getElementById("astro-button");
var dayLengthEl = document.getElementById("day-length");
var currentLocationEl = document.getElementById("location");
var getCityCoordinates = function(city, date) {
    
    var apiCoordURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2ea8fea258bbf4c7d30e6cc6067e3356`
    fetch(apiCoordURL)
    .then(function(response) {
        return response.json()
    }).then(function(data){
        //console.log(data);
        //console.log(date);
        getSunriseSunset(data.coord)
        getWeather(city, data)
        
        });
};
function getSunriseSunset(coordinates) {
    var { lat } = coordinates;
    var { lon } = coordinates;
    console.log(lat);
    console.log(lon);
    var apiSunrise = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}`;
    fetch(apiSunrise)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            //console.log(data)
            getTimes(city, data);
            getCivilTwilight(city, data);
            getNauticalTwilight(city, data);
            getAstroTwilight(city, data);
            getLocation(city, data);

        });
}
var getTimes = function(city, data) {
    
    var getSunriseTime = document.createElement("p");
    getSunriseTime.classList.add("text")
    getSunriseTime.textContent = `Sunrise: ${data.results.sunrise}`
    var getSunsetTime = document.createElement("p");
    getSunsetTime.classList.add("text");
    getSunsetTime.textContent = `Sunset: ${data.results.sunset}`
    sunriseEl.append(getSunriseTime);
    sunsetEl.append(getSunsetTime);
    var dayLength = document.createElement("p");
    dayLength.classList.add("daylngth")
    dayLength.textContent = `Looks like the day will last for: ${data.results.day_length} hours`
    dayLengthEl.append(dayLength);

}
var getCivilTwilight = function(city, data) {
    var civilTitle = document.createElement("h2");
    // need to add classes here for the title of each civil, nautical, astro div
    //civilTitle.classList.add("");
    civilTitle.textContent = "Civil Twilight";
    var civilTimeStart = document.getElementById("civilTimeStart");
    var civilTimeEnd = document.getElementById("civilTimeEnd");
    civilTimeStart.textContent = `Civil Twilight Start: ${data.results.civil_twilight_begin}`
    civilTimeEnd.textContent = `Civil Twilight End: ${data.results.civil_twilight_end}`
    //civilTwilightEl.append(civilTitle, civilTimeStart, civilTimeEnd);


}
var getLocation = function(city, data) {
    var currentCity = document.createElement("p");
    currentCity.classList.add("City");
    currentCity.textContent = cityInputEl.value.trim();
    console.log(currentCity);
    currentLocationEl.append(currentCity);
}
var getWeather = function(city, data) {
    console.log(data);
    var civilClouds = document.createElement("p");
    civilClouds.classList.add("cloudcvr")
    civilClouds.textContent = `Cloud Coverage: ${data.weather[0].description}`
    civilTwilightEl.append(civilClouds);
}
var getNauticalTwilight = function(city, data) {
    var nauticalTitle = document.createElement("h2");
    // need to add classes here for the title of each civil, nautical, astro div
    //civilTitle.classList.add("");
    nauticalTitle.textContent = "Nautical Twilight";
    var nauticalTimeStart = document.getElementById("nauticalTimeStart");
    var nauticalTimeEnd = document.getElementById("nauticalTimeEnd");
    nauticalTimeStart.textContent = `Nautical Twilight Start: ${data.results.nautical_twilight_begin}`
    nauticalTimeEnd.textContent = `Nautical Twilight End: ${data.results.nautical_twilight_end}`
    //nauticalTwilightEl.append(nauticalTitle, nauticalTimeStart, nauticalTimeEnd);


}
var getAstroTwilight = function(city, data) {

    var astroTitle = document.createElement("h2");
    // need to add classes here for the title of each civil, nautical, astro div
    //civilTitle.classList.add("");
    astroTitle.textContent = "Astro Twilight";
    var astroTimeStart = document.getElementById("astroTimeStart");
    var astroTimeEnd = document.getElementById("astroTimeEnd");
    astroTimeStart.textContent = `Astro Twilight Start: ${data.results.astronomical_twilight_begin}`
    astroTimeEnd.textContent = `Astro Twilight End: ${data.results.astronomical_twilight_end}`
    //astroTwilightEl.append(astroTitle, astroTimeStart, astroTimeEnd);


}
var viewportWidth = window.innerWidth || document.documentElement.clientWidth;


var getSearch = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    getCityCoordinates(cityName);
}
var getCivilDefinition = function(event) {
    alert("The civil button was clicked!");

}
var getNauticalDefinition = function(event) {
    alert("The nautical button was clicked!");

}
var getAstroDefinition = function(event) {
    alert("The astronomical button was clicked!");

}
 document.getElementById("civil-button").addEventListener("click", getCivilDefinition);
 document.getElementById("nautical-button").addEventListener("click", getNauticalDefinition);
 document.getElementById("astro-button").addEventListener("click", getAstroDefinition);

searchCityEl.addEventListener("submit", getSearch);