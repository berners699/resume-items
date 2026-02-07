import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { getMessageInfo } from "./status";

interface BaseResponse<T = any> {
    code: number | string;
    message: string;
    data: T;
    status?: number;
}

const services = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {},
});
// 响应拦截器
services.interceptors.response.use((res: AxiosResponse) => {
    if (res.status === 200) {
        return res.data;
    }
    ElMessage({
        message: getMessageInfo(res.status),
        type: 'error'
    });
    return res.data;
}, (error: any) => {
    const { response } = error;
    if (response) {
        ElMessage({
            message: getMessageInfo(response.status),
            type: 'error'
        })
    }
});
// 请求拦截器
services.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    return config;
}, (error: AxiosError) => {
    return Promise.reject(error);
});

const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
    const conf = config;
    return new Promise((resolve, reject) => {
        services
            .request<any, AxiosResponse<BaseResponse>>(conf)
            .then((res: AxiosResponse<BaseResponse>) => {
                const data = res.data;
                // 如果data.code为错误代码返回message信息
                if (data.code != 1) {
                    ElMessage({
                        message: data.message,
                        type: 'error',
                    });
                    reject(data.message);
                } else {
                    ElMessage({
                        message: data.message,
                        type: 'success',
                    });
                    // 此处返回data信息 也就是 api 中配置好的 Response类型
                    resolve(data.data as T);
                }
            });
    });
};
export function get<T = any, U = any>(
    config: AxiosRequestConfig,
    url: string,
    parms?: U
): Promise<T> {
    return requestInstance({ ...config, url, method: 'GET', params: parms });
}

export function post<T = any, U = any>(
    config: AxiosRequestConfig,
    url: string,
    data: U
): Promise<T> {
    return requestInstance({ ...config, url, method: 'POST', data: data });
}

export function put<T = any, U = any>(
    config: AxiosRequestConfig,
    url: string,
    data: U
): Promise<T> {
    return requestInstance({ ...config, url, method: 'PUT', data: data });
}

export function del<T = any, U = any>(
    config: AxiosRequestConfig,
    url: string,
    data: U
): Promise<T> {
    return requestInstance({ ...config, url, method: 'DELETE', data: data });
}
