import mongoose from "mongoose";  // Importa el módulo mongoose para interactuar con MongoDB
import { MONGODB_URI } from "./config.js";  // Importa la URI de la base de datos MongoDB desde el archivo de configuración

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);  // Intenta conectarse a la base de datos utilizando la URI proporcionada
        console.log("MongoDB is connected");  // Si la conexión tiene éxito, registra un mensaje de éxito en la consola
    } catch (error) {
        console.error(error);  // Si ocurre algún error durante la conexión, registra el error en la consola
    };
};

/* NO MODIFICAR */