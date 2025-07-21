import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://api.hexagon.co.id/",
  baseURL: "https://api.hexagon.co.id/", 
  withCredentials: true, 
});

export default axiosInstance;
