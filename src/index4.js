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
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
}

function searchCity(city) {
  let apiKey = "cc18170596dd9fcd6f13e84c39a52c30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
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





