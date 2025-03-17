import { AuthProvider } from "react-admin";

const BASE_URL = "https://toread.onrender.com/";
const LOGIN_URL = `${BASE_URL}moderator/auth/login/`;
const LOGOUT_URL = `${BASE_URL}logout/`;

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Невірний email або пароль");
      }

      const data = await response.json();

      if (data && data.access) {
        localStorage.setItem("token", data.access);
        return Promise.resolve();
      } else {
        throw new Error("Невірний email або пароль");
      }
    } catch (error) {
      throw new Error("Помилка під час автентифікації");
    }
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    return token ? Promise.resolve() : Promise.reject();
  },

  logout: async () => {
    try {
      await fetch(LOGOUT_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("token");
      return Promise.resolve();
    } catch (error) {
      throw new Error("Помилка під час виходу");
    }
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => {
    const role = localStorage.getItem("role");
    return role ? Promise.resolve(role) : Promise.reject();
  },

  getIdentity: () => {
    const user = localStorage.getItem("user");
    if (user) {
      return Promise.resolve(JSON.parse(user));
    }
    return Promise.reject();
  },
};

export default authProvider;
