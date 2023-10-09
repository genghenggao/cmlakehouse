<!--
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-09 09:18:40
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-09 21:52:06
-->
<template>
    <div>
      <!-- 导航 -->
  
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/"
            ><img src="@/assets/logo.png" alt="" width="30" height="30" />
            <span class="logo-name">地学</span>智慧平台</a
          >
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link" aria-current="page" href="/">首页</a>
              <a class="nav-link" href="/newslist">专项新闻</a>
              <a class="nav-link" href="/dataplatforms">数据平台</a>
              <a class="nav-link" href="/datacenter">数据中心</a>
              <a class="nav-link" href="#">数据共享</a>
              <a class="nav-link" href="/dataview">大数据分析</a>
              <a class="nav-link" href="#">项目综合</a>
              <a class="nav-link" href="#">关于我们</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </template>
  <script lang='ts'>
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "CMHeader",
  });
  </script>
  <style scoped lang='scss'>
  .navbar {
    background: #021236;
    .logo-name {
      // logo后文字颜色
      color: aliceblue;
      font-size: 20px;
      font-weight: bold;
      padding: 2px;
    }
    .navbar-nav {
      a {
        width: 120px;
        text-align: center;
        color: aliceblue;
      }
      a:hover {
        background: #021236d2;
      }
    }
  }
  </style>