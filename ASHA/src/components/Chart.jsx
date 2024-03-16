import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

class ApexChart extends Component {
  constructor(props) {
    super(props);

    // Estado inicial del componente
    this.state = {
      series: [],
      options: {
        chart: {
          height: 500, // Altura del gráfico
          type: "line", // Tipo de gráfico
          zoom: {
            enabled: true, // Habilitar zoom
          },
        },
        dataLabels: {
          enabled: true, // Habilitar etiquetas de datos
        },
        stroke: {
          curve: "straight", // Curva de las líneas
        },
        title: {
          text: "Temperatura y Humedad", // Título del gráfico
          align: "left", // Alineación del título
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // Colores de las filas del gráfico
            opacity: 0.5, // Opacidad de las filas
          },
        },
        xaxis: {
          categories: [], // Categorías del eje X (fechas)
        },
      },
    };
  }

  // Se ejecuta después de que el componente se monta en el DOM
  componentDidMount() {
    // Obtener la ubicación del usuario y comenzar el intervalo de polling
    this.getCurrentLocation();
    this.startPolling();
  }

  // Se ejecuta antes de que el componente se desmonte del DOM
  componentWillUnmount() {
    // Detener el intervalo de polling
    this.stopPolling();
  }

  // Iniciar el intervalo de polling para obtener datos periódicamente
  startPolling = () => {
    this.pollingInterval = setInterval(this.getCurrentLocation, 900000); // Cada 15 minutos
  };

  // Detener el intervalo de polling
  stopPolling = () => {
    clearInterval(this.pollingInterval);
  };

  // Obtener la ubicación actual del usuario
  getCurrentLocation = () => {
    if (navigator.geolocation) {
      // Si el navegador es compatible con la geolocalización, obtener la posición actual
      navigator.geolocation.getCurrentPosition(
        this.fetchSensorData, // Llamar a fetchSensorData con la posición obtenida
        this.handleLocationError // Llamar a handleLocationError si ocurre un error
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Manejar errores de ubicación
  handleLocationError = (error) => {
    console.error("Error getting the user location:", error);
  };

  // Obtener datos del sensor a partir de la posición geográfica
  fetchSensorData = async (position) => {
    try {
      const { latitude, longitude } = position.coords;

      // Obtener datos del sensor desde la API
      const sensorResponse = await fetch("http://localhost:3000/historial");
      const sensorData = await sensorResponse.json();

      // Procesar datos del sensor
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

      // Calcular promedios de temperatura y humedad
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

      // Actualizar el estado con los datos del sensor
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

  // Obtener datos del clima utilizando las coordenadas geográficas
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

  // Manejar el cambio del tipo de gráfico
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

  // Renderizar el gráfico
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

  // Renderizar el selector del tipo de gráfico
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
