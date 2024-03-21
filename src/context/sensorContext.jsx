import React, { createContext, useState, useEffect } from "react";
import { getSensor } from "../api/sensor";

const SensorContext = createContext();

export const SensorProvider = ({ children }) => {
    const [sensorData, setSensorData] = useState(null);

    const fetchSensorData = async () => {
        try {
            const data = await getSensor(); // Llama a la función getSensor para obtener los datos
            setSensorData(data);
        } catch (error) {
            console.error("Error fetching sensor data:", error);
        }
    };

    useEffect(() => {
        fetchSensorData();
    }, []);

    return (
        <SensorContext.Provider value={sensorData}>
            {children}
        </SensorContext.Provider>
    );
};

export default SensorContext;