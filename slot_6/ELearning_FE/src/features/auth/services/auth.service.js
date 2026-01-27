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
  logout: async () => { },
  register: async (payload) => {

    return fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });


  },
  refreshToke: async () => { },
};
