import { getCookie, setCookie, deleteCookie } from "cookies-next";

export const retrieveTokenFromStorage = <T>(key: string): T | null => {
    const cookieValue = getCookie(key);
    if (!cookieValue) return null;

    try {
        return JSON.parse(cookieValue as string) as T;
    } catch {
        return cookieValue as T;
    }
};

export const setTokenToStorage = (key: string, value: string | object, maxAge = 60 * 60 * 24) => {
    const serializedValue = typeof value === "object" ? JSON.stringify(value) : value;
    setCookie(key, serializedValue, { path: "/", maxAge });
};

export const removeTokenFromStorage = (key: string) => {
    deleteCookie(key);
};

export const clearAuthData = (): void => {
    removeTokenFromStorage("accessToken");
    removeTokenFromStorage("refreshToken");
    removeTokenFromStorage("user");
};