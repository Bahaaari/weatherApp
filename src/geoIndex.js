function showCurrentTemperature(response) {
  console.log(response);
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `The outside temperature is ${temperature}°C`;
}

function showPosition(position) {
  console.log(position);
  let apiKey = "0d4847b8ed5adf866001a54ef0a28029";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  console.log(lat);
  console.log(long);
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}
navigator.geolocation.getCurrentPosition(showPosition);
