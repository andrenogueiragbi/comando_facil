import axios from "axios";

process.env.NODE_ENV === "production"

export const BaseUrl = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "https://commands-api.onrender.com": "https://commands-api.onrender.com",
});