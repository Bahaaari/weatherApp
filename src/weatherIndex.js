let apiKey = "0d4847b8ed5adf866001a54ef0a28029";
let city = "tehran";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

function showTemperature(response) {
  console.log(response);
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h1");
  temperatureElement.innerHTML = `It is ${temperature} degrees in ${city}`;
}
axios.get(apiUrl).then(showTemperature);
