

//converte the unix time format to the yyyy/mm/dd hh:mm:ss format
function unixConverter(unixTime) {
    const date = new Date(unixTime * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}`;
    // return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}
function unixConverter1(unixTime) {
    const date = new Date(unixTime * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${month}/${day}`;
    // return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

// converter the time zone to the UTC format
function utcConverter(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const hoursText = hours < 0 ? `UTC ${hours}:` : hours > 0 ? `UTC +${hours}:` : '';
    const minutesText = minutes < 0 ? `${Math.abs(minutes)}` : minutes > 0 ? `${Math.abs(minutes)}` : '00';
    return hoursText + (hoursText && minutesText ? '' : '') + minutesText;

}

//Day of the week
function dayWeek(unixTime1) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const dateWeek = new Date(unixTime1 * 1000);
    const dayOfWeekIndex = dateWeek.getUTCDay();
    return daysOfWeek[dayOfWeekIndex];
}

//direction of the wind
function windDirection(windDeg) {
    if (windDeg >= 11.25 && windDeg <= 33.75) {
        return 'NNE';
    } else if (windDeg >= 33.75 && windDeg <= 56.25) {
        return 'NE';
    } else if (windDeg >= 56.25 && windDeg <= 78.75) {
        return 'ENE';
    } else if (windDeg >= 78.75 && windDeg <= 101.25) {
        return 'E';
    } else if (windDeg >= 101.25 && windDeg <= 123.75) {
        return 'ESE';
    } else if (windDeg >= 123.75 && windDeg <= 146.25) {
        return 'SE';
    } else if (windDeg >= 146.25 && windDeg <= 168.75) {
        return 'SSE';
    } else if (windDeg >= 168.75 && windDeg <= 191.25) {
        return 'S';
    } else if (windDeg >= 191.25 && windDeg <= 213.75) {
        return 'SSW';
    } else if (windDeg >= 213.75 && windDeg <= 236.25) {
        return 'SW';
    } else if (windDeg >= 236.25 && windDeg <= 258.75) {
        return 'WSW';
    } else if (windDeg >= 258.75 && windDeg <= 281.25) {
        return 'W';
    } else if (windDeg >= 281.25 && windDeg <= 303.75) {
        return 'WNW';
    } else if (windDeg >= 303.75 && windDeg <= 326.25) {
        return 'NW';
    } else if (windDeg >= 326.25 && windDeg <= 348.75) {
        return 'NNW';
    } else {
        return 'N';
    }
}

