<template>
    <!-- <div class="col-md-12" id="second-list"> -->
    <div class="col-md-12 scrolltable" id="second-list">
      <ul class="list" id="comment1">
        <li>
          <a href="#">世界防治荒漠化和干旱日</a>
          <span>2021.10.07</span>
        </li>
        <li>
          <a href="#">世界防治荒漠化和干旱日</a>
          <span>2021.10.07</span>
        </li>
        <li>
          <a href="#">世界防治荒漠化和干旱日阿斯顿撒大苏打实打实的大大大飒飒的</a>
          <span>2021.10.07</span>
        </li>
        <li>
          <a href="#">世界防治荒漠化和干旱日阿斯顿撒大苏打实打实的大大大飒飒的</a>
          <span>2021.10.07</span>
        </li>
        <li>
          <a href="#">世界防治荒漠化和干旱日阿斯顿撒大苏打实打实的大大大飒飒的</a>
          <span>2021.10.07</span>
        </li>
        <li>
          <a href="#">世界防治荒漠化和干旱日阿斯顿撒大苏打实打实的大大大飒飒的</a>
          <span>2021.10.07</span>
        </li>
      </ul>
      <ul id="comment2"></ul>
    </div>
  </template>
  <script lang='ts'>
  import { defineComponent, onMounted, reactive, toRefs } from "vue";
  export default defineComponent({
    name: "ScrollTable",
    setup() {
      onMounted(() => {
        // 列表滚动
        roll(50);
      });
      const state = reactive({
        imglist: [
          { url: require("@/assets/images/8970adb0170b302d3580b2447ec5389.png") },
          {
            url: require("../assets/images/d726404a9919aafc008ed129bf15277.jpg"),
          },
        ],
      });
  
      // 列表滚动
      const roll = (t: any) => {
        let ul1: any = document.getElementById("comment1");
        let ul2: any = document.getElementById("comment2");
        var ulbox: any = document.getElementsByClassName("scrolltable");
  
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
  <style scoped lang='scss'>
  #second-list {
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
    height: 300px; /* 必须 */
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
  </style>