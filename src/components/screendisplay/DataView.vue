<template>
  <div class="container-fluid">
    <!-- 头部标题 -->
    <div class="row">
      <div class="col-md-3 hidden-xs" align="right">
        <dv-decoration-8 />
      </div>
      <div class="col-md-6" align="center">
        <dv-decoration-5 />
        <div class="col-md-6 center-title">
          <!-- <a href="/mongeostore" style="color: #ffffff">武甲图纸管理系统数据中心</a> -->
          <p style="color: #ffffff">地学智慧数据服务中心</p>
        </div>
      </div>
      <div class="col-md-3 hidden-xs" align="left">
        <dv-decoration-8 :reverse="true" />
      </div>
      <div class="col-md-6 navbarcontent">
        <a class="navbar-brand" href="/"
          ><img src="@/assets/logo.png" alt="" width="20" height="20" />
          <span class="logo-name">地学</span>智慧平台</a
        >
      </div>
      <div class="col-md-6 showTime" align="right">
        <!-- 加载动画 -->
        <div
          class="spinner-border spinner-border-sm text-primary"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div
      class="row row-cols-2 row-cols-lg-6 g-2 g-lg-3 tabledata"
      style="color: white"
      align="center"
    >
      <div class="col digital-main" v-for="item in digitalFlopData" :key="item.title">
        <div class="digital-title">{{ item.title }}</div>
        <div class="digital-content">
          <dv-digital-flop :config="item.number" />
          <div class="dataunit">{{ item.unit }}</div>
        </div>
      </div>
      <dv-decoration-10 />
    </div>
    <!-- 统计图 -->

    <div class="row datasum">
      <div class="col-md-3 mainbox">
        <div class="col-md-12 panel bar">
          <h2>柱形图-物探数据</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>

        <div class="col-md-12 panel line">
          <h2>
            折线图-数据变化 <a href="javacript:;">2020</a><a href="javascript:;">2021</a>
          </h2>
          <div class="chart">图表</div>
          <div class="panel-footer"></div>
        </div>
        <div class="col-md-12 panel pieleft">
          <h2>饼图-测试数据</h2>
          <div class="chart">图表</div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="col-md-6 middlecontent">
        <!-- 飞行图 -->
        <div class="map">
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
          <div class="chart" id="chart"></div>
        </div>
        <!-- 卡片数据 -->
        <div class="row" id="cards">
          <div class="col-md-3 card-item" v-for="(card, i) in cards" :key="card.title">
            <div class="row">
              <div class="col-md-12 card-header">
                <div class="row">
                  <div class="col-md-12 card-header-left">
                    {{ card.title }}&emsp;
                    <span> {{ "0" + (i + 1) }}</span>
                  </div>
                </div>
              </div>
              <dv-charts class="col-md-12 ring-charts" :option="card.ring" />
              <div class="col-md-12 card-footer">
                <div class="col-6 card-footer-item">
                  <div class="footer-title">累计数据</div>
                  <div class="footer-detail">
                    <dv-digital-flop :config="card.total" />GB
                  </div>
                </div>
                <div class="col-6 card-footer-item">
                  <div class="footer-title">数据分布</div>
                  <div class="footer-detail">
                    <dv-digital-flop :config="card.num" />处
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mainbox">
        <div class="panel pie">
          <h2>饼形图-数据分布</h2>
          <div class="chart">图表</div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel sunbrust">
          <h2>旭日图-地区分布</h2>
          <div class="chart">图表</div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel dynamic">
          <h2>柱状图-地区分布</h2>
          <div class="chart">图表</div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, ref, toRefs, getCurrentInstance, onMounted } from "vue";
import { defineComponent } from "vue";
import * as echarts from "echarts";
import $ from "jquery";
// import $ from "jquery"
import "@/assets/js/china";

