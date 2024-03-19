// tasksApi.js

import axios from "./axios"; // Importar el cliente Axios configurado

// Función para realizar una solicitud GET para obtener todas las tareas
export const getTasksRequest = async () => axios.get("/tasks");
