import React from 'react'; // Importa React
import ReactDOM from 'react-dom/client'; // Importa ReactDOM en su forma completa
import App from './App'; // Importa el componente App
import './index.css'; // Importa el archivo CSS para estilos globales

// Renderiza el componente principal dentro de un StrictMode para detectar problemas potenciales en la aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* Renderiza el componente App */}
  </React.StrictMode>
);
