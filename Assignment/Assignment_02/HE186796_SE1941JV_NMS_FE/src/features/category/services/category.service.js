import axiosClient from '@/shared/services/axiosClient';
import { API_ENDPOINTS } from '@/shared/constants/api.constants';

const API_URL = API_ENDPOINTS.CATEGORY;

export const categoryService = {
    getAll: async () => {
        const response = await axiosClient.get(API_URL);
        return response.data.result;
    },

    save: async (category) => {
        if (category.categoryId) {
            const response = await axiosClient.put(`${API_URL}/${category.categoryId}`, category);
            return response.data.result;
        }
        const response = await axiosClient.post(API_URL, category);
        return response.data.result;
    },

    delete: async (id) => {
        const response = await axiosClient.delete(`${API_URL}/${id}`);
        return response.data;
    }
};