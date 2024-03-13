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

      // Fetch data from sensors
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

      // Calculate average temperature and humidity for each day
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

      // Llamar a fetchWeatherData solo después de obtener los datos del sensor
      this.fetchWeatherData(latitude, longitude);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  fetchWeatherData = async (latitude, longitude) => {
    try {
      // Fetch data from OpenWeatherMap API using current location coordinates
      const apiKey = "fc2ac51668f9a6669c5870bdcc61e018";
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      const weatherResponse = await axios.get(weatherApiUrl);
      const weatherData = weatherResponse.data;

      const categories = [];
      const temperatureWeatherData = [];

      weatherData.list.forEach((item) => {
        const timestamp = new Date(item.dt * 1000);
        categories.push(timestamp.toLocaleDateString());
        temperatureWeatherData.push(Number(item.main.temp.toFixed(2))); // Redondear a dos decimales
      });

      // Verificar si los datos del clima ya están presentes en el estado antes de agregarlos nuevamente
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
        // Actualizar los datos existentes si ya están presentes
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
        <label className="mr-2 text-black font-semibold">Tipo de gráfica:</label>
        <select
          className="min-w-4 text-black"
          value={this.state.options.chart.type}
          onChange={this.handleChartTypeChange}
        >
          <option value="line">Línea</option>
          <option value="bar">Barras</option>
          <option value="area">Area</option>
        </select>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderChartTypeSelect()}
        <div id="chart">{this.renderChart()}</div>
      </div>
    );
  }
}

export default ApexChart;
