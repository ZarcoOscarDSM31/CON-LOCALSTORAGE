// WeatherComponent.jsx

import React, { useState, useEffect } from 'react'; // Importar React y los hooks useState y useEffect

function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null); // Definir el estado para almacenar los datos del clima
  const [theme, setTheme] = useState("theme-light");

  useEffect(() => {
    // Efecto para cargar los datos del clima al montar el componente
    async function fetchWeatherData(latitude, longitude) {
      // Función asincrónica para realizar la solicitud de los datos del clima
      try {
        const apiKey = 'fc2ac51668f9a6669c5870bdcc61e018'; // Clave de API para acceder a OpenWeatherMap
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`); // Realizar solicitud GET a la API de OpenWeatherMap
        if (!response.ok) {
          // Verificar si la respuesta de la red es correcta
          throw new Error('Network response was not ok'); // Lanzar un error si la respuesta no es correcta
        }
        const data = await response.json(); // Convertir la respuesta a formato JSON
        setWeatherData(data); // Actualizar el estado con los datos del clima
      } catch (error) {
        console.error('Error fetching weather data:', error); // Manejar cualquier error que ocurra durante la solicitud de los datos del clima
      }
    }

    function getLocation() {
      // Función para obtener la ubicación actual del usuario
      if (navigator.geolocation) {
        // Verificar si el navegador soporta la geolocalización
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Obtener la posición actual del usuario
            const latitude = position.coords.latitude; // Obtener la latitud
            const longitude = position.coords.longitude; // Obtener la longitud
            fetchWeatherData(latitude, longitude); // Llamar a la función para cargar los datos del clima con la ubicación obtenida
          },
          (error) => {
            console.error('Error getting geolocation:', error); // Manejar cualquier error que ocurra al obtener la geolocalización del usuario
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.'); // Mostrar un mensaje de error si la geolocalización no es compatible con el navegador
      }
    }

    getLocation(); // Llamar a la función para obtener la ubicación actual al montar el componente
  }, []); // Dependencia vacía para que el efecto se ejecute solo una vez al montar el componente

  return (
    // Renderizar el componente
        <div className={`shadow-lg w-3/4 p-2 rounded-3xl ${theme === "theme-light" ? "bg-white" : "bg-zinc-900"}`}>
          {weatherData ? ( // Mostrar los datos del clima si están disponibles
            <div className="text-center">
              <h2 className="text-black text-xl font-semibold mb-2">Clima en {weatherData.name}</h2> {/* Mostrar el nombre de la ubicación */}
              <p>Temperatura: {weatherData.main.temp}°C</p> {/* Mostrar la temperatura */}
              <p>Clima: {weatherData.weather[0].description}</p> {/* Mostrar la descripción del clima */}
            </div>
          ) : (
            <div>Loading...</div> // Mostrar un mensaje de carga si los datos del clima aún no están disponibles
          )}
        </div>
  );
}

export default WeatherComponent; // Exportar el componente WeatherComponent
