"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {clearAuthData, retrieveTokenFromStorage} from "@/app/service/helpers";

interface User {
    firstName: string;
    image: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    handleLogout: () => void;
}

// Створення контексту для аутентифікації
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = retrieveTokenFromStorage<string>("accessToken");
        const userData = retrieveTokenFromStorage<User>("user");

        setIsAuthenticated(!!token);
        setUser(userData);
    }, []);

    const handleLogout = () => {
        clearAuthData();
        setIsAuthenticated(false);
        setUser(null);
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для доступу до контексту
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};