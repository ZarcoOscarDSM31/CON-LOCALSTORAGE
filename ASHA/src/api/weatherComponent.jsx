// WeatherComponent.jsx
import React, { useState, useEffect } from 'react';

function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchWeatherData(latitude, longitude) {
      try {
        const apiKey = 'fc2ac51668f9a6669c5870bdcc61e018';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchWeatherData(latitude, longitude);
        }, (error) => {
          console.error('Error getting geolocation:', error);
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }

    getLocation();
  }, []);

  return (
    <div className="container justify-content:flex">
    <div className=" top-0 left-0 p-4">
      <div className="shadow-2xl w-1/2 p-4">
        {weatherData ? (
          <div className="text-center">
            <h2 className=" text-black text-xl font-semibold mb-2">Clima en {weatherData.name}</h2>
            <p className=''>Temperatura: {weatherData.main.temp}°C</p>
            <p>Clima: {weatherData.weather[0].description}</p>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      </div>
      </div>
  );
}

export default WeatherComponent;
