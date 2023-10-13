<template>
  <div class="home">
    <div class="home-title">
      <el-card shadow="always">
        <div class="title-msg">工作台</div>
        <el-row>
          <el-col :span="1" :offset="1">
            <el-avatar :size="60" :src="avatar"></el-avatar>
          </el-col>
          <el-col :span="5">
            <div class="greetings">欢迎访问,祝您新的一天工作愉快！</div>
            <div class="weather">今天小雨转阴天,11~20°,天凉,注意加衣</div>
          </el-col>
          <el-col :span="6" :offset="10">
            <el-row>
              <el-col class="item" :span="8">
                <i class="el-icon-info p4em c-brown" />
                <span>代办事项</span>
              </el-col>
              <el-col class="item" :span="8">
                <i class="el-icon-postcard p4em c-coral" />
                <span>数据审核</span>
              </el-col>
              <el-col class="item" :span="8">
                <i class="el-icon-edit-outline p4em" />
                <span>人事处理</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="item item-text" :span="8">8/10</el-col>
              <el-col class="item item-text" :span="8">1/20</el-col>
              <el-col class="item item-text" :span="8">5/6</el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="home-card m120">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(card, c) in cards" :key="c">
          <el-card shadow="always">
            <el-row>
              <el-col :span="4">
                <el-image
                  style="width: 60px; height: 60px"
                  v-if="c == 0"
                  :src="require('@/assets/images/icon/kpi.png')"
                />
                <el-image
                  style="width: 60px; height: 60px"
                  v-else-if="c == 1"
                  :src="require('@/assets/images/icon/zc.png')"
                />
                <el-image
                  style="width: 60px; height: 60px"
                  v-else-if="c == 2"
                  :src="require('@/assets/images/icon/zzl.png')"
                />
                <el-image
                  style="width: 60px; height: 60px"
                  v-else-if="c == 3"
                  :src="require('@/assets/images/icon/htl.png')"
                />
              </el-col>
              <el-col :span="16" :offset="1">
                <div>
                  <div class="num-effect">✗{{ card.price }}</div>
                  <div class="card-text">
                    <span>{{ card.ratio }}%</span>
                    <i class="el-icon-top-right c-forestgreen" />
                    <span>{{ card.type }}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="home-chart m120">
      <el-row :gutter="20">
        <!-- 左边内容   -->
        <el-col :span="18">
          <el-card shadow="always">
            <template #header>
              <el-image
                class="icon"
                :src="require('@/assets/images/icon/histogram.png')"
              />
              <span class="f-weight">数据汇总</span>
              <div class="div-right">
                <el-button type="text">去年</el-button>
                <el-button class="p4em" type="text">今年</el-button>
                <el-date-picker
                  v-model="date"
                  type="daterange"
                  size="mini"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </div>
            </template>
            <vue-echarts :option="overviewOption" style="height: 400px" />
          </el-card>
          <el-card class="m120" shadow="always">
            <template #header>
              <el-image
                class="icon"
                :src="require('@/assets/images/icon/list.png')"
              />
              <span class="f-weight">数据统计</span>
            </template>
            <el-row :gutter="20">
              <el-col :span="6" v-for="(sale, s) in sales" :key="s">
                <div
                  class="sale-item"
                  :style="{ border: '1px ' + sale.color + ' solid' }"
                >
                  <div>{{ sale.title }}</div>
                  <el-row :style="{ background: sale.color }">
                    <el-col :span="2" :offset="2">
                      <el-image
                        class="icon item-image"
                        :src="sale.iconType > 0 ? money : deal"
                      />
                    </el-col>
                    <el-col class="item-num" :span="10" :offset="10">
                      <span>{{ sale.num }}</span>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <!-- 右边内容   -->
        <el-col :span="6">
          <el-card shadow="always">
            <template #header>
              <el-image
                class="icon"
                :src="require('@/assets/images/icon/pie.png')"
              />
              <span class="f-weight">总用户率</span>
            </template>
            <vue-echarts :option="payTypeOPtion" style="height: 200px" />
          </el-card>
          <el-card class="m120" shadow="always">
            <template #header>
              <el-image
                class="icon"
                :src="require('@/assets/images/icon/satisfaction.png')"
              />
              <span class="f-weight">客户满意度</span>
            </template>
            <div v-for="(satisfaction, s) in satisfactions" :key="s">
              <el-row class="satisfaction" :gutter="20">
                <el-col :span="8">
                  <span class="satisfaction-number">{{
                    satisfaction.num
                  }}</span>
                </el-col>
                <el-col :span="8">
                  <el-image
                    class="satisfaction-image"
                    :src="satisfaction.image"
                  />
                  <div class="satisfaction-msg">{{ satisfaction.message }}</div>
                </el-col>
                <el-col :span="8">
                  <span class="satisfaction-ratio"
                    >{{ satisfaction.ratio }}%</span
                  >
                </el-col>
              </el-row>
              <el-divider v-if="satisfactions.length - 1 != s"></el-divider>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
// import { VueEcharts } from "vue3-echarts";
// import {revenueAnalysis,overview} from '@/api/serviceApi'

