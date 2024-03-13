import React from "react";
import FormPlants from "../components/FormPlants";
import WeatherComponent from "../api/weatherComponent";
import SensorData from "../components/sensorData";
import WeatherChart from "../components/Chart";

function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <div className="md:flex md:flex-wrap md:justify-center">
        <div className="w-full md:w-1/2 p-2">
          <WeatherComponent />
        </div>
        <div className="w-full md:w-1/2 p-2">
          <SensorData />
        </div>
      </div>
      <div className="mx-auto static">
        <WeatherChart />
      </div>

      <div className="md:flex md:justify-center mt-4">
        <FormPlants />
      </div>
    </div>
  );
}

export default Dashboard;
