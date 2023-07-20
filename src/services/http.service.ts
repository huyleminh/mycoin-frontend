import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { APP_CONFIG } from "../configs";
import { IBaseResponse } from "../core/types";

export const axiosInstance = axios.create({
    baseURL: APP_CONFIG.chainNetApi,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (!(error instanceof AxiosError)) {
            return Promise.reject(error);
        }

        const { response } = error;
        if (!response) {
            return Promise.reject(error);
        }

        const { status } = response;

        if (status === 400) {
            return Promise.resolve(response);
        }

        if (status === 500) {
            const data = response.data;
            toast.error("Something went wrong!");
            return Promise.reject(data?.errors);
        }

        toast.error("Unexpected error, please contact admin for support!");
        return Promise.reject(error);
    }
);

export class HttpService {
    public static async get<T>(path: string, extraConfig?: AxiosRequestConfig): Promise<IBaseResponse<T>> {
        return this.handleAPIResponse(await axiosInstance.get<IBaseResponse<T>>(path, extraConfig));
    }

    public static async post<T>(
        path: string,
        payload: any,
        extraConfig?: AxiosRequestConfig
    ): Promise<IBaseResponse<T>> {
        return this.handleAPIResponse(await axiosInstance.post<IBaseResponse<T>>(path, payload, extraConfig));
    }

    public static async delete<T>(path: string, extraConfig?: AxiosRequestConfig): Promise<IBaseResponse<T>> {
        return this.handleAPIResponse(await axiosInstance.delete<IBaseResponse<T>>(path, extraConfig));
    }

    public static async put<T>(
        path: string,
        payload: any,
        extraConfig?: AxiosRequestConfig
    ): Promise<IBaseResponse<T>> {
        return this.handleAPIResponse(await axiosInstance.put<IBaseResponse<T>>(path, payload, extraConfig));
    }

    public static async patch<T>(
        path: string,
        payload: any,
        extraConfig?: AxiosRequestConfig
    ): Promise<IBaseResponse<T>> {
        return this.handleAPIResponse(await axiosInstance.patch<IBaseResponse<T>>(path, payload, extraConfig));
    }

    private static handleAPIResponse(response: AxiosResponse<any>): any {
        return response.data;
    }
}
