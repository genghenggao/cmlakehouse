/*
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-08 23:08:55
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-09 18:40:13
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

// import "cesium/Source/Widgets/widgets.css";
// const Cesium = require("cesium/Source/Cesium");
// Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxZDE0MWI4OS1jYjYxLTRmMDEtYWI5Yy1hZjBiNDAwZjc2NzEiLCJpZCI6MTgzMDEsImlhdCI6MTYwOTMyNjMxNH0.5H4EA7TyeUBhRmOI6IoRFXjyLtEJAjFZKJORBhGK2uc";

const app = createApp(App)
// app.provide("$Cesium", Cesium);
app.use(store).use(router).use(ElementPlus).use(dataV).mount('#app')
