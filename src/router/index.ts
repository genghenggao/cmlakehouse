/*
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-08 23:08:55
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-09 16:57:37
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/components/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'homepage',
    component: HomePage
  },
  {
    path: '/newslist',
    name: 'newslist',
    component: () => import(/* webpackChunkName: "about" */ '../components/news/NewsList.vue')
  },
  {
    path: '/datacenter',
    name: 'datacenter',
    component: () => import(/* webpackChunkName: "about" */ '@/components/datacenter/DataCenter.vue')
  },
  // {
  //   path: '/hydrologyplatform',
  //   name: 'hydrologyplatform',
  //   component: () => import('@/components/platform/HydrologyPlatform.vue')
  // },
  {
    path: '/dataview',
    name: 'dataview',
    component: () => import('@/components/screendisplay/DataView.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
