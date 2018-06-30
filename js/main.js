console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js';

locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {

    mapService.initMap()
        .then(
            () => {
                mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });

            }
        ).catch(console.warn);



    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            if (getLocByUrl('lat') && getLocByUrl('lng')) {
                var currLat = getLocByUrl('lat')
                var currLng = getLocByUrl('lng')
            } else {
                var currLat = pos.coords.latitude
                var currLng = pos.coords.longitude
            }
            locService.loadCurrLoc(currLat, currLng)

                .then(location => {
                    console.log(location)
                    let currLoc = location[0].formatted_address
                    handleSearch(currLat, currLng, currLoc)
                })
        })

}

document.querySelector('.btn-my-location').addEventListener('click', () => {

    console.log('button show location clicked');
    locService.getPosition()
        .then(pos => {
            console.log('pos is', pos)
            console.log('User position is:', pos.coords);
            let currLat = pos.coords.latitude
            let currLng = pos.coords.longitude
            locService.loadCurrLoc(currLat, currLng)
                .then(location => {
                    console.log(location)
                    let currLoc = location[0].formatted_address
                    handleSearch(currLat, currLng, currLoc)
                })

        })
})



document.querySelector('.btn-search').addEventListener('click', (ev) => {
    console.log('button Go clicked', ev);
    var address = document.querySelector('.search-input').value;
    console.log('address', address)
    locService.loadAddress(address)
        .then(newPos => {
            console.log('new pos is', newPos)
            var newLat = newPos[0].geometry.location.lat
            var newLng = newPos[0].geometry.location.lng
            var newLoc = newPos[0].formatted_address
            handleSearch(newLat, newLng, newLoc)

        })
})

document.querySelector('.btn-copy').addEventListener('click', () => {
    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            let currLat = pos.coords.latitude
            let currLng = pos.coords.longitude
            copyToClipboard(currLat, currLng)
        })
})


function handleSearch(lat, lng, loc) {

    mapService.centerMap(lat, lng)
    mapService.addMarker({ lat, lng });

    renderCurrLoc(loc)
    weatherService.loadWeather(lat, lng)
        .then(weatherData => {
            console.log(weatherData)
            renderWeather(weatherData)
        })
        .catch(err => {
            console.log('err!!!', err);
        })

}

function renderCurrLoc(locStr) {
    console.log('loc is', locStr)
    let strHtml = `You Are Here: ${locStr}`
    document.querySelector('.curr-loc').innerText = strHtml

}

function renderWeather(weatherData) {
    let temp = weatherData.main.temp
    let desc = weatherData.weather[0].description
    let location = weatherData.name
    let icon = weatherData.weather[0].icon
    let maxTemp = weatherData.main.temp_max
    let minTemp = weatherData.main.temp_min
    let strHtml = `Today's wheather in ${location} is ${desc} ,
    <img src = "http://openweathermap.org/img/w/${icon}.png">
     Current temparture: ${temp} , max temparture: ${maxTemp}`;
    document.querySelector('.weather-data').innerHTML = strHtml
}

function copyToClipboard(lat, lng) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = `https://shiranze.github.io/Travel-App/index.html?lat=${lat}lng:=${lng}`
    console.log(dummy.value)
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

}

function getLocByUrl(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}