function GetWeather(call, callback) {
    console.log('Request to weather service was: ' + JSON.stringify(call));

    const {city: cityName} = call.request;

    let cityWeather = 'Sunny';
    if (/[aeiou]/i.test(cityName.charAt(0))){
        cityWeather = 'Rainy';
    }

    setTimeout(() => {
        callback(null, {city: cityName, weather: cityWeather });
    }, Math.floor((Math.random() * 3000) + 1));

}

exports.GetWeather = GetWeather;