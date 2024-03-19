import { createContext, useContext, useState } from "react";
import {
  getTasksRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  
  // Función para realizar una solicitud GET para obtener todas las tareas
  const getTasks = async () => {
    const tasks = await getTasksRequest();
    setTasks(tasks);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
