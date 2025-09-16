import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://content.hexagon.co.id/",
  baseURL: "https://content.hexagon.co.id/",
  withCredentials: true,
});

export default axiosInstance;
