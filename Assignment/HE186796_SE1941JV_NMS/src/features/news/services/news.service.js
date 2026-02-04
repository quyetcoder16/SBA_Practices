import axiosClient from '@/shared/services/axiosClient';

const API_URL = "/NewsArticle";

export const newsService = {

    getAll: async () => {
        const response = await axiosClient.get(API_URL);
        return response.data;
    },


    search: async (term) => {
        const response = await axiosClient.get(`${API_URL}?q=${term}`);

        return response.data;
    },


    save: async (article) => {
        const now = new Date().toISOString();

        if (article.id) {
            return axiosClient.put(`${API_URL}/${article.id}`, {
                ...article,
                ModifiedDate: now
            });
        }

        return axiosClient.post(API_URL, {
            ...article,
            id: Date.now().toString(),
            NewsArticleID: Date.now(),
            CreatedDate: now,
            ModifiedDate: now,
            NewsStatus: article.NewsStatus ?? 1
        });
    },

    delete: async (id) => {
        return axiosClient.delete(`${API_URL}/${id}`);
    }
};