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

  /**
   * Get all available products
   * @returns {Array} products
   */
async getAllProducts() {
  try {
    const res = await this.api.get("/products");

    // ใช้ res.data.products แทน res.data
    const products = res.data.products || [];

    // Filter products available
    return products.filter(item => {
      // ถ้า items ใน product เป็น array ให้ตรวจสอบ status ของแต่ละ item
      if (item.items && Array.isArray(item.items)) {
        item.items = item.items.filter(i => i.status === "available");
        return item.items.length > 0;
      }
      return item.status === "available";
    });
  } catch (err) {
    console.error("Error fetching products:", err.response?.data || err.message);
    return [];
  }
}


  /**
   * Recover products (set all returned to available)
   * @returns {Array} recovered products
   */
  async recoverProducts() {
    try {
      const res = await this.api.post("/products/recover", []);
      console.log("Products recovered successfully ✅");
      return res.data;
    } catch (err) {
      console.error("Error recovering products:", err.response?.data || err.message);
      return [];
    }
  }

  /**
   * Optional: Get single product by SN or ID
   * @param {string} idOrSn
   */
  async getProduct(idOrSn) {
    try {
      const res = await this.api.get(`/products/${idOrSn}`);
      return res.data;
    } catch (err) {
      console.error("Error fetching product:", err.response?.data || err.message);
      return null;
    }
  }
}
