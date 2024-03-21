import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)
  const [checked, setChecked] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );



  return (
    <nav className=" my-2 flex justify-between py-5 px-10 rounded-lg" style={{ backgroundColor: "#285E57" }}>
      <h1 className="text-2xl font-bold text-white">
        <Link to={isAuthenticated ? "/sensor" : "/"}>ASHA</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li className="rounded-xl py-2.5 px-2 bg-green-100 text-zinc-900 hover:bg-green-500 hover:text-zinc-50">
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
