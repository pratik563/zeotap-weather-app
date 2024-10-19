import React, { useEffect, useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [isCelsius, setIsCelsius] = useState(true);
  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertTemp = (temp) => {
    return isCelsius ? temp : (temp * 9) / 5 + 32;
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/weather")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setIsLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false); // Also set loading to false on error
      });
  }, []);

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>Error: {error}</p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => window.location.reload()} // Option to reload the page
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col p-4 items-center justify-center w-full bg-black h-full">
      <h1 className="text-4xl font-bold mb-8 text-white text-center">
        Weather in Indian Cities
      </h1>
      {isLoading ? (
        <p>Loading weather data...</p>
      ) : (
        <ul className="grid grid-cols-1 cursor-pointer md:grid-cols-2 lg:grid-cols-3 gap-8">
          {weatherData.length > 0 ? (
            weatherData.map((cityWeather) => (
              <li
                key={cityWeather.city}
                className={`bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition-transform transform hover:scale-105 ${
                  cityWeather.main === "Clear"
                    ? "bg-blue-200"
                    : cityWeather.main === "Rain"
                    ? "bg-gray-200"
                    : ""
                }`}
              >
                <h2 className="text-xl text-center font-semibold mb-2">
                  {cityWeather.city}
                </h2>
                <img
                  src={`http://openweathermap.org/img/wn/${cityWeather.icon}.png`}
                  alt="Weather icon"
                  className="w-12 mx-auto h-12"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/path/to/fallback.png"; // Fallback image URL
                  }}
                />

                <p className="text-lg">
                  <strong>
                    {convertTemp(cityWeather.temp)}°{isCelsius ? "C" : "F"}
                  </strong>
                  , feels like{" "}
                  <strong>
                    {convertTemp(cityWeather.feels_like)}°
                    {isCelsius ? "C" : "F"}
                  </strong>
                </p>

                <p className="text-gray-900 text-center ">
                  Condition: {cityWeather.main}
                </p>
                {cityWeather.alert && (
                  <p className="text-red-500 font-bold">{cityWeather.alert}</p>
                )}
              </li>
            ))
          ) : (
            <p>No weather data available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Weather;
