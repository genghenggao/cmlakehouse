<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-10-06 10:57:38
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-09 09:25:57
-->
<template>
    <!-- 导航 -->
    <CMHeader />
    <!-- 轮播图 -->
    <div
      id="carouselExampleFade"
      class="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
      </div>
      <div class="carousel-inner">
        <div v-for="(item, index) in imglist" :key="index" :class="item.class">
          <img :src="item.src" alt="" class="img1" />
          <img src="@/assets/images/logo6.png" class="img2" />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <!-- home -->
    <section id="home">
      <div class="container">
        <div class="row">
          <div class="col-md-12 tittle" align="left">
            <i class="bi bi-stars"></i>
            研究新动态
          </div>
          <hr />
  
          <div class="col-md-6" id="home-left">
            <div class="row">
              <!-- home轮播图 -->
              <div
                id="homeImgFade"
                class="col-md-12 carousel slide carousel-fade"
                data-bs-ride="carousel"
              >
                <div class="carousel-inner">
                  <div
                    v-for="(item, index) in homeimglist"
                    :key="index"
                    :class="item.class"
                  >
                    <img :src="item.src" alt="" class="homeimg" />
                    <div class="carousel-caption d-none d-md-block">
                      <!-- <p></p> -->
                      <h5>
                        <a href="">{{ item.title }}</a>
                      </h5>
                    </div>
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#homeImgFade"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#homeImgFade"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-6" id="home-right" align="left">
            <div style="height: 40px; padding-top: 10px">
              <h4 style="font-size: 20px; font-weight: bold">
                <a
                  href="#"
                  title="彭苏萍院士团队科研成果亮相上海“中国工程院·院士专家成果展示与转化中心”"
                >
                  彭苏萍院士团队科研成果亮相上海“中国工程院·院士专家成果展示与转化中心”
                </a>
              </h4>
            </div>
            <div
              style="height: 40px; padding-top: 10px"
              v-for="(item, i) in homelist"
              :key="i"
              :index="item.url"
            >
              <h4>
                <a :href="item.url" :title="item.des"
                  ><i class="bi bi-lightbulb"></i> {{ item.des }}</a
                >
              </h4>
            </div>
            <div style="height: 40px; padding-top: 20px" align="right">
              <h4 style="font-size: 12px">
                <a href="#"><i class="bi bi-box-seam"></i> 更多</a>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- bbs -->
    <section id="bbs">
      <div class="container">
        <div class="row g-5">
          <div class="col-md-4" id="bbs-a1">
            <div class="row">
              <div class="col-md-8">
                <i class="bi bi-stars"></i>
                地学要闻
              </div>
              <div class="col-md-4" align="right">
                <p><a href="#">更多...</a></p>
              </div>
              <hr />
              <div class="col-md-12" id="bbs-pic">
                <a href="#"><img src="@/assets/logo.png" alt="" /></a>
                <p><a href="#">城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开：地球大数据</a></p>
              </div>
              <div class="col-md-12" id="bbs-list">
                <ul class="list">
                  <li v-for="(item, index) in bbslist1" :key="index">
                    <a :href="item.url">{{ item.des }}</a>
                    <span>{{ item.date }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4" id="bbs-a2">
            <div class="row">
              <div class="col-md-8">
                <i class="bi bi-stars"></i>
                科研成果
              </div>
              <div class="col-md-4" align="right">
                <p><a href="">更多...</a></p>
              </div>
              <hr />
              <div class="col-md-12" id="bbs-pic">
                <a href="#"><img src="@/assets/logo.png" alt="" /></a>
                <div></div>
                <!-- <p>城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开：地球大数据</p> -->
                <p><a href="#">城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开：地球大数据</a></p>
              </div>
              <div class="col-md-12" id="bbs-list">
                <ul class="list">
                  <li v-for="(item, index) in bbslist2" :key="index">
                    <a :href="item.url">{{ item.des }}</a>
                    <span>{{ item.date }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4" id="bbs-a3">
            <div class="row">
              <div class="col-md-8">
                <i class="bi bi-stars"></i>
                合作交流
              </div>
              <div class="col-md-4" align="right">
                <p><a href="">更多...</a></p>
              </div>
              <hr />
              <div class="col-md-12" id="bbs-pic">
                <a href="#"><img src="@/assets/logo.png" alt="" /></a>
                <p><a href="#">城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开：地球大数据</a></p>
              </div>
              <div class="col-md-12" id="bbs-list">
                <ul class="list">
                  <li v-for="(item, index) in bbslist3" :key="index">
                    <a :href="item.url">{{ item.des }}</a>
                    <span>{{ item.date }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--  -->
    <section id="second-part">
      <div class="container">
        <div class="row g-5">
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-8">
                <i class="bi bi-stars"></i>
                通知公告
              </div>
              <div class="col-md-4" align="right">
                <p><a href="">更多...</a></p>
              </div>
              <hr />
              <div class="col-md-12" id="second-pic">
                <a href="#"><img src="@/assets/logo.png" alt="" /></a>
                <p><a href="#">城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开：地球大数据</a></p>
              </div>
              <div class="col-md-12" id="second-list">
                <ul class="list" id="comment1">
                  <li v-for="(item, index) in secpartlist" :key="index">
                    <a :href="item.url">{{ item.des }}</a>
                    <span>{{ item.date }}</span>
                  </li>
                </ul>
                <ul id="comment2"></ul>
              </div>
              <!-- <scroll-list /> -->
            </div>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-8">
                <i class="bi bi-stars"></i>
                项目综合
              </div>
              <div class="col-md-4" align="right">
                <p><a href="">更多...</a></p>
              </div>
              <hr />
            </div>
            <div class="row g-2" id="second-grid">
              <div class="col-4" v-for="item in secondlist" :key="item.src">
                <a href="#"><img :src="item.src" alt="" /></a>
                <p>
                  <a href="#" :title="item.title">{{ item.msg }}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <!-- footer -->
    <CMFooter />
  </template>
  <script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs } from "vue";
  import CMHeader from "@/components/CMHeader.vue";
  import CMFooter from "@/components/CMFooter.vue";
  export default defineComponent({
    components: {
      CMHeader,
      CMFooter,
    },
    setup() {
      onMounted(() => {
        // 列表滚动
        roll(50);
      });
      const state = reactive({
        // 轮播图
        imglist: [
          {
            src: require("@/assets/images/banner-cn.jpg"),
            class: "carousel-item active",
          },
          {
            src: require("@/assets/images/banner-cn1.jpg"),
            class: "carousel-item",
          },
          {
            src: require("@/assets/images/banner-cn2.jpg"),
            class: "carousel-item",
          },
          {
            src: require("@/assets/images/banner-cn3.jpg"),
            class: "carousel-item",
          },
          {
            src: require("@/assets/images/banner-cn4.jpg"),
            class: "carousel-item",
          },
        ],
        homeimglist: [
          {
            src: require("@/assets/images/homeimg11.png"),
            class: "carousel-item active",
            url: "#",
            title: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开",
            time: "",
          },
          {
            src: require("@/assets/images/homeimg12.png"),
            class: "carousel-item ",
            url: "#",
            title: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开",
            time: "",
          },
          {
            src: require("@/assets/images/homeimg13.png"),
            class: "carousel-item ",
            url: "#",
            title: "彭苏萍院士团队2项科技成果亮相国家“十三五”科技创新成就展",
            time: "",
          },
          {
            src: require("@/assets/images/homeimg14.png"),
            class: "carousel-item ",
            url: "#",
            title: "国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室",
            time: "",
          },
        ],
        homelist: [
          {
            des: "【中国科学报】彭苏萍院士：黄河流域高质量发展亟须重视煤矿区生态修复",
            url: "/news/news1",
          },
          {
            des: "彭苏萍院士等应邀参加哈萨克斯坦纪念A. Zh. Mashanov诞辰115周年和Zh. S. Erzhanov诞辰110周年国际学术会议",
            url: "home",
          },
          {
            des: "彭苏萍院士团队2项科技成果亮相国家“十三五”科技创新成就展",
            url: "des2",
          },
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开",
            url: "des3",
          },
          {
            des: "国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室",
            url: "des3",
          },
          {
            des: "彭苏萍院士团队获第二十届中国专利奖金奖",
            url: "des3",
          },
        ],
        bbslist1: [
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开",
            url: "home",
            date: "2022.10.06",
          },
          {
            des: "国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室",
            url: "home",
            date: "2022.10.07",
          },
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开.",
            url: "home",
            date: "2022.10.07",
          },
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开.",
            url: "home",
            date: "2022.10.07",
          },
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开.",
            url: "home",
            date: "2022.10.07",
          },
        ],
        bbslist2: [
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开",
            url: "home",
            date: "2022.10.06",
          },
          {
            des: "国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室",
            url: "home",
            date: "2022.10.07",
          },
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开.",
            url: "home",
            date: "2022.10.07",
          },
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开.",
            url: "home",
            date: "2022.10.07",
          },
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开.",
            url: "home",
            date: "2022.10.07",
          },
        ],
        bbslist3: [
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开",
            url: "home",
            date: "2022.10.06",
          },
          {
            des: "国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室",
            url: "home",
            date: "2022.10.07",
          },
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开.",
            url: "home",
            date: "2022.10.07",
          },
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开.",
            url: "home",
            date: "2022.10.07",
          },
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开.",
            url: "home",
            date: "2022.10.07",
          },
        ],
        secpartlist: [
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开",
            url: "home",
            date: "2022.10.06",
          },
          {
            des: "国家安研院院长孙华山一行到煤炭资源与安全开采国家重点实验室",
            url: "home",
            date: "2022.10.07",
          },
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开.",
            url: "home",
            date: "2022.10.07",
          },
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开.",
            url: "home",
            date: "2022.10.07",
          },
          {
            des: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开.",
            url: "home",
            date: "2022.10.07",
          },
        ],
        secondlist: [
          {
            src: require("@/assets/images/image-list1.jpg"),
            msg: "点云数据",
            title: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开：地球大数据",
          },
          {
            src: require("@/assets/images/image-list2.jpg"),
            msg: "地球水系",
            title: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开：地球大数据",
          },
          {
            src: require("@/assets/images/image-list3.jpg"),
            msg: "地学大数据技术",
            title: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开：地球大数据",
          },
          {
            src: require("@/assets/images/image-list4.jpg"),
            msg: "地形地貌",
            title: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开：地球大数据",
          },
          {
            src: require("@/assets/images/image-list5.jpg"),
            msg: "岩石展示",
            title: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开：地球大数据",
          },
          {
            src: require("@/assets/images/image-list6.jpg"),
            msg: "计算CPU",
            title: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开：地球大数据",
          },
          {
            src: require("@/assets/images/image-list7.jpg"),
            msg: "山脉",
            title: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开：地球大数据",
          },
          {
            src: require("@/assets/images/image-list8.jpg"),
            msg: "山体",
            title: "城市道路及地下空间深层隐患探测装备及技术研讨会在国重室成功召开：地球大数据",
          },
          {
            src: require("@/assets/images/image-list9.jpg"),
            msg: "地学大数据",
            title: "世界地球大数据",
          },
        ],
      });
  
      // 列表滚动
      const roll = (t: any) => {
        let ul1: any = document.getElementById("comment1");
        let ul2: any = document.getElementById("comment2");
        var ulbox: any = document.getElementById("second-list");
  
        ul2.innerHTML = ul1.innerHTML;
        ulbox.scrollTop = 0; // 开始无滚动时设为0
        var timer = setInterval(rollStart, t); // 设置定时器，参数t用在这为间隔时间（单位毫秒），参数t越小，滚动速度越快
        // 鼠标移入div时暂停滚动
        ulbox.onmouseover = function () {
          clearInterval(timer);
        };
        // 鼠标移出div后继续滚动
        ulbox.onmouseout = function () {
          timer = setInterval(rollStart, t);
        };
      };
  
      // 开始滚动函数
      const rollStart = () => {
        // 上面声明的DOM对象为局部对象需要再次声明
        var ul1: any = document.getElementById("comment1");
        var ul2: any = document.getElementById("comment2");
        var ulbox: any = document.getElementById("second-list");
        // 正常滚动不断给scrollTop的值+1,当滚动高度大于列表内容高度时恢复为0
        if (ulbox.scrollTop >= ul1.scrollHeight) {
          ulbox.scrollTop = 0;
        } else {
          ulbox.scrollTop++;
        }
      };
  
      return {
        ...toRefs(state),
        roll,
      };
    },
  });
  </script>
  
  <style scoped lang="scss">
  // 轮播图
  .img1 {
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
  }
  .img2 {
    position: absolute;
    top: 20%;
    right: 2%;
    width: 40%;
    z-index: 2;
  }
  
  // home
  #home .container {
    margin-top: 40px;
    // background: url("../assets/images/home-bg.jpg");
    background-size: cover;
    color: #ffffff;
    text-align: center;
    width: 100%;
  
    .tittle {
      font-size: x-large;
      font-weight: bold;
      color: #021236;
    }
    hr {
      margin-top: 20px;
      height: 2px;
      color: #021236;
    }
  }
  
  #home #home-left {
    padding: 0;
  }
  
  #home #home-left #homeImgFade {
    img {
      height: 340px;
      width: 100% !important;
    }
  
    a {
      // 字体超出部分隐藏
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
      text-decoration: none;
      color: white;
    }
    a:hover {
      color: rgb(238, 213, 190);
    }
  }
  #home #home-right {
    background: #04377abd;
    height: 340px;
    // .list-group > a {
    //   background: #0a80c6;
    //   color: #ffffff;
    // }
    h4 {
      font-size: 16px;
      a {
        // 字体超出部分隐藏
        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        text-decoration: none;
        color: white;
      }
      a:hover {
        color: rgb(238, 213, 190);
      }
    }
  }
  //bbs
  #bbs .container {
    margin-top: 40px;
    // background: url("../assets/images/home-bg.jpg");
    width: 100%;
    hr {
      height: 2px;
      color: #021236;
    }
  }
  
  #bbs .col-md-8 {
    font-size: x-large;
    font-weight: bold;
    color: #021236;
  }
  #bbs .col-md-4 {
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
  #bbs #bbs-pic {
    border-style: solid;
    border-width: 1px;
    border-color: rgba(150, 143, 143, 0.384);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    // box-shadow: 2px 2px 3px #e3e3e3e3;
    position: relative;
    p {
      font-size: 18px;
      width: 100%;
      height: 30px;
      position: absolute;
      z-index: 2;
      left: 0;
      bottom: 0;
      color: #ffffff;
      background-color: #6c707a81;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 0;
      // 字体超出隐藏
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      a {
        color: white;
        text-decoration: none;
      }
    }
  }
  
  #bbs #bbs-list {
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
  
  #second-part .container {
    margin-top: 40px;
    // background: url("../assets/images/home-bg.jpg");
    width: 100%;
    hr {
      height: 2px;
      color: #021236;
    }
  }
  
  #second-part .col-md-8 {
    font-size: x-large;
    font-weight: bold;
    color: #021236;
  }
  #second-part .col-md-4 {
    P {
      margin-top: 12px;
      // line-height: 40px;
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
  #second-part #second-pic {
    display: flex;
    flex-direction: column;
    align-items: center;
    // margin-top: 30rpx;
    // box-shadow: 2px 2px 3px #e3e3e3e3;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(150, 143, 143, 0.384);
    position: relative;
    p {
      font-size: 18px;
      width: 100%;
      height: 30px;
      position: absolute;
      z-index: 2;
      left: 0;
      bottom: 0;
      color: #ffffff;
      background-color: #6c707a81;
      margin-bottom: 0;
      // 字体超出隐藏
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      a {
        color: white;
        text-decoration: none;
      }
    }
  }
  
  #second-part #second-list {
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
    height: 420px; /* 必须 */
    overflow: hidden; /* 必须 */
    //  border: 1px solid red;
    ul {
      list-style: none;
      padding: 0;
    }
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
  }
  #second-part #second-grid {
    img {
      width: 100%;
    }
  }
  
  #second-part #second-grid .col-4 {
    padding: 0;
    display: flex;
    // flex-direction: column;
    // align-items: center;
    // margin-top: 30rpx;
    // box-shadow: 2px 2px 3px #e3e3e3e3;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(150, 143, 143, 0.384);
    position: relative;
    P {
      position: absolute;
      z-index: 2;
      left: 0;
      bottom: 0;
      color: #ffffff;
      background-color: #6c707a81;
      margin-bottom: 0;
      width: 100%;
      // 字体超出隐藏
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
      a {
        color: #eaecf0;
        text-decoration: none;
      }
      a:hover {
        color: #021236;
      }
    }
  }
  </style>
  