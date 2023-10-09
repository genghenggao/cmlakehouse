<template>
  <div>
    <CMHeader />
  </div>
  <div id="cesiumContainer"></div>
  <div class="mainContent">
    <div class="container-button">
      <button type="button" class="btn btn-home"></button>
    </div>
    <div class="container-button">
      <button type="button" class="btn btn-earth"></button>
    </div>
    <div class="container-button">
      <button type="button" class="btn btn-layer"></button>
    </div>
    <div class="container-button">
      <button type="button" class="btn btn-zoomin"></button>
    </div>
    <div class="container-button">
      <button type="button" class="btn btn-zoomout"></button>
    </div>
    <div class="container-button">
      <button type="button" class="btn btn-grid"></button>
    </div>

    <div class="container-button">
      <button type="button" class="btn btn-fullscreen"></button>
    </div>
    <div class="container-button">
      <!-- <button class="btn btn-grid" type="button" @click=""></button> -->
      <h1 class="animate__animated animate__bounce">An animated element</h1>
    </div>
  </div>
  <div
    id="gridcontent"
    style="
      position: absolute;
      bottom: 50px;
      left: 60px;
      display: none;
      color: #fff;
      background-color: #235ea73d;
      border: 1px solid #235fa7;
    "
  >
    <div class="container-button">
      <button type="button" class="btn btn-grid"></button>
    </div>
  </div>

  <div class="function_box2">
    <!-- <dv-border-box-8> -->
    <p>
      <button
        class="btn btn-primary"
        type="button"
        @click="addmodel"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Expore
      </button>
    </p>
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        Some placeholder content for the collapse component. This panel is hidden by
        default but revealed when the user activates the relevant trigger.
        <button class="btn btn-primary1" type="button" @click="addmatrix"></button>
        <button class="btn btn-primary" type="button" @click="addmatrix1">Button1</button>
        <button class="btn btn-primary" type="button" @click="convert2Dto3D">
          Button1
        </button>
        <button class="btn btn-primary" type="button" @click="homeButton">Home</button>
        <button class="btn btn-primary" type="button" @click="homeButton1">Home1</button>
        <button class="btn btn-primary" type="button" @click="homeButton2">Home2</button>
        <button class="btn btn-primary" type="button" @click="homeButton3">Home3</button>
        <div class="multiple_search" id="multiple_search">
          <input
            type="text"
            class="search_input"
            id="search-input"
            v-model="search_input"
            placeholder="请输入地名"
          />
          <button
            class="search_button"
            id="search-button"
            @click="searchPosition"
          ></button>
        </div>
      </div>
    </div>

    <!-- </dv-border-box-8> -->
  </div>
</template>

<script lang="ts">
import CMHeader from "@/components/CMHeader.vue";
import {
  defineComponent,
  inject,
  onMounted,
  getCurrentInstance,
  reactive,
  toRefs,
} from "vue";
import * as echarts from "echarts";
import "animate.css";

