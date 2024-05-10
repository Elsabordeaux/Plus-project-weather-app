function displayWeather(response) {
  let displayedTemperature = document.querySelector(
    "#displayed-temperature-value"
  );
  let currentTemperature = response.data.temperature.current;
  displayedTemperature.innerHTML = Math.round(currentTemperature);
  let cityDisplayed = document.querySelector("#displayed-city");
  searchedCity = response.data.city;
  cityDisplayed.innerHTML = searchedCity;
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("London");
