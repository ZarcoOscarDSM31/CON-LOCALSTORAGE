import { useState, useEffect, useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import SensorContext from '../context/sensorContext';

const LuzComp = () => {
  const [iluminacion, setIluminacion] = useState(null);
  const sensorData = useContext(SensorContext);

  useEffect(() => {
    if (!sensorData) return;

    const data = sensorData.find(item => item.lightIntensity !== undefined);

    if (!data) return;

    const V = data.lightIntensity;
    const A = 1000;
    const B = 15;
    const Rc = 10;

    const iluminacionCalculada = ((V * A * 10) / ((B * Rc) * (1024 - V))).toFixed(2);
    

    setIluminacion(iluminacionCalculada);
  }, [sensorData]);

  return (
    <div>
      {iluminacion !== null ? (
        <ReactApexChart
          options={{
            chart: {
              type: 'bar',
              height: 350,
            },
            plotOptions: {
              bar: {
                horizontal: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories: ['Iluminación'],
              labels: {
                show: true,
              },
            },
            yaxis: {
              title: {
                text: 'Iluminación',
              },
            },
          }}
          series={[{
            name: 'Iluminación',
            data: [iluminacion],
          }]}
          type="bar"
          height={300}
        />
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default LuzComp;
