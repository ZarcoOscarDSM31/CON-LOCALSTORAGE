import { z } from "zod";

// Esquema de validación para el inicio de sesión
export const loginSchema = z.object({
  email: z.string().email({
    message: "Ingresa una dirección de correo electrónico válida", // Mensaje de error personalizado para el campo de correo electrónico
  }),
  password: z.string().min(6, {
    message: "Ingresa una contraseña de al menos 6 caracteres", // Mensaje de error personalizado para el campo de contraseña
  }),
});

// Esquema de validación para el registro
export const registerSchema = z
  .object({
    username: z
      .string({
        required_error: "El nombre de usuario es obligatorio", // Mensaje de error personalizado para el campo de nombre de usuario
      })
      .min(4, {
        message: "El nombre de usuario debe tener al menos 4 caracteres", // Mensaje de error personalizado para el campo de nombre de usuario
      }),
    email: z.string().email({
      message: "Ingresa una dirección de correo electrónico válida", // Mensaje de error personalizado para el campo de correo electrónico
    }),
    password: z.string().min(6, {
      message: "Ingresa una contraseña de al menos 6 caracteres", // Mensaje de error personalizado para el campo de contraseña
    }),
    confirmPassword: z.string().min(6, {
      message: "Ingresa una contraseña de al menos 6 caracteres", // Mensaje de error personalizado para el campo de confirmación de contraseña
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden", // Mensaje de error si las contraseñas no coinciden
    path: ["confirmPassword"], // Campo de confirmación de contraseña que se debe validar
  });
