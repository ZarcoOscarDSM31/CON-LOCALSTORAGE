import React, { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para consumir el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

// Hook personalizado para obtener el objeto de usuario
export const useUser = () => useContext(AuthContext).getUser;

// Proveedor de contexto de autenticación
export const AuthProvider = ({ children }) => {
  // Estados del contexto de autenticación
  const [user, setUser] = useState(null); // Estado del usuario
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [errors, setErrors] = useState([]); // Estado de errores
  const [loading, setLoading] = useState(true); // Estado de carga

  // Función para obtener el objeto de usuario
  const getUser = () => user;

  // Función para realizar el registro
  const signup = async (userData) => {
    try {
      const res = await registerRequest(userData);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setErrors(error.response.data.message || []);
    }
  };

  // Función para iniciar sesión
  const signin = async (userData) => {
    try {
      const res = await loginRequest(userData);
      const token = res.data.token; // Suponiendo que el token se devuelve en la respuesta de la solicitud de inicio de sesión
      localStorage.setItem("token", token); // Almacena el token en localStorage
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };
  

  // Función para cerrar sesión
const logout = () => {
  localStorage.removeItem("token"); // Elimina el token del localStorage
  Cookies.remove("token"); // Elimina el token de las cookies
  setUser(null);
  setIsAuthenticated(false);
};


  // Verificar el estado de la sesión al cargar la página
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
  
      try {
        const res = await verifyTokenRequest();
        setUser(res.data.user); // Suponiendo que la solicitud devuelve información del usuario
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);
  

  // Proveer el contexto de autenticación a los componentes hijos
  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
        getUser, // Incluir la función getUser en el contexto
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
