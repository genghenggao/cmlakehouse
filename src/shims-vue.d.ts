/*
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-08 23:08:55
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-09 21:14:49
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'jquery' {
  import $ from "jquery"
  export default $ 
}

declare module '@jiaminghi/data-view' {
  import dataV from '@jiaminghi/data-view'
  export default dataV
}

declare const Cesium: any