import { useState, useEffect } from 'react';

const AirQualityComponent = ({ ppmCO2 }) => {
  const [airQuality, setAirQuality] = useState('');

  useEffect(() => {
    const calculateAirQuality = () => {
      if (ppmCO2 < 400) {
        return "Excelente";
      } else if (ppmCO2 < 1000) {
        return "Normal";
      } else if (ppmCO2 < 2000) {
        return "Pobre";
      } else if (ppmCO2 < 5000) {
        return "Mala";
      } else {
        return "Muy mala";
      }
    };

    setAirQuality(calculateAirQuality());
  }, [ppmCO2]);

  return (
    <div className={`air-quality p-4 rounded-lg ${airQualityClasses[airQuality]}`}>
      <h2 className="font-bold text-lg mb-2">Calidad del aire:</h2>
      <p className="text-xl">{airQuality}</p>
    </div>
  );
};

// Define las clases de Tailwind condicionales para cada calidad del aire
const airQualityClasses = {
  'Excelente': 'bg-green-200',
  'Normal': 'bg-blue-200',
  'Pobre': 'bg-yellow-200',
  'Mala': 'bg-red-200',
  'Muy mala': 'bg-red-500',
};

export default AirQualityComponent;
