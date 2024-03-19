import React, { useState, useEffect } from "react";

function SensorData() {
  const [latestSensorData, setLatestSensorData] = useState(null);
  const [theme, setTheme] = useState("theme-light");

  useEffect(() => {
    async function fetchLatestSensorData() {
      try {
        const response = await fetch("http://localhost:3000/historial");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.length > 0) {
          setLatestSensorData(data[data.length - 1]);
        }
      } catch (error) {
        console.error("Error fetching latest sensor data:", error);
      }
    }

    fetchLatestSensorData();
  }, []);

  return (
    <div className={`shadow-lg w-3/4 p-2 rounded-3xl ${theme === "theme-light" ? "bg-white" : "bg-zinc-900"}`}>
      {latestSensorData ? (
        <div className="text-center">
          <h2 className="text-black text-lg font-semibold mb-2">
            Temperatura captada por el sensor
          </h2>
          <p>Fecha y Hora: {latestSensorData.fecha_hora}</p>
          <p>
            Temperatura: {latestSensorData.val_numerico}{" "}
            {latestSensorData.unidades}
          </p>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}

export default SensorData;
