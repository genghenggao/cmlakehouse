<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-10-14 10:01:46
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-10 10:29:07
-->
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 sidebar">
        <div>
          <ul class="menucontent">
            <li style="border-bottom: 1px #cccccc solid">
              <a href="">
                <span class="icon">
                  <img
                    class="logoimg"
                    src="@/assets/logo.png"
                    alt=""
                    width="20"
                    height="20"
                /></span>
                <span :class="[isCollapse ? 'is-collapse' : '']"
                  >地学智慧平台</span
                >
              </a>
            </li>
            <li>
              <a href="">
                <span class="icon"><i class="bi bi-house-fill"></i></span>
                <span :class="[isCollapse ? 'is-collapse' : '']">数据分析</span>
              </a>
            </li>
            <li>
              <a href="">
                <span class="icon"><i class="bi bi-layers-fill"></i></span>
                <span :class="[isCollapse ? 'is-collapse' : '']">预处理</span>
              </a>
            </li>
            <li>
              <a href="">
                <span class="icon"><i class="bi bi-lightbulb-fill"></i></span>
                <span :class="[isCollapse ? 'is-collapse' : '']">并行计算</span>
              </a>
            </li>
            <li>
              <a href="">
                <span><i class="bi bi-lightbulb-fill"></i></span>
                <span :class="[isCollapse ? 'is-collapse' : '']">Demo</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-10 maincontent">
        <div class="contentheader">
          <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                Library
              </li>
            </ol>
          </nav>
          <div class="toggle" @click="toggleMenu">
            <!-- <i class="bi bi-list"></i> -->
            <!-- <i class="bi bi-x-lg"></i> -->
            <i :class="[labelType ? 'bi bi-list' : 'bi bi-x']"></i>
          </div>
        </div>
        <div class="contentmain">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "DataCenterSideBar",
  components: {
  },
  setup() {
    const state = reactive({
      isCollapse: true,
      labelType: true,
    });
    const toggleMenu = () => {
      let navigation = document.querySelector(".sidebar");
      let toggle = document.querySelector(".toggle");
      navigation?.classList.toggle("active");
      //   navigation.classList.toggle("active");
      toggle?.classList.toggle("active");
      state.isCollapse = !state.isCollapse;
      state.labelType = !state.labelType;
    };
    return {
      ...toRefs(state),
      toggleMenu,
    };
  },
});
</script>
<style scoped lang='scss'>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
// 侧边栏
.sidebar {
  width: 60px;
  background: #021236;
  transition: 0.5s;
  // overflow: hidden;
  overflow-y: auto;
  overflow-x: hidden;

  ul {
    li {
      padding: 15px 0;
      overflow: hidden; /*超出隐藏*/
      white-space: nowrap; /* 强制不换行 */
      text-overflow: ellipsis; /*文字隐藏的格式 */
      a {
        color: #ffffff;
        font-size: 16px;
        text-decoration: none;
        span {
          padding-left: 20px;
        }
        .is-collapse {
          display: none;
          // padding-left: 20px;
        }
      }
    }
    li:hover {
      background: #ea1d63;
    }
  }
}

.sidebar:hover,
.sidebar.active {
  width: 300px;
  background: #021236;
  .is-collapse {
    display: inline;
  }
}

// 内容
.maincontent {
  flex: 1;
  height: 1200px;
  background: rgba(192, 245, 179, 0.39);
  .contentheader {
    position: absolute;
    background: #60a58e88;
    // width: 100%;
    nav {
      position: fixed;
      top: 0;
    }
  }
}

// 按钮
.toggle {
  height: 40px;
  width: 40px;
  float: right;
  font-size: 30px;
  border-radius: 8px;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
}
.toggle.active {
  height: 40px;
  width: 40px;
  color: #0f4791c4;
}

@media (max-width: 767px) {
  .sidebar {
    width: 0;
  }
  .sidebar.active {
    background: #021236;
  }
}
</style>