export default defineComponent({
  name: "CMGeophysicsplatform",
  components: {
    CMHeader,
  },
  setup() {
    let { proxy }: any = getCurrentInstance();
    let Cesium: any = inject("$Cesium");
    onMounted(() => {
      // 初始化Cesium
      initCesium();
      // 初始化echarts
      initechartsdemo();
    });
    const state = reactive({
      isAddLayer: "isClose",
      search_input: "",
      show: true,
    });

    const initCesium = () => {
      proxy.viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false, //是否创建动画小器件，左下角仪表
        timeline: false, //是否显示时间轴
        fullscreenButton: false, //是否显示全屏按钮
        imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
          url:
            "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
        }),
        sceneMode: Cesium.SceneMode.SCENE3D, //初始场景模式
        //图层选择器
        baseLayerPicker: false,
        navigationHelpButton: false, //是否显示右上角的帮助按钮
        //获取或设置可用于图像选择的ProviderViewModel实例数组。
        // imageryProviderViewModels: getImageryProviderArr(),
        //获取或设置可用于地形选择的ProviderViewModel实例数组。
        // terrainProviderViewModels: getTerrainProviderViewModelsArr(),
      });
      proxy.viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏cesium ion
      // console.info(viewer);
      new Cesium.ScreenSpaceEventHandler(proxy.viewer.scene.canvas).setInputAction(
        (movement: any) => {
          console.log("屏幕坐标:", movement);
        },
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      );

      var handler3D = new Cesium.ScreenSpaceEventHandler(proxy.viewer.scene.canvas);
      handler3D.setInputAction(function (event: any) {
        var pick = proxy.viewer.scene.pick(event.position);
        console.log(pick);
        console.log("点击位置（屏幕坐标）" + event.position); //movement.position，屏幕坐标
        var position = proxy.viewer.scene.pickPosition(event.position);
        console.log("点击位置笛卡尔" + position);
        var cartographicnew = Cesium.Cartographic.fromCartesian(position);
        console.log("点击位置弧度" + cartographicnew);
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");

        // 获取经纬度
        var earthPosition = proxy.viewer.camera.pickEllipsoid(
          event.position,
          proxy.viewer.scene.globe.ellipsoid
        ); //视角穿过球面点的位置
        var cartographic = Cesium.Cartographic.fromCartesian(
          earthPosition,
          proxy.viewer.scene.globe.ellipsoid,
          new Cesium.Cartographic()
        );
        console.log("视角中心笛卡尔" + earthPosition);
        console.log("视角中心弧度" + cartographic);
        var lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
        var lng = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
        // var height=cartographic.height.toFixed(2);
        var height = (proxy.viewer.camera.positionCartographic.height / 1000).toFixed(2);
        console.log("---------------------------------------------------------------");

        // 创建气泡窗体
        var info = `经度：${lng} </br>
                        纬度：${lat} </br>
                        高度：${height}
            `;
        $("#infoboxx").empty();
        $("#infoboxx").append(info);
        $("#infoboxx").show();

        // 气泡位置
        var winpos = proxy.viewer.scene.cartesianToCanvasCoordinates(earthPosition); //屏幕坐标
        console.log("屏幕坐标1:" + winpos);
        let bubble: any = document.getElementById("infoboxx");
        bubble.style.left = winpos.x + 20 + "px";
        bubble.style.top = winpos.y + 50 + "px";

        // 气泡位置2
        var obj = { position: event.position };
        let c: any = new Cesium.Cartesian2(obj.position.x, obj.position.y);
        console.log("屏幕坐标2:" + c);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      //结束查询
      handler3D.setInputAction(function (movement: any) {
        handler3D = handler3D.destroy(); // 销毁整个鼠标事件
        $("#infoboxx").hide();
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    };
    const getImageryProviderArr = () => {
      return [
        new Cesium.ProviderViewModel({
          //图层的名称。
          name: "图层一",
          //显示项目被隐藏的工具提示
          tooltip: "图层一",
          //代表图层的图标
          iconUrl: "img/1.jpg",
          //一个函数或命令，用于创建一个或多个提供程序，这些提供程序将在选择此项目时添加到地球仪中。
          creationFunction: function () {
            return new Cesium.ArcGisMapServerImageryProvider({
              url:
                "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
            });
          },
        }),
        new Cesium.ProviderViewModel({
          //图层的名称
          name: "图层二",
          //显示项目被隐藏的工具提示
          tooltip: "图层二",
          //代表图层的图标
          iconUrl: "img/2.jpg",
          //一个函数或命令，用于创建一个或多个提供程序，这些提供程序将在选择此项目时添加到地球仪中
          creationFunction: function () {
            return new Cesium.ArcGisMapServerImageryProvider({
              url:
                "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
            });
          },
        }),
      ];
    };
    const getTerrainProviderViewModelsArr = () => {
      console.log("展开");
    };
    const addmodel = () => {
      console.log("展开");
    };

    const addmatrix = () => {
      if (state.isAddLayer == "isClose") {
        console.log(state.isAddLayer);
        state.isAddLayer = "isOpen";
        proxy.wyoming = proxy.viewer.entities.add({
          //添加一个实体，仅需要传递一个简单JSON对象，返回值是一个Entity对象
          name: "Wyoming",
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray([
              //一组地理坐标
              -109.080842,
              45.002073,
              -105.91517,
              45.002073,
              -104.058488,
              44.996596,
              -104.053011,
              43.002989,
              -104.053011,
              41.003906,
              -105.728954,
              40.998429,
              -107.919731,
              41.003906,
              -109.04798,
              40.998429,
              -111.047063,
              40.998429,
              -111.047063,
              42.000709,
              -111.047063,
              44.476286,
              -111.05254,
              45.002073,
            ]),
            material: Cesium.Color.RED.withAlpha(0.5), //材质
            outline: true, //是否显示轮廓
            outlineColor: Cesium.Color.BLACK, //轮廓的颜色
          },
        });
        proxy.viewer.zoomTo(proxy.wyoming); //缩放、平移视图使实体可见
      } else {
        console.log(state.isAddLayer);
        state.isAddLayer = "isClose";
        proxy.viewer.entities.remove(proxy.wyoming);
      }
    };

    const searchPosition = () => {
      let place = state.search_input;
      if (place === "") {
        alert("请输入位置！");
      } else {
        $.ajax({
          url: `http://api.tianditu.gov.cn/geocoder?ds={"keyWord":"${place}"}&tk=9c117468801c8405aaddff93da98c1e6`,
          type: "get",
          async: false,
          success: function (response: any) {
            let result = JSON.parse(response).location;
            if (result === undefined) {
              alert("无法获取" + place + "地理位置！");
            } else {
              proxy.viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(result.lon, result.lat, 40000),
                duration: 0,
              });
            }
          },
        });
      }
    };
    const addmatrix1 = () => {
      //浮空的绿色圆形
      var greenCircle = proxy.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-111.0, 40.0, 150000.0),
        name: "Green circle at height",
        ellipse: {
          semiMinorAxis: 300000.0,
          semiMajorAxis: 300000.0,
          height: 200000.0, //浮空
          material: Cesium.Color.GREEN,
        },
      });
      //红色椭圆形，位于地表，带轮廓
      var redEllipse = proxy.viewer.entities.add({
        //不带高度
        position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
        name: "Red ellipse on surface with outline",
        ellipse: {
          semiMinorAxis: 250000.0,
          semiMajorAxis: 400000.0,
          material: Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.RED,
        },
      });
      //蓝色椭圆柱，旋转了角度
      var blueEllipse = proxy.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-95.0, 40.0, 100000.0),
        name: "Blue translucent, rotated, and extruded ellipse",
        ellipse: {
          semiMinorAxis: 150000.0,
          semiMajorAxis: 300000.0,
          extrudedHeight: 200000.0, //拉伸
          rotation: Cesium.Math.toRadians(45), //旋转
          material: Cesium.Color.BLUE.withAlpha(0.7),
          outline: true,
        },
      });

      proxy.viewer.zoomTo(proxy.viewer.entities);
    };
    const convert2Dto3D = () => {
      // proxy.viewer.scene.morphTo2D(1) //二维
      proxy.viewer.scene.morphTo3D(1); //三维
      // proxy.viewer.scene.morphToColumbusView(1);//哥伦布视图
    };

    const homeButton3 = (type: any) => {
      proxy.viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url:
            "http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
          tilingScheme: new Cesium.WebMercatorTilingScheme(),
        })
      );
    };

    const homeButton2 = () => {
      proxy.viewer.camera.setView({
        // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
        // fromDegrees()方法，将经纬度和高程转换为世界坐标
        destination: Cesium.Cartesian3.fromDegrees(112.962475, 28.195802, 1500),
        orientation: {
          // 指向
          heading: 6.283185307179581,
          // 视角
          pitch: -1.5688168484696687,
          roll: 0.0,
        },
      });
    };

    const homeButton1 = () => {
      console.log("wwwwwwwww");

      Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
        110.15,
        34.54,
        110.25,
        34.56
      );
      proxy.viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (
        e: any
      ) {
        e.cancel = true;
        //你要飞的位置
        proxy.viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(117.16, 32.71, 15000.0),
        });
      });
    };
    const homeButton = () => {
      console.log("1234");

      // proxy.viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e: any) {
      //   e.cancel = true;
      //你要飞的位置
      proxy.viewer.camera.flyTo({
        destination: Cesium.Rectangle.fromDegrees(80, 22, 130, 55), // home定位到中国范围
      });
      // });
    };

    const initechartsdemo = () => {
      var chartDom = document.getElementById("echartdemo") as HTMLElement;
      var myChart = echarts.init(chartDom, "dark");
      var option;

      option = {
        title: [
          {
            text: "Tangential Polar Bar",
          },
        ],
        backgroundColor: "#235ea73d",
        polar: {
          radius: [30, "80%"],
        },
        angleAxis: {
          max: 4,
          startAngle: 75,
        },
        radiusAxis: {
          type: "category",
          data: ["a", "b", "c", "d"],
        },
        tooltip: {},
        series: {
          type: "bar",
          data: [2, 1.2, 2.4, 3.6],
          coordinateSystem: "polar",
          label: {
            show: true,
            position: "middle",
            formatter: "{b}: {c}",
          },
        },
      };

      option && myChart.setOption(option);
    };
    return {
      ...toRefs(state),
      initCesium,
      initechartsdemo,
      addmodel,
      addmatrix,
      addmatrix1,
      convert2Dto3D,
      homeButton,
      homeButton1,
      homeButton2,
      homeButton3,
      searchPosition,
      getImageryProviderArr,
      getTerrainProviderViewModelsArr,
    };
  },
});

