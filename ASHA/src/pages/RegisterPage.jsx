// Importaciones de módulos y componentes necesarios
import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth"; // Importa el esquema de validación para el registro de usuarios
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  // Inicialización de variables y funciones del formulario de registro
  const { signup, errors: registerErrors, isAuthenticated } = useAuth(); // Obtiene funciones y datos de autenticación
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema), // Utiliza el esquema de validación para el formulario
  });
  const navigate = useNavigate(); // Función de navegación

  // Función que maneja el envío del formulario
  const onSubmit = async (value) => {
    await signup(value); // Realiza la solicitud de registro con los datos del formulario
  };

  // Efecto secundario para redireccionar al usuario después de registrarse
  useEffect(() => {
    if (isAuthenticated) navigate("/tasks"); // Redirecciona al usuario a la página de tareas si está autenticado
  }, [isAuthenticated]);

  return (
    // Contenedor principal de la página de registro
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        {/* Mensajes de error de registro */}
        {registerErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        {/* Título de la página */}
        <h1 className="text-3xl font-bold">Registro</h1>

        {/* Formulario de registro */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo de nombre de usuario */}
          <Label htmlFor="username">Nombre de usuario:</Label>
          <Input
            type="text"
            name="username"
            placeholder="Ingrese su nombre de usuario"
            {...register("username")}
            autoFocus
          />
          {/* Mensaje de error para el campo de nombre de usuario */}
          {errors.username?.message && (
            <p className="text-red-500">{errors.username?.message}</p>
          )}

          {/* Campo de correo electrónico */}
          <Label htmlFor="email">Correo:</Label>
          <Input
            name="email"
            placeholder="Ingrese su correo electrónico"
            {...register("email")}
          />
          {/* Mensaje de error para el campo de correo electrónico */}
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}

          {/* Campo de contraseña */}
          <Label htmlFor="password">Contraseña:</Label>
          <Input
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            {...register("password")}
          />
          {/* Mensaje de error para el campo de contraseña */}
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}

          {/* Campo de confirmación de contraseña */}
          <Label htmlFor="confirmPassword">Confirmar contraseña:</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirme su contraseña"
            {...register("confirmPassword")}
          />
          {/* Mensaje de error para el campo de confirmación de contraseña */}
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}

          {/* Botón de registro */}
          <Button>Registrarse</Button>
        </form>

        {/* Enlace para iniciar sesión */}
        <p className="flex gap-x-2 justify-between">
          ¿Ya tienes una cuenta?{" "}
          <Link className="text-sky-500" to="/login">
            Iniciar sesión
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;
