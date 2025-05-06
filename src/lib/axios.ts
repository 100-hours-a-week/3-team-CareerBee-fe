import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // .env 파일에 설정
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
