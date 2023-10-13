/*
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-09 16:37:47
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-12 19:33:07
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import ComputeServices from "@/components/datacenter/ComputeServices.vue"

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
    path: '/editorhome',
    name: 'editorhome',
    component: () => import('@/components/editor/EditorHome.vue')
  },
  {
    path: '/computeservices',
    name: "datacenter.DataCollection",
    component: ComputeServices,
    meta: { title: "工作台", icon: "bi bi-blockquote-right", requireAuth: true, roles: ['true', 'false'] },
    redirect: '/computeservices',
    children: [
      {
        path: "/computeservices",
        name: "datacenter.DataManagement",
        meta: { title: "计算服务", icon: "bi bi-box", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/components/editor/EditorHome.vue')
      },
      {
        path: "/computeservices2",
        name: "datacenter.DataAnalysis",
        meta: { title: "数据分析", icon: "bi bi-box", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/components/datacenter/DataProcess.vue')
      }
    ]
  },
  {
    path: '/dataprocess',
    name: "datacenter.DataProcessing",
    component: ComputeServices,
    meta: { title: "数据处理", icon: "bi bi-blockquote-right", requireAuth: true, roles: ['true', 'false'] },
    children: [
      {
        path: "/overlay-analysis",
        name: "datacenter.OverlayAnalysis",
        meta: { title: "叠加分析", icon: "bi bi-box", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/components/datacenter/CMDataManage.vue')
      },
      {
        path: "/offset-calculation",
        name: "datacenter.OffsetCalculation",
        meta: { title: "偏移计算", icon: "bi bi-box", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/components/datacenter/DataOverView1.vue')
      },
    ]
  },
  {
    path: '/datainterpretation',
    name: "datacenter.DataInterpretation",
    component: ComputeServices,
    meta: { title: "数据解释", icon: "bi bi-blockquote-right", requireAuth: true, roles: ['true', 'false'] },
    children: [
      {
        path: "/seismic-interpretation",
        name: "datacenter.SeismicInterpretation",
        meta: { title: "地震解释", icon: "bi bi-box", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/components/datacenter/CMDataManage.vue')
      },
      {
        path: "/geological-interpretation",
        name: "datacenter.GeoInterpretation",
        meta: { title: "地质解译", icon: "bi bi-box", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/components/datacenter/DataOverView1.vue')
      },
    ]
  },
  {
    path: '/datamonitor',
    name: 'datamonitor',
    component: () => import('@/components/screendisplay/DataMonitor.vue')
  },
  {
    path: '/about',
    name: 'aboutus',
    component: () => import('@/components/aboutus/AboutUs.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
