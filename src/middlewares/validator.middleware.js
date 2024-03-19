export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);  // Parsea el cuerpo de la solicitud utilizando el esquema proporcionado
        next();  // Pasa al siguiente middleware en la cadena de middleware
    } catch (error) {  // Captura cualquier error de validación de esquema
        return res  // Retorna una respuesta con un código de estado 400 (Bad Request)
            .status(400)
            .json({ message: error.errors.map((error) => error.message) });  // Devuelve un mensaje de error con los detalles de los errores de validación
    }
};

/* NO MODIFICAR */