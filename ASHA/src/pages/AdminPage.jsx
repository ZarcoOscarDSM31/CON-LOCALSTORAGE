// Importaciones de módulos y componentes necesarios
import React from "react";
import FormPlants from "../components/FormPlants"; // Componente de formulario de plantas
import WeatherComponent from "../api/weatherComponent"; // Componente para mostrar el clima
import SensorData from "../components/sensorData"; // Componente para mostrar datos de sensores
import WeatherChart from "../components/Chart"; // Componente de gráfico de clima

function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      {/* Sección de visualización de datos de clima y sensores */}
      <div className="md:flex md:flex-wrap md:justify-center">
        {/* Componente de visualización del clima */}
        <div className="w-full md:w-1/2 p-2">
          <WeatherComponent />
        </div>
        {/* Componente de visualización de datos de sensores */}
        <div className="w-full md:w-1/2 p-2">
          <SensorData />
        </div>
      </div>
      {/* Componente de visualización de gráfico de clima */}
      <div className="mx-auto static">
        <WeatherChart />
      </div>

      {/* Sección de formulario de plantas */}
      <div className="md:flex md:justify-center mt-4">
        <FormPlants />
      </div>
    </div>
  );
}

export default Dashboard;
