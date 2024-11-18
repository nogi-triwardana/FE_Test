import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
});

axiosInstance.interceptors.request.use(
  async (request: InternalAxiosRequestConfig<any>) => {
    const session: any = await getSession();
    
    if(session) {
      request.headers.Authorization = `Bearer ${session?.accessToken}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
); 

export default axiosInstance;