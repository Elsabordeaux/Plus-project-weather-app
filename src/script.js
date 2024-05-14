function displayWeather(response) {
  let displayedTemperature = document.querySelector(
    "#displayed-temperature-value"
  );
  let currentTemperature = response.data.temperature.current;
  let cityDisplayed = document.querySelector("#displayed-city");
  let conditionsDisplayed = document.querySelector("#conditions");
  let humidityDisplayed = document.querySelector("#humidity");
  let windDisplayed = document.querySelector("#wind-speed");
  let timeDisplayed = document.querySelector("#day-and-time");

  let iconLeft = document.querySelector("#icon-left");
  let iconRight = document.querySelector("#icon-right");
  let date = new Date(response.data.time * 1000);

  searchedCity = response.data.city;
  localConditions = response.data.condition.description;
  localHumidity = response.data.temperature.humidity;
  localWindSpeed = response.data.wind.speed;
  localIcon = response.data.condition.icon_url;

  cityDisplayed.innerHTML = searchedCity;
  displayedTemperature.innerHTML = Math.round(currentTemperature);
  conditionsDisplayed.innerHTML = localConditions;
  timeDisplayed.innerHTML = formatDate(date);
  humidityDisplayed.innerHTML = `${localHumidity}%`;
  windDisplayed.innerHTML = `${localWindSpeed}km/h`;
  iconRight.innerHTML = `<img src="${localIcon}" class="displayed-emoji-right">`;
  iconLeft.innerHTML = `<img src="${localIcon}" class= "displayed-emoji-left">`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = `dd83fab04t350832b43f1o8b985e5044`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = `dd83fab04t350832b43f1o8b985e5044`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="column">
              <div class="weather-forecast-day">${formatDay(day.time)}</div>
                <img src="${day.condition.icon_url}"
              />
              <span class="forecast-temperatures">
                <span class="forecast-temperature-max">${Math.round(
                  day.temperature.maximum
                )}° </span>

                <span class="forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )}°</span>
              </span>
            </div>
          `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("London");
