<!--
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-09 09:18:40
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-12 19:32:14
-->
<template>
  <div>
    <!-- 导航 -->
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/"
          ><img src="@/assets/logo.png" alt="" width="30" height="30" />
          <span class="logo-name">{{ $t("message.Geoscience") }}</span
          >{{ $t("message.AIPlatform") }}</a
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
            <a class="nav-link" aria-current="page" href="/">{{ $t("message.Home") }}</a>
            <a class="nav-link" href="/newslist">{{ $t("message.News") }}</a>
            <a class="nav-link" href="/dataplatforms">{{ $t("message.DataPlatform") }}</a>
            <a class="nav-link" href="/computeservices">{{ $t("message.ComputeServices") }}</a>
            <a class="nav-link" href="#">{{ $t("message.DataShare") }}</a>
            <a class="nav-link" href="/datamonitor">{{ $t("message.DataMonitor") }}</a>
            <a class="nav-link" href="#">{{ $t("message.CoProject") }}</a>
            <a class="nav-link" href="/about">{{ $t("message.About") }}</a>
            <a class="nav-link" href="#">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <img src="@/assets/images/icon/translate.svg" style="width: 20px" />
                </span>
                <template #dropdown>
                  <el-dropdown-menu class="header-new-drop">
                    <el-dropdown-item command="zh" :disabled="currentLanguage == 'zh'">
                      简体中文
                    </el-dropdown-item>
                    <el-dropdown-item command="en" :disabled="currentLanguage == 'en'">
                      English
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
import { computed } from "vue";
import { useStore } from "vuex";

const currentLanguage = computed(() => locale.value);
const handleCommand = (lang: string) => {
  locale.value = lang;
};
</script>
<style scoped lang="scss">
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