class Data {
  private title: string;
  //   private dataset: string[];
  constructor(title: string) {
    this.title = title;
  }
  static CreateData() {
    return new Data("特别用户");
  }
}

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    let { proxy }: any = getCurrentInstance();
    // Data
    const user = ref<Data>(Data.CreateData());
    console.log(user);
    console.log(user.value);
    user.value = { title: "Henggao" };
    console.log(user.value);
    let test: Array<number | string> = [123, "Hello"];

    console.log(test);
    let test0: number[] = [2234, 12321, 41242];
    console.log(test0);

    let test1: [number, string] = [21321, "Hello"];
    console.log(test1);

    const state = reactive({
      digitalFlopData: [] as any,
      geoCoordMap: {},
      XAData: [],
      XNData: [],
      cards: [] as any,
    });

    onMounted(() => {
      createData_pre();
      //   setTimeout(createData, 500);
      initTime();
      initHistogram();
      initLinechart();
      initPiechartleft();
      // setTimeout(initLinechart, 500);
      initFlyline();
      initCard();
      initPiechart();
      initSunburst();
      initDynamic();
    });
    // 生成容量数据
    const createData_pre = () => {
      state.digitalFlopData = [
        {
          title: "平台容量",
          number: {
            number: [randomExtend(100, 200)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#4d99fc",
              fontWeight: "bold",
            },
          },
          unit: "GB",
        },
        {
          title: "总数据量",
          number: {
            number: [randomExtend(20, 50)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#f46827",
              fontWeight: "bold",
            },
          },
          unit: "GB",
        },
        {
          title: "图纸数据",
          number: {
            number: [randomExtend(20, 30)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#40faee",
              fontWeight: "bold",
            },
          },
          unit: "GB",
        },
        {
          title: "文字报告",
          number: {
            number: [randomExtend(10, 20)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#4d99fc",
              fontWeight: "bold",
            },
          },
          unit: "GB",
        },
        {
          title: "报表数据",
          number: {
            number: [randomExtend(10, 20)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#f46827",
              fontWeight: "bold",
            },
          },
          unit: "GB",
        },
        {
          title: "其他数据",
          number: {
            number: [randomExtend(20, 40)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#40faee",
              fontWeight: "bold",
            },
          },
          unit: "GB",
        },
      ];
    };

    // 随机生成数据
    const randomExtend = (minNum: number, maxNum: number) => {
      if (arguments.length === 1) {
        return parseInt((Math.random() * minNum + 1) as any, 10);
      } else {
        return parseInt((Math.random() * (maxNum - minNum + 1) + minNum) as any, 10);
      }
    };
    // 时间
    const initTime = () => {
      var t: any = null;
      t = setTimeout(time, 1000); //開始运行
      function time() {
        clearTimeout(t); //清除定时器
        var dt = new Date();
        var y = dt.getFullYear();
        var mt = dt.getMonth() + 1;
        var day = dt.getDate();
        var h = dt.getHours(); //获取时
        var m = dt.getMinutes(); //获取分
        var s = dt.getSeconds(); //获取秒
        let getTime = document.querySelector(".showTime") as HTMLElement;

        getTime.innerHTML =
          // "当前时间：" +
          y + "年" + mt + "月" + day + "日-" + h + "时" + m + "分" + s + "秒";
        t = setTimeout(time, 1000); //设定定时器，循环运行
      }
    };
    // 柱状图数据
    const initHistogram = () => {
      (function () {
        // 1实例化对象
        var myChart = echarts.init(document.querySelector(".bar .chart") as HTMLElement);
        // 2. 指定配置项和数据
        var option = {
          color: ["#2f89cf"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：line| shadow
            },
          },
          // 修改图表的大小
          grid: {
            left: "0%",
            top: "10px",
            right: "0%",
            bottom: "4%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: [
                "瞬变电磁",
                "高密度电法",
                "微震",
                "地质雷达",
                "三维地震",
                "时移地震",
                "钻孔",
              ],
              axisTick: {
                alignWithLabel: true,
              },
              // 修改刻度标签 相关样式
              axisLabel: {
                color: "rgba(255,255,255,.6) ",
                fontSize: "12",
              },
              // 不显示x坐标轴的样式
              axisLine: {
                show: false,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              // 修改刻度标签 相关样式
              axisLabel: {
                color: "rgba(255,255,255,.6) ",
                fontSize: 12,
              },
              // y轴的线条改为了 2像素
              axisLine: {
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                  width: 2,
                },
              },
              // y轴分割线的颜色
              splitLine: {
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                },
              },
            },
          ],
          series: [
            {
              name: "直接访问",
              type: "bar",
              barWidth: "35%",
              data: [200, 300, 300, 900, 1500, 1200, 600],
              itemStyle: {
                // 修改柱子圆角
                barBorderRadius: 5,
              },
            },
          ],
        };
        // 3. 把配置项给实例对象
        myChart.setOption(option);
        // 4. 让图表跟随屏幕自动的去适应
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      })();
    };
    // 折线图数据
    const initLinechart = () => {
      (function () {
        var yearData = [
          {
            year: "2020", // 年份
            data: [
              // 两个数组是因为有两条线
              [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
              [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
            ],
          },
          {
            year: "2021", // 年份
            data: [
              // 两个数组是因为有两条线
              [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
              [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34],
            ],
          },
        ];
        // 1. 实例化对象
        var myChart = echarts.init(document.querySelector(".line .chart") as HTMLElement);
        // 2.指定配置
        var option = {
          // 通过这个color修改两条线的颜色
          color: ["#00f2f1", "#ed3f35"],
          tooltip: {
            trigger: "axis",
          },
          legend: {
            // 如果series 对象有name 值，则 legend可以不用写data
            // 修改图例组件 文字颜色
            textStyle: {
              color: "#4c9bfd",
            },
            // 这个10% 必须加引号
            right: "10%",
          },
          grid: {
            top: "20%",
            left: "3%",
            right: "4%",
            bottom: "3%",
            show: true, // 显示边框
            borderColor: "#012f4a", // 边框颜色
            containLabel: true, // 包含刻度文字在内
          },

          xAxis: {
            type: "category",
            boundaryGap: false,
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            axisTick: {
              show: false, // 去除刻度线
            },
            axisLabel: {
              color: "#4c9bfd", // 文本颜色
            },
            axisLine: {
              show: false, // 去除轴线
            },
          },
          yAxis: {
            type: "value",
            axisTick: {
              show: false, // 去除刻度线
            },
            axisLabel: {
              color: "#4c9bfd", // 文本颜色
            },
            axisLine: {
              show: false, // 去除轴线
            },
            splitLine: {
              lineStyle: {
                color: "#012f4a", // 分割线颜色
              },
            },
          },
          series: [
            {
              name: "上传数据",
              type: "line",
              // true 可以让我们的折线显示带有弧度
              smooth: true,
              data: yearData[0].data[0],
            },
            {
              name: "下载数据",
              type: "line",
              smooth: true,
              data: yearData[0].data[1],
            },
          ],
        };

        // 3. 把配置给实例对象
        myChart.setOption(option);
        // 4. 让图表跟随屏幕自动的去适应
        window.addEventListener("resize", function () {
          myChart.resize();
        });

        // 5.点击切换效果
        $(".line h2").on("click", "a", function () {
          // alert(1);
          // console.log($(this).index());
          // 点击 a 之后 根据当前a的索引号 找到对应的 yearData的相关对象
          // console.log(yearData[$(this).index()]);
          console.log($(".line h2 a"));
          console.log(yearData[$(proxy).index()]);
          var obj = yearData[$().index()];
          option.series[0].data = obj.data[0];
          option.series[1].data = obj.data[1];
          // 需要重新渲染
          myChart.setOption(option);
        });
      })();
    };
    // 饼图left
    const initPiechartleft = () => {
      // 1. 实例化对象
      var chartDom = document.querySelector(".pieleft .chart") as HTMLElement;
      var myChart = echarts.init(chartDom, "dark");
      var option;

      option = {
        backgroundColor: "", //去除背景色
        title: {
          // text: "Referer of a Website",
          // subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "right",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "三维地震" },
              { value: 735, name: "微震" },
              { value: 580, name: "水文" },
              { value: 484, name: "钻孔" },
              { value: 300, name: "地质雷达" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
      // //自适应大小,监听浏览器缩放，图表对象调用缩放resize函数
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    };
    // 飞行图
    const initFlyline = () => {
      // var myChart = echarts.init(document.querySelector(".map .chart"));
      let mainContent: HTMLElement = document.getElementById("chart") as HTMLElement;

      console.log(mainContent);

      let myChart = echarts.init(mainContent);
      // 数据
      var geoCoordMap: any = {
        上海: [121.4648, 31.2891],
        东莞: [113.8953, 22.901],
        东营: [118.7073, 37.5513],
        中山: [113.4229, 22.478],
        临汾: [111.4783, 36.1615],
        临沂: [118.3118, 35.2936],
        丹东: [124.541, 40.4242],
        丽水: [119.5642, 28.1854],
        乌鲁木齐: [87.9236, 43.5883],
        佛山: [112.8955, 23.1097],
        保定: [115.0488, 39.0948],
        兰州: [103.5901, 36.3043],
        包头: [110.3467, 41.4899],
        北京: [116.4551, 40.2539],
        北海: [109.314, 21.6211],
        南京: [118.8062, 31.9208],
        南宁: [108.479, 23.1152],
        南昌: [116.0046, 28.6633],
        南通: [121.1023, 32.1625],
        厦门: [118.1689, 24.6478],
        台州: [121.1353, 28.6688],
        合肥: [117.29, 32.0581],
        呼和浩特: [111.4124, 40.4901],
        咸阳: [108.4131, 34.8706],
        哈尔滨: [127.9688, 45.368],
        唐山: [118.4766, 39.6826],
        嘉兴: [120.9155, 30.6354],
        大同: [113.7854, 39.8035],
        大连: [122.2229, 39.4409],
        天津: [117.4219, 39.4189],
        太原: [112.3352, 37.9413],
        威海: [121.9482, 37.1393],
        宁波: [121.5967, 29.6466],
        宝鸡: [107.1826, 34.3433],
        宿迁: [118.5535, 33.7775],
        常州: [119.4543, 31.5582],
        广州: [113.5107, 23.2196],
        廊坊: [116.521, 39.0509],
        延安: [109.1052, 36.4252],
        张家口: [115.1477, 40.8527],
        徐州: [117.5208, 34.3268],
        德州: [116.6858, 37.2107],
        惠州: [114.6204, 23.1647],
        成都: [103.9526, 30.7617],
        扬州: [119.4653, 32.8162],
        承德: [117.5757, 41.4075],
        拉萨: [91.1865, 30.1465],
        无锡: [120.3442, 31.5527],
        日照: [119.2786, 35.5023],
        昆明: [102.9199, 25.4663],
        杭州: [119.5313, 29.8773],
        枣庄: [117.323, 34.8926],
        柳州: [109.3799, 24.9774],
        株洲: [113.5327, 27.0319],
        武汉: [114.3896, 30.6628],
        汕头: [117.1692, 23.3405],
        江门: [112.6318, 22.1484],
        沈阳: [123.1238, 42.1216],
        沧州: [116.8286, 38.2104],
        河源: [114.917, 23.9722],
        泉州: [118.3228, 25.1147],
        泰安: [117.0264, 36.0516],
        泰州: [120.0586, 32.5525],
        济南: [117.1582, 36.8701],
        济宁: [116.8286, 35.3375],
        海口: [110.3893, 19.8516],
        淄博: [118.0371, 36.6064],
        淮安: [118.927, 33.4039],
        深圳: [114.5435, 22.5439],
        清远: [112.9175, 24.3292],
        温州: [120.498, 27.8119],
        渭南: [109.7864, 35.0299],
        湖州: [119.8608, 30.7782],
        湘潭: [112.5439, 27.7075],
        滨州: [117.8174, 37.4963],
        潍坊: [119.0918, 36.524],
        烟台: [120.7397, 37.5128],
        玉溪: [101.9312, 23.8898],
        珠海: [113.7305, 22.1155],
        盐城: [120.2234, 33.5577],
        盘锦: [121.9482, 41.0449],
        石家庄: [114.4995, 38.1006],
        福州: [119.4543, 25.9222],
        秦皇岛: [119.2126, 40.0232],
        绍兴: [120.564, 29.7565],
        聊城: [115.9167, 36.4032],
        肇庆: [112.1265, 23.5822],
        舟山: [122.2559, 30.2234],
        苏州: [120.6519, 31.3989],
        莱芜: [117.6526, 36.2714],
        菏泽: [115.6201, 35.2057],
        营口: [122.4316, 40.4297],
        葫芦岛: [120.1575, 40.578],
        衡水: [115.8838, 37.7161],
        衢州: [118.6853, 28.8666],
        西宁: [101.4038, 36.8207],
        西安: [109.1162, 34.2004],
        贵阳: [106.6992, 26.7682],
        连云港: [119.1248, 34.552],
        邢台: [114.8071, 37.2821],
        邯郸: [114.4775, 36.535],
        郑州: [113.4668, 34.6234],
        鄂尔多斯: [108.9734, 39.2487],
        重庆: [107.7539, 30.1904],
        金华: [120.0037, 29.1028],
        铜川: [109.0393, 35.1947],
        银川: [106.3586, 38.1775],
        镇江: [119.4763, 31.9702],
        长春: [125.8154, 44.2584],
        长沙: [113.0823, 28.2568],
        长治: [112.8625, 36.4746],
        阳泉: [113.4778, 38.0951],
        青岛: [120.4651, 36.3373],
        韶关: [113.7964, 24.7028],
      };

      var XAData = [
        [{ name: "北京" }, { name: "拉萨", value: 100 }],
        [{ name: "北京" }, { name: "上海", value: 100 }],
        [{ name: "北京" }, { name: "广州", value: 100 }],
        [{ name: "北京" }, { name: "西宁", value: 100 }],
        [{ name: "北京" }, { name: "银川", value: 100 }],
      ];

      var XNData = [
        [{ name: "西宁" }, { name: "北京", value: 100 }],
        [{ name: "西宁" }, { name: "上海", value: 100 }],
        [{ name: "西宁" }, { name: "广州", value: 100 }],
        [{ name: "西宁" }, { name: "西安", value: 100 }],
        [{ name: "西宁" }, { name: "银川", value: 100 }],
      ];
      var YCData = [
        [{ name: "拉萨" }, { name: "潍坊", value: 100 }],
        [{ name: "拉萨" }, { name: "哈尔滨", value: 100 }],
        [{ name: "银川" }, { name: "上海", value: 100 }],
        [{ name: "银川" }, { name: "西安", value: 100 }],
        [{ name: "银川" }, { name: "西宁", value: 100 }],
      ];
      var planePath =
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";

      const convertData = (data: any) => {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];

          var fromCoord = geoCoordMap[dataItem[0].name];
          var toCoord = geoCoordMap[dataItem[1].name];
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord],
              value: dataItem[1].value,
            });
          }
        }
        return res;
      };

      var color = ["#a6c84c", "#ffa022", "#46bee9"]; //航线的颜色
      var series: any = [];
      let map: Map<string, number> = new Map();
      [
        ["西安", XAData],
        ["西宁", XNData],
        ["银川", YCData],
      ].forEach(function (item: any, i) {
        series.push(
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: "red", //arrow箭头的颜色
              symbolSize: 3,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 0,
                curveness: 0.2,
              },
            },
            data: convertData(item[1]),
          },
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 2,
            symbol: ["none", "arrow"],
            symbolSize: 10,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: planePath,
              symbolSize: 15,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 1,
                opacity: 0.6,
                curveness: 0.2,
              },
            },
            data: convertData(item[1]),
          },
          {
            name: item[0] + " Top3",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke",
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}",
              },
            },
            symbolSize: function (val: any) {
              return val[2] / 8;
            },
            itemStyle: {
              normal: {
                color: color[i],
              },
              emphasis: {
                areaColor: "#2B91B7",
              },
            },

            data: item[1].map(function (dataItem: any) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
              };
            }),
          }
        );
      });
      var option = {
        tooltip: {
          trigger: "item",
          formatter: function (params: any, ticke: any, callback: any) {
            if (params.seriesType == "effectScatter") {
              return "线路：" + params.data.name + "" + params.data.value[2];
            } else if (params.seriesType == "lines") {
              return (
                params.data.fromName +
                ">" +
                params.data.toName +
                "<br />" +
                params.data.value
              );
            } else {
              return params.name;
            }
          },
        },
        legend: {
          orient: "vertical",
          top: "bottom",
          left: "right",
          data: ["西安 Top3", "西宁 Top3", "银川 Top3"],
          textStyle: {
            color: "#fff",
          },
          selectedMode: "multiple",
        },
        geo: {
          map: "china",
          label: {
            emphasis: {
              show: true,
              color: "#fff",
            },
          },
          // 把中国地图放大了1.2倍
          zoom: 1.2,
          roam: true,
          itemStyle: {
            normal: {
              // 地图省份的背景颜色
              areaColor: "rgba(20, 41, 87,0.6)",
              borderColor: "#195BB9",
              borderWidth: 1,
            },
            emphasis: {
              areaColor: "#2B91B7",
            },
          },
        },
        series: series,
      };
      myChart.setOption(option);
      // window.onresize = function () {
      //   //自适应大小
      //   myChart.resize();
      // };
      // 监听浏览器缩放，图表对象调用缩放resize函数
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    };
    // 卡片
    const initCard = () => {
      state.cards = new Array(4).fill(0).map((foo, i) => ({
        title: "研究数据" + i,
        total: {
          number: [randomExtend(10, 30)],
          content: "{nt}",
          textAlign: "right",
          style: {
            fill: "#ea6027",
            fontWeight: "bold",
          },
        },
        num: {
          number: [randomExtend(30, 50)],
          content: "{nt}",
          textAlign: "right",
          style: {
            fill: "#26fcd8",
            fontWeight: "bold",
          },
        },
        ring: {
          series: [
            {
              type: "gauge",
              startAngle: -Math.PI / 2,
              endAngle: Math.PI * 1.5,
              arcLineWidth: 10,
              radius: "80%",
              data: [{ name: "数据占比", value: randomExtend(10, 30) }],
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              pointer: {
                show: false,
              },
              backgroundArc: {
                style: {
                  stroke: "#224590",
                },
              },
              details: {
                show: true,
                formatter: "数据占比{value}%",
                style: {
                  fill: "#1ed3e5",
                  fontSize: 14,
                },
              },
            },
          ],
          color: ["#03d3ec"],
        },
      }));
    };
    // 饼图
    const initPiechart = () => {
      (function () {
        // 1. 实例化对象
        var myChart = echarts.init(document.querySelector(".pie .chart") as HTMLElement);
        // 2.指定配置
        var option = {
          color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
          },

          legend: {
            bottom: "0%",
            // 修改小图标的大小
            itemWidth: 10,
            itemHeight: 10,
            // 修改图例组件的文字为 12px
            textStyle: {
              color: "rgba(255,255,255,.5)",
              fontSize: "12",
            },
          },
          series: [
            {
              name: "年龄分布",
              type: "pie",
              // 这个radius可以修改饼形图的大小
              // radius 第一个值是内圆的半径 第二个值是外圆的半径
              radius: ["40%", "60%"],
              center: ["50%", "45%"],
              avoidLabelOverlap: false,
              // 图形上的文字
              label: {
                show: false,
                position: "center",
              },
              // 链接文字和图形的线是否显示
              labelLine: {
                show: false,
              },
              data: [
                { value: 1, name: "0岁以下" },
                { value: 4, name: "20-29岁" },
                { value: 2, name: "30-39岁" },
                { value: 2, name: "40-49岁" },
                { value: 1, name: "50岁以上" },
              ],
            },
          ],
        };

        // 3. 把配置给实例对象
        myChart.setOption(option);
        // 4. 让图表跟随屏幕自动的去适应
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      })();
    };
    const initSunburst = () => {
      type EChartsOption = echarts.EChartsOption;

      // var chartDom = document.getElementById("main")!;
      // var myChart = echarts.init(chartDom);
      // 1. 实例化对象
      var chartDom = document.querySelector(".sunbrust .chart") as HTMLElement;
      var myChart = echarts.init(chartDom, "dark");
      var option: EChartsOption;

      option = {
        backgroundColor: "",
        silent: true,
        series: [
          {
            radius: ["15%", "80%"],
            type: "sunburst",
            sort: undefined,
            emphasis: {
              focus: "ancestor",
            },
            data: [
              {
                value: 8,
                children: [
                  {
                    value: 4,
                    children: [
                      {
                        value: 2,
                      },
                      {
                        value: 1,
                      },
                      {
                        value: 1,
                      },
                      {
                        value: 0.5,
                      },
                    ],
                  },
                  {
                    value: 2,
                  },
                ],
              },
              {
                value: 4,
                children: [
                  {
                    children: [
                      {
                        value: 2,
                      },
                    ],
                  },
                ],
              },
              {
                value: 4,
                children: [
                  {
                    children: [
                      {
                        value: 2,
                      },
                    ],
                  },
                ],
              },
              {
                value: 3,
                children: [
                  {
                    children: [
                      {
                        value: 1,
                      },
                    ],
                  },
                ],
              },
            ],
            label: {
              color: "#000",
              textBorderColor: "#fff",
              textBorderWidth: 2,
              formatter: function (param: any) {
                var depth = param.treePathInfo.length;
                if (depth === 2) {
                  return "radial";
                } else if (depth === 3) {
                  return "tangential";
                } else if (depth === 4) {
                  return "0";
                }
                return "";
              },
            },
            levels: [
              {},
              {
                itemStyle: {
                  color: "#CD4949",
                },
                label: {
                  rotate: "radial",
                },
              },
              {
                itemStyle: {
                  color: "#F47251",
                },
                label: {
                  rotate: "tangential",
                },
              },
              {
                itemStyle: {
                  color: "#FFC75F",
                },
                label: {
                  rotate: 0,
                },
              },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
      //自适应大小,监听浏览器缩放，图表对象调用缩放resize函数
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    };
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

        // console.log(option);
        myChart.setOption<echarts.EChartsOption>(option);

        for (let i = startIndex; i < years.length - 1; ++i) {
          (function (i) {
            setTimeout(function () {
              updateYear(years[i + 1]);
            }, (i - startIndex) * updateFrequency);
          })(i);
        }

        function updateYear(year: string) {
          let source = data.slice(1).filter(function (d: string[]) {
            return d[4] === year;
          });
          (option as any).series[0].data = source;
          (option as any).graphic.elements[0].style.text = year;
          myChart.setOption<echarts.EChartsOption>(option);
        }
      });
      // option && myChart.setOption(option);
      //自适应大小,监听浏览器缩放，图表对象调用缩放resize函数
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    };
    return {
      ...toRefs(state),
      createData_pre,
      randomExtend,
      initTime,
      initHistogram,
      initLinechart,
      initPiechartleft,
      initFlyline,
      initCard,
      initPiechart,
      initSunburst,
      initDynamic,
    };
  },
});
</script>
<style scoped lang="scss">
// html,
// body {
//   height: 100%;
// }
.container-fluid {
  margin: 0px;
  //   background-color: #1a232a;
  background: url("../../assets/images/bigdata-bg.png");
  align-items: center;
  @media (min-width: 768px) {
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    // overflow: hidden;
  }

  // 头部
  .center-title {
    position: absolute;
    // font-size: 30px;
    // font-size: 150%;
    font-family: STXingkai;
    // font-weight: bold;
    left: 50%;
    // top: 15px;
    transform: translateX(-50%);
  }
  .navbarcontent {
    text-align: left;
    color: #4b96f7;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    // font-weight: 700;

    span {
      font-size: 1em;
      font-weight: 700;
    }
    a {
      font-size: 1em;
      text-decoration: none;
      // 扩大a标签点击范围
      // line-height: 30px;
      text-decoration: none;
      display: inline-block;
      /*跟随父元素的高度*/
      height: inherit;
    }
  }
  // 时间
  .showTime {
    color: #4b96f7;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 700;
    // background: #fff;
  }
  //   大屏幕
  @media (min-width: 768px) {
    .dv-decoration-8 {
      height: 60px;
    }
    .dv-decoration-5 {
      width: 80%;
      height: 60px;
      margin-top: 30px;
    }
    .center-title {
      font-size: 30px;
      top: 20px;
    }
  }
  //   小屏幕
  @media (max-width: 768px) {
    .dv-decoration-5 {
      width: 80%;
      height: 40px;
      margin-top: 15px;
    }
    .center-title {
      font-size: 16px;
      top: 8px;
    }
  }
}

