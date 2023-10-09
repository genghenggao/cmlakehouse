<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-10-05 22:00:10
 * @LastEditors: henggao
 * @LastEditTime: 2021-10-05 23:15:32
-->
<template>
  <div class="home">
    <div class="home-title">
      <el-card shadow="always">
        <div class="title-msg">工作台</div>
        <el-row>
          <el-col :span="1" :offset="1" :xs="4" :sm="4" :md="4" :lg="4" :xl="2">
            <el-avatar :size="60" :src="avatar"></el-avatar>
          </el-col>
          <el-col
            :span="5"
            :offset="0"
            :xs="10"
            :sm="10"
            :md="10"
            :lg="10"
            :xl="11"
          >
            <div class="greetings">欢迎访问,祝您新的一天工作愉快！</div>
            <div class="weather">今天小雨转阴天,11~20°,天凉,注意加衣</div>
          </el-col>
          <el-col
            :span="6"
            :offset="1"
            :xs="10"
            :sm="10"
            :md="10"
            :lg="11"
            :xl="1"
          >
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
  </div>
</template>
<script lang='ts'>
import { onMounted, reactive, toRefs } from "vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const state = reactive({
      avatar: require("@/assets/logo.png"), //require需要安装npm i --save-dev @types/node
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss">
.home-title {
  .title-msg {
    font-size: 20px;
    padding-bottom: 2rem;
  }
}
</style>