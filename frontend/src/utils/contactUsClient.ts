/**
 * @fileoverview This module provides a client for sending contact form data to an API.
 * It uses axios for HTTP requests and includes error handling.
 *
 * @module ContactUsClient
 * @requires axios
 * @requires ../types/contactForm
 */

import axios from "axios";
import { FormData, ContactFormResponse } from "../types/contactForm";

// Create an axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Client for sending contact data
export const ContactUsClient = {
  post: async (
    endpoint: string,
    data: FormData
  ): Promise<ContactFormResponse> => {
    try {
      const response = await axiosInstance.post<ContactFormResponse>(
        endpoint,
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            "An error occurred while sending the message"
        );
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  },
};
