// src/services/BookingService.js
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

  /** Create a new booking with items */
  async createBooking(items) {
    try {
      const res = await this.api.post("/bookings", { items });
      return res.data.booking;
    } catch (err) {
      console.error(
        "Error creating booking:",
        err.response?.data || err.message
      );
      return null;
    }
  }


  /** Remove items from an existing booking */
  async removeItemsFromBooking(bookingId, items) {
    try {
      const res = await this.api.post(`/bookings/remove/${bookingId}`, {
        items,
      });
      return res.data.booking;
    } catch (err) {
      console.error(
        "Error removing items from booking:",
        err.response?.data || err.message
      );
      return null;
    }
  }

  /** Confirm a booking (finalize sale) */
  async confirmBooking(bookingId) {
    try {
      const res = await this.api.post(`/bookings/confirm/${bookingId}`);
      return res.data;
    } catch (err) {
      console.error(
        "Error confirming booking:",
        err.response?.data || err.message
      );
      return null;
    }
  }

  /** Get all bookings for the user */
  async getAllBookings() {
    try {
      const res = await this.api.get("/bookings");
      return res.data;
    } catch (err) {
      console.error(
        "Error fetching bookings:",
        err.response?.data || err.message
      );
      return [];
    }
  }

  /** Optional: auto-expire a booking after a set time */
  async expireBooking(bookingId) {
    try {
      const res = await this.api.post(`/bookings/expire/${bookingId}`);
      return res.data;
    } catch (err) {
      console.error(
        "Error expiring booking:",
        err.response?.data || err.message
      );
      return null;
    }
  }
}
