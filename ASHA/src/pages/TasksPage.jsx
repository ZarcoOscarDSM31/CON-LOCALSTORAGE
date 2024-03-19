// Importaciones de módulos y componentes necesarios
import { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import ApexChart from "../components/Chart";
import WeatherComponent from "../api/weatherComponent"; // Componente para mostrar el clima
import SensorData from "../components/sensorData"; // Componente para mostrar datos de sensores
import Table from "../components/table";

export function TasksPage() {
  // Obtiene tareas del contexto de tareas
  const { tasks, getTasks } = useTasks();

  // Efecto secundario para obtener tareas al cargar la página
  useEffect(() => {
    getTasks(); // Obtiene las tareas al montar el componente
  }, []);

  return (
    <div>
      {/* Sección de visualización de datos de clima y sensores */}
      <div className="flex flex-col md:flex-row md:justify-between">
        {/* Componente de visualización del clima */}
        <div className="w-full md:w-5/12 p-4">
          <WeatherComponent />
        </div>
        {/* Componente de visualización de datos de sensores */}
        <div className="w-full md:w-5/12 p-4">
          <SensorData />
        </div>
      </div>

      {/* Sección de gráficos si no hay tareas */}
      {tasks.length === 0 && (
        <div className="container justify-content:flex">
          <div className="mx-auto static">
            <ApexChart /> {/* Gráfico de ApexCharts */}
          </div>
        </div>
      )}
    </div>
  );
}
