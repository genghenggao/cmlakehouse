<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-10-15 15:54:25
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-10 08:52:40
-->
<template>
  <div class="container-fluid shadow-sm p-3 mb-5 bg-body rounded">
    <div class="row">
      <div class="col-md-12 content-hedaer">
        数据总览
        <!-- <div class="border-image-clip-path"></div> -->
        <!-- <div class="conic"></div> -->
        <!-- <div class="hello">Hello</div> -->
        <!-- <div class="outline">123</div> -->
        <!-- <div class="rainbow"></div> -->
        <!-- <div class="transBorder">here</div> -->
        <!-- <div class="box">数据总览</div> -->
        <!-- <p class="shining">fushigi no monogatari</p> -->
        <!-- <button
          data-text="Start"
          class="btn btn-primary btn-ghost btn-border-stroke btn-text-float-up"
        >
          <div class="btn-borders">
            <div class="border-top"></div>
            <div class="border-right"></div>
            <div class="border-bottom"></div>
            <div class="border-left"></div>
          </div>
          <span class="btn-text">Start</span>
        </button> -->
      </div>
      <!-- <div class="col-md-8">123</div>
      <div class="col-md-4">Test</div> -->
    </div>
  </div>
  <div class="main">
    <el-row :gutter="10">
      <el-col :xs="0" :sm="1" :md="1" :lg="1" :xl="1"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :xs="24" :sm="22" :md="22" :lg="22" :xl="22"
        ><div class="grid-content bg-purple-light">
          <div
            :id="chartId"
            :class="className"
            :style="{ height: height, width: width }"
          ></div></div
      ></el-col>
      <el-col :xs="0" :sm="1" :md="1" :lg="1" :xl="1"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, toRefs, watch } from "vue";
// import echarts from "echarts";
import * as echarts from "echarts";

export default defineComponent({
  name: "App",
  props: {
    chartId: {
      type: String,
      default: () => {
        return "line-chart";
      },
    },
    className: {
      type: String,
      default: () => {
        return "line-chart";
      },
    },
    height: {
      type: String,
      default: "100%",
      //   default: "600px",
    },
    width: {
      type: String,
      default: "100%",
      //   default: "00px",
    },
    xAxisData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    seriesData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props) {
    const { xAxisData, seriesData } = toRefs(props);
    // 配置信息
    const setOptions = computed(() => {
      let option = {
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        title: {
          text: "Gradient Stacked Area Chart",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Line 1",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgba(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [140, 232, 101, 264, 90, 340, 250],
          },
          {
            name: "Line 2",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgba(77, 119, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 282, 111, 234, 220, 340, 310],
          },
          {
            name: "Line 3",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(55, 162, 255)",
                },
                {
                  offset: 1,
                  color: "rgba(116, 21, 219)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [320, 132, 201, 334, 190, 130, 220],
          },
          {
            name: "Line 4",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255, 0, 135)",
                },
                {
                  offset: 1,
                  color: "rgba(135, 0, 157)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 402, 231, 134, 190, 230, 120],
          },
          {
            name: "Line 5",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255, 191, 0)",
                },
                {
                  offset: 1,
                  color: "rgba(224, 62, 76)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 302, 181, 234, 210, 290, 150],
          },
        ],
      };
      return option;
    });
    // 创建图表
    function initChart() {
      //   let myChart = echarts.init(document.getElementById(props.chartId));
      let mainContent: HTMLElement = document.getElementById(
        props.chartId
      ) as HTMLElement;
      let myChart = echarts.init(mainContent);

      myChart.setOption(setOptions.value);
      window.onresize = function () {
        //自适应大小
        myChart.resize();
      };
    }

    onMounted(() => {
      initChart();
    });
    // 监听传值，刷新图表
    watch([seriesData, xAxisData], () => {
      initChart();
    });

    return { setOptions, initChart };
  },
});
</script>
<style scoped lang="scss">
.container-fluid {
  background: url("../../assets/images/bigdata-bg.png");
  color: #ffffff;
  font-family: "Times New Roman", Times, serif;
  .content-hedaer {
    font-size: 20px;
    padding-bottom: 2rem;
    height: 600px;
    border: 6px solid;
    /* simplified from preview image */
    border-image: linear-gradient(to right, rgb(134, 21, 83), pink) 1;
  }
}

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
  height: 800px;
  //   height: 100%;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.border-image-clip-path {
  width: 200px;
  height: 100px;
  margin: auto;
  border: 10px solid;
  border-image: linear-gradient(45deg, gold, deeppink) 1;
  clip-path: inset(0px round 10px);
  animation: huerotate 6s infinite linear;
  filter: hue-rotate(360deg);
}

