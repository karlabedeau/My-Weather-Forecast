function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  //console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  //document.querySelector("#percipitation").innerHTML = Math.min(
  //response.data.rain.1h(percipitation only occurs in rain or snow)
  //);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  console.log(forecast);

  forecastElement.innerHTML = `
  <div class="col-sm">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          ${formatHours(forecast.dt * 1000)}
        </h5>
          <p class="card-text">
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png"
            />
          </p>
            <div class="weather-forecast-temperature">
              <strong>${Math.round(
                forecast.main.temp_max
              )}°</strong> / ${Math.round(forecast.main.temp_min)}°c
            </div>
      </div>
    </div>
  </div>`;

  forecast = response.data.list[1];
  forecastElement.innerHTML =
    forecastElement.innerHTML +
    `
  <div class="col-sm">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          ${formatHours(forecast.dt * 1000)}
        </h5>
          <p class="card-text">
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png"
            />
          </p>
            <div class="weather-forecast-temperature">
              <strong>${Math.round(
                forecast.main.temp_max
              )}°</strong> / ${Math.round(forecast.main.temp_min)}°c
            </div>
      </div>
    </div>
  </div>`;

  forecast = response.data.list[2];
  forecastElement.innerHTML =
    forecastElement.innerHTML +
    `
  <div class="col-sm">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          ${formatHours(forecast.dt * 1000)}
        </h5>
          <p class="card-text">
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png"
            />
          </p>
            <div class="weather-forecast-temperature">
              <strong>${Math.round(
                forecast.main.temp_max
              )}°</strong> / ${Math.round(forecast.main.temp_min)}°c
            </div>
      </div>
    </div>
  </div>`;

  forecast = response.data.list[3];
  forecastElement.innerHTML =
    forecastElement.innerHTML +
    `
  <div class="col-sm">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          ${formatHours(forecast.dt * 1000)}
        </h5>
          <p class="card-text">
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png"
            />
          </p>
            <div class="weather-forecast-temperature">
              <strong>${Math.round(
                forecast.main.temp_max
              )}°</strong> / ${Math.round(forecast.main.temp_min)}°c
            </div>
      </div>
    </div>
  </div>`;
}

function searchCity(city) {
  let apiKey = "cc18170596dd9fcd6f13e84c39a52c30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  //debugger;
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
  //let cityElement = document.querySelector("#city");
  //let cityInput = document.querySelector("#city-input");
  //cityElement.innerHTML = cityInput.value;
}

let timeElement = document.querySelector("#time");
let currentTime = new Date();
let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", handleSubmit);

timeElement.innerHTML = formatDate(currentTime);

searchCity("Montreal");





