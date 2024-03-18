import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import ThemeToggle from "./ui/ThemeToggle"; // Importar el componente ThemeToggle

export function Navbar() {
  // Obtener el estado de autenticación y la función de cierre de sesión del contexto de autenticación
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className=" my-3 flex justify-between py-5 px-10 rounded-lg" style={{ backgroundColor: "#285E57" }}>
      {/* Enlace al inicio o a las tareas dependiendo del estado de autenticación */}
      <h1 className="text-2xl font-bold text-white">
        <Link to={isAuthenticated ? "/tasks" : "/"}>ASHA</Link>
      </h1>
      
      <ul className="flex gap-x-2">
        <ThemeToggle />
        {isAuthenticated ? (
          // Mostrar el nombre de usuario y el botón de cierre de sesión si el usuario está autenticado
          <>
            {user && (
              <li className="bg-slate-50 bg-opacity-20 rounded-xl text-zinc-900 py-2.5 px-2">
                ¡Hola {user.username}!
              </li>
            )}
            <li className="rounded-xl py-2.5 px-2 bg-green-700 hover:bg-zinc-50 hover:text-zinc-950">
              <button onClick={() => logout()}>Cerrar sesión</button>
            </li>
          </>
        ) : (
          // Mostrar botones de inicio de sesión y registro si el usuario no está autenticado
          <>
            <li className="py-2 px-2">
              <ButtonLink to="/login">Iniciar sesión</ButtonLink>
            </li>
            <li className="py-2 px-2">
              <ButtonLink to="/register">Registrarse</ButtonLink>
            </li>
          </>
        )}
        {/* Integra el componente ThemeToggle aquí */}
        
      </ul>
    </nav>
  );
}
