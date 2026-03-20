import axiosClient from '@/shared/services/axiosClient';
import { API_ENDPOINTS } from '@/shared/constants/api.constants';

const API_URL = API_ENDPOINTS.USER;

export const userService = {
    getAll: async () => {
        const response = await axiosClient.get(API_URL);
        return response.data.result;
    },

    create: async (account) => {
        const response = await axiosClient.post(API_URL, account);
        return response.data.result;
    },

    update: async (id, account) => {
        const response = await axiosClient.put(`${API_URL}/${id}`, account);
        return response.data.result;
    },

    save: async (account) => {
        if (account.accountId) {
            return userService.update(account.accountId, account);
        }
        return userService.create(account);
    },

    delete: async (id) => {
        const response = await axiosClient.delete(`${API_URL}/${id}`);
        return response.data;
    }
};