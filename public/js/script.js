let form = document.getElementById("weatherForm");
let countryInput = document.getElementById("countryInput");
let weatherResultContainer = document.querySelector(".weather-result-container");
let dataContainer = document.querySelector(".data-container");
let errorContainer = document.querySelector(".error-container");

let countryName = document.querySelector(".country-name span");
let countryLocation = document.querySelector(".country-location span");
let countryCast = document.querySelector(".country-cast span");
let castIcon = document.querySelector(".cast-icon");
let countryTemperature = document.querySelector(".country-temperature span");
let errorMessage = document.querySelector(".error-message span");
let slider = document.querySelector(".slider");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(countryInput.value);
  getWeather();
  form.reset();
});

let getWeather = async () => {
  try {
    const address = countryInput.value;
    const response = await fetch(
      `http://127.0.0.1:3000/weather?address=${address}`
    );
    const data = await response.json();
    console.log(data);
    if (data.error) {
      displayWeatherError(data);
    } else {
      displayWeatherData(data);
    }
  } catch (error) {}
};
/////////////////////////////////////////
//            display Data            //
///////////////////////////////////////
const displayWeatherData = (data) => {
  dataContainer.style.display = "flex";
  errorContainer.style.display = "none";
  weatherResultContainer.style.display = "flex";
  playAnimation("2s");
  resetdata();
  displayData(countryName, data.name, 500);
  displayData(countryLocation, data.location, 1000);
  displayData(countryCast, data.weatherCast, 1400);
  setTimeout(() => {
    castIcon.src = data.icon;
  }, 1600);
  setTimeout(() => {
    countryTemperature.innerHTML = data.temperature;
    stopAnimation();
  }, 2000);
};
/////////////////////////////////////////
//            display error           //
///////////////////////////////////////
const displayWeatherError = (data) => {
  dataContainer.style.display = "none";
  weatherResultContainer.style.display = "flex";
  errorContainer.style.display = "flex";
  playAnimation("0.4s");
  resetdata();
  setTimeout(() => {
    errorMessage.innerHTML = data.error;
    stopAnimation();
  }, 700);
};
/////////////////////////////////////////
//          display Data FN           //
///////////////////////////////////////
const displayData = (el, data, time) => {
  setTimeout(() => {
    el.innerHTML = data;
  }, time);
};

/////////////////////////////////////////
//        Animation functions         //
///////////////////////////////////////
const playAnimation = (s) => {
  slider.style.animationName = "viewAn";
  slider.style.animationPlayState = "running";
  slider.style.animationDuration = s;
};
const stopAnimation = () => {
  slider.style.animationName = "viewAn2";
  slider.style.animationPlayState = "paused";
};

const resetdata = () => {
  countryName.innerHTML = "";
  countryLocation.innerHTML = "";
  countryCast.innerHTML = "";
  castIcon.src = "";
  errorMessage.innerHTML = "";
};
