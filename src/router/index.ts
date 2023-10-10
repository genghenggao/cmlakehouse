/*
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-09 16:37:47
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-10 11:07:36
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import DataCenter from "@/components/datacenter/DataCenter.vue"

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
    path: '/dataplatforms',
    name: 'dataplatforms',
    component: () => import(/* webpackChunkName: "about" */ '@/components/platform/DataPlatforms.vue')
  },
  {
    path: '/geochemistryplatform',
    name: 'geochemistryplatform',
    component: () => import('@/components/platform/GeochemistryPlatform.vue')
  },
  {
    path: '/geophysicsplatform',
    name: 'geophysicsplatform',
    component: () => import('@/components/platform/GeophysicsPlatform.vue')
  },
  {
    path: '/hydrologyplatform',
    name: 'hydrologyplatform',
    component: () => import('@/components/platform/HydrologyPlatform.vue')
  },
  {
    path: '/datacenter',
    name: "数据采集",
    component: DataCenter,
    meta: { title: "工作台", icon: "el-icon-s-home", requireAuth: true, roles: ['true', 'false'] },
    redirect: '/datacenter',
    children: [
      {
        path: "/datacenter",
        name: "数据管理",
        meta: { title: "数据管理", icon: "el-icon-s-home", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/components/datacenter/DataCenterHomepage.vue')
      },
      {
        path: "/datacenter-test",
        name: "数据分析",
        meta: { title: "数据分析", icon: "el-icon-s-home", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/components/datacenter/DataProcess.vue')
      }
    ]
  },
  {
    path: '/dataprocess',
    name: "数据处理",
    component: DataCenter,
    meta: { title: "数据处理", icon: "el-icon-postcard", requireAuth: true, roles: ['true', 'false'] },
    children: [
      {
        path: "/company-overview",
        name: "预处理",
        meta: { title: "预处理", icon: "el-icon-postcard", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/components/datacenter/CMDataManage.vue')
      },
      {
        path: "/data-overview",
        name: "数据总览",
        meta: { title: "数据总览", icon: "el-icon-s-data", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/components/datacenter/DataOverView1.vue')
      },
    ]
  },



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
