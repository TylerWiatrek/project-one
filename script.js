var searchCityEl = document.querySelector("#sunrise-form");
var cityInputEl = document.querySelector("#city");

var getCityCoordinates = function(city) {
    
    var apiCoordURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2ea8fea258bbf4c7d30e6cc6067e3356`
    fetch(apiCoordURL)
    .then(function(response) {
        return response.json()
    }).then(function(data){
        console.log(data.coord)
        getSunriseSunset(data.coord)
       
        });
};




var getSunriseSunset = function(coordinates) {
    var {lat} = coordinates;
    var {lon} = coordinates;
    console.log(lat);
    console.log(lon);
    var apiSunrise = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}`
    fetch(apiSunrise)
    .then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data)
    });
};


var getSearch = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    getCityCoordinates(cityName);
}

searchCityEl.addEventListener("submit", getSearch);