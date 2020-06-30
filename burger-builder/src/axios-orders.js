import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://react-burger-builder-5a27e.firebaseio.com/",
});

export default axiosInstance;
