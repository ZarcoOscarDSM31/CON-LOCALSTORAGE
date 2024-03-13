import React, { useState, useEffect } from "react";
import FormPlants from "../components/formPlants";
import WeatherComponent from "../api/weatherComponent";
import SensorData from "../components/sensorData";

function Dashboard() {
  return (
    <div>
    <div className="flex flex-wrap justify-between">
  <div className="w-full md:w-5/12 p-4"> 
    <WeatherComponent />
  </div>
  <div className="w-full md:w-5/12 p-4"> 
    <SensorData />
  </div>
</div>
<div className="p-4 w-full md:w-1/2">
  <FormPlants />
</div>

    </div>
  );
}

export default Dashboard;
