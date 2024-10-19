import React, { useEffect, useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/weather")
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Error fetching weather data:", error));
  }, []);

  return (
    <div>
      <h1>Weather in Indian Cities</h1>
      <ul>
        {weatherData.map((cityWeather) => (
          <li key={cityWeather.city}>
            <strong>{cityWeather.city}</strong>: {cityWeather.temp}°C, feels
            like {cityWeather.feels_like}°C ({cityWeather.main})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Weather;