function cancelGeocode(geocoder: any) {
  throw new Error("Function not implemented.");
}
function geocode(geocoder: any) {
  throw new Error("Function not implemented.");
}
</script>

<style scoped lang="scss">
#cesiumContainer {
  width: 100%;
  height: 910px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}

.grid-content {
  background: #235ea73d;
  border-radius: 4px;
  min-height: 200px;
}

// #gridcontent {
//   position: absolute;
//   bottom: 50px;
//   left: 30px;
//   display: none;
//   border: 2px solid #ff0000;
// }
.btn-grid-content {
  position: absolute;
  // width: 50px;
  bottom: 10px;
  left: 50px;

  color: rgb(255, 255, 255);
  background: #235ea73d;
  border: 1px solid #235fa7;
}

.mainContent {
  position: absolute;
  bottom: 50px;
  left: 10px;
  color: #fff;

  // width: 100%;
  .container-button {
    margin: 10px;
    border: 0;
    padding: 0;
  }

  .btn-home {
    background: #235ea73d url(../../assets/images/homepage_fill.svg);
    background-size: cover;
    border-radius: 5px;
    height: 32px;
    width: 32px;
    // opacity: 0.6;
    background-size: cover;
    z-index: 6;
    cursor: pointer;
    // border: 1px solid #bfc6ce;
  }

  .btn-home:hover {
    opacity: 1;
    border-color: #235ea73d;
    // box-shadow: 0 0 5px #fff;
    background-color: #0864d4fa;
  }

  .btn-earth {
    background: #235ea73d url(../../assets/images/earth.svg);
    background-size: cover;
    border-radius: 5px;
    height: 32px;
    width: 32px;
    // opacity: 0.6;
    background-size: cover;
    z-index: 6;
    cursor: pointer;
    // border: 1px solid #bfc6ce;
  }

  .btn-earth:hover {
    opacity: 1;
    border-color: #235ea73d;
    // box-shadow: 0 0 5px #fff;
    background-color: #0864d4fa;
  }

  .btn-grid {
    background: #235ea73d url(../../assets/images/earthgrid.svg);
    background-size: cover;
    border-radius: 5px;
    height: 32px;
    width: 32px;
    // opacity: 0.6;
    background-size: cover;
    z-index: 6;
    cursor: pointer;
    // border: 1px solid #bfc6ce;
  }

  .btn-grid:hover {
    opacity: 1;
    border-color: #235ea73d;
    // box-shadow: 0 0 5px #fff;
    background-color: #0864d4fa;
  }

  .btn-fullscreen {
    background: #235ea73d url(../../assets/images/fullscreen.svg);
    background-size: cover;
    border-radius: 5px;
    height: 32px;
    width: 32px;
    // opacity: 0.6;
    background-size: cover;
    z-index: 6;
    cursor: pointer;
    background-color: #235ea73d;
    // border: 1px solid #bfc6ce;
  }

  .btn-fullscreen:hover {
    opacity: 1;
    border-color: #235ea73d;
    background-color: #0864d4fa;
    // box-shadow: 0 0 5px #fff;
  }

  .btn-layer {
    background: #235ea73d url(../../assets/images/layer.svg);
    background-size: cover;
    border-radius: 5px;
    height: 32px;
    width: 32px;
    // opacity: 0.6;
    background-size: cover;
    z-index: 6;
    cursor: pointer;
    background-color: #235ea73d;
    // border: 1px solid #bfc6ce;
  }

  .btn-layer:hover {
    opacity: 1;
    border-color: #235ea73d;
    background-color: #0864d4fa;
    // box-shadow: 0 0 5px #fff;
  }

  .btn-zoomin {
    background: #235ea73d url(../../assets/images/zoomin.svg);
    background-size: cover;
    border-radius: 5px;
    height: 32px;
    width: 32px;
    // opacity: 0.6;
    background-size: cover;
    z-index: 6;
    cursor: pointer;
    background-color: #235ea73d;
  }

  .btn-zoomin:hover {
    opacity: 1;
    border-color: #235ea73d;
    background-color: #0864d4fa;
    // box-shadow: 0 0 5px #fff;
  }

  .btn-zoomout {
    background: #235ea73d url(../../assets/images/zoomout.svg);
    background-size: cover;
    border-radius: 5px;
    height: 32px;
    width: 32px;
    // opacity: 0.6;
    background-size: cover;
    z-index: 6;
    cursor: pointer;
    background-color: #235ea73d;
    // border: 1px solid #bfc6ce;
  }

  .btn-zoomout:hover {
    opacity: 1;
    border-color: #235ea73d;
    background-color: #0864d4fa;
    // box-shadow: 0 0 5px #fff;
  }
}

