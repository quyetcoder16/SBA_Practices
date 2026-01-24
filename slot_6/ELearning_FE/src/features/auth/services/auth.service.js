export const auth = {
  login: async (payload) => {
    if (
      payload.email === "admin@example.com" &&
      payload.password === "123456"
    ) {
      return {
        user: {
          id: 1,
          name: "John",
          email: "admin@example.com",
        },
        accessToken: "ACCESS_TOKEM_SAMPLE",
    };
    } else throw new Error("Invalid credentials!");
  },
  logout: async () => {},
  register: async (payload) => {},
  refreshToke: async () => {},
};
