import axiosClient from '@/shared/services/axiosClient';
const API_URL = "/SystemAccount";

export const userService = {

    getAll: async () => {
        const response = await axiosClient.get(API_URL);
        return response.data;
    },


    search: async (term) => {
        const response = await axiosClient.get(`${API_URL}?AccountName_like=${term}`);
        return response.data;
    },


    save: async (account) => {
        if (account.id) {
            return axiosClient.put(`${API_URL}/${account.id}`, account);
        }
        return axiosClient.post(API_URL, {
            ...account,
            id: Date.now().toString(),
            AccountID: Date.now()
        });
    },


    delete: async (id) => {
        return axiosClient.delete(`${API_URL}/${id}`);
    }
};