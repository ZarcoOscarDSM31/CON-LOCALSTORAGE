import app from "./app.js";  // Importa la aplicación Express desde el archivo app.js
import { PORT } from "./config.js";  // Importa el puerto del servidor desde el archivo de configuración
import { connectDB } from "./db.js";  // Importa la función para conectar con la base de datos desde el archivo db.js

async function main() {
    try {
        await connectDB();  // Intenta conectarse a la base de datos
        app.listen(PORT);  // Inicia el servidor Express en el puerto especificado
        console.log(`Listening on port http://localhost:${PORT}`);  // Registra un mensaje de éxito en la consola
        console.log(`Environment: ${process.env.NODE_ENV}`);  // Registra el entorno de ejecución en la consola
    } catch (error) {
        console.error(error);  // Registra cualquier error en la consola
    };
};

main();  // Ejecuta la función principal