// 统计容量表格
.tabledata {
  position: relative;
  justify-content: space-between; //分散
  // text-align: justify;
  // text-align-last: justify; /*解决IE的支持*/
  // line-height: 0; /*解决标准浏览器容器底部多余的空白*/
  .digital-title {
    font-family: STXingkai;
    font-size: 20px;
    padding: 4px;
    // margin-bottom: 10px;
    color: rgb(255, 255, 255);
  }

  .digital-content {
    display: flex;
    flex-wrap: nowrap;
    padding: 4px;
    .dv-digital-flop {
      width: 70px;
      height: 50px;
    }
    .dataunit {
      margin-left: 5px;
      // display: flex;
      align-items: flex-end;
      box-sizing: border-box;
      line-height: 50px;
      // padding-bottom: 13px;
      // display: none;
      text-align: center;
      // font-weight: bold;
      // font-size: 20px;
    }
  }
  .dv-decoration-10 {
    position: absolute;
    width: 95%;
    left: 2.5%;
    height: 5px;
    bottom: 0px;
  }
}

@media (min-width: 768px) {
  .digital-main {
    width: 12%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 3px solid rgb(6, 30, 93);
    border-right: 3px solid rgb(6, 30, 93);
  }
}
@media (max-width: 768px) {
  .digital-main {
    width: 49%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // border-left: 3px solid rgb(6, 30, 93);
    border: 3px solid rgb(6, 30, 93);
  }
}

