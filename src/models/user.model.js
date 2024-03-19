import mongoose from "mongoose"; // Importa el módulo mongoose para interactuar con MongoDB

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String, // El campo 'username' es de tipo String
            required: true, // El campo 'username' es obligatorio
            trim: true, // Elimina espacios en blanco al principio y al final del valor
        },
        email: {
            type: String, // El campo 'email' es de tipo String
            required: true, // El campo 'email' es obligatorio
            unique: true, // El campo 'email' debe ser único en la colección
        },
        password: {
            type: String, // El campo 'password' es de tipo String
            required: true, // El campo 'password' es obligatorio
        },
    },
    {
        timestamps: true, // Habilita los timestamps automáticos para 'createdAt' y 'updatedAt'
    }
);

export default mongoose.model("User", userSchema); // Exporta el modelo de usuario creado con el esquema definido

/* NO MODIFICAR */