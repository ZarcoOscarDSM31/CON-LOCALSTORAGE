// Importaciones de módulos y componentes necesarios
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react'; // Agregamos useState
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth"; // Importa el esquema de validación para el inicio de sesión


export function LoginPage() {
  // Inicialización de variables y funciones del formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema), // Utiliza el esquema de validación para el formulario
  });
  const { signin, errors: loginErrors, isAuthenticated, getUser } = useAuth(); // Obtiene funciones y datos de autenticación
  const navigate = useNavigate(); // Función de navegación


  // Función que maneja el envío del formulario
  const onSubmit = (data) => signin(data);

  // Efecto secundario para redireccionar al usuario después de iniciar sesión
  useEffect(() => {
    if (isAuthenticated) {
      const user = getUser(); // Obtener información del usuario autenticado
      
      // Redireccionar a la página correspondiente según los permisos del usuario
      if (user && user.userPermissions === "admin") {
        navigate("/admin");
      } else {
        navigate("/tasks");
      }
    }
  }, [isAuthenticated]);

  return (
    // Contenedor principal de la página de inicio de sesión
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card> {/* Ajustamos darkMode según el estado */}
        {/* Mensajes de error de inicio de sesión */}
        {loginErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        {/* Título de la página */}
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>

        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo de correo electrónico */}
          <Label htmlFor="email">Correo:</Label>
          <Input
            label="Correo Electrónico"
            type="email"
            name="email"
            placeholder="Ingrese su correo electrónico"
            {...register("email", { required: true })}
          />
          <p className="text-red-500">{errors.email?.message}</p> {/* Mensaje de error para el campo de correo electrónico */}

          {/* Campo de contraseña */}
          <Label htmlFor="password">Contraseña:</Label>
          <Input
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            {...register("password", { required: true, minLength: 6 })}
          />
          <p className="text-red-500">{errors.password?.message}</p> {/* Mensaje de error para el campo de contraseña */}

          {/* Botón de inicio de sesión */}
          <Button>Iniciar sesión</Button>
        </form>

        {/* Enlace para registrarse */}
        <p className="flex gap-x-2 justify-between">
          ¿No tiene una cuenta? <Link to="/register" className="text-sky-500">Registrarse</Link>
        </p>
      </Card>
    </div>
  );
}
  