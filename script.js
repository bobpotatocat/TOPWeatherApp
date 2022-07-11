async function searchCity(city) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3ce2bc45d8df0e4c0883da0fbcd37334`
    );
    const weatherData = await response.json();
    updateWeatherCard(
      weatherData.name,
      weatherData.weather[0].description,
      weatherData.main.temp,
      weatherData.main.humidity
    );
  } catch {
    console.log("error");
  }

  //   console.log(weatherData.weather[0].description);
  //3ce2bc45d8df0e4c0883da0fbcd37334
}

function updateWeatherCard(city, description, temperature, humidity) {
  const weatherCardEl = document.getElementById("response-container");
  const cardChildrenEl = weatherCardEl.childNodes;
  cardChildrenEl.forEach((child) => {
    child.textContent = "";
  });
  const cityEl = document.getElementById("city-name");
  const descriptionEl = document.getElementById("description");
  const temperatureEl = document.getElementById("temperature");
  const humidityEl = document.getElementById("humidity");

  cityEl.textContent = city;
  descriptionEl.textContent = description;
  temperatureEl.textContent = temperature;
  humidityEl.textContent = humidity;

  weatherCardEl.style.display = "block";
}

const searchField = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
  searchCity(searchField.value);
});
