<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-10-12 20:21:01
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-09 09:23:01
-->
<template>
    <!-- 返回顶部 -->
    <el-backtop :bottom="100">
      <div class="totop">
        <i class="bi bi-capslock-fill"></i>
      </div>
    </el-backtop>
    <!-- 页脚 -->
    <div class="footer">
      <div class="container">
        <div class="row g-5">
          <div class="col-md-3">
            <img
              src="@/assets/images/logo-cumtb.png"
              alt=""
              style="width: 270px; height: 56px"
            />
          </div>
          <div class="col-md-3" id="logo-right">
            <img
              src="@/assets/images/logo-lab.png"
              alt=""
              style="width: 270px; height: 56px"
            />
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-6">
                <p>版权所有：中国矿业大学（北京）</p>
                <p>京公网安备：110402430067号ICP</p>
              </div>
              <div class="col-md-6">
                <p>备案：京ICP备05066826号</p>
                <p>学校地址：北京市海淀区学院路丁11号</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script lang='ts'>
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "CMFooter",
  });
  </script>
  <style scoped lang='scss'>
  // 页脚
  .footer {
    margin-top: 60px;
    // background: url("../assets/images/home-bg.jpg");
    background-color: #021236;
    width: 100%;
    .col-md-3 {
      height: 56px;
    }
    #logo-right {
      border-right: 1px solid rgb(216, 11, 11);
    }
    .col-md-6 {
      p {
        font-size: 14px;
        color: #ffffff;
      }
    }
  }
  .totop {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
  }
  .totop:hover {
    color: #0f4791c4;
  }
  </style>