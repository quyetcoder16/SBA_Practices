import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 10000,
});

axiosClient.interceptors.request.use(
    (config) => {
        const auth = JSON.parse(localStorage.getItem("auth") || "{}");
        if (auth.token) {
            config.headers.Authorization = `Bearer ${auth.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("auth");
            window.location.href = "/login";
        }

        const message = error.response?.data?.message || "Lỗi hệ thống!";
        return Promise.reject(new Error(message));
    }
);

export default axiosClient;