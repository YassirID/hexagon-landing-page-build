import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://api.hexagon.co.id/", // URL backend Laravel
  baseURL: "https://api.hexagon.co.id/", // URL backend Laravel
  withCredentials: true, // Penting untuk mengirimkan cookie
});

export default axiosInstance;