// MAIN THING IN THIS CODE -- this fetch the information from the API
function fetchWeather() {

    const cityName = document.getElementById('city').value;

    // API key provided by me by signing up to the site
    const apiKey = 'a7988fa58be54314bd77981e2c7bce56';

    // Construct the API URL with the variable city name
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;
    //The 'encodeURIComponent' is a function that encodes the city name to make it safe for inclusion in a URL.
    //Example "New York, USA" => encodeURIComponent => "New%20York%2C%20USA,"

    // Reference to the HTML element where you want to display the result
    const resultContainer = document.getElementById('result');

    fetch(apiUrl) // Replace with your API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const locCity = data.name + ", " + data.sys.country;
          
            document.getElementById("city").style.display = "none";
          
            document.getElementById("city_BTN").style.display = "none";

            document.getElementById("location").innerHTML = locCity;
          
            const unixTime = data.dt; //time variable in unix time 
            const unixTime1 = data.sys.sunrise; //sunrise time variable in unix time 
            const unixTime2 = data.sys.sunset;  //sunset time variable in unix time 
            const formattedDateTime = unixConverter(unixTime); //coverter to yyyy/mm/dd hh:mm:ss format
            const formattedDateTime1 = unixConverter(unixTime1); //coverter to yyyy/mm/dd hh:mm:ss format
            const formattedDateTime2 = unixConverter(unixTime2); //coverter to yyyy/mm/dd hh:mm:ss format

            const durationInSeconds = data.timezone; //timezone
            const formattedDuration = utcConverter(durationInSeconds); // convert timezone to utc standart



            //Show the information from the JSON
            document.getElementById("temperature").innerHTML = Math.round(data.main.temp) + "°C";
            //weather Icon
            const iconSrc = data.weather[0].icon;
            document.getElementById("icon").src = 'https://openweathermap.org/img/wn/' + iconSrc + '@2x.png';

            //description
            document.getElementById("main_description").innerHTML = data.weather[0].main;

            //Highest temperature
            document.getElementById("high").innerHTML = Math.round(data.main.temp_max) + "°C";

            //lowest temperature
            document.getElementById("low").innerHTML = Math.round(data.main.temp_min) + "°C";

            //Feels like
            document.getElementById("feel").innerHTML = Math.round(data.main.feels_like) + "°C";

            //humidity
            document.getElementById("humidity").innerHTML = Math.round(data.main.humidity) + "%";

            //wind speed and direction
            document.getElementById("wind").innerHTML = Math.round(data.wind.speed * 3.6) + " kph " + windDirection(data.wind.deg) + " ";

            //visibility
            document.getElementById("vis").innerHTML = data.visibility / 1000 + " km ";

            //pressure
            document.getElementById("pressure").innerHTML = data.main.pressure / 10 + " kPa";

            //sunrise
            document.getElementById("sunrise").innerHTML = formattedDateTime1;

            //sunset
            document.getElementById("sunset").innerHTML = formattedDateTime2;
        })
        .catch(error => {
            document.getElementById('location').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Weather Forecast




function fetchForecast() {
    const cityName = document.getElementById('city').value;

    // API key provided by me by signing up to the site
    const apiKey = 'a7988fa58be54314bd77981e2c7bce56';

    // Construct the API URL with the variable city name
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;

    // Reference to the HTML element where you want to display the result
    const resultContainer = document.getElementById('result2');

    fetch(apiUrl) // Replace with your API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            //Day and Date ||||||||||||||||||||||||||
            //first day
            document.getElementById("day1").innerHTML = dayWeek(data.list[3].dt);

            document.getElementById("date1").innerHTML = unixConverter1(data.list[3].dt);

            //second day
            document.getElementById("day2").innerHTML = dayWeek(data.list[11].dt);

            document.getElementById("date2").innerHTML = unixConverter1(data.list[11].dt);

            //third day
            document.getElementById("day3").innerHTML = dayWeek(data.list[19].dt);

            document.getElementById("date3").innerHTML = unixConverter1(data.list[19].dt);

            //fourth day
            document.getElementById("day4").innerHTML = dayWeek(data.list[27].dt);

            document.getElementById("date4").innerHTML = unixConverter1(data.list[27].dt);

            //fifth day
            document.getElementById("day5").innerHTML = dayWeek(data.list[35].dt);

            document.getElementById("date5").innerHTML = unixConverter1(data.list[35].dt);

            //Icons ||||||||||||||||||||||||||||||||||
            //first day
            const icon1Src = data.list[3].weather[0].icon;
            document.getElementById("icon1").src = 'https://openweathermap.org/img/wn/' + icon1Src + '.png';

            //second day
            const icon2Src = data.list[11].weather[0].icon;
            document.getElementById("icon2").src = 'https://openweathermap.org/img/wn/' + icon2Src + '.png';

            //third day
            const icon3Src = data.list[19].weather[0].icon;
            document.getElementById("icon3").src = 'https://openweathermap.org/img/wn/' + icon3Src + '.png';

            //fourth day
            const icon4Src = data.list[27].weather[0].icon;
            document.getElementById("icon4").src = 'https://openweathermap.org/img/wn/' + icon4Src + '.png';

            //fifth day
            const icon5Src = data.list[35].weather[0].icon;
            document.getElementById("icon5").src = 'https://openweathermap.org/img/wn/' + icon5Src + '.png';

            //High ||||||||||||||||||||||||||||||||||
            //first day
            const tempMax1 = Math.max(data.list[0].main.temp_max, data.list[1].main.temp_max, data.list[2].main.temp_max, data.list[3].main.temp_max, data.list[4].main.temp_max, data.list[5].main.temp_max, data.list[6].main.temp_max, data.list[7].main.temp_max);

            document.getElementById("high1").innerHTML = Math.round(tempMax1) + "°C";

            //second day
            const tempMax2 = Math.max(data.list[8].main.temp_max, data.list[9].main.temp_max, data.list[10].main.temp_max, data.list[11].main.temp_max, data.list[12].main.temp_max, data.list[13].main.temp_max, data.list[14].main.temp_max, data.list[15].main.temp_max);

            document.getElementById("high2").innerHTML = Math.round(tempMax2) + "°C";

            //third day
            const tempMax3 = Math.max(data.list[16].main.temp_max, data.list[17].main.temp_max, data.list[18].main.temp_max, data.list[19].main.temp_max, data.list[20].main.temp_max, data.list[21].main.temp_max, data.list[22].main.temp_max, data.list[23].main.temp_max);

            document.getElementById("high3").innerHTML = Math.round(tempMax3) + "°C";

            //fourth day
            const tempMax4 = Math.max(data.list[24].main.temp_max, data.list[25].main.temp_max, data.list[26].main.temp_max, data.list[27].main.temp_max, data.list[28].main.temp_max, data.list[29].main.temp_max, data.list[30].main.temp_max, data.list[31].main.temp_max);

            document.getElementById("high4").innerHTML = Math.round(tempMax4) + "°C";

            //fifth day
            const tempMax5 = Math.max(data.list[32].main.temp_max, data.list[33].main.temp_max, data.list[34].main.temp_max, data.list[35].main.temp_max, data.list[36].main.temp_max, data.list[37].main.temp_max, data.list[38].main.temp_max, data.list[39].main.temp_max);

            document.getElementById("high5").innerHTML = Math.round(tempMax5) + "°C";

            //Low ||||||||||||||||||||||||||||||||||||
            //First day
            const tempMin1 = Math.min(data.list[0].main.temp_min, data.list[1].main.temp_min, data.list[2].main.temp_min, data.list[3].main.temp_min, data.list[4].main.temp_min, data.list[5].main.temp_min, data.list[6].main.temp_min, data.list[7].main.temp_min);

            document.getElementById("low1").innerHTML = Math.round(tempMin1) + "°C";

            //second day
            const tempMin2 = Math.min(data.list[8].main.temp_min, data.list[9].main.temp_min, data.list[10].main.temp_min, data.list[11].main.temp_min, data.list[12].main.temp_min, data.list[13].main.temp_min, data.list[14].main.temp_min, data.list[15].main.temp_min);

            document.getElementById("low2").innerHTML = Math.round(tempMin2) + "°C";

            //third day
            const tempMin3 = Math.min(data.list[16].main.temp_min, data.list[17].main.temp_min, data.list[18].main.temp_min, data.list[19].main.temp_min, data.list[20].main.temp_min, data.list[21].main.temp_min, data.list[22].main.temp_min, data.list[23].main.temp_min);

            document.getElementById("low3").innerHTML = Math.round(tempMin3) + "°C";

            //fourth day
            const tempMin4 = Math.min(data.list[24].main.temp_min, data.list[25].main.temp_min, data.list[26].main.temp_min, data.list[27].main.temp_min, data.list[28].main.temp_min, data.list[29].main.temp_min, data.list[30].main.temp_min, data.list[31].main.temp_min);

            document.getElementById("low4").innerHTML = Math.round(tempMin4) + "°C";

            //fifth day
            const tempMin5 = Math.min(data.list[32].main.temp_min, data.list[33].main.temp_min, data.list[34].main.temp_min, data.list[35].main.temp_min, data.list[36].main.temp_min, data.list[37].main.temp_min, data.list[38].main.temp_min, data.list[39].main.temp_min);

            document.getElementById("low5").innerHTML = Math.round(tempMin5) + "°C";

            //POP ||||||||||||||||||||||||||||||||||||
            //First day
            document.getElementById("pop1").innerHTML = Math.round(100 * (data.list[3].pop)) + "%";

            //second day
            document.getElementById("pop2").innerHTML = Math.round(100 * (data.list[11].pop)) + "%";

            //third day
            document.getElementById("pop3").innerHTML = Math.round(100 * (data.list[19].pop)) + "%";

            //fourth day
            document.getElementById("pop4").innerHTML = Math.round(100 * (data.list[27].pop)) + "%";

            //fifth day
            document.getElementById("pop5").innerHTML = Math.round(100 * (data.list[35].pop)) + "%";

            //Description ||||||||||||||||||||||||||||
            //First day
            document.getElementById("desc1").innerHTML = data.list[3].weather[0].main;

            //second day
            document.getElementById("desc2").innerHTML = data.list[11].weather[0].main;

            //third day
            document.getElementById("desc3").innerHTML = data.list[19].weather[0].main;

            //fourth day
            document.getElementById("desc4").innerHTML = data.list[27].weather[0].main;

            //fifth day
            document.getElementById("desc5").innerHTML = data.list[35].weather[0].main;
        })
        .catch(error => {
            document.getElementById('result2').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}
//hide and show city input
function CityInput() {
    const city = document.getElementById("city");
    if (city.style.display == "inline") {
        document.getElementById("city").style.display = "none";
        document.getElementById("city_BTN").style.display = "none";
    }
    else {
        document.getElementById("city").style.display = "inline";
        document.getElementById("city_BTN").style.display = "inline";
    }
}
/*function FetchFunction() {
    document.getElementById("city").style.display = "none";
    document.getElementById("city_BTN").style.display = "none";

    document.getElementById("location").innerHTML = locCity;
}*/