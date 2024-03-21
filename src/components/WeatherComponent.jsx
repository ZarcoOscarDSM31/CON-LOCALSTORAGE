function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);
  const [theme, setTheme] = useState("theme-light");

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              const data = await fetchWeatherData(latitude, longitude);
              setWeatherData(data);
            } catch (error) {
              console.error('Error getting weather data:', error);
            }
          },
          (error) => {
            console.error('Error getting geolocation:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }

    getLocation();
  }, []);

  return (
    <div className={`shadow-lg w-full p-2 rounded-3xl ${theme === "theme-light" ? "bg-white" : "bg-zinc-900"}`}>
      {weatherData ? (
        <div className="text-center">
          <h2 className="text-black text-xl font-semibold mb-2">Clima en {weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Clima: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default WeatherComponent;
