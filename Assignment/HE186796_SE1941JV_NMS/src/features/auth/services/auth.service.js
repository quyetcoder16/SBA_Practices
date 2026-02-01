import axiosClient from "@/shared/services/axiosClient";

export const authService = {
    login: async (payload) => {
        try {
            const response = await axiosClient.get(
                `/SystemAccount?AccountEmail=${payload.email}&AccountPassword=${payload.password}`
            );
            const user = response.data[0];

            if (user) {
                return {
                    user: {
                        id: user.AccountID,
                        name: user.AccountName,
                        email: user.AccountEmail,
                        role: user.AccountRole,
                    },
                    accessToken: "TOKEN_" + btoa(user.AccountEmail),
                };
            } else {
                throw new Error("Tài khoản hoặc mật khẩu không chính xác!");
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || "Lỗi hệ thống khi đăng nhập!");
        }

    }
}