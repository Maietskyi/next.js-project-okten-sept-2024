import axiosInstance from "@/app/service/axiosInstance";
import {setTokenToStorage} from "@/app/service/helpers";
import {IUser} from "@/app/models/IUser";
import {IRecipes} from "@/app/models/IRecipes";
import {IUserToken} from "@/app/models/IUserToken";


export const loginUser = async (username: string, password: string): Promise<IUserToken> => {
    try {
        const {data} = await axiosInstance.post("/login", {username, password});
        setTokenToStorage("accessToken", data.accessToken);
        setTokenToStorage("refreshToken", data.refreshToken);
        setTokenToStorage("user", {firstName: data.firstName, image: data.image });

        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || "Login failed");
        }
        throw new Error("Login failed");
    }
};

export const getAllUsers = async (page: number, query: string): Promise<{ users: IUser[], total: number }> => {
    try {
        const limit = 30;
        const skip = (page - 1) * limit;
        const {data} = await axiosInstance.get(`/users/search`, {
            params: { q: query, skip, limit },
        });
        console.log('getAllUsers', data);
        return data;
    } catch (error) {
        console.error("Помилка отримання користувачів:", error);
        throw error;
    }
};

export const getUserById = async (id: number): Promise<IUser> => {
    try {
        const { data } = await axiosInstance.get<IUser>(`/users/${id}`);
        console.log('getUserById', data);
        return data;
    } catch (error) {
        console.error("Помилка отримання користувача:", error);
        throw error;
    }
};

export const getAllRecipes = async (page: number, query: string): Promise<{
    recipes: IRecipes[],
    total: number
}> => {
    try {
        const limit = 30;
        const skip = (page - 1) * limit;
        const { data } = await axiosInstance.get(`/recipes/search`, {
            params: { q: query, skip, limit },
        });

        console.log('getAllRecipes', data)
        return data;
    } catch (error) {
        console.error("Помилка отримання рецептів:", error);
        throw error;
    }
};

export const getRecipesByTagApi = async (tag: string, page: number): Promise<{ recipes: IRecipes[], total: number }> => {
    try {
        const { data } = await axiosInstance.get(`/recipes/tag/${tag}`, {
            params: { page }
        });
        console.log('getRecipesByTagApi', data)
        return data;
    } catch (error) {
        console.error("Помилка отримання рецептів за тегом:", error);
        throw error;
    }
};

export const getRecipeById = async (id: number): Promise<IRecipes> => {
    try {
        const { data } = await axiosInstance.get<IRecipes>(`/recipes/${id}`);
        console.log('getRecipeById', data);
        return data;
    } catch (error) {
        console.error("Помилка отримання рецепта:", error);
        throw error;
    }
};

export const getAllRecipesForUser = async (userId: number): Promise<IRecipes[]> => {
    try {
        let allRecipes: IRecipes[] = [];
        let skip = 0;
        const limit = 30;

        while (true) {
            const { data } = await axiosInstance.get(`/recipes`, {
                params: {
                    skip,
                }
            });
            if (data && Array.isArray(data.recipes)) {
                allRecipes = [...allRecipes, ...data.recipes];
                if (data.recipes.length < limit) {
                    break;
                }
                skip += limit;
            } else {
                throw new Error('Recipes not found or the response is not an array');
            }
        }

        return allRecipes.filter((recipe: IRecipes) => recipe.userId === userId);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
};