//统计图
// 飞行图
.datasum {
  // height: 500px;
  margin-top: 15px;
  .map {
    position: relative;
    height: 10.125 * 2.5rem;
  }
  .map .map1 {
    width: 6.475 * 2.5rem;
    height: 6.475 * 2.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url(../../assets/images/map.png);
    background-size: 100% 100%;
    opacity: 0.3;
  }
  .map .map2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8.0375 * 2.5rem;
    height: 8.0375 * 2.5rem;
    background: url(../../assets/images/lbx.png);
    animation: rotate1 15s linear infinite;
    opacity: 0.6;
    background-size: 100% 100%;
  }
  .map .map3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 7.075 * 2.5rem;
    height: 7.075 * 2.5rem;
    background: url(../../assets/images/jt.png);
    animation: rotate2 10s linear infinite;
    opacity: 0.6;
    background-size: 100% 100%;
  }
  .map .chart {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10.125 * 2.5rem;
  }
  @keyframes rotate1 {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @keyframes rotate2 {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }

  // 卡片数据
  #cards {
    // display: flex;
    // justify-content: space-between;
    // height: 306px;
    position: relative;
    bottom: -28px !important;

    .card-item {
      background-color: rgba(6, 31, 93, 0.027);
      border-top: 2px solid rgba(1, 153, 209, 0.5);
      // width: 19.5%;
      // width: 50%;
      // display: flex;
      // flex-direction: column;
      @media (max-width: 768px) {
        width: 50%;
      }
    }

    .card-header {
      // display: flex;
      // height: 18%;
      align-items: center;
      justify-content: space-between;

      .card-header-left {
        // font-size: 16px;
        font-weight: bold;
        // padding-left: 20px;
        color: #fff;
        text-align: center;
        span {
          //  font-weight: bold;
          font-size: 3vh;
          color: #03d3ec;
        }
      }

      // .card-header-right {
      //   // padding-right: 2px;
      //   // font-size: 30px;
      //   font-weight: bold;
      //   color: #03d3ec;
      // }
    }

    .ring-charts {
      // height: 50%;
      // 固定高度，否则会出现比例不一致
      height: 136px;
    }

    .card-footer {
      // height: 25%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #fff;
    }

    .card-footer-item {
      padding: 5px 5px 0px 5px;
      box-sizing: border-box;
      width: 48%;
      background-color: rgba(6, 30, 93, 0.7);
      border-radius: 3px;

      .footer-title {
        // font-size: 15px;
        margin-bottom: 5px;
        text-align: center;
      }

      .footer-detail {
        // font-size: 20px;
        color: #1294fb;
        display: flex;
        font-size: 18px;
        align-items: center;

        .dv-digital-flop {
          margin-right: 5px;
          width: 70px;
          height: 35px;
        }
      }
    }
  }
}

// 图表
.mainbox .panel {
  position: relative;
  height: 3.875 * 3.6rem;
  padding: 0 0.1875rem 0.5rem;
  border: 1px solid rgba(25, 186, 139, 0.17);
  margin-bottom: 0.1875 * 5rem;
  background: url(../../assets/images/line.png) rgba(255, 255, 255, 0.03);
}

.mainbox .panel::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.mainbox .panel::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.mainbox .panel .panel-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.mainbox .panel .panel-footer::before {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.mainbox .panel .panel-footer::after {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.mainbox .panel h2 {
  height: 0.6 * 3rem;
  color: #fff;
  line-height: 0.6 * 3rem;
  text-align: center;
  font-size: 0.25rem;
  font-weight: 400;
}
.mainbox .panel h2 a {
  color: #fff;
  text-decoration: none;
  margin: 0 0.125rem;
}
.mainbox .panel .chart {
  height: 3 * 3rem;
}
</style>
