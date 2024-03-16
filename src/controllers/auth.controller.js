import User from "../models/user.model.js"; // Importa el modelo de usuario desde el archivo user.model.js
import jwt from "jsonwebtoken"; // Importa la biblioteca jsonwebtoken para manejar tokens JWT
import bcrypt from "bcryptjs"; // Importa la biblioteca bcryptjs para el hashing de contraseñas
import { TOKEN_SECRET } from "../config.js"; // Importa la clave secreta del token desde el archivo de configuración
import { createAccessToken } from "../libs/jwt.js"; // Importa la función para crear un token de acceso desde el archivo jwt.js

// Controlador para el registro de usuarios
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Obtiene los datos del cuerpo de la solicitud

    const userFound = await User.findOne({ email }); // Busca si ya existe un usuario con el correo proporcionado

    if (userFound) // Si ya existe un usuario con ese correo, devuelve un error
      return res.status(400).json({
        message: ["Este correo ya está en uso"],
      });

    // Hashing the password
    const passwordHash = await bcrypt.hash(password, 10); // Genera el hash de la contraseña con un costo de 10 iteraciones

    // Creating the user
    const newUser = new User({ // Crea un nuevo usuario con los datos proporcionados
      username,
      email,
      password: passwordHash, // Se guarda la contraseña como el hash generado
    });

    // Saving the user in the database
    const userSaved = await newUser.save(); // Guarda el nuevo usuario en la base de datos

    // Create access token
    const token = await createAccessToken({ // Crea un token de acceso con el ID del nuevo usuario
      id: userSaved._id,
    });

    // Set the token in a cookie
    res.cookie("token", token, { // Establece el token en una cookie
      httpOnly: process.env.NODE_ENV !== "development", // Configura la cookie para ser accesible solo mediante HTTP
      secure: true, // Configura la cookie para que solo se envíe a través de HTTPS
      sameSite: "none", // Configura la cookie para que sea enviada a cualquier sitio (incluidas las solicitudes de terceros)
    });

    // Respond with user data
    res.json({ // Responde con los datos del usuario registrado
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) { // Captura y maneja cualquier error
    res.status(500).json({ message: error.message }); // Responde con un mensaje de error y un código de estado 500
  }
};

// Controlador para iniciar sesión de usuarios
export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Obtiene los datos del cuerpo de la solicitud
    const userFound = await User.findOne({ email }); // Busca si existe un usuario con el correo proporcionado

    if (!userFound) // Si no se encuentra ningún usuario con el correo proporcionado, devuelve un error
      return res.status(400).json({
        message: ["El correo no existe"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password); // Compara la contraseña proporcionada con el hash almacenado en la base de datos

    if (!isMatch) { // Si las contraseñas no coinciden, devuelve un error
      return res.status(400).json({
        message: ["La contraseña es incorrecta"],
      });
    }

    // Create access token
    const token = await createAccessToken({ // Crea un token de acceso con el ID y el nombre de usuario del usuario
      id: userFound._id,
      username: userFound.username,
    });

    // Set the token in a cookie
    res.cookie("token", token, { // Establece el token en una cookie
      httpOnly: process.env.NODE_ENV !== "development", // Configura la cookie para ser accesible solo mediante HTTP
      secure: true, // Configura la cookie para que solo se envíe a través de HTTPS
      sameSite: "none", // Configura la cookie para que sea enviada a cualquier sitio (incluidas las solicitudes de terceros)
    });

    // Respond with user data
    res.json({ // Responde con los datos del usuario que ha iniciado sesión
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) { // Captura y maneja cualquier error
    return res.status(500).json({ message: error.message }); // Responde con un mensaje de error y un código de estado 500
  }
};

// Controlador para verificar la validez del token
export const verifyToken = async (req, res) => {
  const { token } = req.cookies; // Obtiene el token de la cookie
  if (!token) return res.send(false); // Si no hay token, devuelve 'false'

  jwt.verify(token, TOKEN_SECRET, async (error, user) => { // Verifica la validez del token
    if (error) return res.sendStatus(401); // Si el token no es válido, devuelve un código de estado 401

    const userFound = await User.findById(user.id); // Busca al usuario en la base de datos utilizando el ID almacenado en el token
    if (!userFound) return res.sendStatus(401); // Si no se encuentra ningún usuario, devuelve un código de estado 401

    return res.json({ // Responde con los datos del usuario
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

// Controlador para cerrar sesión de usuarios
export const logout = async (req, res) => {
  res.cookie("token", "", { // Establece una cookie vacía para eliminar el token
    httpOnly: true, // Configura la cookie para ser accesible solo mediante HTTP
    secure: true, // Configura la cookie para que solo se envíe a través de HTTPS
    expires: new Date(0), // Establece la fecha de expiración de la cookie en el pasado para eliminarla
  });
  return res.sendStatus(200); // Responde con un código de estado 200 para indicar que la operación se realizó con éxito
};
