import axios from "axios";

export const api = axios.create({
  baseURL: "https://feedget-nlw-production-a88e.up.railway.app/"
})