import axios from "axios";

const API_URL = process.env.REACT_APP_URL_APIS;

export default class BookingService {
  constructor(token) {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  }

  async createBooking(items) {
    const res = await this.api.post("/bookings", { items });
    return res.data.booking;
  }

  async addItemsToBooking(bookingId, items) {
    const res = await this.api.post(`/bookings/add/${bookingId}`, { items });
    return res.data.booking;
  }

  async removeItemsFromBooking(bookingId, items) {
    const res = await this.api.post(`/bookings/remove/${bookingId}`, { items });
    return res.data.booking;
  }

  async confirmBooking(bookingId) {
    const res = await this.api.post(`/bookings/confirm/${bookingId}`);
    return res.data;
  }

  async getAllBookings() {
    const res = await this.api.get("/bookings");
    return res.data;
  }
}
