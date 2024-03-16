import jwt from "jsonwebtoken";  // Importa el módulo jwt para trabajar con tokens JWT
import { TOKEN_SECRET } from "../config.js";  // Importa la clave secreta del token desde el archivo de configuración

// Middleware de autenticación que verifica si hay un token válido en las cookies
export const auth = (req, res, next) => {
    try {
        const { token } = req.cookies;  // Obtiene el token de las cookies de la solicitud

        if (!token) {  // Si no hay token en las cookies, responde con un error de no autorizado
            return res
                .status(401)
                .json({ message: "No hay token, permiso inválido" });
        }
        // Verifica la validez del token utilizando la clave secreta
        jwt.verify(token, TOKEN_SECRET, (error, user) => {
            if (error) {  // Si hay un error al verificar el token, responde con un error de no autorizado
                return res.status(401).json({ message: "El token no es válido" });
            }
            req.user = user;  // Almacena la información del usuario decodificado en el objeto 'req'
            next();  // Pasa al siguiente middleware en la cadena de middleware
        });
    } catch (error) {  // Captura cualquier error inesperado y responde con un error interno del servidor
        return res.status(500).json({ message: error.message });
    };
};
