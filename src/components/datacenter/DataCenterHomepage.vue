<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-10-06 09:48:55
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-09 22:48:44
-->
<template>
    <el-menu
      :default-active="this.$route.path"
      router
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-menu-item index="/home">
        <el-avatar :size="50" :src="avatar"></el-avatar>
        <span class="logo-name">地学</span>
        <span>智慧服务平台</span>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>计算中心</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>其他管理</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3" disabled>帮助</el-menu-item>
      <el-menu-item index="4">工作台</el-menu-item>
      <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
    </el-menu>
    <div class="demo2">
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in imglist" :key="item.url">
              <img :src="item.url" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from "vue";
  
  export default defineComponent({
    setup() {
      const activeIndex = ref("1");
      const handleSelect = (key: any, keyPath: any) => {
        console.log(key, keyPath);
      };
      const state = reactive({
        avatar: require("@/assets/logo.png"), //require需要安装npm i --save-dev @types/node
        navList: [
          { name: "/home", navItem: "主页" },
          { name: "/about", navItem: "关于" },
        ],
        imglist: [
          { url: require("@/assets/images/8970adb0170b302d3580b2447ec5389.png") },
          {
            url: require("../assets/images/d726404a9919aafc008ed129bf15277.jpg"),
          },
        ],
      });
      return {
        ...toRefs(state),
        activeIndex,
        handleSelect,
      };
    },
  });
  </script>
  
  <style scoped lang="scss">
  .logo-name {
    font-size: 20px;
    font-weight: bold;
    padding: 2px;
  }
  .demo2 {
    height: 100%;
    width: 100%;
  }
  .el-row {
    height: 100%;
    width: 100%;
  }
  </style>