// import axios from "axios";
// import type { AxiosInstance } from "axios";
// import { ElLoading } from "element-plus";
// import type { LoadingInstance } from "element-plus/lib/components/loading/src/loading";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

// import { CustomInterceptors, CustomRequestConfig } from "./types.ts";

// // 默认loading为false
// const DEFAULT_LOADING = false;

// // http请求
// class HttpRequest {
//   // axios实例
//   instance: AxiosInstance;
//   // 自定义拦截器
//   interceptors?: CustomInterceptors;
//   showLoading: boolean;
//   loading?: LoadingInstance;

//   constructor(config: CustomRequestConfig) {
//     this.instance = axios.create(config);
//     this.showLoading = config.showLoading ?? DEFAULT_LOADING;
//     this.interceptors = config.interceptors;

//     // 实例拦截器
//     this.instance.interceptors.request.use(
//       this.interceptors?.requestInterceptor,
//       this.interceptors?.requestInterceptorCatch,
//     );
//     this.instance.interceptors.response.use(
//       this.interceptors?.responsetInterceptor,
//       this.interceptors?.responsetInterceptorCatch,
//     );

//     // 全局拦截器, 添加所有的实例都有的拦截器
//     // request
//     this.instance.interceptors.request.use(
//       (config) => {
//         // 加载进度条
//         NProgress.start();
//         // 展示loading
//         if (this.showLoading) {
//           this.loading = ElLoading.service({
//             lock: true,
//             text: "正在加载...",
//             background: "rgba(0, 0, 0, 0.5)",
//           });
//         }
//         return config;
//       },
//       (error) => {
//         return error;
//       },
//     );
//     // response
//     this.instance.interceptors.response.use(
//       (res) => {
//         // 移除loading
//         this.loading?.close();
//         // 关闭进度条
//         NProgress.done();
//         return res;
//       },
//       (error) => {
//         // 移除loading
//         this.loading?.close();
//         // 关闭进度条
//         NProgress.done();
//         return error;
//       },
//     );
//   }

//   /** 封装请求方法 */
//   // request
//   request<T = any>(config: CustomRequestConfig<T>): Promise<T> {
//     return new Promise((resolve, reject) => {
//       // request 对config处理
//       if (config.interceptors?.requestInterceptor) {
//         //如果有requestInterceptor,就执行一下
//         config = config.interceptors.requestInterceptor(config);
//       }
//       // 判断是否showLoading
//       if (config.showLoading === true) {
//         this.showLoading = config.showLoading;
//       }

//       this.instance
//         .request<any, T>(config)
//         .then((res) => {
//           // response 对数据处理
//           if (config.interceptors?.responsetInterceptor) {
//             res = config.interceptors.responsetInterceptor(res);
//           }

//           // 重置showLoading
//           this.showLoading = DEFAULT_LOADING;
//           resolve(res);
//         })
//         .catch((error) => {
//           // 重置showLoading
//           this.showLoading = DEFAULT_LOADING;
//           reject(error);
//         });
//     });
//   }

//   // get
//   get<T = any>(config: CustomRequestConfig<T>): Promise<T> {
//     return this.request<T>({ ...config, method: "GET" });
//   }

//   // post
//   post<T = any>(config: CustomRequestConfig<T>): Promise<T> {
//     return this.request<T>({ ...config, method: "POST" });
//   }

//   // put
//   put<T = any>(config: CustomRequestConfig<T>): Promise<T> {
//     return this.request<T>({ ...config, method: "PUT" });
//   }

//   // delete
//   delete<T = any>(config: CustomRequestConfig<T>): Promise<T> {
//     return this.request<T>({ ...config, method: "DELETE" });
//   }
// }

// export default HttpRequest;
