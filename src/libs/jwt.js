import { TOKEN_SECRET } from "../config.js"; // Importa la clave secreta del token desde el archivo de configuración
import jwt from "jsonwebtoken"; // Importa el módulo 'jsonwebtoken' para trabajar con tokens JWT

// Función asincrónica para crear un token de acceso
export async function createAccessToken(payload) {
  return new Promise((resolve, reject) => { // Devuelve una promesa que resuelve con el token de acceso
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => { // Firma un token JWT con los datos del payload y la clave secreta
      if (err) reject(err); // Si hay un error al firmar el token, rechaza la promesa con el error
      resolve(token); // Si se firma correctamente, resuelve la promesa con el token de acceso generado
    });
  });
}
