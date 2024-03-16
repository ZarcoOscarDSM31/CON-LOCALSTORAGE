import React, { useState, useEffect } from "react";

function SensorData() {
  const [latestSensorData, setLatestSensorData] = useState(null);

  useEffect(() => {
    // Función asincrónica para obtener los últimos datos del sensor
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

    // Llamar a la función para obtener los datos al montar el componente
    fetchLatestSensorData();
  }, []);

  return (
    <div className="container justify-content:flex">
      <div className="top-0 left-0 p-4">
        <div className="shadow-2xl w-1/2 p-4">
          {/* Mostrar los últimos datos del sensor si están disponibles */}
          {latestSensorData ? (
            <div className="text-center">
              <h2 className="text-black text-xl font-semibold mb-2">
                Temperatura captada por el sensor
              </h2>
              <p>Fecha y Hora: {latestSensorData.fecha_hora}</p>
              <p>
                Temperatura: {latestSensorData.val_numerico}{" "}
                {latestSensorData.unidades}
              </p>
            </div>
          ) : (
            // Mostrar un mensaje de carga si los datos aún no se han cargado
            <div>Cargando...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SensorData;
