const API_KEY = "cfe4a0a2c40d88ed5de36e214339b8fc";
const BASE_URL = "https://api.openweathermap.org";

let elLocation = selectElement(".info__location");
let elDate = selectElement(".info__date");
let elDegree = selectElement(".info__degree");
let elWeatherName = selectElement(".info__weather-name");
let elWeatherBetween = selectElement(".info__weather-between");
let elInput = selectElement(".form__input");
let elCitiesList = selectElement(".cities-list");

let days = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

let months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

let getDate = () => {
  let date = new Date();

  let month = date.getMonth();
  let day = date.getDay();
  let year = date.getFullYear();
  let dates = date.getDate();

  return `${days[day]}, ${months[month]} ${dates}, ${year}`;
};

let render = (weather) => {
  let degree = Math.round(weather.main.temp - 273.15);

  elLocation.textContent = weather.name;
  elDegree.textContent = `${degree}°C`;
  elDate.textContent = getDate();
  elWeatherName.textContent = weather.weather[0].main;
  elWeatherBetween.textContent = `Wind: ${weather.wind.speed} km/h`;
};

let getWeather = async (lat, lon) => {
  let path = `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  let weather = await request(path);

  render(weather);
};

let onSearch = debounce(async (evt) => {
  if (evt.target.value) {
    let path = `/geo/1.0/direct?q=${evt.target.value}&limit=5&appid=${API_KEY}`;
    let cities = await request(path);

    elCitiesList.innerHTML = null;

    cities.forEach((city) => {
      let elLi = createElement("li"); 

      elLi.textContent = city.name;
      elLi.dataset.lat = city.lat;
      elLi.dataset.lon = city.lon;

      elCitiesList.append(elLi);
    });
  } else {
    elCitiesList.innerHTML = null;
  }
}, 500);

let onSelectCity = (evt) => {
  let lat = evt.target.dataset.lat;
  let lon = evt.target.dataset.lon;

  elCitiesList.innerHTML = null;
  getWeather(lat, lon);
} 

elInput.addEventListener("input", onSearch);
elCitiesList.addEventListener("click", onSelectCity);
getWeather("41.3050232", "69.4694492");
