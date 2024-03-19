import express from 'express';
import { getAllData } from '../controllers/sensor.controller.js';

const router = express.Router();

// Ruta para obtener todos los datos
router.get('/', getAllData);

export default router;
