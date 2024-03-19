import Data from '../models/sensor.model.js';

// Controlador para obtener todos los datos
export const getAllData = async (req, res) => {
    try {
        const allData = await Data.find();
        res.json(allData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para crear un nuevo dato
export const createData = async (req, res) => {
    const newData = new Data(req.body);
    try {
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
