import React, { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import FormPlants from "../components/formPlants"; // Corregido: El nombre del componente importado debe coincidir con el nombre del archivo
import WeatherComponent from "../api/weatherComponent"; // Corregido: El nombre del componente importado debe coincidir con el nombre del archivo

function AdminPage() {
  const { getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <div>
      <FormPlants />
      <div>
        <WeatherComponent />
      </div>
    </div>
  );
}

export default AdminPage;
