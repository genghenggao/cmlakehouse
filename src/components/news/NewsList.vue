<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-10-13 22:22:40
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-09 09:52:43
-->
<template>
    <!-- 头部 -->
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@/assets/images/banner-cn.jpg" class="d-block w-100" alt="..." />
        </div>
        <div class="headtitle">
          <CMHeader />
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="container maincontent">
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-6">
              <h4>
                <i class="bi bi-grid-fill"></i>
                研究动态
              </h4>
            </div>
            <div class="col-md-6">
              <nav style="--bs-breadcrumb-divider: '>>'" aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="/">首页</a></li>
                  <li class="breadcrumb-item">
                    <a href="/newslist">专项新闻</a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <hr />
          <div class="row listcontent">
            <div class="col-md-12">
              <ul class="list">
                <li v-for="(item, index) in newsList" :key="index">
                  <a :href="item.url">{{ item.des }}</a>
                  <span>{{ item.date }}</span>
                </li>
              </ul>
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
        <div class="d-none d-lg-block col-md-3">
          <div class="right-content">
            <div class="row">
              <div class="col-md-8">
                <i class="bi bi-joystick"></i>
                科研成果
              </div>
              <div class="col-md-4" align="right">
                <p><a href="">更多+</a></p>
              </div>
            </div>
            <hr />
  
            <ul>
              <li>
                <a href="#">国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室</a>
              </li>
              <li>煤炭资源与安全开采国家重点实验室2021年度学术委员会会议</li>
              <li>城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开</li>
              <li>彭苏萍院士等应邀参加哈萨克斯坦纪念A. Zh. Mashanov诞辰115周年和Zh. S. Erzhanov诞辰110周年国际学术会议</li>
              <li>国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 页脚 -->
    <CMFooter />
  </template>
  <script lang='ts'>
  import { defineComponent, reactive, toRefs } from "vue";
  import CMHeader from "@/components/CMHeader.vue";
  import CMFooter from "@/components/CMFooter.vue";
  export default defineComponent({
    name: "ProjectIntro",
    components: {
      CMHeader,
      CMFooter,
    },
    setup() {
      const state = reactive({
        newsList: [
          {
            des: "【中国科学报】彭苏萍院士：黄河流域高质量发展亟须重视煤矿区生态修复",
            url: "/news/news1",
            date: "2020-09-08",
          },
          {
            des: "国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室",
            url: "/News/list",
            date: "2021-10-13",
          },
          {
            des: "国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室",
            url: "/News/list",
            date: "2021-10-13",
          },
          {
            des: "国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室",
            url: "/News/list",
            date: "2021-10-13",
          },
          {
            des: "国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室",
            url: "/News/list",
            date: "2021-10-13",
          },
          {
            des: "国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室",
            url: "/News/list",
            date: "2021-10-13",
          },
          {
            des: "国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室",
            url: "/News/list",
            date: "2021-10-13",
          },
          {
            des: "国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室",
            url: "/News/list",
            date: "2021-10-13",
          },
          {
            des: "国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室",
            url: "/News/list",
            date: "2021-10-13",
          },
          {
            des: "国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室",
            url: "/News/list",
            date: "2021-10-13",
          },
        ],
      });
      return {
        ...toRefs(state),
      };
    },
  });
  </script>
  <style scoped lang='scss'>
  .logo-name {
    // logo后文字颜色
    color: aliceblue;
    font-size: 20px;
    font-weight: bold;
    padding: 2px;
  }
  
  /* Dropdown menu background color*/
  
  .navbar-nav>li>.dropdown-menu {
    background-color: #021236;
  }
  
  /* Dropdown menu font color */
  .navbar-nav>li>.dropdown-menu a {
    color: aliceblue;
  }
  
  .navbar-nav>li>.dropdown-menu a,
  hr {
    color: aliceblue;
  }
  
  .navbar-nav>li>.dropdown-menu a:focus {
    background: #021236;
  }
  
  .navbar-nav>li>.dropdown-menu a:hover {
    color: #021236;
  }
  
  #carouselExampleSlidesOnly {
    position: relative;
  }
  
  .headtitle {
    width: 100%;
    //   position: absolute;
    z-index: 2;
    color: #ffffff;
    background-color: #021236;
    bottom: 0;
  
    //   background: url("../assets/images/banner-cn.jpg");
    // text-overflow: ellipsis;
    // white-space: nowrap;
    a {
      color: #ffffff;
      text-decoration: none;
    }
  
    .navbar-toggler {
      background-color: rgba(138, 176, 190, 0.993);
    }
  
    // 小屏幕按钮
    .navbar-toggler:hover {
      border-color: rgba(8, 187, 241, 0.993);
      background: rgba(160, 222, 241, 0.993);
    }
  }
  
  .maincontent {
    margin-top: 40px;
  
    .col-md-9 {
      h4 {
        font-size: x-large;
        font-weight: bold;
        color: #021236;
      }
  
      ol {
        float: right;
        margin-bottom: 0;
  
        li {
          line-height: 28pt;
  
          a {
            color: #021236;
            text-decoration: none;
          }
        }
      }
  
      .listcontent {
        margin: 0;
        border-style: solid;
        border-width: 1px;
        border-color: rgba(189, 183, 183, 0.384);
  
        .list {
          list-style-type: none;
          padding: 0;
          margin-top: 20px;
  
          li {
            margin-top: 20px;
            height: 46.6px;
            line-height: 21pt;
            border-bottom: dashed 1px #dddddd;
            line-height: 18pt;
            margin-bottom: -1px;
          }
  
          a {
            color: #021236;
            text-decoration: none;
            // 字体超出隐藏
            // 字体超出部分隐藏
            // width: 250px;
            // max-width: 250px;
            // overflow: hidden;
            // white-space: nowrap;
            // text-overflow: ellipsis;
            // display: block;
            height: 22px;
            overflow: hidden;
            width: 74%;
            float: left;
            font-size: 14px;
            text-overflow: ellipsis;
            display: block;
            white-space: nowrap;
          }
  
          a:hover {
            color: #d3c43e;
            text-decoration: underline;
          }
  
          span {
            float: right;
            color: #8c8b8b;
            font-size: 12px;
          }
  
          hr {
            border: 1px dotted;
          }
        }
      }
  
      .contentpage {
        margin-top: 10px;
      }
    }
  
    .col-md-3 .right-content {
      // height: 500px;
      border-style: solid;
      border-width: 1px;
      border-color: rgba(150, 143, 143, 0.384);
  
      // padding: 0;
      .col-md-8 {
        font-size: x-large;
        font-weight: bold;
        color: #021236;
      }
  
      .col-md-4 {
        P {
          margin-top: 12px;
          color: #314e9e;
  
          a {
            color: #021236;
            text-decoration: none;
          }
  
          a:hover {
            color: #d3c43e;
          }
        }
      }
  
      ul>li>a {
        color: #021236;
        text-decoration: none;
        // 字体超出部分隐藏
        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
      }
    }
  
    hr {
      margin-top: 0;
      height: 2px;
      color: #021236;
    }
  }
  </style>