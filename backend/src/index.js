const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Import CORS

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());

// API key and cities
const API_KEY = process.env.API_KEY;
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

// API route to fetch weather data
app.get('/api/weather', async (req, res) => {
    try {
        const weatherData = await Promise.all(
            cities.map(async (city) => {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
                );
                const data = response.data;
                return {
                    city: data.name,
                    main: data.weather[0].main,
                    temp: (data.main.temp - 273.15).toFixed(2), // Convert from Kelvin to Celsius
                    feels_like: (data.main.feels_like - 273.15).toFixed(2),
                    dt: data.dt,
                };
            })
        );
        res.json(weatherData);
    } catch (error) {
        res.status(500).send('Error fetching weather data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