@keyframes huerotate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rorate(360deg);
  }
}

.conic {
  position: relative;
  z-index: 0;
  width: 400px;
  height: 300px;
  margin: 20px;
  border-radius: 10px;
  overflow: hidden;
  padding: 2rem;

  &::before {
    content: "";
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: #1a232a;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      transparent,
      rgba(168, 239, 255, 1),
      transparent 30%
    );
    animation: rotate 4s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    background: #000;
    border-radius: 5px;
  }
}

.hello {
  position: relative;
  margin: auto;
  width: 120px;
  line-height: 64px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  border: 2px solid gold;
  border-radius: 10px;
  background: gold;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    filter: contrast(1.1);
  }

  &:active {
    filter: contrast(0.9);
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px solid gold;
    transition: all 0.5s;
    animation: clippath 3s infinite linear;
    border-radius: 10px;
  }

  &::after {
    animation: clippath 3s infinite -1.5s linear;
  }
}

@keyframes clippath {
  0%,
  100% {
    clip-path: inset(0 0 98% 0);
  }

  25% {
    clip-path: inset(0 98% 0 0);
  }
  50% {
    clip-path: inset(98% 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 98%);
  }
}

.bg::before {
  background: rgba(255, 215, 0, 0.5);
}

.outline {
  // border: 1px solid #333;
  outline: 1px solid #333;
  outline-offset: -1px;
  transition: all 0.3s linear;
  cursor: pointer;

  &:hover {
    // border: 1px solid transparent;
    outline: 1px solid transparent;
    background: linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
      linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
      linear-gradient(0deg, #333 50%, transparent 0) repeat-y,
      linear-gradient(0deg, #333 50%, transparent 0) repeat-y;
    background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
    background-position: 0 0, 0 100%, 0 0, 100% 0;
    animation: linearGradientMove 0.3s infinite linear;
  }
}

@keyframes linearGradientMove {
  100% {
    background-position: 4px 0, -4px 100%, 0 -4px, 100% 4px;
  }
}

.rainbow {
  position: relative;
  z-index: 0;
  width: 400px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  padding: 2rem;

  &::before {
    content: "";
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: #399953;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300),
      linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
    animation: rotate 4s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    background: rgb(158, 127, 127);
    border-radius: 5px;
    animation: opacityChange 3s infinite alternate;
  }
}

@keyframes opacityChange {
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

.transBorder {
  margin: 10px 15px;
  cursor: pointer;
  display: block;
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  transition: ease-in 0.4s;
  background: linear-gradient(0, #108b96 2px, #009606 2px) no-repeat,
    linear-gradient(-90deg, #96645f 2px, #961478 2px) no-repeat,
    linear-gradient(-180deg, #869660 2px, #544996 2px) no-repeat,
    linear-gradient(-270deg, #439638 2px, #308e96 2px) no-repeat;
  background-size: 0 2px, 2px 0, 0 2px, 2px 0;
  background-position: left top, right top, right bottom, left bottom;
}
.transBorder:hover {
  border-radius: 20%;
  background-size: 100% 5px, 5px 100%, 100% 5px, 5px 100%;
}

.box {
  background: #003366;
  height: 20rem;
  width: 40rem;
  color: white;
  padding: 1rem;
  box-shadow: 0 0 3rem rgba(100, 200, 255, 0.5) inset;
  background: rgba(0, 0, 0, 0.3);
}

.shining {
  font-size: 2em;
  font-family: Lato, sans-serif;
  letter-spacing: 4px;
  text-transform: uppercase;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(0, 0, 0, 1) 100%
  );
  background-size: 80%;
  background-repeat: no-repeat;
  // below two lines create text gradient effect
  color: transparent;
  background-clip: text;
  animation: shining 3s linear infinite;
}

@keyframes shining {
  from {
    background-position: -500%;
  }
  to {
    background-position: 500%;
  }
}

@import url(https://fonts.googleapis.com/css?family=Lato);
.btn {
  --hue: 190;
  --ease-in-duration: 0.25s;
  --ease-in-exponential: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  --ease-out-duration: 0.65s;
  --ease-out-delay: var(--ease-in-duration);
  --ease-out-exponential: cubic-bezier(0.19, 1, 0.22, 1);
  position: relative;
  padding: 1rem 3rem;
  font-size: 1rem;
  line-height: 1.5;
  color: white;
  text-decoration: none;
  background-color: hsl(var(--hue), 100%, 41%);
  border: 1px solid hsl(var(--hue), 100%, 41%);
  outline: transparent;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: 0.25s;

  &:hover {
    background: hsl(var(--hue), 100%, 31%);
  }

  &-primary {
    --hue: 171;
  }

  &-ghost {
    color: hsl(var(--hue), 100%, 41%);
    background-color: transparent;
    border-color: hsl(var(--hue), 100%, 41%);

    &:hover {
      color: white;
    }
  }

  &-border-stroke {
    border-color: hsla(var(--hue), 100%, 41%, 0.35);

    .btn-borders {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .border-top {
        position: absolute;
        top: 0;
        width: 100%;
        height: 1px;
        background: hsl(var(--hue), 100%, 41%);
        transform: scaleX(0);
        transform-origin: left;
      }

      .border-right {
        position: absolute;
        right: 0;
        width: 1px;
        height: 100%;
        background: hsl(var(--hue), 100%, 41%);
        transform: scaleY(0);
        transform-origin: bottom;
      }

      .border-bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: hsl(var(--hue), 100%, 41%);
        transform: scaleX(0);
        transform-origin: left;
      }

      .border-left {
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background: hsl(var(--hue), 100%, 41%);
        transform: scaleY(0);
        transform-origin: bottom;
      }

      // when unhover, ease-out left, bottom; ease-in right, top

      .border-left {
        transition: var(--ease-out-duration) var(--ease-out-delay)
          var(--ease-out-exponential);
      }
      .border-bottom {
        transition: var(--ease-out-duration) var(--ease-out-delay)
          var(--ease-out-exponential);
      }

      .border-right {
        transition: var(--ease-in-duration) var(--ease-in-exponential);
      }
      .border-top {
        transition: var(--ease-in-duration) var(--ease-in-exponential);
      }
    }

    &:hover {
      color: hsl(var(--hue), 100%, 41%);
      background: transparent;

      .border-top,
      .border-bottom {
        transform: scaleX(1);
      }
      .border-left,
      .border-right {
        transform: scaleY(1);
      }

      // when hover, ease-in left, bottom; ease-out right, top

      .border-left {
        transition: var(--ease-in-duration) var(--ease-in-exponential);
      }
      .border-bottom {
        transition: var(--ease-in-duration) var(--ease-in-exponential);
      }

      .border-right {
        transition: var(--ease-out-duration) var(--ease-out-delay)
          var(--ease-out-exponential);
      }
      .border-top {
        transition: var(--ease-out-duration) var(--ease-out-delay)
          var(--ease-out-exponential);
      }
    }
  }

  &-text-float-up {
    &::after {
      position: absolute;
      content: attr(data-text);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transform: translateY(35%);
      transition: 0.25s ease-out;
    }

    // when hover, ease-in top-text; ease-out bottom-text

    .btn-text {
      display: block;
      transition: 0.75s 0.1s var(--ease-out-exponential);
    }

    &:hover {
      // when hover, ease-in bottom-text; ease-out top-text

      .btn-text {
        opacity: 0;
        transform: translateY(-25%);
        transition: 0.25s ease-out;
      }

      &::after {
        opacity: 1;
        transform: translateY(0);
        transition: 0.75s 0.1s var(--ease-out-exponential);
      }
    }
  }
}
</style>
