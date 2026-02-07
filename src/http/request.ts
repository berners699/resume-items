import axios from "axios";
const services = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {},
});
// 响应拦截器
services.interceptors.response.use((res) => {
    return res.data;
});
// 请求拦截器
services.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});
export default services;