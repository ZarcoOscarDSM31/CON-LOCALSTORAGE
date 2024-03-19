import express from "express";  // Importa los módulos necesarios de Express y otros paquetes
import cors from "cors";  // Middleware para habilitar el intercambio de recursos entre diferentes dominios
import morgan from "morgan";  // Middleware para el registro de solicitudes HTTP
import cookieParser from "cookie-parser";  // Middleware para analizar cookies en las solicitudes HTTP
import path from "path";  // Módulo de Node.js para manejar y transformar rutas de archivos

import authRoutes from "./routes/auth.routes.js";  // Importa las rutas de autenticación desde el archivo auth.routes.js
import taksRoutes from "./routes/tasks.routes.js";

import { FRONTEND_URL } from "./config.js";  // Importa la URL del frontend desde el archivo de configuración

const app = express();  // Crea una instancia de la aplicación Express

app.use((err, req, res, next) => {  // Middleware para manejar errores
    console.error(err.stack);  // Registra el error en la consola del servidor
    res.status(500).send('Something broke!');  // Responde al cliente con un código de error 500 y un mensaje genérico
});

app.use(  // Configura el middleware para permitir solicitudes CORS desde el frontend
    cors({
        credentials: true,  // Habilita el envío de cookies de autenticación
        origin: FRONTEND_URL,  // Define el origen permitido para las solicitudes CORS
    })
);

app.use(express.json());  // Configura el middleware para analizar solicitudes JSON
app.use(morgan("dev"));  // Configura el middleware de registro de solicitudes HTTP
app.use(cookieParser());  // Configura el middleware para analizar cookies en las solicitudes HTTP

app.use("/api/auth", authRoutes);  // Monta las rutas de autenticación bajo el prefijo "/api/auth"
/* app.use("/api", taksRoutes); */   
/* RUTA IMPORTANTE DONDE AQUÍ SE MUESTRAN LAS RUTAS DE TAREAS (DONDE VA A ESTAR LA API-GRAFICA)*/
/* SE DEBE IMPORTAR */
 
if (process.env.NODE_ENV === "production") {  // Si el entorno es producción, sirve archivos estáticos desde la carpeta "client/dist"
    app.use(express.static("client/dist"));  // Sirve archivos estáticos desde la carpeta "client/dist"
    app.get("*", (req, res) => {  // Maneja todas las demás rutas, devolviendo el archivo "index.html"
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));  // Resuelve la ruta absoluta al archivo "index.html" en la carpeta de distribución del cliente
    });
}

export default app;  // Exporta la aplicación Express
