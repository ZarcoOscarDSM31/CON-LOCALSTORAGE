import { instance } from "../api/axios.js";

export const getSensor = async () => {
    try {
        const response = await instance.get(`/getSensor`);
        return response.data;
    } catch (error) {
        console.error("Error fetching sensor data:", error);
        throw error; // Re-lanza el error para que pueda ser manejado por el componente
    }
};