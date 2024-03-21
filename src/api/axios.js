import axios from 'axios';
import { API_URL } from "../config.js";

export const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});