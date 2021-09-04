let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinute = now.getMinutes();
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${currentDay}, ${currentHour}:${currentMinute}`;
let apiKey = "0d4847b8ed5adf866001a54ef0a28029";

let city = "Tehran, Iran";
let headingCity = document.querySelector("h1");
headingCity.innerHTML = city;
let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrlCity).then(currentWeather);

function currentCity(response) {
  let City = document.querySelector("#current-city");
  let currentCity = response.data.name;
  City.innerHTML = currentCity;

  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentWeather);
}

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  console.log(lat);
  console.log(long);
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentCity);
}

function currentLocation(position) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", currentLocation);

function currentWeather(response) {
  console.log(response);

  console.log(response.data.main.temp);
  console.log(response.data.main.humidity);
  console.log(response.data.wind.speed);
  console.log(response.data.weather[0].main);
  let temperature = Math.round(response.data.main.temp);
  let celsiusDegree = document.querySelector(".temperature");
  celsiusDegree.innerHTML = temperature;
  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  let windSpeedData = document.querySelector("#wind");
  windSpeedData.innerHTML = windSpeed;
  let humidity = response.data.main.humidity;
  let humidityData = document.querySelector("#humidity");
  humidityData.innerHTML = humidity;
  let weatherSky = response.data.weather[0].main;
  let weatherSkyData = document.querySelector("#sky");
  weatherSkyData.innerHTML = weatherSky;
}

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let heading = document.querySelector("#current-city");
  let city = searchInput.value;
  heading.innerHTML = city;
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCity).then(currentWeather);
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", showCity);
