import { instance } from "./axios.js";

export const registerRequest = async (user) =>
    instance.post(`/auth/register`, user);

export const loginRequest = async (user) =>
    instance.post(`/auth/login`, user);

export const verifyTokenRequest = async () =>
    instance.get(`/auth/verifyToken`);