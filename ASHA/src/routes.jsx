import { Navigate, Outlet } from "react-router-dom"; // Importa los componentes Navigate y Outlet de react-router-dom
import { useAuth } from "./context/authContext"; // Importa el hook useAuth desde el contexto de autenticación

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth(); // Extrae el estado de autenticación y el estado de carga del contexto de autenticación
  
  // Si se está cargando, muestra un mensaje de carga
  if (loading) return <h1>Loading...</h1>;
  
  // Si el usuario no está autenticado y la carga ha finalizado, redirige a la página de inicio de sesión
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  
  // Si el usuario está autenticado o si la carga ha finalizado y el usuario no está autenticado, muestra el contenido protegido
  return <Outlet />;
};
