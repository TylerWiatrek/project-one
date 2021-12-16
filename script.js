function initPage() {
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);


    searchEl.addEventListener("click",function() {
        const searchTerm = inputEl.value;
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search",JSON.stringify(searchHistory));
        renderSearchHistory();
    })
    clearEl.addEventListener("click",function() {
        searchHistory = [];
        renderSearchHistory();
    })
}
function renderSearchHistory() {
    historyEl.innerHTML = "";
    for (let i=0; i<searchHistory.length; i++) {
        const historyItem = document.createElement("input");
        historyItem.setAttribute("type","text");
        historyItem.setAttribute("readonly",true);
        historyItem.setAttribute("class", "form-control d-block bg-white");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click",function() {
            getWeather(historyItem.value);
        })
        historyEl.append(historyItem);
    }
    
}
function saveRecentSearches(city) {
    recentSearchHistory = localStorage.getItem("recentSearches") ?
        JSON.parse(localStorage.getItem("recentSearches")) : [];
    recentSearchHistory.push(city)

    // keeps array at length of 5 
    if (recentSearchHistory.length > 5) {
        recentSearchHistory.shift();
    }
    localStorage.setItem("recentSearches", JSON.stringify(recentSearchHistory))
    clearBtns()
    getSearches()
}
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


        });
}
var getTimes = function(city, data) {
    
    var getSunriseTime = document.createElement("p");
    getSunriseTime.textContent = `Sunrise: ${data.results.sunrise}`
    var getSunsetTime = document.createElement("p");
    getSunsetTime.textContent = `Sunset: ${data.results.sunset}`
    sunriseEl.append(getSunriseTime);
    sunsetEl.append(getSunsetTime);
    var dayLength = document.createElement("p");
    dayLength.classList.add("extra")
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
var getWeather = function(city, data) {
    console.log(data);
    var civilClouds = document.createElement("p");
    civilClouds.classList.add("extra")
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

initPage();