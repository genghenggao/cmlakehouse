<!--
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-18 10:23:41
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-19 19:40:15
-->
<template>
  <div>
    <button @click="downloadData">下载数据</button>
    <ul>
      <li v-for="item in chunkData" :key="item._id">
        {{ item.n }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, toRefs, computed } from "vue";
import axios from "axios";

// 响应式数据
const chunkData = ref([]);

// 异步方法获取数据
const fetchChunkData = async () => {
  try {
    const response = await axios.get("/api/chunkdata/");
    console.log(response);

    chunkData.value = response.data;
    // 按照n字段进行排序
    chunkData.value.sort((a, b) => a.n - b.n);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

// 下载SEGY文件
// 下载数据
const downloadData = () => {
  // 创建一个 Blob 对象，将二进制数据转换为文件
  const data = chunkData.value.map((item) => item.data);
  const blob = new Blob(data, { type: "application/octet-stream" });
  console.log(blob);
  
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "demo1018.segy";
  a.click();
  window.URL.revokeObjectURL(url);
};
// 页面加载时获取数据
onMounted(() => {
  fetchChunkData();
});
</script>
