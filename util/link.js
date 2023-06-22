import axios from "axios";

process.env.NODE_ENV === "production"

export const BaseUrl = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "http://200.234.207.230:8489/": "http://200.234.207.230:8489/",
});