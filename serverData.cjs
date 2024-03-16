const express = require("express"); // Importa el framework Express
const MongoClient = require("mongodb").MongoClient; // Importa el cliente MongoDB
const app = express(); // Crea una instancia de la aplicación Express

// URL de conexión a la base de datos MongoDB
const mongoURI = "mongodb://localhost:27017";
const dbName = "proyect";

// Middleware de CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Permitir acceso desde cualquier origen
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // Permitir métodos HTTP
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Permitir encabezados personalizados
  next();
});
app.use(express.json()); // Habilita el análisis del cuerpo de la solicitud en formato JSON

// Ruta para registrar una nueva planta
app.post('/plantas', async (req, res) => {
  console.log("Cuerpo de la solicitud:", req.body);
  try {
    const { nombre, tipo, temMax, temMin, phMin, phMax, humedadMax, humedadMin, tempIdeal, horasLuz, phIdeal } = req.body;

    // Conectar a la base de datos
    const client = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);

    // Insertar los datos en la colección de plantas
    const collection = db.collection("plantas");
    const result = await collection.insertOne({
      nombre,
      tipo,
      temMax,
      temMin,
      phMin,
      phMax,
      humedadMax,
      humedadMin,
      tempIdeal,
      horasLuz,
      phIdeal,
    });

    // Enviar la respuesta
    res.json({ message: "Planta registrada correctamente" });

    // Cerrar la conexión
    client.close();
  } catch (error) {
    console.error("Error al registrar nueva planta:", error);
    res.status(500).json({ error: "Error al registrar nueva planta" });
  }
});

// Ruta para obtener los datos de la colección historial
app.get("/historial", async (req, res) => {
  try {
    // Conectar a la base de datos
    const client = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);

    // Obtener los datos de la colección historial
    const collection = db.collection("data");
    const data = await collection.find({}).toArray();

    // Enviar los datos como respuesta
    res.json(data);

    // Cerrar la conexión
    client.close();
  } catch (error) {
    console.error("Error al obtener datos de la colección historial:", error);
    res
      .status(500)
      .json({ error: "Error al obtener datos de la colección historial" });
  }
});

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
