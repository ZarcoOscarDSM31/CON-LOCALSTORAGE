import { useTasks } from "../../context/tasksContext"; // Importar el hook personalizado useTasks desde el contexto
import { Button, ButtonLink, Card } from "../ui"; // Importar componentes de interfaz de usuario

// Componente funcional TaskCard que representa una tarjeta de tarea individual
export function TaskCard({ task }) {
  const { deleteTask } = useTasks(); // Obtener la función deleteTask del contexto de tareas

  return (
    <Card> {/* Tarjeta que contiene la tarea */}
      <header className="flex justify-between"> {/* Encabezado de la tarjeta */}
        <h1 className="text-2xl font-bold">{task.title}</h1> {/* Título de la tarea */}
        <div className="flex gap-x-2 items-center"> {/* Contenedor de botones */}
          {/* Botón para eliminar la tarea */}
          <Button onClick={() => deleteTask(task._id)}>Delete</Button>
          {/* Botón para editar la tarea */}
          <ButtonLink to={`/tasks/${task._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p> {/* Descripción de la tarea */}
      {/* Formatear la fecha de la tarea si está presente */}
      <p>
        {task.date &&
          new Date(task.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </Card>
  );
}
