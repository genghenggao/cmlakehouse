<template>
  <!-- 页眉 -->
  <div class="container head-top">
    <div class="row">
      <div class="col-md-6">
        <img src="@/assets/images/logo6.png" alt="" style="width: 270px; height: 56px" />
      </div>
      <div class="col-md-6">
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </div>

  <!-- 导航 -->
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <a class="navbar-brand" href="/"
        ><img src="@/assets/logo.png" alt="" width="30" height="30" />
        <span class="logo-name">{{ $t("cmheader.CoalMine") }}</span
        >{{ $t("cmheader.AIPlatform") }}</a
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
          <a class="nav-link" aria-current="page" href="/">{{ $t("cmheader.Home") }}</a>
          <a class="nav-link" href="/newslist">{{ $t("cmheader.News") }}</a>
          <a class="nav-link" href="/dataplatforms">{{ $t("cmheader.DataPlatform") }}</a>
          <a class="nav-link" href="/computeservices">{{ $t("cmheader.ComputeServices") }}</a>
          <a class="nav-link" href="#">{{ $t("cmheader.DataShare") }}</a>
          <a class="nav-link" href="/datamonitor">{{ $t("cmheader.DataMonitor") }}</a>
          <a class="nav-link" href="#">{{ $t("cmheader.CoProject") }}</a>
          <a class="nav-link" href="/about">{{ $t("cmheader.About") }}</a>
        </div>
      </div>
    </div>
  </nav>

  <!-- 内容 -->
  <div class="container main-content">
    <div class="accordion" id="accordionPanelsStayOpenExample">
      <div class="accordion-item">
        <div class="row contentfilter">
          <div class="col-md-6 haschose">
            <p>已选条件：</p>
          </div>
          <div class="col-md-6 d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="emptyAll"
            >
              清空全部 <i class="bi bi-trash"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
              @click="clickTest"
              v-if="isCollapse"
            >
              折叠筛选 <i class="bi bi-chevron-up"></i>
            </button>
            <button
              class="btn btn-outline-secondary btn-sm"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
              @click="clickTest"
              v-else
            >
              展开筛选 <i class="bi bi-chevron-down"></i>
            </button>
          </div>
        </div>
        <div
          id="panelsStayOpen-collapseOne"
          class="row accordion-collapse collapse show"
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div class="col-md-12 accordion-body">
            <el-form ref="form" :model="dataForm" label-width="120px" size="mini">
              <el-form-item label="学科分类：">
                <el-radio-group v-model="dataForm.subject" size="small">
                  <el-radio border label="所有学科" @change="getSubject"></el-radio>
                  <el-radio border label="地球物理" @change="getSubject"></el-radio>
                  <el-radio border label="地球化学" @change="getSubject"></el-radio>
                  <el-radio border label="地理数据" @change="getSubject"></el-radio>
                  <el-radio border label="遥感数据" @change="getSubject"></el-radio>
                  <el-radio border label="其他数据" @change="getSubject"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="应用场景：">
                <el-radio-group v-model="dataForm.field" size="small">
                  <el-radio border label="所有场景" @change="getFlied"></el-radio>
                  <el-radio border label="数据输入" @change="getFlied"></el-radio>
                  <el-radio border label="数据存储" @change="getFlied"></el-radio>
                  <el-radio border label="数据分析" @change="getFlied"></el-radio>
                  <el-radio border label="数据建模" @change="getFlied"></el-radio>
                  <el-radio border label="其他应用" @change="getFlied"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="row contentmain">
      <div class="col-md-12 res_title">
        <p>
          找到 <span id="totalData">{{ totalData }}</span> 个结果，共<span
            id="totalPage"
            >{{ totalPage }}</span
          >页
        </p>
      </div>
      <div class="col-md-12 res_main" v-for="(item, index) in mainContent" :key="index">
        <a v-bind:href="item.mainLink">
          <div class="main_title">{{ item.mainTitle }}</div>
          <div class="row">
            <div class="col-md-4 content_left">
              <p>
                <img :src="item.mainImgurl" alt="" style="width: 150px; height: 110px" />
              </p>
            </div>
            <div class="col-md-8 content_right">
              <div class="col-md-12 content-label">
                <span v-for="(itemclassify, index) in item.mainLabel" :key="index">{{
                  itemclassify
                }}</span>
              </div>
              <div class="col-md-12">
                <p id="sysintro">
                  {{ item.mainMes }}
                </p>
              </div>
              <div class="col-md-12 content_bottom">
                <p>
                  {{ item.mainClassify }} <span>{{ item.mainDate }}</span>
                </p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
    <!-- 页码 -->
    <div class="row contentpage">
      <div class="col-md-12">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>

  <!-- 页脚 -->
  <CMFooter />
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import CMFooter from "@/components/CMFooter.vue";
interface itableData {
  date: string;
  name: string;
  address: number;
}
export default defineComponent({
  name: "DataCenter",
  components: {
    CMFooter,
  },
  setup() {
    onMounted(() => {
      state.totalData = state.mainContent.length;
      state.totalPage = Math.ceil(state.mainContent.length / 10);
    });
    const state = reactive({
      isCollapse: true,
      dataForm: {
        subject: "所有学科",
        field: "所有场景",
      },
      mainContent: [
        {
          mainTitle: "地震勘探数据服务",
          mainLink: "/seismicupload",
          mainImgurl: require("@/assets/logo.png"),
          mainLabel: ["机器学习", "预处理", "频谱分解", "小波变化"],
          mainMes:
            " 主要包括数据库建立、数据云处理和资料云解释三大模块，数据库建立主要包括地面地震数据库模块和井中地震数据库模块，每个模块又包含静态地震数据模块和时移地震数据模块。建立数据处理云计算系统，针对标准格式地震数据，建立数据解编、整理、去噪等处理系统，对数据库中数据进行处理，形成成果数据体。建立资料解释云系统，形成构造解释、岩性解释等解释系统，对成果数据体进行分析解释，实现地层构造及岩性等矿山地学信息透明化，并对煤层采动对地层影响进行动态解释。",
          mainClassify: "地学数据库",
          mainDate: "2022-11-15",
        },
        {
          mainTitle: "地震勘探数据服务",
          mainLink: "/geophysicsplatform",
          mainImgurl: require("@/assets/logo.png"),
          mainLabel: ["机器学习", "预处理", "频谱分解", "小波变化"],
          mainMes:
            " 主要包括数据库建立、数据云处理和资料云解释三大模块，数据库建立主要包括地面地震数据库模块和井中地震数据库模块，每个模块又包含静态地震数据模块和时移地震数据模块。建立数据处理云计算系统，针对标准格式地震数据，建立数据解编、整理、去噪等处理系统，对数据库中数据进行处理，形成成果数据体。建立资料解释云系统，形成构造解释、岩性解释等解释系统，对成果数据体进行分析解释，实现地层构造及岩性等矿山地学信息透明化，并对煤层采动对地层影响进行动态解释。",
          mainClassify: "地学数据库",
          mainDate: "2022-11-15",
        },
        {
          mainTitle: "地面电法数据服务",
          mainLink: "/geochemistryplatform",
          mainImgurl: require("@/assets/logo.png"),
          mainLabel: ["机器学习", "预处理", "数据分析"],
          mainMes:
            " 主要包括数据库建立、数据处理云计算和资料解释三大模块。数据库建立主要有地面数据采集的数据库模块和井下数据采集的数据库模块，每个模块又包含静态探测数据模块和动态监测数据模块。建立数据处理云计算系统，针对不同的数据来源，分别建立数据解编、整理、去噪、模型正演与反演计算等处理系统，对数据库数据进行处理计算，形成成果数据体。建立资料解释云系统，形成3D成图、电性参数成像、地质成果解译等分析解释系统，对成果数据体进行分析解释，实现地层结构和地质构造等地学信息透明化以及动态信息预报预警。",
          mainClassify: "地学数据库",
          mainDate: "2022-11-15",
        },
        {
          mainTitle: "地质雷达数据服务",
          mainLink: "/newslist",
          mainImgurl: require("@/assets/logo.png"),
          mainLabel: ["机器学习", "预处理", "数据分析"],
          mainMes:
            " 主要包括数据库建立、数据处理云计算和资料解释三大模块。数据库建立主要有地面数据采集的数据库模块和井下数据采集的数据库模块，每个模块又包含静态探测数据模块和动态监测数据模块。建立数据处理云计算系统，针对不同的数据来源，分别建立数据解编、整理、去噪、模型正演与反演计算等处理系统，对数据库数据进行处理计算，形成成果数据体。建立资料解释云系统，形成3D成图、电性参数成像、地质成果解译等分析解释系统，对成果数据体进行分析解释，实现地层结构和地质构造等地学信息透明化以及动态信息预报预警。",
          mainClassify: "地学数据库",
          mainDate: "2022-11-15",
        },
        {
          mainTitle: "智慧矿山地震物理响应透明化平台",
          mainLink: "/newslist",
          mainImgurl: require("@/assets/logo.png"),
          mainLabel: ["机器学习", "预处理", "数据分析"],
          mainMes:
            " 主要包括数据库建立、数据处理云计算和资料解释三大模块。数据库建立主要有地面数据采集的数据库模块和井下数据采集的数据库模块，每个模块又包含静态探测数据模块和动态监测数据模块。建立数据处理云计算系统，针对不同的数据来源，分别建立数据解编、整理、去噪、模型正演与反演计算等处理系统，对数据库数据进行处理计算，形成成果数据体。建立资料解释云系统，形成3D成图、电性参数成像、地质成果解译等分析解释系统，对成果数据体进行分析解释，实现地层结构和地质构造等地学信息透明化以及动态信息预报预警。",
          mainClassify: "地学数据库",
          mainDate: "2022-11-15",
        },
        {
          mainTitle: "智慧矿山智能化识别平台",
          mainLink: "/newslist",
          mainImgurl: require("@/assets/logo.png"),
          mainLabel: ["机器学习", "预处理", "数据分析"],
          mainMes:
            " 主要包括数据库建立、数据处理云计算和资料解释三大模块。数据库建立主要有地面数据采集的数据库模块和井下数据采集的数据库模块，每个模块又包含静态探测数据模块和动态监测数据模块。建立数据处理云计算系统，针对不同的数据来源，分别建立数据解编、整理、去噪、模型正演与反演计算等处理系统，对数据库数据进行处理计算，形成成果数据体。建立资料解释云系统，形成3D成图、电性参数成像、地质成果解译等分析解释系统，对成果数据体进行分析解释，实现地层结构和地质构造等地学信息透明化以及动态信息预报预警。",
          mainClassify: "地学数据库",
          mainDate: "2022-11-15",
        },
        {
          mainTitle: "智慧煤矿山地震勘探平台",
          mainLink: "/newslist",
          mainImgurl: require("@/assets/logo.png"),
          mainLabel: ["机器学习", "预处理", "数据分析"],
          mainMes:
            " 主要包括数据库建立、数据处理云计算和资料解释三大模块。数据库建立主要有地面数据采集的数据库模块和井下数据采集的数据库模块，每个模块又包含静态探测数据模块和动态监测数据模块。建立数据处理云计算系统，针对不同的数据来源，分别建立数据解编、整理、去噪、模型正演与反演计算等处理系统，对数据库数据进行处理计算，形成成果数据体。建立资料解释云系统，形成3D成图、电性参数成像、地质成果解译等分析解释系统，对成果数据体进行分析解释，实现地层结构和地质构造等地学信息透明化以及动态信息预报预警。",
          mainClassify: "地学数据库",
          mainDate: "2022-11-15",
        },
        {
          mainTitle: "水文地质数据服务",
          mainLink: "/hydrologyplatform",
          mainImgurl: require("@/assets/logo.png"),
          mainLabel: ["机器学习", "预处理", "数据分析"],
          mainMes:
            " 主要包括数据库建立、数据处理云计算和资料解释三大模块。数据库建立主要有地面数据采集的数据库模块和井下数据采集的数据库模块，每个模块又包含静态探测数据模块和动态监测数据模块。建立数据处理云计算系统，针对不同的数据来源，分别建立数据解编、整理、去噪、模型正演与反演计算等处理系统，对数据库数据进行处理计算，形成成果数据体。建立资料解释云系统，形成3D成图、电性参数成像、地质成果解译等分析解释系统，对成果数据体进行分析解释，实现地层结构和地质构造等地学信息透明化以及动态信息预报预警。",
          mainClassify: "地学数据库",
          mainDate: "2022-11-15",
        },
      ],
      totalData: 0,
      totalPage: 0,
    });
    const clickTest = () => {
      console.log("点我了");
      state.isCollapse = !state.isCollapse;
    };

    // 学科选择
    const getSubject = () => {
      console.log(state.dataForm.subject);
    };
    // 场景选择
    const getFlied = () => {
      console.log(state.dataForm.field);
    };

    // 全部清空
    const emptyAll = () => {
      state.dataForm.subject = "所有学科";
      state.dataForm.field = "所有场景";
    };
    return {
      ...toRefs(state),
      // radio1: ref("Demo"),
      clickTest,
      getSubject,
      getFlied,
      emptyAll,
    };
  },
});
</script>
<style scoped lang="scss">
.head-top {
  // padding-top: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
  // background: yellowgreen;

  .d-flex {
    padding-top: 10px;

    input {
      line-height: 30px;
    }
  }
}

