//converte the unix time format to the yyyy/mm/dd hh:mm:ss format
        function unixConverter(unixTime) {
            const date = new Date(unixTime * 1000);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
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
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
                return 'East';
            } else if (windDeg >= 101.25 && windDeg <= 123.75) {
                return 'ESE';
            } else if (windDeg >= 123.75 && windDeg <= 146.25) {
                return 'SE';
            } else if (windDeg >= 146.25 && windDeg <= 168.75) {
                return 'SSE';
            } else if (windDeg >= 168.75 && windDeg <= 191.25) {
                return 'South';
            } else if (windDeg >= 191.25 && windDeg <= 213.75) {
                return 'SSW';
            } else if (windDeg >= 213.75 && windDeg <= 236.25) {
                return 'SW';
            } else if (windDeg >= 236.25 && windDeg <= 258.75) {
                return 'WSW';
            } else if (windDeg >= 258.75 && windDeg <= 281.25) {
                return 'West';
            } else if (windDeg >= 281.25 && windDeg <= 303.75) {
                return 'WNW';
            } else if (windDeg >= 303.75 && windDeg <= 326.25) {
                return 'NW';
            } else if (windDeg >= 326.25 && windDeg <= 348.75) {
                return 'NNW';
            } else {
                return 'North';
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
                    const unixTime = data.dt; //time variable in unix time 
                    const unixTime1 = data.sys.sunrise; //sunrise time variable in unix time 
                    const unixTime2 = data.sys.sunset;  //sunset time variable in unix time 
                    const formattedDateTime = unixConverter(unixTime); //coverter to yyyy/mm/dd hh:mm:ss format
                    const formattedDateTime1 = unixConverter(unixTime1); //coverter to yyyy/mm/dd hh:mm:ss format
                    const formattedDateTime2 = unixConverter(unixTime2); //coverter to yyyy/mm/dd hh:mm:ss format

                    const durationInSeconds = data.timezone; //timezone
                    const formattedDuration = utcConverter(durationInSeconds); // convert timezone to utc standart


                    
                    //Show the information from the JSON
                    document.getElementById('result').innerHTML = `
      <h2>Weather in ${cityName} - ${data.name}, ${data.sys.country}:</h2>
      <p>Longitude: ${data.coord.lon}</p>
      <p>Latitude: ${data.coord.lat}</p>
      <p>ID: ${data.weather[0].id}</p>
      <p>Weather: ${data.weather[0].main} - ${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="weather icon">

      <p>Temperature: ${data.main.temp} °C</p>
      <p>Feels like: ${data.main.feels_like} °C</p>
      <p>Minimal: ${data.main.temp_min} °C</p>
      <p>Maximum: ${data.main.temp_max} °C</p>
      <p>Pressure: ${(data.main.pressure)/10} kPa</p>
      <p>Humidity: ${data.main.humidity} %</p>
      <p>Visibility: ${(data.visibility)/1000} km</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
      <p>Direction: ${windDirection(data.wind.deg)} </p>

            
      <p>Time Zone: ${formattedDuration}</p>
      <p>Time: ${formattedDateTime}</p>
      <p>Sunrise: ${formattedDateTime1}</p>
      <p>Sunset: ${formattedDateTime2}</p>     
      `;
                })
                .catch(error => {
                    document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
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
                    // Max and Min Temp for the day
                    const tempMin1 = Math.min(data.list[0].main.temp_min, data.list[1].main.temp_min, data.list[2].main.temp_min, data.list[3].main.temp_min, data.list[4].main.temp_min, data.list[5].main.temp_min, data.list[6].main.temp_min);
                    const tempMin2 = Math.min(data.list[7].main.temp_min, data.list[8].main.temp_min, data.list[9].main.temp_min, data.list[10].main.temp_min, data.list[11].main.temp_min, data.list[12].main.temp_min, data.list[13].main.temp_min);
                    const tempMin3 = Math.min(data.list[14].main.temp_min, data.list[15].main.temp_min, data.list[16].main.temp_min, data.list[17].main.temp_min, data.list[18].main.temp_min, data.list[19].main.temp_min, data.list[20].main.temp_min);
                    const tempMin4 = Math.min(data.list[21].main.temp_min, data.list[22].main.temp_min, data.list[23].main.temp_min, data.list[24].main.temp_min, data.list[25].main.temp_min, data.list[26].main.temp_min, data.list[27].main.temp_min);
                    const tempMin5 = Math.min(data.list[28].main.temp_min, data.list[29].main.temp_min, data.list[30].main.temp_min, data.list[31].main.temp_min, data.list[32].main.temp_min, data.list[33].main.temp_min, data.list[34].main.temp_min);
                    const tempMax1 = Math.max(data.list[0].main.temp_max, data.list[1].main.temp_max, data.list[2].main.temp_max, data.list[3].main.temp_max, data.list[4].main.temp_max, data.list[5].main.temp_max, data.list[6].main.temp_max);
                    const tempMax2 = Math.max(data.list[7].main.temp_max, data.list[8].main.temp_max, data.list[9].main.temp_max, data.list[10].main.temp_max, data.list[11].main.temp_max, data.list[12].main.temp_max, data.list[13].main.temp_max);
                    const tempMax3 = Math.max(data.list[14].main.temp_max, data.list[15].main.temp_max, data.list[16].main.temp_max, data.list[17].main.temp_max, data.list[18].main.temp_max, data.list[19].main.temp_max, data.list[20].main.temp_max);
                    const tempMax4 = Math.max(data.list[21].main.temp_max, data.list[22].main.temp_max, data.list[23].main.temp_max, data.list[24].main.temp_max, data.list[25].main.temp_max, data.list[26].main.temp_max, data.list[27].main.temp_max);
                    const tempMax5 = Math.max(data.list[28].main.temp_max, data.list[29].main.temp_max, data.list[30].main.temp_max, data.list[31].main.temp_max, data.list[32].main.temp_max, data.list[33].main.temp_max, data.list[34].main.temp_max);


                    //Show the information from the JSON
                    document.getElementById('result2').innerHTML = `
           <h2>Forecast in ${cityName} - ${data.city.name}, ${data.city.country}:</h2>
           
           <p>Date: ${dayWeek(data.list[3].dt)}, ${data.list[3].dt_txt}</p>
           <img src="https://openweathermap.org/img/wn/${data.list[3].weather[0].icon}.png" alt="weather icon">
           
           <p>Weather: ${data.list[3].weather[0].main} - ${data.list[3].weather[0].description}</p>
           <p>Temperature: ${data.list[3].main.temp} °C</p>
           <p>Minimal: ${tempMin1} °C</p> 
           <p>Maximum: ${tempMax1} °C</p>
           <p>PoP: ${100 * (data.list[3].pop)} % </p>
           <br>
                      

           <p>Date: ${dayWeek(data.list[11].dt)}, ${data.list[11].dt_txt}</p>
           <img src="https://openweathermap.org/img/wn/${data.list[11].weather[0].icon}.png" alt="weather icon">
           
           <p>Weather: ${data.list[11].weather[0].main} - ${data.list[11].weather[0].description}</p>
           <p>Temperature: ${data.list[11].main.temp} °C</p>
           <p>Minimal: ${tempMin2} °C</p> 
           <p>Maximum: ${tempMax2} °C</p>
           <p>PoP: ${100 * (data.list[11].pop)} % </p>
           <br>

           <p>Date: ${dayWeek(data.list[19].dt)}, ${data.list[19].dt_txt}</p>
           <img src="https://openweathermap.org/img/wn/${data.list[19].weather[0].icon}.png" alt="weather icon">
           
           <p>Weather: ${data.list[19].weather[0].main} - ${data.list[19].weather[0].description}</p>
           <p>Temperature: ${data.list[19].main.temp} °C</p>
           <p>Minimal: ${tempMin3} °C</p> 
           <p>Maximum: ${tempMax3} °C</p>
           <p>PoP: ${100 * (data.list[19].pop)} % </p>
<br>

           <p>Date: ${dayWeek(data.list[27].dt)}, ${data.list[27].dt_txt}</p>
           <img src="https://openweathermap.org/img/wn/${data.list[27].weather[0].icon}.png" alt="weather icon">
           
           <p>Weather: ${data.list[27].weather[0].main} - ${data.list[27].weather[0].description}</p>
           <p>Temperature: ${data.list[27].main.temp} °C</p>
           <p>Minimal: ${tempMin4} °C</p> 
           <p>Maximum: ${tempMax4} °C</p>
           <p>PoP: ${100 * (data.list[27].pop)} % </p>
           <br>

           <p>Date: ${dayWeek(data.list[35].dt)}, ${data.list[35].dt_txt}</p>
           <img src="https://openweathermap.org/img/wn/${data.list[35].weather[0].icon}.png" alt="weather icon">
           
           <p>Weather: ${data.list[35].weather[0].main} - ${data.list[35].weather[0].description}</p>
           <p>Temperature: ${data.list[35].main.temp} °C</p>
           <p>Minimal: ${tempMin5} °C</p> 
           <p>Maximum: ${tempMax5} °C</p>
           <p>PoP: ${100 * (data.list[35].pop)} % </p>
      `;
                })
                .catch(error => {
                    document.getElementById('result2').innerHTML = `<p>Error: ${error.message}</p>`;
                });
        }