import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./WeatherSearch.css";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [temperature, setTemperature] = useState({});

  function ShowWeather(response) {
    setLoaded(true);
    setTemperature({
      City: city,
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed),
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e5acee71cf900fe7535600e9cd0efeca&units=metric`;
    axios.get(Url).then(ShowWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="container">
      <div className="wrapper-app">
        <div className="wrapper-border">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="row">
              <div className="col-9">
                <input
                  type="search"
                  placeholder="Enter a city"
                  className="form-control"
                  onChange={updateCity}
                />
              </div>
              <div className="col-3">
                <button type="Submit" className="btn btn-primary">
                  Search
                </button>
              </div>
            </div>
          </form>

          <h1>{city}</h1>
          <ul>
            <li>
              Last updated: <span id="date"></span>
            </li>
            <li id="conditions"></li>
          </ul>
          <div className="row">
            <div className="col-6">
              <div className="d-flex justify-content-start">
                <div>
                  <li>
                    <img src={temperature.icon} alt={temperature.description} />
                  </li>
                  <li>{Math.round(temperature.temperature)}°C</li>
                </div>
              </div>
            </div>
            <div className="col-6 right-side">
              <ul>
                <li>Humidity: {temperature.humidity}%</li>
                <li>Wind: {temperature.wind} km/h</li>
              </ul>
            </div>
            <div className="forecast" id="forecast"></div>
          </div>
        </div>
        <small>
          <a href="https://github.com/LuciaTilnakova/weather-app-live">
            Open source
          </a>
          , by Lucia Tilnakova
        </small>
      </div>
    </div>
  );

  if (loaded) {
    return <div>{form}</div>;
  } else {
    return form;
  }
}
