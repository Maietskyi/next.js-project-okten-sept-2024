import axios from "axios";
import {retrieveTokenFromStorage, setTokenToStorage} from "./helpers";
import {getCookie} from "cookies-next";
import {retrieveTokenFromServer} from "@/service/helper-use-server";

const axiosInstance = axios.create({
    baseURL: "https://dummyjson.com/auth",
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = retrieveTokenFromStorage<string>("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            let refreshToken: string | null;
            if (typeof window === "undefined") {
                refreshToken = await retrieveTokenFromServer("refreshToken");
            } else {
                refreshToken = getCookie("refreshToken") as string | null;
            }

            if (!refreshToken) {
                return Promise.reject(error);
            }

            try {
                const {data} = await axiosInstance.post("/refresh", {
                    refreshToken,
                });
                setTokenToStorage("accessToken", data.accessToken);
                setTokenToStorage("refreshToken", data.refreshToken);

                originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                console.error("Failed to update token", err);
                setTokenToStorage("accessToken", "");
                setTokenToStorage("refreshToken", "");
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;