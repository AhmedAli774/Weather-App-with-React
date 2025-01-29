import React, { useState } from "react";
import "./App.css"; // CSS فائل امپورٹ کریں

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const apiKey = "b7192acc7ffa9506e4db18fb1839a336"; // آپ کی API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
        alert("City not found!");
      }
    } catch (error) {
      alert("Error fetching data");
    }
  };

  return (
    <div className="app-container">
      <div className="weather-box">
        <h1 className="title">Weather App</h1>

        <div className="input-container">
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input-field"
          />
          <button onClick={fetchWeather} className="fetch-button">
            Get Weather
          </button>
        </div>

        {weather && (
          <div className="weather-info">
            <h2 className="city-name">{weather.name}</h2>
            <p className="weather-description">{weather.weather[0].description}</p>
            <p className="temperature">{weather.main.temp}°C</p>
            <div className="additional-info">
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
