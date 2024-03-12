import  { useState, useEffect } from 'react';

function WeatherComponent() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = 'fc2ac51668f9a6669c5870bdcc61e018'; // Recuerda reemplazar 'YOUR_API_KEY' con tu propia clave API de OpenWeatherMap

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    if (location.trim() !== '') {
      fetchWeatherData();
    }
  }, [location, apiKey]);

  if (!weatherData) {
    return (
      <div>
        <input type="text" value={location} onChange={handleChange} placeholder="Enter location" />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <input type="text" value={location} onChange={handleChange} placeholder="Enter location" />
      <h2>Clima en {weatherData.name}</h2>
      <p>Temperatuae: {weatherData.main.temp}°C</p>
      <p>Clima: {weatherData.weather[0].description}</p>
    </div>
  );
}

export default WeatherComponent;
