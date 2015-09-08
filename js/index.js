/**
 * Created by Lufheran on 07/09/15.
 */
(function() {
    if(navigator.geolocation ){
        navigator.geolocation.getCurrentPosition(getCoords, errorFound);

    }else{
        alert("Not supported for your browser")
    }

    var API_WEATHER_KEY =""

    function errorFound(error){
        alert("An mistake occurred"+ error.code);
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