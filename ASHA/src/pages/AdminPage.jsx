import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export function ComponentWithPermissions() {
  const { isAuthenticated, userPermissions } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !userPermissions || !userPermissions.includes('admin')) {
      // Si el usuario no está autenticado o no tiene el permiso '1', redirigir a otra ruta
      navigate("/admin"); // Cambia "/" a la ruta deseada
    }
  }, [isAuthenticated, userPermissions, navigate]);

  return (
    <div>
      {isAuthenticated && userPermissions && userPermissions.includes('admin') ? (
        <h1>¡Tienes permisos para ver este componente!</h1>
      ) : (
        <h1>No tienes permisos para ver este componente.</h1>
      )}
    </div>
  );
}

export function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  );
}
