/*
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-19 22:54:56
 * @LastEditors: henggao
 * @LastEditTime: 2023-11-02 10:55:14
 */

import('loadtest').then((loadtest) => {
  // 使用 loadtest 进行测试
  const options = {

    // Python API
    // url: 'http://192.168.92.159:8000/api/chunkdata/653629c89623264d658816de/', // 替换为您的Django API URL   1
    // url: 'http://192.168.92.159:8000/api/chunkdata/6530851fd67374b6fef700fa/', // 100
    // url: 'http://192.168.92.159:8000/api/chunkdata/6536329aa22e739269306632/', // 1000
    // url: 'http://192.168.92.159:8000/api/chunkdata/6536605d599357e5886a740d/', // 10000

    // Java API
    url: 'http://localhost:8081/chunkdata/getListByFileId?fileId=6542f7a238091a70dc4c41d4', // 100
    // url: 'http://localhost:8081/chunkdata/getListByFileId?fileId=6542ffd83a644ca8db417cd1', // 1000
    // url: 'http://localhost:8081/chunkdata/getListByFileId?fileId=6542ffd83a644ca8db417cd1', // 1000
    // url: 'http://localhost:8081/chunkdata/getListByFileId?fileId=6542ffe5c456f7e1cccaa6d0', // 10000

    // Java API 分页
    // url: 'http://localhost:8081/chunkdata/getPageByFileId?fileId=6542ffe5c456f7e1cccaa6d0', // 10000



    maxRequests: 10, // 替换为您希望执行的最大请求数
    concurrency: 10, // 并发用户数
    method: 'GET',
  };

  (async () => {
    try {
      const loadtestModule = await import('loadtest');
      const { loadTest } = loadtestModule;

      loadTest(options, (error, result) => {
        if (error) {
          return console.error('测试失败:', error);
        }
        // console.log('测试完成:', result);
        console.log('测试完成:', result.meanLatencyMs / 1000, result.maxLatencyMs / 1000, result.rps, result.totalTimeSeconds);
      });
    } catch (error) {
      console.error('导入loadtest时出错:', error);
    }
  })();
}).catch((error) => {
  console.error('Failed to import loadtest:', error);
});



