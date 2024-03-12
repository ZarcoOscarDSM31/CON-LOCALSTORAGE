import React, { Component } from 'react';
import { Card, Message, Button, Input, Label } from "./ui";

class FormPlants extends Component{
    constructor(props) {
        super(props);

    }

   render(){
    return(
        <div className="container justify-content:flex flex items-center justify-center">
        <div className="mx-auto static ">
        <Card>
          <h1 className="text-3xl font-bold">Registro de nuevas Plantas</h1>
          <form>
            <Input name="nombre" placeholder="Ingrese nombre" />
            <Input name="tipo" placeholder="Ingrese Tipo de planta" />
            <Input name="temMax" placeholder="Ingrese Temperatura Maxima" />
            <Input name="temMin" placeholder="Ingrese Temperatura Minima" />
            <Input name="phMin" placeholder="Ingrese Ph Minimo" />
            <Input name="phMax" placeholder="Ingrese Ph Maximo" />
            <Input name="humedadMax" placeholder="Ingrese Humedad Maxima" />
            <Input name="humedadMin" placeholder="Ingrese Humedad Minima" />
            <Input name="tempIdeal" placeholder="Ingrese Temperatura Ideal" />
            <Input name="horasLuz" placeholder="Ingrese Horas Luz" />
            <Input name="phIdeal" placeholder="Ingrese Ph Ideal" />
            <Button>Registrar</Button>
          </form>
          </Card>
        </div>
      </div>
    );
   }
}
export default FormPlants;