// 导航
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

// 主要内容
.main-content {
  padding: 0;
  margin-top: 20px;

  .contentfilter {
    margin: 0;
    background: #f7f8fa;
    min-height: 50px;
    .haschose {
      text-align: left;
    }
  }

  p {
    margin-left: 10px;
    margin-top: 12px;
  }

  .accordion-body {
    .el-radio {
      margin: 0 1rem 0 0;
    }
  }

  .contentmain {
    margin: 20px 0 0 0;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(150, 143, 143, 0.384);

    // background: #f7f8fa;
    .res_title {
      text-align: right;
      background: #f7f8fa;

      // padding: 0;
      // margin-top: 8px;
      // background: #264fa1;
      // line-height: 50px;
      p {
        margin: 15px 0 15px 10px;
      }
    }

    .res_main {
      border-bottom: 1px solid rgba(150, 143, 143, 0.384);

      a:link {
        color: black;
        text-decoration: none;

        img {
          cursor: pointer;
          transition: all 0.8s;
        }
      }

      //未访问：蓝色、无下划线
      a:hover {
        color: rgb(43, 93, 228);

        img {
          transform: scale(1.1);
        }
      }

      //鼠标移近：变色
      .main_title {
        text-align: left;
        font-size: 20px;
        font-family: STXingkai;
      }

      .content_right {
        text-align: left;
        .content-label {
          // 字体超出部分隐藏
          overflow: hidden;
          white-space: nowrap; //不换行
          // text-align: left;/
          // text-overflow: ellipsis; //显示省略符
          // display: block;
          span {
            background: #2088e0;
            color: #f7f8fa;
            margin: 0 5px;
            padding: 2px 9px;
          }
        }

        #sysintro {
          font-size: 14px;
          color: black;
          // 多行字体超出部分隐藏
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
        }

        .content_bottom {
          text-align: left;
          color: #8c8b8b;
          font-size: 12px;

          span {
            float: right;
          }
        }
      }
    }

    // 鼠标悬浮变色
    .res_main:hover {
      border: 1px solid rgba(0, 119, 255, 0.384);
    }
  }

  .contentpage {
    margin-top: 10px;
  }
}
</style>
