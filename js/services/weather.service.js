
function loadWeather(lat, lng) {
    const API_WEATHER_KEY = 'b1b1e872e1c9e96f1c42bf34bdd72aa8';
    var prm = fetch(`https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${lng}&APPID=${API_WEATHER_KEY}`);
    return prm.then(function (res) {
        var prmJson = res.json();
        return prmJson.then(data => {
            // console.log(data.weather)
            return data

        })
    })
    console.log('Sent the Request');
}


export default {
    loadWeather

}

