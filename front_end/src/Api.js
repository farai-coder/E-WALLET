import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.50.226:8000",
})

export default api;


export const BASE_URL = 'http://192.168.50.226:8000';

export const fetchLogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/log`);
    return response.data;
  } catch (error) {
    console.error('Error fetching logs:', error);
    throw error;
  }
};