.function_box1 {
  position: absolute;
  height: 450px;
  width: 400px;
  top: 120px;
  left: 20px;
  color: white;
  border: 1px solid #235fa7;
  background: #235ea73d;
  // opacity: 0.5;
  border-radius: 6px;

  #echartdemo {
    height: 92%;
    // width: 100%;
    // opacity: 0.5;
  }
}

.function_box2 {
  position: absolute;
  height: 450px;
  width: 400px;
  top: 120px;
  right: 20px;
  color: white;
  // border: 1px solid #235fa7;
  // background: #235ea73d;
  // opacity: 0.5;
  border-radius: 6px;

  // .dv-border-box-8 {
  //   height: 200px;
  //   width: 400px;
  // }
  .btn-primary1 {
    // color: rgb(41, 115, 158);
    background: #235ea73d url(../../assets/images/addLayer.svg);
    background-size: cover;
    border-radius: 5px;
    height: 32px;
    width: 32px;
    opacity: 0.6;
    background-size: cover;
    z-index: 6;
    cursor: pointer;
  }

  .btn-primary1:hover {
    opacity: 1;
    border-color: #235ea73d;
    box-shadow: 0 0 5px #fff;
  }

  .multiple_search {
    height: 32px;
    width: 290px;
    // position: absolute;
    top: 8px;
    right: 85px;
    overflow: hidden;
  }

  .multiple_search .search_input {
    border-radius: 5px;
    height: 30px;
    width: 158px;
    border: 1px solid #303336;
    background-color: rgba(48, 51, 54, 0.5);
    font-size: 15px;
    position: absolute;
    top: 0;
    left: 238px;
    text-indent: 10px;
    padding: 0;
    color: #fff;
  }

  .multiple_search .search_input::-webkit-input-placeholder {
    /*Webkit browsers*/
    color: #fff;
  }

  .multiple_search .search_input:-moz-placeholder {
    /*Mozilla Firefox 4 to 8*/
    color: #fff;
  }

  .multiple_search .search_input::moz-placeholder {
    /*Mozilla Firefox 19+*/
    color: #fff;
  }

  .multiple_search .search_input:-ms-input-placeholder {
    /*Internet Explorer 10+*/
    color: #fff;
  }

  .multiple_search .search_input:focus {
    outline: none;
    border: 1px solid #303336;
    background-color: rgba(48, 51, 54, 0.5);
  }

  .multiple_search .search_button {
    border-radius: 5px;
    height: 32px;
    width: 32px;
    background: #303336 url(../../assets/images/serach.svg);
    border: 1px solid #303336;
    background-size: cover;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 999;
    cursor: pointer;
  }

  .multiple_search .search_button:hover {
    color: #fff;
    fill: #fff;
    background: #48b url(../../assets/images/serach.svg);
    background-size: cover;
    border-color: #aef;
    box-shadow: 0 0 8px #fff;
  }

  .card-body {
    color: rgb(255, 255, 255);
    background: #235ea73d;
    border: 1px solid #235fa7;
  }
}

// 动态条形
.beat {
  transform-origin: bottom; //将变换参考点设置成`<svg>元素`的底部
  animation: beat-scale 1.4s linear infinite;
}

@keyframes beat-scale {
  25% {
    transform: scaleY(0.3);
  }

  50% {
    transform: scaleY(1);
  }

  75% {
    transform: scaleY(0.3);
  }
}

.beat:nth-child(1) {
  animation-delay: 0.4s;
}

.beat:nth-child(2) {
  animation-delay: 0.2s;
}

// 动态条形结束
.collapse-horizontal1 {
  right: 20px;
  bottom: 20px;
  color: rgb(42, 148, 190);
}
</style>
