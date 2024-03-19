import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
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
        title: {
          text: "Temperatura y Humedad",
          align: "left",
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
      },
    };
  }

  componentDidMount() {
    this.getCurrentLocation();
    this.startPolling();
  }

  componentWillUnmount() {
    this.stopPolling();
  }

  startPolling = () => {
    this.pollingInterval = setInterval(this.getCurrentLocation, 900000);
  };

  stopPolling = () => {
    clearInterval(this.pollingInterval);
  };

  getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.fetchSensorData,
        this.handleLocationError
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  handleLocationError = (error) => {
    console.error("Error getting the user location:", error);
  };

  fetchSensorData = async (position) => {
    try {
      const { latitude, longitude } = position.coords;

      const sensorResponse = await fetch("http://localhost:3000/historial");
      const sensorData = await sensorResponse.json();

      const categories = [];
      const temperatureSensorData = {};
      const humiditySensorData = {};

      sensorData.forEach((item) => {
        const date = new Date(item.fecha_hora).toLocaleDateString();
        if (item.unidades === "%") {
          if (!humiditySensorData[date]) {
            humiditySensorData[date] = [];
          }
          humiditySensorData[date].push(item.val_numerico);
        } else if (item.unidades === "°C") {
          if (!temperatureSensorData[date]) {
            temperatureSensorData[date] = [];
          }
          temperatureSensorData[date].push(item.val_numerico);
        }
      });

      const averageTemperatureData = Object.keys(temperatureSensorData).map(
        (date) => {
          const average =
            temperatureSensorData[date].reduce((acc, val) => acc + val, 0) /
            temperatureSensorData[date].length;
          return { date, average: Number(average.toFixed(2)) };
        }
      );

      const averageHumidityData = Object.keys(humiditySensorData).map(
        (date) => {
          const average =
            humiditySensorData[date].reduce((acc, val) => acc + val, 0) /
            humiditySensorData[date].length;
          return { date, average: Number(average.toFixed(2)) };
        }
      );

      this.setState({
        series: [
          {
            name: "Porcentaje de Humedad (Sensores)",
            data: averageHumidityData.map((item) => item.average),
          },
          {
            name: "Temperatura (Sensores) (°C)",
            data: averageTemperatureData.map((item) => item.average),
          },
        ],
        options: {
          ...this.state.options,
          xaxis: {
            categories: averageTemperatureData.map((item) => item.date),
          },
        },
      });

      this.fetchWeatherData(latitude, longitude);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  fetchWeatherData = async (latitude, longitude) => {
    try {
      const apiKey = "fc2ac51668f9a6669c5870bdcc61e018";
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      const weatherResponse = await axios.get(weatherApiUrl);
      const weatherData = weatherResponse.data;

      const categories = [];
      const temperatureWeatherData = [];

      weatherData.list.forEach((item) => {
        const timestamp = new Date(item.dt * 1000);
        categories.push(timestamp.toLocaleDateString());
        temperatureWeatherData.push(Number(item.main.temp.toFixed(2)));
      });

      const existingWeatherSeriesIndex = this.state.series.findIndex(
        (series) => series.name === "Temperatura (API OpenWeatherMap) (°C)"
      );
      if (existingWeatherSeriesIndex === -1) {
        this.setState((prevState) => ({
          series: [
            ...prevState.series,
            {
              name: "Temperatura (API OpenWeatherMap) (°C)",
              data: temperatureWeatherData,
            },
          ],
          options: {
            ...prevState.options,
            xaxis: { categories: categories },
          },
        }));
      } else {
        const updatedSeries = [...this.state.series];
        updatedSeries[existingWeatherSeriesIndex].data = temperatureWeatherData;
        this.setState({
          series: updatedSeries,
          options: {
            ...this.state.options,
            xaxis: { categories: categories },
          },
        });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  handleChartTypeChange = (event) => {
    const chartType = event.target.value;
    this.setState((prevState) => ({
      options: {
        ...prevState.options,
        chart: {
          ...prevState.options.chart,
          type: chartType,
        },
      },
    }));
  };

  renderChart = () => {
    const { series, options } = this.state;

    return (
      <ReactApexChart
        options={options}
        series={series}
        type={options.chart.type}
        height={350}
      />
    );
  };

  renderChartTypeSelect = () => {
    return (
      <div className="flex items-center justify-end mb-4">
        <label className="mr-2 text-gray-500 font-semibold">Tipo de gráfica:</label>
        <div className="relative">
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:border-green-500 pr-10"
            value={this.state.options.chart.type}
            onChange={this.handleChartTypeChange}
          >
            <option value="line">Línea</option>
            <option value="bar">Barras</option>
            <option value="area">Área</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700">
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="mx-auto max-w-screen-lg">
        {this.renderChartTypeSelect()}
        <div id="chart" className="bg-white rounded-lg shadow-lg p-4">
          {this.renderChart()}
        </div>
      </div>
    );
  }
}

export default ApexChart;
