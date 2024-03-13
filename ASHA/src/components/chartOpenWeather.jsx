import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';

const WeatherChart = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;
            const apiKey = 'fc2ac51668f9a6669c5870bdcc61e018';
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            const response = await axios.get(apiUrl);
            setWeatherData(response.data);
          });
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  const parseWeatherDataForChart = () => {
    if (!weatherData) return null;

    const categories = [];
    const series = [{ name: 'Temperature', data: [] }];

    weatherData.list.forEach(item => {
      const timestamp = new Date(item.dt * 1000);
      categories.push(timestamp.toLocaleDateString());
      series[0].data.push(item.main.temp);
    });

    return {
      options: {
        chart: {
          id: 'weather-chart',
          type: 'line',
          height: 350
        },
        xaxis: {
          categories: categories
        }
      },
      series: series
    };
  };

  return (
    <div>
      {weatherData && (
        <ApexCharts
          options={parseWeatherDataForChart().options}
          series={parseWeatherDataForChart().series}
          type="line"
          height={350}
        />
      )}
    </div>
  );
};

export default WeatherChart;
