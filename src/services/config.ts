import axios from 'axios';

export const baseApi = axios.create({
    baseURL: import.meta.env.VITE_URL_SAME_SPACE_URL
});
