import { Router } from "express";  // Importa la función 'Router' de Express

import {  // Importa los controladores de autenticación desde el archivo auth.controller.js
    login,
    logout,
    register,
    verifyToken,
} from "../controllers/auth.controller.js";

import { validateSchema } from "../middlewares/validator.middleware.js";  // Importa el middleware de validación de esquema desde el archivo validator.middleware.js
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";  // Importa los esquemas de validación de autenticación desde el archivo auth.schema.js

const router = Router();  // Crea una nueva instancia de enrutador

router.post("/register", validateSchema(registerSchema), register);  // Define una ruta POST para el registro de usuarios y utiliza el middleware de validación de esquema
router.post("/login", validateSchema(loginSchema), login);  // Define una ruta POST para el inicio de sesión y utiliza el middleware de validación de esquema
router.get("/verifyToken", verifyToken);  // Define una ruta GET para verificar el token de autenticación
router.post("/logout", verifyToken, logout);  // Define una ruta POST para cerrar sesión y verifica el token de autenticación antes de ejecutar el controlador

export default router;  // Exporta el enrutador

/* NO MODIFICAR */