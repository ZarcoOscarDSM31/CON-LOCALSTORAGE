import React, { useContext } from "react";
import SensorContext from "../context/sensorContext"; // Asegúrate de importar el contexto adecuadamente
import Chart from "react-apexcharts";

const SensorDataDisplay = () => {
  const sensorData = useContext(SensorContext);

  if (!sensorData || sensorData.length === 0) {
    return <p>No hay datos disponibles del sensor.</p>;
  }

  // Obtener el último registro de datos del sensor
  const latestReading = sensorData[sensorData.length - 1];

  // Valor del agua en el último registro
  const waterLevel = latestReading.waterLevel;

  // Configuración de la gráfica de ApexCharts
  const chartOptions = {
    chart: {
      type: 'donut',
      height: 250, 
    },
    labels: ['Agua', 'Espacio vacío'],
  };

  const chartSeries = [waterLevel, 100 - waterLevel];

  // Alerta cuando el tanque esté vacío
  if (waterLevel === 0) {
    alert('¡El tanque está vacío!');
  }

  return (
    <div>
      <h2>Estado actual del agua:</h2>
      <Chart options={chartOptions} series={chartSeries} type="donut" width="300" />
    </div>
  );
};

export default SensorDataDisplay;
