// tasksApi.js

import axios from "./axios"; // Importar el cliente Axios configurado

// Función para realizar una solicitud GET para obtener todas las tareas
export const getTasksRequest = async () => axios.get("/tasks");

// Función para realizar una solicitud POST para crear una nueva tarea
export const createTaskRequest = async (task) => axios.post("/tasks", task);

// Función para realizar una solicitud PUT para actualizar una tarea existente
export const updateTaskRequest = async (task) => axios.put(`/tasks/${task._id}`, task);

// Función para realizar una solicitud DELETE para eliminar una tarea por su ID
export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);

// Función para realizar una solicitud GET para obtener una tarea por su ID
export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);
