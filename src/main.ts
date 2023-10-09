/*
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-08 23:08:55
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-09 20:10:10
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入BootStrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
// 引入bootstrap-icons图标
import "bootstrap-icons/font/bootstrap-icons.css"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import dataV from '@jiaminghi/data-view'

import "cesium/Source/Widgets/widgets.css";
// import * as Cesium from 'cesium'
const Cesium = require("cesium/Source/Cesium");
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMWU3MWIyYi05YzBmLTRmZjMtYTJhYi1hMWZmMzE2YjMxNTMiLCJpZCI6MTgzMDEsImlhdCI6MTY5Njg1MzM0OX0.-XS6FGbYaQqZeYmxhikYoW4QMwW08DJO-DXTHQVkw6E";

const app = createApp(App)
app.provide("$Cesium", Cesium);
app.use(store).use(router).use(ElementPlus).use(dataV).mount('#app')