export default {
  components: {
    // VueEcharts,
  },
  setup() {
    const state = reactive({
      avatar: require("@/assets/images/logo1.png"),
      deal: require("@/assets/images/icon/成交.png"),
      money: require("@/assets/images/icon/人民币.png"),
      cards: [],
      overviewOption: {},
      date: "",
      payTypeOPtion: {},
      satisfactions: [],
      sales: [],
    });

    onMounted(() => {
      // 请求接口
      // revenueAnalysis().then(res => {
      //     if(res.code === 200){
      //         state.cards = res.data
      //     }
      // })

      state.cards = [
        {
          icon: require("@/assets/images/icon/kpi.png"),
          price: "15000",
          ratio: "87",
          type: "总上传数据量",
        },
        {
          icon: require("@/assets/images/icon/zc.png"),
          price: "15000",
          ratio: "87",
          type: "总下载数据量",
        },
        {
          icon: require("@/assets/images/icon/zzl.png"),
          price: "15000",
          ratio: "87",
          type: "总审核数据量",
        },
        {
          icon: require("@/assets/images/icon/htl.png"),
          price: "15000",
          ratio: "87",
          type: "总用户访问量",
        },
      ];

      // 总览
      state.overviewOption = {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ["product", "上传数据量", "下载数据量", "审核数据量"],
          source: [
            ["1月", 43.3, 85.8, 93.7],
            ["2月", 83.1, 73.4, 55.1],
            ["3月", 86.4, 65.2, 82.5],
            ["4月", 72.4, 53.9, 39.1],
            ["5月", 72.4, 53.9, 39.1],
            ["6月", 72.4, 53.9, 39.1],
            ["7月", 72.4, 53.9, 39.1],
            ["8月", 72.4, 53.9, 39.1],
            ["9月", 72.4, 53.9, 39.1],
            ["10月", 72.4, 53.9, 39.1],
            ["11月", 72.4, 53.9, 39.1],
            ["12月", 72.4, 53.9, 39.1],
          ],
        },
        color: ["#20c997", "#007bff", "#dc3545"],
        xAxis: {
          type: "category",
          axisTick: {
            show: false, // 不显示坐标轴刻度线
          },
        },
        yAxis: {
          show: true, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
          axisTick: {
            show: false, // 不显示坐标轴刻度线
          },
          axisLine: {
            show: false, // 不显示坐标轴线
          },
          splitLine: {
            show: true, // 不显示网格线
          },
        },
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
      };

      // 用户分布
      state.payTypeOPtion = {
        title: {},
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}人 ({d}%)",
        },
        color: ["#dc3545", "#007bff", "#28a745"],
        series: [
          {
            name: "用户部门",
            type: "pie",
            radius: "90%",
            avoidLabelOverlap: false,
            roseType: "radius",
            center: ["50%", "50%"],
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: true,
              position: "inner",
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "安保处" },
              { value: 310, name: "人事部" },
              { value: 274, name: "后勤部" },
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
          },
        ],
      };

      // 客户满意度
      state.satisfactions = [
        {
          num: "20142",
          image: require("@/assets/images/icon/开心.png"),
          message: "满意",
          ratio: "60",
        },
        {
          num: "12455",
          image: require("@/assets/images/icon/笑脸.png"),
          message: "比较满意",
          ratio: "36",
        },
        {
          num: "12",
          image: require("@/assets/images/icon/难过.png"),
          message: "一般",
          ratio: "4",
        },
      ];

      // 销售数据统计
      state.sales = [
        { title: "今日上传数据量", color: "#FFA333", num: "10", iconType: "0" },
        { title: "昨日上传数据量", color: "#A155E8", num: "52", iconType: "0" },
        { title: "本月上传数据量", color: "#6D91FF", num: "125", iconType: "0" },
        {
          title: "累计上传数据量(年)",
          color: "#A233A2",
          num: "12547",
          iconType: "0",
        },
        { title: "今日下载数据量", color: "#AED75B", num: "965", iconType: "1" },
        { title: "昨日下载数据量", color: "#A27B33", num: "852", iconType: "1" },
        { title: "本月下载数据量", color: "#8D8DD1", num: "1254", iconType: "1" },
        {
          title: "累计下载数据量(年)",
          color: "#C14E4E",
          num: "123685",
          iconType: "1",
        },
      ];
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss">
@import "@/assets/css/common.css";

.home {
  padding-bottom: 4em;

  .home-title {
    .title-msg {
      font-size: 20px;
      padding-bottom: 2rem;
    }

    .greetings {
      font-size: 18px;
      line-height: 30px;
      letter-spacing: 0.1em;
    }

    .weather {
      font-size: 14px;
      color: #999;
      line-height: 24px;
      letter-spacing: 0.1em;
    }

    .item {
      color: #808695;
      text-align: center;
      padding: 0.5em;
    }

    .item-text {
      font-weight: 700;
      font-size: 20px;
      color: #000000;
    }
  }

  .home-card .card-text {
    font-size: 12px;
    font-weight: 400;
    color: #494b52;
    letter-spacing: 0.1em;
    padding-top: 0.4em;
  }

  .home-chart {
    .satisfaction {
      padding-top: 0.2em;
      text-align: center;
    }

    .satisfaction-number {
      font-weight: 700;
      font-size: 30px;
      color: #515a6e;
      line-height: 120px;
      text-align: center;
    }

    .satisfaction-image {
      width: 60px;
      height: 60px;
      text-align: center;
    }

    .satisfaction-msg {
      line-height: 35px;
      color: #808695;
      font-size: 14px;
      text-align: center;
    }

    .satisfaction-ratio {
      line-height: 120px;
      color: #36c17b;
      font-size: 18px;
      text-align: center;
    }

    .sale-item {
      border-radius: 0.2em;
      line-height: 3.2em;
      text-align: center;
      margin: 1em 0;

      .item-image {
        top: 0.6em;
      }

      .item-num {
        height: 2.4em;
        line-height: 2.4em;
        color: white;
        font-weight: bold;
        font-size: 20px;
        text-align: right;
        padding-right: 1em;
      }
    }
  }
}
</style>

