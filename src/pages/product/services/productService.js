// src/services/ProductService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_URL_APIS;

export default class ProductService {
  constructor(token) {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  }

  async getAllProducts() {
    try {
      const res = await this.api.get("/products");
      return res.data.filter((item) => item.status === "available");
    } catch (err) {
      console.error("Error fetching products:", err.response || err);
      return [];
    }
  }
  // ฟังก์ชันเรียก API เพื่อ recover สินค้า
  async recoverProducts() {
    try {
      const res = await this.api.post("/products/recover", []);
      return res.data;
    } catch (err) {
      console.error("Error recovering products:", err.response || err);
      return [];
    }
  }
}
