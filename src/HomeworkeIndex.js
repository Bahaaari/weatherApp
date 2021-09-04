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
let apiPoint = "http://api.openweathermap.org/data/2.5/weather?";

function getCurrentWeather(response) {
  //console.log(response);
  document.querySelector("#current-city").innerHTML = response.data.name;
  // console.log(response.data.main.temp);
  // console.log(response.data.main.humidity);
  // console.log(response.data.wind.speed);
  // console.log(response.data.weather[0].main);
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

function searchCity(city) {
  let apiUrlCity = `${apiPoint}q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCity).then(getCurrentWeather);
}
function handleSunmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  searchCity(city);
}

function searchLocation(position) {
  // console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  // console.log(lat);
  //console.log(long);
  let apiUrl = `${apiPoint}lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getCurrentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", handleSunmit);

let button = document.querySelector("button");
button.addEventListener("click", getCurrentLocation);

searchCity("Tehran");
