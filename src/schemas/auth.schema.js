import { z } from "zod";  // Importa la función 'z' de la biblioteca 'zod'

// Esquema de validación para el registro de usuarios
export const registerSchema = z.object({
    username: z.string({  // Campo 'username' como una cadena
        required_error: "El nombre de usuario es obligatorio",  // Mensaje de error si el campo es requerido pero no se proporciona
    }),
    email: z.string({  // Campo 'email' como una cadena
        required_error: "El correo es obligatorio",  // Mensaje de error si el campo es requerido pero no se proporciona
    }).email({  // Valida que el campo sea un correo electrónico válido
        message: "Correo es inválido",  // Mensaje de error si el correo electrónico no es válido
    }),
    password: z.string({  // Campo 'password' como una cadena
        required_error: "La contraseña es obligatoria",  // Mensaje de error si el campo es requerido pero no se proporciona
    }).min(6, {  // Valida que la contraseña tenga al menos 6 caracteres
        message: "La contraseña debe tener al menos 6 caracteres",  // Mensaje de error si la contraseña no cumple con el requisito mínimo de caracteres
    }),
});

// Esquema de validación para el inicio de sesión
export const loginSchema = z.object({
    email: z.string().email(),  // Campo 'email' como una cadena y se valida que sea un correo electrónico válido
    password: z.string().min(6),  // Campo 'password' como una cadena y se valida que tenga al menos 6 caracteres
});
