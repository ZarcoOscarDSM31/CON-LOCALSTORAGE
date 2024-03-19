import { Router } from "express";
import {
  getTasks,
} from "../controllers/tasks.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/tasks", auth, getTasks);

export default router;

/* NO MODIFICAR O SI QUIERES HAZLO, EN LUGAR DE USAR EL DE GRÁFICAS PUEDES USAR ESTAS RUTAS*/