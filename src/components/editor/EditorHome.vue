<template>
  <div class="EditorHome" :style="state.defaultHeight">
    <div id="nametest">
      <h4 style="text-align: left">
        <i class="bi bi-bar-chart"></i>
        {{ $t("computeservice.DataExplorer") }}
      </h4>
    </div>
    <splitpanes class="default-theme" @resize="paneData.paneSize = $event[0].size">
      <pane :size="paneData.paneLeftSize">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
        </el-tree>
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
const initDynamic = () => {
      var ROOT_PATH =
        "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples";
      type EChartsOption = echarts.EChartsOption;

      // 1. 实例化对象
      var chartDom = document.querySelector(".dynamic .chart") as HTMLElement;
      var myChart = echarts.init(chartDom, "dark");
      var option: EChartsOption;

      const updateFrequency = 2000;
      const dimension = 0;

      const countryColors: Record<string, string> = {
        Australia: "#00008b",
        Canada: "#f00",
        China: "#ffde00",
        Cuba: "#002a8f",
        Finland: "#003580",
        France: "#ed2939",
        Germany: "#000",
        Iceland: "#003897",
        India: "#f93",
        Japan: "#bc002d",
        "North Korea": "#024fa2",
        "South Korea": "#000",
        "New Zealand": "#00247d",
        Norway: "#ef2b2d",
        Poland: "#dc143c",
        Russia: "#d52b1e",
        Turkey: "#e30a17",
        "United Kingdom": "#00247d",
        "United States": "#b22234",
      };

      $.when(
        $.getJSON("https://cdn.jsdelivr.net/npm/emoji-flags@1.3.0/data.json"),
        $.getJSON(ROOT_PATH + "/data/asset/data/life-expectancy-table.json")
      ).done(function (res0: any, res1: any) {
        interface Flag {
          name: string;
          emoji: string;
        }
        const flags: Flag[] = res0[0];
        const data = res1[0];
        const years: string[] = [];
        for (let i = 0; i < data.length; ++i) {
          if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
            years.push(data[i][4]);
          }
        }

        function getFlag(countryName: string) {
          if (!countryName) {
            return "";
          }
          return (
            flags.find(function (item) {
              return item.name === countryName;
            }) || {}
          ).emoji;
        }
        let startIndex = 10;
        let startYear = years[startIndex];

        option = {
          backgroundColor: "",
          grid: {
            top: 10,
            bottom: 30,
            left: 150,
            right: 80,
          },
          xAxis: {
            max: "dataMax",
            axisLabel: {
              formatter: function (n: number) {
                return Math.round(n) + "";
              },
            },
          },
          dataset: {
            source: data.slice(1).filter(function (d: string[]) {
              return d[4] === startYear;
            }),
          },
          yAxis: {
            type: "category",
            inverse: true,
            max: 10,
            axisLabel: {
              show: true,
              fontSize: 14,
              formatter: function (value: any) {
                return value + "{flag|" + getFlag(value) + "}";
              },
              rich: {
                flag: {
                  fontSize: 25,
                  padding: 5,
                },
              },
            },
            animationDuration: 300,
            animationDurationUpdate: 300,
          },
          series: [
            {
              realtimeSort: true,
              seriesLayoutBy: "column",
              type: "bar",
              itemStyle: {
                color: function (param) {
                  return countryColors[(param.value as number[])[3]] || "#5470c6";
                },
              },
              encode: {
                x: dimension,
                y: 3,
              },
              label: {
                show: true,
                precision: 1,
                position: "right",
                valueAnimation: true,
                fontFamily: "monospace",
              },
            },
          ],
          // Disable init animation.
          animationDuration: 0,
          animationDurationUpdate: updateFrequency,
          animationEasing: "linear",
          animationEasingUpdate: "linear",
          graphic: {
            elements: [
              {
                type: "text",
                right: 160,
                bottom: 60,
                style: {
                  text: startYear,
                  font: "bolder 80px monospace",
                  fill: "rgba(100, 100, 100, 0.25)",
                },
                z: 100,
              },
            ],
          },
        };
      `);

const handleNodeClick = (data: Tree) => {
  console.log(data);
};

const data: Tree[] = [
  {
    label: "地震勘探数据处理算法",
    children: [
      {
        label: "数据预处理.py",
      },
      {
        label: "属性提取.py",
      },
      {
        label: "缓冲区的分析.py",
      },
      {
        label: "叠合运算.py",
      },
      {
        label: "速度分析.py",
      },
      {
        label: "叠加.py",
      },
    ],
  },
  {
    label: "地震勘探数据处理算法",
    children: [
      {
        label: "数据预处理.py",
      },
      {
        label: "属性提取.py",
      },
      {
        label: "缓冲区的分析.py",
      },
      {
        label: "叠合运算.py",
      },
      {
        label: "速度分析.py",
      },
      {
        label: "叠加.py",
      },
    ],
  },
  {
    label: "地质数据处理算法",
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
        label: "监测数据处理算法",
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
