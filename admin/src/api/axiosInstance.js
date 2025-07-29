import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.success === 2) {
      toast.error(response.data.message);
      window.location.href = '/login'; // Use window.location for Vite/SPA
      return Promise.reject(response);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;