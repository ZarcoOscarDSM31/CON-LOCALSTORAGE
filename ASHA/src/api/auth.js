import axios from "./axios"; // Importar axios personalizado

// Función asincrónica para realizar una solicitud de registro de usuario
export const registerRequest = async (user) => 
    axios.post(`/auth/register`, user); // Enviar solicitud POST al servidor para registrar al usuario

// Función asincrónica para realizar una solicitud de inicio de sesión de usuario
export const loginRequest = async (user) => axios.post(`/auth/login`, user); // Enviar solicitud POST al servidor para iniciar sesión del usuario

// Función asincrónica para realizar una solicitud de verificación de token de usuario
export const verifyTokenRequest = async () => axios.get(`/auth/verifyToken`); // Enviar solicitud GET al servidor para verificar el token de usuario
