// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-green-400 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/tasks" : "/"}>ASHA</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li className="bg-slate-50 bg-opacity-20 rounded-xl text-zinc-900 py-2.5 px-2">
              ¡Hola {user.username}!
            </li>
            <li className="rounded-xl py-2.5 px-2 bg-green-700 hover:bg-zinc-50 hover:text-zinc-950">
              <button onClick={() => logout()}>Cerrar sesión</button>
            </li>
          </>
        ) : (
          <>
            <li className="py-2 px-2">
              <ButtonLink to="/login">Iniciar sesión</ButtonLink>
            </li>
            <li className="py-2 px-2">
              <ButtonLink to="/register">Registrarse</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
