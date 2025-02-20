"use server";
import { cookies } from "next/headers";

export const retrieveTokenFromServer = async (key: string) => {
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value || null;
};