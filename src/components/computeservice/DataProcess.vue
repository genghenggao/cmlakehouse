<!--
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-09 21:55:39
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-11 15:28:47
-->
<template>
  <div class="main">
    <el-row
      ><h4>{{ $t("computeservice.DataExplorer") }}</h4></el-row
    >
    <el-row :gutter="10">
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"> 打卡文件 </el-col>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" style="text-align: left">
        <!-- <EditorHome /> -->
        <Codemirror
          v-model:value="code"
          :options="cmOptions"
          border
          placeholder="test placeholder"
          :height="200"
          @change="change"
        />
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
        ><div class="grid-content ep-bg-purple"
      /></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">Action 1</el-dropdown-item>
              <el-dropdown-item command="b">Action 2</el-dropdown-item>
              <el-dropdown-item command="c">Action 3</el-dropdown-item>
              <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
              <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown></el-col
      >

      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
        ><div class="grid-content ep-bg-purple-light"
      /></el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Codemirror from "codemirror-editor-vue3";
// placeholder
import "codemirror/addon/display/placeholder.js";
// language
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/python/python.js";
// placeholder
import "codemirror/addon/display/placeholder.js";
// theme
import "codemirror/theme/dracula.css";
export default defineComponent({
  components: { Codemirror },
  setup() {
    const code = ref(`
      var i = 0;
      for (; i < 9; i++) {
        console.log(i);
        // more statements
      }`);
    const handleCommand = () => {
      console.log("qqiehuan");
    };
    return {
      code,
      cmOptions: {
        mode: "text/javascript", // Language mode
        theme: "dracula", // Theme
      },
    };
  },
});
</script>
<style scoped lang="scss">
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
