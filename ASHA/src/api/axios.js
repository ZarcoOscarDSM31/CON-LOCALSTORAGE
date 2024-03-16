import axios from "axios"; // Importar axios para realizar solicitudes HTTP
import { API_URL } from "../config"; // Importar la URL base de la API desde el archivo de configuración

// Crear una instancia de axios con la configuración personalizada
const instance = axios.create({
    baseURL: API_URL, // Establecer la URL base de la API
    withCredentials: true, // Permitir el envío de cookies en las solicitudes (para autenticación)
});

export default instance; // Exportar la instancia de axios personalizada
