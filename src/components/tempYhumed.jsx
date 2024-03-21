import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import SensorContext from "../context/sensorContext";
import axios from "axios";

const ApexChart = () => {
  const sensorData = useContext(SensorContext);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      height: 500,
      type: "line",
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [],
    },
  });

  useEffect(() => {
    if (!sensorData || sensorData.length === 0) return;
    const dataByDate = {};
    sensorData.forEach((item) => {
      const date = new Date(item.timestamp).toLocaleDateString();
      if (!dataByDate[date]) {
        dataByDate[date] = [];
      }
      dataByDate[date].push(item);
    });

    const averageTemperatureData = [];
    const averageHumidityData = [];
    for (const date in dataByDate) {
      const temperatureValues = dataByDate[date].map((item) => item.temperatureC);
      const humidityValues = dataByDate[date].map((item) => item.humidity);
      const temperatureAverage = temperatureValues.reduce((acc, val) => acc + val, 0) / temperatureValues.length;
      const humidityAverage = humidityValues.reduce((acc, val) => acc + val, 0) / humidityValues.length;
      averageTemperatureData.push({ date, average: Number(temperatureAverage.toFixed(2)) });
      averageHumidityData.push({ date, average: Number(humidityAverage.toFixed(2)) });
    }

    setSeries([
      {
        name: "Porcentaje de Humedad (Sensores)",
        data: averageHumidityData.map((item) => item.average),
      },
      {
        name: "Temperatura (Sensores) (°C)",
        data: averageTemperatureData.map((item) => item.average),
      },
    ]);

    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: averageTemperatureData.map((item) => item.date),
      },
    }));
  }, [sensorData]);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }
  
    const fetchSensorData = async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const apiKey = "fc2ac51668f9a6669c5870bdcc61e018";
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        const weatherResponse = await axios.get(weatherApiUrl);
        const weatherData = weatherResponse.data;
  
        const categories = [];
        const maxTemperatures = {};
        const minTemperatures = {};
  
        weatherData.list.forEach((item) => {
          const timestamp = new Date(item.dt * 1000);
          const date = timestamp.toLocaleDateString();
          categories.push(date);
          const temperature = Number(item.main.temp.toFixed(2));
  
          if (!maxTemperatures[date] || temperature > maxTemperatures[date]) {
            maxTemperatures[date] = temperature;
          }
          if (!minTemperatures[date] || temperature < minTemperatures[date]) {
            minTemperatures[date] = temperature;
          }
        });
  
        setSeries([
          {
            name: "Temperatura Máxima (API OpenWeatherMap) (°C)",
            data: Object.values(maxTemperatures),
          },
          {
            name: "Temperatura Mínima (API OpenWeatherMap) (°C)",
            data: Object.values(minTemperatures),
          },
        ]);
  
        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: { categories },
        }));
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
  
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(fetchSensorData, console.error);
    };
  
    getCurrentLocation();
  
    const pollingInterval = setInterval(getCurrentLocation, 900000); // Cada 15 minutos
  
    return () => clearInterval(pollingInterval);
  }, []);

  const handleChartTypeChange = (event) => {
    const chartType = event.target.value;
    setOptions((prevOptions) => ({
      ...prevOptions,
      chart: {
        ...prevOptions.chart,
        type: chartType,
      },
    }));
    sessionStorage.setItem('chartType', chartType); // Guardar el tipo de gráfica en sessionStorage
  };
  const renderChartTypeSelect = () => {
    return (
      <div className="flex items-center justify-end mb-4">
        <label className="mr-2 text-black font-semibold">Tipo de gráfica:</label>
        <select
          className="min-w-4 text-black"
          value={options.chart.type}
          onChange={handleChartTypeChange}
        >
          <option value="line">Línea</option>
          <option value="bar">Barras</option>
          <option value="area">Area</option>
        </select>
      </div>
    );
  };

  const renderChart = () => {
    return (
      <ReactApexChart
        options={options}
        series={series}
        type={options.chart.type}
        height={350}
      />
    );
  };

  return (
    <div>
      {renderChartTypeSelect()}
      <div id="chart">{renderChart()}</div>
    </div>
  );
};

export default ApexChart;

