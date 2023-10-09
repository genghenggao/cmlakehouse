/*
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-08 23:08:55
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-09 09:43:49
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

createApp(App).use(store).use(router).mount('#app')
