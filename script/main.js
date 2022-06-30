let appid = '75278fee6eaad0f325b37c80f3f2d442';
let units = 'metric';
let searchMethod;

function getSearchMethod(searchTerm){
    if( searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else 
        searchMethod = 'q';
}


function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch (`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appid}&units=${units}`)
    .then( result => {
        return result.json();
    }).then( result => {
        init(result);
    }) 
}
function init(resultFromServer){
    console.log(resultFromServer);
    switch (resultFromServer.weather[0].main){
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = "url('images/Rainy.jpg')";
            break;
        case 'Clouds':
            document.body.style.backgroundImage = "url('images/Cloudy.jpg')";
            break;
        case 'Clear':
            document.body.style.backgroundImage = "url('images/Sunny.jpg')";
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('images/Stormy.jpg')";
            break;
        case 'Snow':
            document.body.style.backgroundImage = "url('images/Snow.jpg')";
            break;
        default:
            break;
    }
    let weatherDescriptionHeader =  document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windspeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '@2x.png';
    
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176' + 'c';

    windSpeedElement.innerHTML = 'Winds at '+ Math.floor(resultFromServer.wind.speed) + 'm/s';

    cityHeader.innerHTML = resultFromServer.name;

    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo () {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.5}px)`;
    weatherContainer.style.visibility = 'visible';

}
document.getElementById('searchButton').addEventListener('click', ()=> {
    let searchTerm = document.getElementById('searchInput').value;

    if (searchTerm)
        searchWeather(searchTerm);
    else 
        console.log('Enter a valid code')
})