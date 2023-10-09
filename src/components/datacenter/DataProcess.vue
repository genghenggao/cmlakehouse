<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-10-15 14:42:41
 * @LastEditors: henggao
 * @LastEditTime: 2022-05-19 15:29:32
-->
<template>
  <div class="main">
    <el-row :gutter="10">
      <el-col :xs="0" :sm="1" :md="1" :lg="1" :xl="1"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :xs="24" :sm="22" :md="22" :lg="22" :xl="22"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
      <el-col :xs="0" :sm="1" :md="1" :lg="1" :xl="1"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
    </el-row>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
});
</script>
<style scoped lang='scss'>
#main {
  padding-bottom: 4em;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>