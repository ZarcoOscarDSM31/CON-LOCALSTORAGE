import React, {  useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth.js";
import { Button, Card, Input, Message, Label } from "../components/ui/";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated, getUser  } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data); //Enviar formulario

  useEffect(() => {
    if (isAuthenticated) {
      const user = getUser();
      
      if (user && user.userPermissions === "admin") {
        navigate("/admin");
      } else {
        navigate("/sensor");
      }
    }
  }, [isAuthenticated, navigate, getUser]);



  return (
    <div className="flex justify-center items-center h-screen" >
      <Card>
        {loginErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}

        <h1 className="text-2xl text-white font-bold">Iniciar sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="email">Correo:</Label>
          <Input
            label="Correo Electrónico"
            type="email"
            name="email"
            placeholder="Ingrese su correo electrónico"
            {...register("email", { required: true })}
          />
          <p className="text-red-500">{errors.email?.message}</p>{" "}
          {/* Mensaje de error para el campo de correo electrónico */}

          <Label htmlFor="password">Contraseña:</Label>
          <Input
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            {...register("password", { required: true, minLength: 6 })}
          />
          <p className="text-red-500">{errors.password?.message}</p>{" "}
          {/* Mensaje de error para el campo de contraseña */}

          <Button>Iniciar sesión</Button>
        </form>

        <p className="flex text-white gap-x-2 justify-between">
          ¿No tiene una cuenta?{" "}
          <Link to="/register" className="text-sky-500">
            Registrarse
          </Link>
        </p>
      </Card>
    </div>
  );
}
