function resize(el) {
  el.style.width = (el.value.length + 2) + "ch";
}

// Starts from here
let input = document.querySelector("#cityInput");
let condition = document.querySelector("#conditionText");
let temperature = document.querySelector("#temperature");
let wind = document.querySelector("#wind");
let pressure = document.querySelector("#pressure");
let humidity = document.querySelector("#humidity");
let error = document.querySelector("h4");
let weatherIcon = document.querySelector("#weatherIcon");

function getCustomIcon(iconCode) {
    const map = {
        "01d": "./Icons/clear.png",
        "01n": "./Icons/clear.png",

        "02d": "./Icons/fewclouds.png",
        "02n": "./Icons/fewclouds.png",

        "03d": "./Icons/scattered.png",
        "03n": "./Icons/scattered.png",

        "04d": "./Icons/broken.png",
        "04n": "./Icons/broken.png",

        "09d": "./Icons/shower.png",
        "09n": "./Icons/shower.png",

        "10d": "./Icons/rain.png",
        "10n": "./Icons/rain.png",

        "11d": "./Icons/thunder.png",
        "11n": "./Icons/thunder.png",

        "13d": "./Icons/snow.png",
        "13n": "./Icons/snow.png",

        "50d": "./Icons/mist.png",
        "50n": "./Icons/mist.png"
    };

    return map[iconCode];
}

let API_KEY = "0448b52ef0fc55c1d4f78e9f99f3d9f7";

let debouceTimer;
input.addEventListener("input", function () {
  error.textContent = "";
  clearTimeout(debouceTimer);

  debouceTimer = setTimeout(() => {
    if (input.value.trim() === "") return;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}&units=metric`;

    (async function getWeather() {
      let rawData = await fetch(url);
      let data = await rawData.json();
      if (data.cod === "404") {
        error.textContent = data.message + "!"
      }
      weatherIcon.src = getCustomIcon(data.weather[0].icon);
      condition.textContent = data.weather[0].main;
      temperature.textContent = data.main.temp+"°C";
      wind.textContent = data.wind.speed;
      pressure.textContent = data.main.pressure;
      humidity.textContent = data.main.humidity;
    })();

  }, 1000)
})


