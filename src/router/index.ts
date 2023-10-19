/*
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-09 16:37:47
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-19 11:06:02
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import ComputeServices from "@/components/computeservice/ComputeServices.vue"

import { start, close } from "@/utils/nprogress";

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
    name: "computeservice.DataCollection",
    component: ComputeServices,
    meta: { title: "工作台", icon: "bi bi-blockquote-right", requireAuth: true, roles: ['true', 'false'] },
    redirect: '/computeservices',
    children: [
      {
        path: "/computeservices",
        name: "computeservice.DataManagement",
        meta: { title: "计算服务", icon: "bi bi-box", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/components/editor/EditorHome.vue')
      },
      {
        path: "/computeservices2",
        name: "computeservice.DataAnalysis",
        meta: { title: "数据分析", icon: "bi bi-box", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/components/computeservice/DataProcess.vue')
      }
    ]
  },
  {
    path: '/dataprocess',
    name: "computeservice.DataProcessing",
    component: ComputeServices,
    meta: { title: "数据处理", icon: "bi bi-blockquote-right", requireAuth: true, roles: ['true', 'false'] },
    children: [
      {
        path: "/overlay-analysis",
        name: "computeservice.OverlayAnalysis",
        meta: { title: "叠加分析", icon: "bi bi-box", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/components/computeservice/ComputeServiceHome.vue')
      },
      {
        path: "/offset-calculation",
        name: "computeservice.OffsetCalculation",
        meta: { title: "偏移计算", icon: "bi bi-box", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/components/computeservice/DataOverView.vue')
      },
    ]
  },
  {
    path: '/datainterpretation',
    name: "computeservice.DataInterpretation",
    component: ComputeServices,
    meta: { title: "数据解释", icon: "bi bi-blockquote-right", requireAuth: true, roles: ['true', 'false'] },
    children: [
      {
        path: "/seismic-interpretation",
        name: "computeservice.SeismicInterpretation",
        meta: { title: "地震解释", icon: "bi bi-box", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/components/computeservice/ComputeServiceHome.vue')
      },
      {
        path: "/geological-interpretation",
        name: "computeservice.GeoInterpretation",
        meta: { title: "地质解译", icon: "bi bi-box", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/components/computeservice/DataOverView.vue')
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
  {
    path: '/downloadtest',
    name: 'downloadtest',
    component: () => import('@/others/DownLoadTest.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to: any, from: any, next: () => void) => {
  start();
  next();
});

router.afterEach(() => {
  close();
});

export default router
