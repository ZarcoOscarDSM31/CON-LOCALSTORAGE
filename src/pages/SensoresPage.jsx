import Chart from "../components/tempYhumed";
import WeatherComponent from "../api/weatherComponent";
import SensorDataDisplay from "../components/aguaSensor";
import LuzComp from "../components/luzSensor";
import AirQualityComponent from "../components/calidadAire";

function SensoresPage() {
  return (
    // Contenedor principal de la página de inicio
    <section className="bg-zinc-50 flex justify-center items-center">
      <div className="container">
      <div className="grid grid-cols-4 gap-4 justify-items-center items-center">
          {/* Componente del clima */}
          <div className="col-span-1">
            <WeatherComponent />
          </div>
          {/* Componente de datos del sensor de agua */}
          <div className="col-span-1">
            <SensorDataDisplay />
          </div>
          {/* Componente del sensor de luz */}
          <div className="col-span-1">
            <LuzComp />
          </div>
          <div className="col-span-1">
            <AirQualityComponent />
          </div>
        </div>
        {/* Encabezado de la página */}
        <header className="bg-zinc-800 text-zinc-50 rounded-2xl  w-12/12 p-10" style={{ marginTop: "15px" }}>
          {/* Título principal */}
          <h1 className="text-5xl py-2 font-bold">ASHA</h1>
          {/* Descripción */}
          <p className="text-md text-slate-400">Temperatura y Humedad</p>
          {/* Gráfico */}
          <div>
            <Chart />
          </div>
        </header>
      </div>
    </section>
  );
}

export default SensoresPage; // Exporta el componente SensoresPage
