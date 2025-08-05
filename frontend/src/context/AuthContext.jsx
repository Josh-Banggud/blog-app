import {createContext, useContext, useEffect, useState} from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);         
    const [token, setToken] = useState(null);      
    const [loading, setLoading] = useState(true);   

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post("/auth/login", {email, password});
            setToken(res.data.token);
            setUser(res.data.user);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            return {success: true};
        } catch(err){
            return {success: false, message: err.response?.data?.message || "Login failed"};
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    const register = async (name, email, password) => {
        try {
            const res = await axios.post("/auth/sign-up", { name, email, password });

            return { success: true, data: res.data };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Register failed" };
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);