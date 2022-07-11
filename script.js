async function searchCity(city) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3ce2bc45d8df0e4c0883da0fbcd37334`
    );
    const weatherData = await response.json();

    console.log(weatherData.timezone);

    updateWeatherCard(
      weatherData.name,
      weatherData.timezone,
      weatherData.weather[0].description,

      weatherData.main.temp,
      weatherData.main.humidity
    );
  } catch {
    alert("couldn't find city :( try searching again?");
  }
  //   console.log(weatherData.weather[0].description);
  //3ce2bc45d8df0e4c0883da0fbcd37334
  //time zone db api
  // P6CZE6YISV53
}

function updateWeatherCard(
  city,
  timeOffset,
  description,
  temperature,
  humidity
) {
  const weatherCardEl = document.getElementById("response-container");
  const cardChildrenEl = weatherCardEl.childNodes;
  cardChildrenEl.forEach((child) => {
    child.textContent = "";
  });
  const cityEl = document.getElementById("city-name");
  const timeEl = document.getElementById("current-time");
  const descriptionEl = document.getElementById("description");
  const temperatureEl = document.getElementById("temperature");
  const humidityEl = document.getElementById("humidity");

  cityEl.textContent = city;
  timeEl.textContent = getLocalTime(timeOffset);
  descriptionEl.textContent = description;
  temperatureEl.textContent = temperature;
  humidityEl.textContent = humidity;
  updateIconResponse(description);
  weatherCardEl.style.display = "block";
}

function getLocalTime(sOffset) {
  //get GMT time at location
  let datetimeThere = new Date(sOffset * 1000 + new Date().getTime());
  console.log("from getlocaltime fnctio: ", datetimeThere.toUTCString());
  return datetimeThere.toUTCString();
}

async function updateIconResponse(description) {
  const img = document.getElementById("weather-icon");
  const loadingInfo = document.getElementById("loading-info");
  const iconResponse = document.getElementById("icon-response");
  iconResponse.style.display = "block";
  try {
    let searchTerm = description.split(" ").pop();
    console.log(searchTerm);
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=TwKniFwxfrgfYYzx4wC9hGFKhltxiuZe&s=${searchTerm}`,
      { mode: "cors" }
    );

    const imgData = await response.json();

    img.src = imgData.data.images.original.url;
    loadingInfo.textContent = `${searchTerm} gif just for you!`;
  } catch (error) {
    loadingInfo.textContent = "Aww snap, no gif available :(";
  }
}

const searchField = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
  searchCity(searchField.value);
  searchField.value = "";
});
