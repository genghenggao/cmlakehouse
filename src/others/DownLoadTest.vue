<!--
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-18 10:23:41
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-18 10:40:59
-->
<template>
  <button @click="downloadData">下载数据</button>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    async downloadData() {
      try {
        const response = await axios.get("http://192.168.92.159:8000/api/chunk_data1/?ordering=n");
        const data = response.data.results.map((item) => item.data);

        // 将数据合并成一个文件
        const combinedData = new Blob(data, { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(combinedData);

        // 创建一个下载链接
        const a = document.createElement("a");
        a.href = url;
        a.download = "demo1018.segy";
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("下载数据时出错：", error);
      }
    },
  },
};
</script>
