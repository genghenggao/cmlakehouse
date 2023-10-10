<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-10-04 21:54:24
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-10 15:52:18
-->
<template>
  <el-container class="main-container">
    <el-aside :style="defaultHeight" :width="asideWidth">
      <!-- Logo -->
      <el-affix :z-index="1200">
        <div class="aside-logo" @click="onRefresh">
          <el-image class="logo-image" :src="logo" fit="contain" />
          <span :class="[isCollapse ? 'is-collapse' : '']">
            <span class="logo-name">地学</span>
            <span>智慧服务平台</span>
          </span>
        </div>
      </el-affix>
      <!-- 侧边内容 -->
      <el-menu
        class="aside-menu"
        router
        :default-active="$route.path"
        :collapse="isCollapse"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#fff"
      >
        <div v-for="menu in routers" :key="menu">
          <el-menu-item
            v-if="menu.children && menu.children.length === 1"
            :index="menu.children[0].path"
          >
            <i :class="menu.children[0].meta.icon"></i>
            <template #title>
              {{ menu.children[0].name }}
            </template>
          </el-menu-item>
          <el-sub-menu v-else-if="menu.children" :index="menu.path">
            <template #title>
              <i :class="menu.meta.icon">&nbsp;&nbsp;</i>
              <span :class="[isCollapse ? 'is-collapse' : '']">
                {{ menu.name }}
              </span>
            </template>
            <el-menu-item v-for="child in menu.children" :key="child" :index="child.path">
              <i :class="child.meta.icon">&nbsp;&nbsp;</i>
              <template #title>
                {{ child.name }}
              </template>
            </el-menu-item>
          </el-sub-menu>
        </div>
      </el-menu>
    </el-aside>
    <div class="toggle" @click="toggleMenu">
      <el-icon :size="35" color="#ffffff" style="left: 12px; top: 12px">
        <grid />
      </el-icon>
    </div>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <el-row :gutter="5">
          <el-col :xs="2" :sm="1" :md="1" :lg="1" :xl="1" :span="1">
            <div class="header-collapse" @click="onCollapse">
              <i
                :class="[
                  isCollapse ? 'bi bi-text-indent-left' : 'bi bi-text-indent-right',
                ]"
              />
            </div>
          </el-col>
          <el-col :span="1" :xs="20" :sm="18" :md="18" :lg="18" :xl="18">
            <div class="header-breadcrumb">
              <el-breadcrumb separator="/" v-if="this.$route.matched[0].path != '/home'">
                <el-breadcrumb-item :to="{ path: '/datacenter' }"
                  >{{ $t("message.Workbench") }}</el-breadcrumb-item
                >
                <el-breadcrumb-item v-for="(matched, m) in this.$route.matched" :key="m">
                  {{ matched.name }}
                </el-breadcrumb-item>
              </el-breadcrumb>
              <el-breadcrumb separator="/" v-else>
                <el-breadcrumb-item>{{ $t("message.Home") }}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </el-col>
          <el-col class="header-menu" :span="1" :xs="0" :sm="5" :md="5" :lg="5" :xl="5">
            <DataCenterHead />
          </el-col>
        </el-row>
      </el-header>
      <el-main :style="defaultHeight">
        <router-view />
      </el-main>
    </el-container>
    <el-backtop target=".el-main"></el-backtop>
  </el-container>
</template>
<script>
import { onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import DataCenterHead from "@/components/datacenter/DataCenterHead.vue";
import { Grid } from "@element-plus/icons-vue";

export default {
  components: {
    DataCenterHead,
    Grid,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      logo: require("@/assets/logo.png"),
      isCollapse: false,
      asideWidth: "220px",
      defaultHeight: {
        height: "",
      },
      routers: [],
    });

    onMounted(() => {
      state.routers = router.options.routes;
      state.defaultHeight.height = document.body.clientHeight + "px";
    });

    const onCollapse = () => {
      if (state.isCollapse) {
        state.asideWidth = "220px";
        state.isCollapse = false;
      } else {
        state.isCollapse = true;
        state.asideWidth = "64px";
      }
    };
    const toggleMenu = () => {
      console.log("Demo");
      let navigation = document.querySelector(".el-aside");
      let toggle = document.querySelector(".toggle");
      navigation.classList.toggle("active");
      toggle.classList.toggle("active");
    };
    const onRefresh = () => {
      router.push({ path: "/" });
    };

    return {
      ...toRefs(state),
      onCollapse,
      onRefresh,
      toggleMenu,
    };
  },
};
</script>

<style scoped lang="scss">
.el-header {
  padding-left: 0;
}
.main-container {
  background: #f5f7f9;
  // width: 100vw;
  height: 100%;
  width: 100%;

  .el-aside {
    height: 100%;
    transition: all 0.5s;
    background-color: #001529;
    overflow-y: auto;
    overflow-x: hidden;

    .aside-logo {
      height: 59px;
      color: white;
      cursor: pointer;
      border-bottom: 1px #cccccc solid;

      .logo-image {
        width: 40px;
        height: 40px;
        top: 12px;
        padding-left: 12px;
      }

      .logo-name {
        font-size: 20px;
        font-weight: bold;
        padding: 2px;
      }
    }

    .aside-menu:not(.el-menu--collapse) {
      width: 220px;
      height: 100%;
      .el-menu-item.is-active {
        background-color: #d9393b !important;
      }
    }

    .is-collapse {
      display: none;
    }

    &::-webkit-scrollbar {
      width: 0px;
    }
  }

  .el-header {
    background: white;
    line-height: 60px;
    font-size: 24px;
    border-bottom: 1px #cccccc solid;
    /* 必备的四个条件 */
    overflow: hidden; /*超出隐藏*/
    white-space: nowrap; /* 强制不换行 */
    text-overflow: ellipsis; /*文字隐藏的格式 */

    .header-collapse {
      cursor: pointer;
    }

    .header-breadcrumb {
      padding-top: 0.9em;
    }

    .header-menu {
      text-align: right;
    }
  }

  .el-main {
    padding: 0.6em;
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0px;
    }
  }

  .toggle {
    display: none;
  }
  .toggle.active {
    background: #ea1d63;
  }

  @media (max-width: 767px) {
    .el-aside {
      left: -60px;
      // display: none;
    }
    .el-aside.active {
      left: 0px;
      width: 100%;
      width: 0px;
    }

    .toggle {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      width: 60px;
      height: 60px;
      border-radius: 35%; //圆角
      background: #001529;
      cursor: pointer;
    }
  }
}
</style>
