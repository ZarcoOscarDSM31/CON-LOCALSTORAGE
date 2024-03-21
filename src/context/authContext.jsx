import React, { createContext, useContext, useState, useEffect} from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";


const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("There is no AuthProvider");
    return context;
};

export const useUser = () => useContext(AuthContext).getUser;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUser = () => user;

    useEffect(() => {
        if (errors.length > 0) {
          const timer = setTimeout(() => {
            setErrors([]);
          }, 5000);
          return () => clearTimeout(timer);
        }
      }, [errors]);

      const signup = async (userData) => {
        try {
            const res = await registerRequest(userData);
            if (res.status === 200) {
                const token = res.data.token;
                localStorage.setItem("token", token); // Almacena el token en localStorage
                setUser(res.data);
                setIsAuthenticated(true);
            }
        } catch(error) {
            setErrors(error.response.data.message || []);
        }
    };
    

    const signin = async (userData) => {
        try {
            const res = await loginRequest(userData);
            const token = res.data.token;
            localStorage.setItem("token", token); // Almacena el token en localStorage
            setUser(res.data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)
        }
    };


    const logout = () => {
        localStorage.removeItem("token"); // Elimina el token del localStorage
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const checkLogin = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenRequest();
                setUser(res.data.user);
                setIsAuthenticated(true);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setLoading(false);
            }
        };
        checkLogin();
        }, []);


        return (
            <AuthContext.Provider
            value={{
                user,
                signup,
                signin,
                logout,
                isAuthenticated,
                errors,
                loading,
                getUser
            }}
            >
                {children}
            </AuthContext.Provider>
    );
};

export default AuthContext;