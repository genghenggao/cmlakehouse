<template>
  <div class="cmlakehouse_home">
    <el-container>
      <el-header style="padding: 0; height: 56px"><CMHeader /></el-header>
      <el-main style="padding: 0">
        <el-container class="act_one wow fadeInUp" data-wow-duration="0.5s">
          <el-row :gutter="10" style="margin: auto">
            <el-col :xl="24">
              <div style="padding-top: 120px">
                <!--动态将图片轮播图的容器高度设置成与图片一致-->
                <el-carousel :height="bannerHeight + 'px'">
                  <el-carousel-item v-for="item in img_list" :key="item.id">
                    <img :src="item.url" alt="图片" />
                    <h3 class="medium">{{ item.content }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="jumbotron" style="background-color: #b5b5b500">
                <h1 class="display-4">Welcome, geologists!</h1>
                <p class="lead">
                  系统主要使用Django框架，整合MongoDB数据库。
                  该系统主要用于解决海量地震数据的存储、管理，为地质工作者提供更好的服务。
                </p>
                <hr class="my-4" />
              </div>
            </el-col>
          </el-row>
        </el-container>
        <el-container class="act_one_extra wow fadeInUp" data-wow-duration="1s">
          <el-row :gutter="10" style="margin: auto">
            <el-col :xl="24">
              <h1>CMLakeHouse系统数据中心</h1>
              <p>
                系统主要由中国矿业大学（北京）煤炭资源与安全开采国家重点实验室负责运维,数据来源于全国各地，旨在搭建一个综合信息的地学数据管理系统，<br />更好的为地学科研人员提供帮助与服务。
              </p>
              <!-- </el-col> -->
              <!-- <el-col :xl="24"> -->
              <div class="extra_map">
                <InfoFlowMap />
              </div>
            </el-col>
          </el-row>
        </el-container>
        <el-container
          class="act_two wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="1s"
        >
          <el-row :gutter="120" style="margin-right: auto; margin-left: auto; width: 60%">
            <!-- <el-row> -->
            <el-col :xl="8">
              <a href="https://www.cnblogs.com/genghenggao/" target="_blank">
                <img src="@/assets/images/a.jpeg" class="img-responsive" alt="" />
                <h3>数据存储</h3>
                <p>数据存储阶段，支持海量数据的水平扩展</p>
              </a>
            </el-col>
            <el-col :xl="8">
              <a href="https://www.cnblogs.com/genghenggao/" target="_blank">
                <img src="@/assets/images/b.jpeg" class="img-responsive" alt="" />
                <h3>数据查询</h3>
                <p>数据查询阶段，支持海量数据的快速查询</p>
              </a>
            </el-col>
            <el-col :xl="8">
              <a href="https://www.cnblogs.com/genghenggao/" target="_blank">
                <img src="@/assets/images/c.jpeg" class="img-responsive" alt="" />
                <h3>数据更新</h3>
                <p>数据更新阶段，支持海量数据的实时更新</p>
              </a>
            </el-col>
          </el-row>
        </el-container>
        <el-container class="act_three">
          <!-- <el-row :gutter="50"> -->
          <el-row style="margin-right: auto; margin-left: auto; width: 55%">
            <el-col :xl="12" class="act_three_tips wow fadeInLeft">
              <h2>地学数据的多元(源)性与异构性</h2>
              <p>
                <i class="bi bi-box-fill"></i>
                地学数据包含的数据类型众多，数据的来源众多，采集的仪器类型多，数据类型不相同。
                <el-divider></el-divider>
              </p>
              <p>
                <i class="bi bi-box-fill"></i>
                遥感数据的数据主要有BSQ、BIP、BIL等格式。
              </p>
              <el-divider></el-divider>
              <p>
                <i class="bi bi-box-fill"></i>
                地理信息方面的数据主要有Shapefile、Coverage、EOO、TAB等格式。
              </p>
            </el-col>
            <el-col
              :xl="12"
              class="act_three_img wow fadeInRight"
              style="padding-left: 0; paddding-right: 0"
            >
              <img src="@/assets/images/duoyanxing.png" class="img-responsive" alt="" />
            </el-col>
          </el-row>
        </el-container>

        <el-container class="act_four wow fadeInUp" data-wow-duration="1s">
          <el-row :gutter="120" style="margin-right: auto; margin-left: auto; width: 60%">
            <el-col :xl="12" style="padding-left: 0; paddding-right: 0">
              <img src="@/assets/images/shijian.jpg" class="img-responsive" alt="" />
            </el-col>
            <el-col :xl="12" class="act_four_tips">
              <h2>地学数据的时间性与空间性</h2>
              <p>
                <i class="bi bi-box-fill"></i>
                地学数据的时间性体现在地学数据的获取时间上。地球系统是一个动态变化的系统，但它的变化速度常常十分缓慢。
                <el-divider></el-divider>
              </p>
              <p>
                <i class="bi bi-box-fill"></i>
                地学数据时间跨度从分秒跨越至数十万年，时间序列越长 ,数据就越有价值 。
                <el-divider></el-divider>
              </p>
              <p>
                <i class="bi bi-box-fill"></i>
                具有明确的空间坐标 (经度、纬度和海拔高度 )且有一定的空间范围。
              </p>
            </el-col>
          </el-row>
        </el-container>

        <el-container class="act_five wow fadeIn" data-wow-delay="0.6s">
          <el-row :gutter="10" style="margin-right: auto; margin-left: auto; width: 60%">
            <el-col :xl="24"> <h2>最新发现</h2> </el-col>
            <el-col :xl="6">
              <div class="act_five_content">
                <img
                  style="width:275px,height:174px"
                  src="@/assets/images/strata1.png"
                  class="img-responsive"
                  alt=""
                />
                <a
                  href="https://www.cnblogs.com/genghenggao/"
                  class="btn btn-primary"
                  target="_blank"
                  role="button"
                >
                  加入研究
                </a>
              </div></el-col
            >
            <el-col :xl="6">
              <div class="act_five_content">
                <img src="@/assets/images/zkmodel.png" class="img-responsive" alt="" />
                <a
                  href="https://www.cnblogs.com/genghenggao/"
                  class="btn btn-primary"
                  target="_blank"
                  role="button"
                >
                  加入研究
                </a>
              </div></el-col
            >
            <el-col :xl="6">
              <div class="act_five_content">
                <img src="@/assets/images/zkmodel2.png" class="img-responsive" alt="" />
                <a
                  href="https://www.cnblogs.com/genghenggao/"
                  class="btn btn-primary"
                  target="_blank"
                  role="button"
                >
                  加入研究
                </a>
              </div></el-col
            >
            <el-col :xl="6">
              <div class="act_five_content">
                <img src="@/assets/images/contour1.png" class="img-responsive" alt="" />
                <a
                  href="https://www.cnblogs.com/genghenggao/"
                  class="btn btn-primary"
                  target="_blank"
                  role="button"
                >
                  加入研究
                </a>
              </div></el-col
            >
            <el-col :xl="6">
              <div class="act_five_content">
                <img src="@/assets/images//strata3.png" class="img-responsive" alt="" />
                <a
                  href="https://www.cnblogs.com/genghenggao/"
                  class="btn btn-primary"
                  target="_blank"
                  role="button"
                >
                  加入研究
                </a>
              </div></el-col
            >
            <el-col :xl="6">
              <div class="act_five_content">
                <img src="@/assets/images/strata2.png" class="img-responsive" alt="" />
                <a
                  href="https://www.cnblogs.com/genghenggao/"
                  class="btn btn-primary"
                  target="_blank"
                  role="button"
                >
                  加入研究
                </a>
              </div></el-col
            >
            <el-col :xl="6">
              <div class="act_five_content">
                <img
                  src="@/assets/images/Hydrological2.png"
                  class="img-responsive"
                  alt=""
                />
                <a
                  href="https://www.cnblogs.com/genghenggao/"
                  class="btn btn-primary"
                  target="_blank"
                  role="button"
                >
                  加入研究
                </a>
              </div></el-col
            >
            <el-col :xl="6">
              <div class="act_five_content">
                <img
                  src="@/assets/images/Hydrological1.png"
                  class="img-responsive"
                  alt=""
                />
                <a
                  href="https://www.cnblogs.com/genghenggao/"
                  class="btn btn-primary"
                  target="_blank"
                  role="button"
                >
                  加入研究
                </a>
              </div></el-col
            >
          </el-row>
        </el-container>
        <el-container class="act_six wow fadeInUp" data-wow-duration="0.5s">
          <el-row :gutter="120" style="margin-right: auto; margin-left: auto; width: 60%">
            <el-col :xl="12" class="act_six_tips">
              <h2>CMLakeHouse移动App下载</h2>
              <p>
                CMLakeHouse,一种基于MongoDB的地学数据存储管理系统，
                使用MongoDB作为数据库，很好的用于解决地学数据的结构化、半结构化和非结构化数据存储问题。
                该系统就有高度的安全性、可扩展性、并行性，实现数据的快速存储、查找，
                作为一种工具为地质工作者提供很好的服务。
              </p>
              <el-button type="primary" plain
                ><i class="el-icon-download"></i> iPhone版</el-button
              >
              <el-button type="primary" plain
                ><i class="el-icon-download"></i> Android版</el-button
              >
            </el-col>
            <el-col :xl="12" style="padding-left: 0; paddding-right: 0">
              <img src="@/assets/images/diqiuapp.png" class="img-responsive" alt="" />
            </el-col>
          </el-row>
        </el-container>
        <div class="bgcolor">
          <el-container class="act_seven">
            <el-row
              :gutter="120"
              style="margin-right: auto; margin-left: auto; width: 60%"
            >
              <el-col :xl="12" class="form_link wow fadeInLeft"
                ><h2>
                  <i class="el-icon-s-promotion"></i>
                  &nbsp; 联系我们
                </h2>
                <p>CMLakeHouse,一种基于MongoDB的地学数据存储管理系统。</p>
                <address>
                  <p>
                    <i class="bi bi-house"></i>
                    &nbsp; 地址：北京市海淀区学院路丁11号，中国矿业大学（北京）
                  </p>
                  <p>
                    <i class="bi bi-telephone-inbound"></i>
                    &nbsp; 联系电话：15518501828
                  </p>
                  <p>
                    <i class="bi bi-messenger"></i>
                    &nbsp; 邮箱：genghenggao@outlook.com
                  </p>
                </address>
              </el-col>
              <el-col :xl="12" class="form_content wow fadeInRight">
                <el-form>
                  <el-row :gutter="10">
                    <el-col :xl="12">
                      <el-input
                        type="text"
                        class="form-control"
                        placeholder="您的姓名"
                      ></el-input>
                    </el-col>
                    <el-col :xl="12">
                      <el-input
                        type="text"
                        class="form-control"
                        placeholder="您的邮箱"
                      ></el-input>
                    </el-col>
                    <el-col :xl="24">
                      <el-input
                        type="text"
                        class="form-control"
                        placeholder="标题"
                      ></el-input>
                    </el-col>
                    <el-col :xl="24">
                      <el-input
                        type="textarea"
                        class="form-control_textare"
                        placeholder="留言内容"
                      ></el-input>
                    </el-col>
                    <el-col :xl="24">
                      <el-button
                        type="primary"
                        plain
                        class="form-control"
                        @click="onSubmit"
                        >提交</el-button
                      >
                    </el-col>
                  </el-row>
                </el-form></el-col
              >
            </el-row>
          </el-container>
        </div>

        <CMFooter />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import "animate.css";
import "animate.css/animate.compat.css";
import { WOW } from "wowjs";
import CMHeader from "@/components/CMHeader.vue";
import CMFooter from "@/components/CMFooter.vue";
import InfoFlowMap from "@/components/aboutus/InfoFlowMap.vue";
export default {
  name: "CMLakeHouseHome",
  components: {
    CMHeader,
    CMFooter,
    InfoFlowMap,
  },
  data() {
    return {
      // 图片地址数组
      img_list: [
        {
          id: 1,
          url: require("@/assets/images/yanshitu.jpg"),
          // content: "研究一",
        },
        {
          id: 2,
          url: require("@/assets/images/中秋.jpg"),
          // content: "研究二"
        },
        {
          id: 3,
          url: require("@/assets/images/教师节.png"),
          // content: "研究三",
        },
      ],
      // // 图片父容器高度
      bannerHeight: 316,
      // // 浏览器宽度
      // screenWidth: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      new WOW().init();
    });
  },
  methods: {
    onSubmit() {
      console.log("Hello");
    },
    setSize: function () {
      // 通过浏览器宽度(图片宽度)计算高度
      this.bannerHeight = (365 / 1920) * this.screenWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
// 导航栏设置
::v-deep .sticky-top {
  position: fixed;
  top: 0;
  width: 100%;
}

.act_one {
  // margin-top: 70px;
  background: url("@/assets/images/home-bg.jpg");
  background-size: cover;

  width: 100%;
  // padding: 0;
  // color: #ffffff;
  color: #212529a6;
  text-align: center;
}
.act_one h1 {
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 25px;
}
// 图片自适应
.act_one p {
  line-height: 35px;
}

// 轮播
// .el-carousel__item h3 {
//   color: #475669;
//   font-size: 14px;
//   opacity: 0.75;
//   line-height: 200px;
//   margin: 0;
// }

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.act_one img {
  width: 100%;
  height: 100%;
  // height: inherit;
  filter: brightness(50%); //设置图片对比度
}
.act_one h3 {
  color: #fff;
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: 10%;
}

.act_one_extra {
  // margin-top: 70px;
  // background: url("@/assets/images/home-bg.jpg");
  background-size: cover;

  width: 100%;
  // padding: 0;
  // color: #582b2b;
  text-align: center;
}
.act_one_extra h1 {
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 25px;
}
// 图片自适应
.act_one_extra p {
  line-height: 35px;
}
.act_one_extra .extra_map {
  width: 100%;
  // width: 1000px;
  height: 100%;
}
.act_two {
  // padding: 20px 30px 50px 380px;
  padding-top: 20px;
  color: #ffffff;
}
.act_two h3 {
  font-weight: bold;
  color: #030303;
}
.act_two p {
  color: #000000;
}
.act_three {
  // padding: 20px 30px 50px 380px;
  // padding: 80px 0 0 400px;
  background: #f8f8f8;
  padding-top: 100px;
}

.act_three_tips {
  // color: #810000;
  text-align: left;
}
.act_three_tips h2 {
  font-weight: bold;
}

.act_four {
  // padding: 20px 30px 50px 380px;
  // padding: 80px 0 0 400px;
  padding-top: 80px;
  background: #f8f8f8;
}

.act_four_tips {
  text-align: left;
}
.act_four_tips h2 {
  font-weight: bold;
}
.act_five {
  background: #f8f8f8;
  // padding: 80px 0;
  // padding: 80px 380px 0 350px;
  padding-top: 80px;
  text-align: center;
}

.act_five h2 {
  font-weight: bold;
  padding-bottom: 60px;
}

.act_five_content {
  margin-bottom: 20px;
  background: #ffffff;
}

.act_five_content .btn {
  background: transparent;
  border: 1px solid rgba(8, 187, 241, 0.993);
  border-radius: 0px;
  color: rgba(8, 187, 241, 0.993);
  margin-top: 20px;
  margin-bottom: 30px;
  padding: 8px 40px;
  transition: all 0.3s;
}

.act_five_content .btn:hover {
  background: rgba(8, 187, 241, 0.993);
  color: #fff;
}

.act_five_content img.img-responsive {
  width: 274px;
  height: 180px;
}

.act_six {
  background: #f8f8f8;
  // padding: 80px 0;
  // padding: 80px 350px 80px 400px;
  padding-top: 80px;
  padding-bottom: 80px;
  text-align: center;
}
.act_six h2 {
  font-weight: bold;
}
.act_six_tips {
  text-align: left;
}

.bgcolor {
  width: 100%;
  height: 100%;
  background: url("@/assets/images/address.png") no-repeat;
  // padding: 90px 0;
  // opacity: 0.8;
}
.act_seven {
  padding-top: 60px;
  padding-bottom: 60px;
  // padding-left: 150px;
  // padding: 80px 400px 80px 400px;
  background-color: rgba(5, 5, 19, 0.671);

  background-size: cover;
  color: #ffffff;
  text-align: left;
}
.act_seven h2 {
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 25px;
}
.act_seven p {
  line-height: 25px;
  margin-bottom: 20px;
}
.act_seven textarea.el-textarea__inner {
  height: 100px;
}
::v-deep .act_seven input.el-input__inner {
  border: 0;
}
::v-deep .act_seven .form-control {
  border: none;
  border-radius: 0;
  height: 50px;
  margin-bottom: 20px;
}
::v-deep .act_seven .form-control_textare {
  border: none;
  border-radius: 0;
  margin-bottom: 20px;
  height: 100px;
}
.el-input {
  padding: 0px;
  border-radius: 0px;
}
a {
  text-decoration: none;
}
</style>
