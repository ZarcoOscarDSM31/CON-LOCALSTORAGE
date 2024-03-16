import React, { useState } from 'react';
import { Card, Button, Input } from "./ui";

function FormPlants() {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    temMax: '',
    temMin: '',
    phMin: '',
    phMax: '',
    humedadMax: '',
    humedadMin: '',
    tempIdeal: '',
    horasLuz: '',
    phIdeal: ''
  });

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos del formulario al servidor
      const response = await fetch('http://localhost:3000/plantas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data.message); // Mensaje de confirmación del servidor
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center">
      <div className="w-full max-w-lg">
        <Card>
          <h1 className="text-3xl font-bold text-center mb-4">Registro de nuevas Plantas</h1>
          {/* Formulario de registro de plantas */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Campos de entrada para cada dato de la planta */}
            <Input name="nombre" placeholder="Ingrese nombre" onChange={handleChange} />
            <Input name="tipo" placeholder="Ingrese Tipo de planta" onChange={handleChange} />
            <Input name="temMax" placeholder="Ingrese Temperatura Maxima" onChange={handleChange} />
            <Input name="temMin" placeholder="Ingrese Temperatura Minima" onChange={handleChange} />
            <Input name="phMin" placeholder="Ingrese Ph Minimo" onChange={handleChange} />
            <Input name="phMax" placeholder="Ingrese Ph Maximo" onChange={handleChange} />
            <Input name="humedadMax" placeholder="Ingrese Humedad Maxima" onChange={handleChange} />
            <Input name="humedadMin" placeholder="Ingrese Humedad Minima" onChange={handleChange} />
            <Input name="tempIdeal" placeholder="Ingrese Temperatura Ideal" onChange={handleChange} />
            <Input name="horasLuz" placeholder="Ingrese Horas Luz" onChange={handleChange} />
            <Input name="phIdeal" placeholder="Ingrese Ph Ideal" onChange={handleChange} />
            {/* Botón para enviar el formulario */}
            <Button type="submit">Registrar</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default FormPlants;
