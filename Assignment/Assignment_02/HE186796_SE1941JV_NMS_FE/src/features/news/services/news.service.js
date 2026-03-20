import axiosClient from '@/shared/services/axiosClient';
import { API_ENDPOINTS } from '@/shared/constants/api.constants';

const API_URL = API_ENDPOINTS.NEWS;

export const newsService = {
    getAll: async () => {

        const response = await axiosClient.get(API_URL);
        return response.data.result;
    },

    getMyArticles: async () => {
        const response = await axiosClient.get(`${API_URL}/my`);
        return response.data.result;
    },

    getById: async (id) => {
        const response = await axiosClient.get(`${API_URL}/${id}`);
        return response.data.result;
    },

    save: async (article) => {

        const payload = {
            newsTitle: article.newsTitle,
            headline: article.headline,
            newsContent: article.newsContent,
            newsSource: article.newsSource,
            newsStatus: article.newsStatus,
            categoryId: article.categoryId,
            tagIds: article.tagIds || [],
        };

        if (article.newsArticleId) {
            const response = await axiosClient.put(`${API_URL}/${article.newsArticleId}`, payload);
            return response.data.result;
        }
        const response = await axiosClient.post(API_URL, payload);
        return response.data.result;
    },

    delete: async (id) => {
        const response = await axiosClient.delete(`${API_URL}/${id}`);
        return response.data;
    }
};