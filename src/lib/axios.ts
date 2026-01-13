import axios from "axios";

const BASE_URL = 'https://68789a3563f24f1fdc9e98dd.mockapi.io';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
//   withCredentials: true, // blm ada credentials req
});