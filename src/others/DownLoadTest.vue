<template>
  <div>
    <h1>SEGY File Downloader</h1>
    <button @click="downloadSEGY">Download SEGY</button>
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
const downloadSEGY = () => {
  const segyData = generateSEGY(chunkData.value);
  downloadFile(segyData, "demo1018.segy");
};

// 生成SEGY文件
const generateSEGY = (data) => {
  // 实现生成SEGY文件的逻辑，根据你的数据和SEGY格式
  // 返回生成的SEGY二进制数据
  // 这里你需要编写生成SEGY文件的代码
};

// 下载文件
const downloadFile = (data, fileName) => {
  const blob = new Blob([data], { type: "application/octet-stream" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

// 页面加载时获取数据
onMounted(() => {
  fetchChunkData();
});
</script>
