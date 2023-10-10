<!--
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-09 21:55:39
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-10 21:07:14
-->
<template>
  <div class="main">
    <el-row :gutter="10">
      <el-col :xs="0" :sm="1" :md="1" :lg="1" :xl="1"
        ></el-col>
      <el-col :xs="24" :sm="22" :md="22" :lg="22" :xl="22" style="text-align: left">
        <Codemirror
          v-model:value="code"
          :options="cmOptions"
          border
          placeholder="test placeholder"
          :height="200"
          @change="change"
        />
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
        </el-dropdown>
      </el-col>
      <el-col :xs="0" :sm="1" :md="1" :lg="1" :xl="1"
        ></el-col>
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
    const changeLanague = () => {
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
