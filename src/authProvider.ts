// src/authProvider.ts
import { AuthProvider } from "react-admin";
import axios from "axios";

const BASE_URL = "https://toread.onrender.com/";
const LOGIN_URL = `${BASE_URL}moderator/auth/login/`;
const LOGOUT_URL = `${BASE_URL}logout/`;

const authProvider: AuthProvider = {
  // Автентифікація користувача
  login: async ({ email, password }) => {
    try {
      const response = await axios.post(LOGIN_URL, { email, password });

      if (response.data && response.data.access) {
        localStorage.setItem("token", response.data.access); // Зберігаємо токен
        return Promise.resolve();
      } else {
        throw new Error("Невірний email або пароль");
      }
    } catch (error) {
      throw new Error("Помилка під час автентифікації");
    }
  },

  // Перевірка автентифікації
  checkAuth: () => {
    const token = localStorage.getItem("token");
    return token ? Promise.resolve() : Promise.reject();
  },

  // Вихід
  logout: async () => {
    try {
      await axios.post(LOGOUT_URL);
      localStorage.removeItem("token");
      return Promise.resolve();
    } catch (error) {
      throw new Error("Помилка під час виходу");
    }
  },

  // Перевірка помилок
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Отримання прав користувача
  getPermissions: () => {
    const role = localStorage.getItem("role"); // Припустимо, що роль зберігається в localStorage
    return role ? Promise.resolve(role) : Promise.reject();
  },

  // Отримання інформації про користувача
  getIdentity: () => {
    const user = localStorage.getItem("user"); // Припустимо, що дані користувача зберігаються в localStorage
    if (user) {
      return Promise.resolve(JSON.parse(user));
    }
    return Promise.reject();
  },
};

export default authProvider;