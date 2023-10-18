// // 统一管理 service
// import HttpRequest from "./request";
// import { API_BASE_URL, TIME_OUT } from "./request/config";
// import { ElMessage } from "element-plus";

// const httpRequest = new HttpRequest({
//   baseURL: API_BASE_URL,
//   timeout: TIME_OUT,

//   // 实例拦截器
//   interceptors: {
//     requestInterceptor(config: any) {
//       return config;
//     },
//     requestInterceptorCatch(error: any) {
//       return error;
//     },

//     responsetInterceptor(res: { data: any; }) {
//       console.log(res.data);
//       return res.data;
//     },
//     responsetInterceptorCatch(error: any) {
//       ElMessage.error("当前网络错误，请稍后再试");
//       return error;
//     },
//   },
// });

// export default httpRequest;
