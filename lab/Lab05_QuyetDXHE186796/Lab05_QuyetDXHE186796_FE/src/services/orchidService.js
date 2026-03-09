import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const orchidService = {
    getAll: async () => {
        const response = await axios.get(API_URL);
        return response.data.result;
    },

    getById: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data.result;
    },

    create: async (data) => {
        const payload = {
            ...data,
            isNatural: !!data.isNatural,
            isAttractive: !!data.isAttractive
        };
        const response = await axios.post(API_URL, payload);
        return response.data.result;
    },

    update: async (id, data) => {
        const payload = {
            ...data,
            isNatural: !!data.isNatural,
            isAttractive: !!data.isAttractive
        };
        const response = await axios.put(`${API_URL}/${id}`, payload);
        return response.data.result;
    },

    delete: async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data.result;
    }
};

export default orchidService;
