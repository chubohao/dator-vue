import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from 'axios';

const service: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 100, 
  headers: { "Content-Type": "application/json;charset=UTF-8" }
});

service.interceptors.request.use((config: AxiosRequestConfig) => {
     return config;
    }, (error) => {
    return Promise.reject(error)
});

service.interceptors.response.use((response: AxiosResponse) => {
        const data = response.data;
        return data;
    },
    (err) => {
        return Promise.reject(err.response);
    }
);

export default service;