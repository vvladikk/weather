const apiKey = 'e5d22b2f34e4c4634499e1f97bf317a3';
const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const cityNameElement = document.getElementById("cityName");
const temperatureElement = document.getElementById("temperature");
const weatherDescriptionElement = document.getElementById("weatherDescription");
const windSpeedElement = document.getElementById("windSpeed");
const humidityElement = document.getElementById("humidity");
const weatherCard = document.getElementById("weatherCard");

const defaultCity = "";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeatherData(city);
  }
});

async function getWeatherData(city) {
  try {
    const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`);
    const data = await response.json();
    if (data.success === false) {
      alert(data.error.info);   
    } else {
      cityNameElement.textContent = data.location.name;
      temperatureElement.textContent = data.current.temperature;
      weatherDescriptionElement.textContent = data.current.weather_descriptions[0];
      windSpeedElement.textContent = data.current.wind_speed;
      humidityElement.textContent = data.current.humidity;
      weatherCard.style.display = "block"; 
    }
  } catch (error) {
    console.error("Помилка при виконанні запиту:", error);
    alert("Помилка при отриманні даних про погоду!");
  }
}

getWeatherData(defaultCity);