import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.BACKEND_DOMAIN ?? "http://localhost:1234/", // Do not forget to add this to the config / env
  withCredentials: true,
});

export default axiosClient;
