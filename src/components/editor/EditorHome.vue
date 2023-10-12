<template>
  <div class="EditorHome" :style="state.defaultHeight">
    <div id="nametest">
      <h4 style="text-align: left">
        <i class="bi bi-bar-chart"></i>
        {{ $t("datacenter.DataExplorer") }}
      </h4>
    </div>
    <splitpanes class="default-theme" @resize="paneData.paneSize = $event[0].size">
      <pane :size="paneData.paneLeftSize">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
      </pane>
      <pane :size="paneData.paneCenterSize">
        <splitpanes horizontal>
          <pane>
            <span>
              <Codemirror
                v-model:value="code"
                :options="cmOptions"
                placeholder="test placeholder"
                @change="change"
                style="text-align: left" /></span
          ></pane>
          <pane>Run Result</pane>
        </splitpanes>
      </pane>
      <pane :size="paneData.paneRightSize"> ToolBox </pane>
    </splitpanes>
  </div>
</template>
<script setup lang="ts">
interface Tree {
  label: string;
  children?: Tree[];
}
import { onMounted, ref, reactive, toRefs, computed } from "vue";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import Codemirror from "codemirror-editor-vue3";
// placeholder
import "codemirror/addon/display/placeholder.js";
// language
import "codemirror/mode/javascript/javascript.js";
// placeholder
import "codemirror/addon/display/placeholder.js";
// theme
import "codemirror/theme/dracula.css";
const state = reactive({
  defaultHeight: {
    height: "",
  },
});
onMounted(() => {
  const div = document.getElementById("nametest");
  console.log(div.offsetHeight); // 224
  console.log(div.clientHeight); // 220
  state.defaultHeight.height = document.body.clientHeight - 60 + "px";
  console.log(state.defaultHeight.height);
});
const code = ref(`
      var i = 0;
      for (; i < 9; i++) {
        console.log(i);
        // more statements
      }`);

const handleNodeClick = (data: Tree) => {
  console.log(data);
};

const data: Tree[] = [
  {
    label: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        children: [
          {
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        children: [
          {
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        label: "Level two 2-2",
        children: [
          {
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 3",
    children: [
      {
        label: "Level two 3-1",
        children: [
          {
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        label: "Level two 3-2",
        children: [
          {
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
];

const defaultProps = {
  children: "children",
  label: "label",
};

// 设置编辑器主题颜色
const cmOptions = reactive({
  mode: "text/javascript", // Language mode
  theme: "dracula", // Theme
});

const paneData = reactive({
  paneLeftSize: 20,
  paneCenterSize: 60,
  paneLightSize: 20,
});
</script>
<style lang="scss" scoped>
.EditorHome {
  .splitpanes {
    background-color: black;
  }
  .splitpanes__splitter {
    color: red;
  }
}
</style>
