/**
 * Created by Lufheran on 07/09/15.
 */
(function() {

    var API_WORLDTIME_KEY = "d6a4075ceb419113c64885d9086d5";
    var API_WORLDTIME = "https://api.worldweatheronline.com/free/v2/tz.ashx?format=json&key=" + API_WORLDTIME_KEY + "&q=";
    var API_WEATHER_KEY = "80114c7878f599621184a687fc500a12";
    var API_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_WEATHER_KEY + "&";
    var IMG_WEATHER = "http://openweathermap.org/img/w/";

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

    function getCoords(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

    }

})();