# Real-Time Weather Monitoring System

This project is a real-time weather monitoring system that fetches data from the [OpenWeatherMap API](https://openweathermap.org/api) and displays the current weather for several Indian cities. It stores weather data and includes basic data aggregation, and alerts for extreme weather conditions. The frontend is built using **Vite + React** and the backend using **Node.js + Express**.

## Features

- Displays real-time weather information for selected Indian cities.
- Fetches data from the OpenWeatherMap API at configurable intervals.
- Uses SQLite (or MongoDB) to store weather data.
- Provides weather alerts when temperature thresholds are crossed.
- Visually appealing UI built with Tailwind CSS.

## Technologies Used

- **Frontend**: Vite, React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: SQLite (or MongoDB)
- **API**: OpenWeatherMap API

## Prerequisites

To run this project locally, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/zeotap-weather-app.git
cd zeotap-weather-app
```

### 2. Set Up Environment Variables

Create a `.env` file in the `backend` directory and add the following content:

```bash
API_KEY=your_openweathermap_api_key
```

- Replace `your_openweathermap_api_key` with your actual API key from OpenWeatherMap.
- **Important**: The `.env` file should **not** be committed to version control. The project has a `.gitignore` to exclude it.

### 3. Install Dependencies

#### Backend

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

#### Frontend

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

### 4. Run the Application

#### Running Backend

To start the backend server, which fetches data from the OpenWeatherMap API and stores it in the SQLite database, run the following command in the `backend` directory:

```bash
npm start
```

The backend server will be running at `http://localhost:5000`.

#### Running Frontend

To start the frontend development server, which displays the weather data, run the following command in the `frontend` directory:

```bash
npm run dev
```

The frontend app will be running at `http://localhost:5173`.

### 5. Viewing the Application

1. Open your browser and navigate to `http://localhost:5173` to view the weather data.
2. You can visit `http://localhost:5000/api/weather` to see the raw API data being fetched by the backend.

### 6. Database

The project uses SQLite for storing weather data. The SQLite database file is automatically created in the `backend` directory when the project is run. You can replace it with MongoDB by updating the backend configuration.

### 7. Deployment

If deploying the project, ensure you:

- **Do not share** the `.env` file containing your API keys.
- Update the environment variables in your deployment environment to include the OpenWeatherMap API key.

## Future Enhancements

- Add more detailed weather data (humidity, wind speed, etc.).
- Implement weather forecasts based on OpenWeatherMap's forecast API.
- Extend the system to store and analyze historical weather data trends.

## License

This project is licensed under the MIT License.
