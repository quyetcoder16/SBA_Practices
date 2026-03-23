import axiosClient from "@/shared/services/axiosClient";
import { API_ENDPOINTS } from "@/shared/constants/api.constants";

export const authService = {
    login: async (payload) => {

        const response = await axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
        const data = response.data.result;

        const authData = {
            user: {
                id: data.accountId,
                name: data.accountName,
                email: data.accountEmail,
                role: data.accountRole,
            },
            token: data.token,
        };
        localStorage.setItem("auth", JSON.stringify(authData));
        return authData;
    },

    register: async (payload) => {

        const response = await axiosClient.post(API_ENDPOINTS.AUTH.REGISTER, payload);
        const data = response.data.result;

        const authData = {
            user: {
                id: data.accountId,
                name: data.accountName,
                email: data.accountEmail,
                role: data.accountRole,
            },
            token: data.token,
        };
        localStorage.setItem("auth", JSON.stringify(authData));
        return authData;
    },

    logout: () => {
        localStorage.removeItem("auth");
    },

    getCurrentUser: () => {
        const auth = JSON.parse(localStorage.getItem("auth") || "{}");
        return auth.user || null;
    }
};