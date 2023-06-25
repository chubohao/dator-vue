import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from 'axios';

const service: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000, 
  headers: { "Content-Type": "application/json;charset=UTF-8" }
});

service.interceptors.request.use((config) => {
     return config;
    }, (error) => {
    return Promise.reject(error)
});

export default service;