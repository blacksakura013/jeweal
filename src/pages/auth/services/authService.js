import axios from "axios";

const API_URL = process.env.REACT_APP_URL_APIS;

export default class AuthService {
  static async login({ username, password }) {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  static async register({ username, password, confirmPassword }) {
    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        username,
        password,
        confirmPassword,
      });
      const loginResult = await AuthService.login({ username, password });
      return loginResult; // คืนค่าผลลัพธ์ login
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}
