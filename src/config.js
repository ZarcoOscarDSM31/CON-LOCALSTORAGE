// Define el puerto del servidor, utilizando el puerto proporcionado por la variable de entorno PORT o el puerto 4000 de manera predeterminada
export const PORT = process.env.PORT || 4000;

// Define la URI de la base de datos MongoDB, utilizando la URI proporcionada por la variable de entorno MONGODB_URI o una URI local de ejemplo
export const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/proyect";

// Define la clave secreta para generar tokens JWT, utilizando la clave proporcionada por la variable de entorno TOKEN_SECRET o una clave predeterminada
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";

// Define la URL del frontend, utilizando la URL proporcionada por la variable de entorno FRONTEND_URL o una URL local de ejemplo
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

/* NO MODIFICAR */