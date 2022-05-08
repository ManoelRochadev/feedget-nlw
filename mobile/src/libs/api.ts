import axios from "axios";

export const api = axios.create({
  baseURL: "https://backend-feedget-production-d75d.up.railway.app/"
})