import axiosClient from "@/shared/services/axiosClient";


const courseService = {
    findAll: async (params) => {
        const response = await axiosClient.get("/courses", {
            params: params
        });
        return response.data;
    },
    findById: async (courseId) => {
        const response = await axiosClient.get(`/courses/${courseId}`);
        return response.data;
    }
};

export default courseService;