/**
 * Created by Lufheran on 07/09/15.
 */
(function() {
    //Variables of the different API
    var API_WORLDTIME_KEY = "d6a4075ceb419113c64885d9086d5";
    var API_WORLDTIME = "https://api.worldweatheronline.com/free/v2/tz.ashx?format=json&key=" + API_WORLDTIME_KEY + "&q=";

    var API_WEATHER_KEY = "80114c7878f599621184a687fc500a12";
    var API_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_WEATHER_KEY + "&";
    var IMG_WEATHER = "http://openweathermap.org/img/w/";

    var today = new Date();
    var timeNow = today.toLocaleTimeString();
    var timeToShow;

    var $body = $("body");
    var $loader = $(".loader");
    var $buttonAdd = $("[data-button='add']");
    var $nameNewCity = $("[data-input='cityAdd']")
    //Cities
    var cityWeather={};
    cityWeather.zone;
    cityWeather.icon;
    cityWeather.temp;
    cityWeather.temp_max;
    cityWeather.temp_min;
    cityWeather.main;

    //Function of button Add
    $($buttonAdd).on("click",addNewCity);
    $($nameNewCity).on("keypress",function(){
        if(event.which ==13){
            addNewCity();
        }
    });


    //Show the different errors
    if(navigator.geolocation ){
        navigator.geolocation.getCurrentPosition(getCoords, errorFound);

    }else{
        alert("Not supported for your browser")
    }

    function errorFound(error){

        var message  = "An mistake occurred";

        switch (error.code){
            case 0:
                alert(message +", unknow");
                break;
            case 1:
                alert(message + ", permission denied");
                break;
            case 2:
                alert(message + ", position not available");
                break;
            case 3:
                alert(message + ", Timeout");
                break;
        }
    }
    //Get Coordinates (latitude and longitude)
    function getCoords(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        //Get data of API
        $.getJSON(API_WEATHER_URL + "lat=" + lat + "&lon=" + lon,getCurrentWeather);

    }

    //Get values of API
    function getCurrentWeather(data){
        cityWeather.zone = data.name;
        cityWeather.icon = IMG_WEATHER+ data.weather[0].icon+".png";
        cityWeather.temp = data.main.temp - 273.15;
        cityWeather.temp_max = data.main.temp_max - 273.15;
        cityWeather.temp_min = data.main.temp_min -273.15;
        cityWeather.main = data.weather[0].main;
        renderTemplate(cityWeather);

    }

    function activateTemplate(id){
        var t = document.querySelector(id);
        return document.importNode(t.content, true);
    }
    function renderTemplate(cityWeather,localTime){
        var clone = activateTemplate("#template--city");

        if(localTime){
            timeToShow = localTime.split(" ")[1];
        }else{
            timeToShow = timeNow;
        }
        clone.querySelector("[data-time]").innerHTML= timeToShow;
        clone.querySelector("[data-city]").innerHTML = cityWeather.zone;
        clone.querySelector("[data-icon]").src = cityWeather.icon;
        clone.querySelector("[data-temp='max']").innerHTML = cityWeather.temp_max.toFixed(1);
        clone.querySelector("[data-temp='min']").innerHTML = cityWeather.temp_min.toFixed(1);
        clone.querySelector("[data-temp='current']").innerHTML = cityWeather.temp.toFixed(1);

        $($loader).hide();
        $($body).append(clone);
    }

    function addNewCity(event){
        event.preventDefault();
        $.getJSON(API_WEATHER_URL + "q=" + $($nameNewCity).val(), getWeatherNewCity);

    }

    function getWeatherNewCity(data){
        $.getJSON(API_WORLDTIME+data.name,function(dataTime) {
            cityWeather = {};
            cityWeather.zone = data.name;
            cityWeather.icon = IMG_WEATHER + data.weather[0].icon + ".png";
            cityWeather.temp = data.main.temp - 273.15;
            cityWeather.temp_max = data.main.temp_max - 273.15;
            cityWeather.temp_min = data.main.temp_min - 273.15;
            cityWeather.main = data.weather[0].main;

            renderTemplate(cityWeather,dataTime.data.time_zone[0].localtime);
        });
    }
})();