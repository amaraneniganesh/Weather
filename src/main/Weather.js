import React, { useState } from 'react';
import axios from 'axios';
import { FaTemperatureHigh } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';
import { TiWeatherDownpour } from "react-icons/ti";
import { FaWind } from "react-icons/fa6";

import './main.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');




  const apiKey = '016005010c20fc3c0d0973b46716b771'; // Replace with your OpenWeatherMap API key

  const getWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      setError('City not found');
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(city);
  };

  return (
    <div className="weather-app">
      <h1>Weather App <TiWeatherDownpour /> </h1>
      <form className="weather-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-result">
          <h2>{weatherData.name}</h2>
          <p>Temperature <FaTemperatureHigh /> : {weatherData.main.temp} °C</p>
          <p>Weather <TiWeatherDownpour />
            : {weatherData.weather[0].description}</p>
          <p>Humidity <WiHumidity /> : {weatherData.main.humidity}%</p>
          <p>WIND <FaWind /> : {weatherData.wind.speed} m/s </p>
          <p>WIND <FaWind /> :{weatherData.wind.deg}° </p>
        </div>
      )}
      <footer>
    <p>Visit my GitHub profile: <a href="https://github.com/saiganesh1745">Ganesh</a></p>
</footer>

    </div>
  );
};

export default Weather;
