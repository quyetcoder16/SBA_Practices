import axiosClient from '@/shared/services/axiosClient';
const API_URL = "/Category";

export const categoryService = {
    getAll: async () => {
        const response = await axiosClient.get(API_URL);
        return response.data;
    },

    search: async (term) => {
        const response = await axiosClient.get(`${API_URL}?CategoryName_like=${term}`);
        return response.data;
    },

    save: async (category) => {
        if (category.id) {
            return axiosClient.put(`${API_URL}/${category.id}`, category);
        }
        return axiosClient.post(API_URL, {
            ...category,
            id: Date.now().toString(),
            CategoryID: Date.now()
        });
    },

    delete: async (id) => {
        return axiosClient.delete(`${API_URL}/${id}`);
    }
};