import type { AxiosRequestConfig, AxiosResponse } from "axios";

// 自定义拦截器type
export interface CustomInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responsetInterceptor?: (config: T) => T;
  responsetInterceptorCatch?: (err: any) => any;
}

// 自定义请求设置type
export interface CustomRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: CustomInterceptors<T>;
  showLoading?: boolean;
}
