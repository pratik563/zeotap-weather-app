const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const Weather = require("./models/Weather");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const API_KEY = process.env.API_KEY;
const cities = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
];
const Weather = require("./models/Weather"); // Import Weather model

app.get("/api/weather", async (req, res) => {
  try {
    const weatherData = await Promise.all(
      cities.map(async (city) => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
          );
          const data = response.data;

          // Create a weather record
          const weatherRecord = {
            city: data.name,
            main: data.weather[0].main,
            temp: (data.main.temp - 273.15).toFixed(2), // Convert Kelvin to Celsius
            feels_like: (data.main.feels_like - 273.15).toFixed(2),
            dt: new Date(data.dt * 1000), // Convert timestamp to Date
          };

          // Save the weather data to MongoDB
          await Weather.create(weatherRecord); // This saves the data

          return weatherRecord;
        } catch (err) {
          console.error(`Error fetching data for ${city}:`, err.message);
          return { city, error: `Error fetching data: ${err.message}` };
        }
      })
    );

    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB Atlas");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});
