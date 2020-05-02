const weatherWrapper = document.querySelector(".weather__wrapper");


function getWeather(lat ,lon){
    const KEY = "ee3090214708ba2f031e6ae17cafe4c4";
    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`;

    fetch(weatherApi)
    .then(function(res){
        return res.json();
    })
    .then(function(fuckingWeather){
        console.log(fuckingWeather.main.temp);
        console.log(fuckingWeather.weather[0].main)
    })
}

getLocation = async() => {
    await navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            getWeather(lat, lon);
        }
    );
}

getLocation();