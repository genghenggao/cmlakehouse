<!--
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2022-05-24 14:44:35
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-09 21:09:11
-->
<template>
  <div id="HeaderBar">
    <CMHeader />
  </div>
  <div id="mainContent">
    <div id="cesiumContainer"></div>
    <div id="toolBar">
      <div class="buttonIcon">
        <button type="button" class="btn btn-home" @click="homeChina"></button>
      </div>
      <div class="buttonIcon" id="baseMap">
        <div id="baseMapBtn">
          <button
            type="button"
            class="btn btn-earth"
            @click="baseMapFlag = !baseMapFlag"
          ></button>
        </div>
        <div id="baseMapInfo">
          <transition
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutLeft"
          >
            <div v-if="!baseMapFlag" class="baseMapChoose">
              <div class="container baseMapContent">
                <div class="row g-2" id="baseMap-grid">
                  <div class="col-4">
                    <a href="javascript:void(0);" @click="imageMap"
                      ><img src="@/assets/images/Map-GaoDe.png" alt=""
                    /></a>
                    <p>
                      <a href="javascript:void(0);" @click="imageMap">高德地图</a>
                    </p>
                  </div>
                  <div class="col-4">
                    <a href="javascript:void(0);" @click="ArcServerMap"
                      ><img src="@/assets/images/Map-ArcServer.png" alt=""
                    /></a>
                    <p>
                      <a href="javascript:void(0);" @click="ArcServerMap">ArcServer</a>
                    </p>
                  </div>
                  <div class="col-4">
                    <a href="javascript:void(0);" @click="BingMap"
                      ><img src="@/assets/images/Map-Bing.png" alt=""
                    /></a>
                    <p>
                      <a href="javascript:void(0);" @click="BingMap">Bing</a>
                    </p>
                  </div>
                  <div class="col-4">
                    <a href="javascript:void(0);" @click="openStreetMap"
                      ><img src="@/assets/images/Map-OpenStreet.png" alt=""
                    /></a>
                    <p>
                      <a href="javascript:void(0);" @click="openStreetMap">OpenStreet</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="buttonIcon" id="layerDetails">
        <button
          type="button"
          class="btn btn-layer"
          @click="layerInfoFlag = !layerInfoFlag"
        ></button>
        <div id="layerInfo">
          <transition
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutLeft"
          >
            <div v-if="!layerInfoFlag" class="layerInfoContainer">
              <div class="layerInfoContent">
                <el-tree
                  :data="data"
                  :props="defaultProps"
                  show-checkbox
                  @check-change="handleCheckChange"
                />
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="buttonIcon">
        <button type="button" class="btn btn-zoomin" @click="zoomin"></button>
      </div>
      <div class="buttonIcon">
        <button type="button" class="btn btn-zoomout" @click="zoomout"></button>
      </div>
      <div class="buttonIcon" id="switchView">
        <div id="gridTo2D">
          <button
            class="btn btn-grid1D"
            @click="switchViewFlag = !switchViewFlag"
            v-if="state.grid1DViewFlag"
          ></button>
          <button
            class="btn btn-grid2D"
            @click="switchViewFlag = !switchViewFlag"
            v-if="state.grid2DViewFlag"
          ></button>
          <button
            class="btn btn-grid3D"
            @click="switchViewFlag = !switchViewFlag"
            v-if="state.grid3DViewFlag"
          ></button>
        </div>
        <div id="gridTo3D">
          <transition
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutLeft"
          >
            <div v-if="!switchViewFlag" class="gridChoose">
              <button
                v-if="!state.grid3DViewFlag"
                type="button"
                id="btn-grid3D"
                class="btn btn-grid3D"
                @click="convert3D"
              ></button>
              <button
                v-if="!state.grid2DViewFlag"
                type="button"
                id="btn-grid2D"
                class="btn btn-grid2D"
                @click="convert2D"
              ></button>
              <button
                v-if="!state.grid1DViewFlag"
                type="button"
                id="btn-grid1D"
                class="btn btn-grid1D"
                @click="convert1D"
              ></button>
            </div>
          </transition>
        </div>
      </div>

      <div class="buttonIcon">
        <button
          id="btn-fullscreen"
          type="button"
          class="btn btn-fullscreen"
          @click="fullscreen"
        ></button>
      </div>
    </div>
    <div id="analybox" class="animate__animated animate__fadeIn">
      <div class="analybox_chose">
        <el-checkbox v-model="state.entityShow" @change="handleShow" label="是否挖地" />
        <el-checkbox v-model="checked4" label="是否外切割" />
        <el-checkbox v-model="state.inDept" @change="handleDepth" label="深度检测" />
        <!-- <el-checkbox-group v-model="checkList" @change="handleDepth">
          <el-checkbox label="Option A" />
          <el-checkbox label="Option B" />
          <el-checkbox label="Option C" />
        </el-checkbox-group> -->
      </div>
      <div class="excavation_depth">
        <span>开挖深度：</span>
        <el-input-number
          v-model="num"
          :min="1"
          :max="100"
          size="small"
          controls-position="right"
          @change="handleChange"
        /><span>（单位：米）</span>
      </div>
      <div class="analybox_btn">
        <el-button size="small" @click="addMatrix">添加矩阵</el-button>
        <el-button size="small" @click="addPolygon">添加多边形</el-button>
        <el-button size="small" @click="removeall">清除</el-button>
      </div>
    </div>
    <div id="footInfo">
      <p id="footContent">经度：{{ state.longitude }}°</p>
      <p id="footContent">纬度：{{ state.latitude }}°</p>
      <p id="footContent">视高：{{ state.height }}m</p>
      <p id="footContent">海拔：{{ state.altitude }}m</p>
      <p id="footContent">俯仰角：{{ state.pitch }}°</p>
      <p id="footContent1">方向：{{ state.heading }}</p>
      <p id="footContent1">层级：{{ state.zoom }}</p>
      <p id="footContent1">{{ state.fps }}</p>
      <p id="footContent1">{{ state.ms }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CMHeader from "@/components/CMHeader.vue";
import {
  inject,
  onMounted,
  getCurrentInstance,
  reactive,
  ref,
} from "vue";
import "animate.css";
import type Node from "element-plus/es/components/tree/src/model/node";
import CesiumNavigation from "cesium-navigation-es6";

let { proxy }: any = getCurrentInstance();
let Cesium: any = inject("$Cesium");
onMounted(() => {
  initCesium();
});

interface Tree {
  name: string;
}
const defaultProps = {
  children: "children",
  label: "label",
  disabled: "disabled",
};

const data = [
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 3,
        label: "Level two 2-1",
        children: [
          {
            id: 4,
            label: "Level three 3-1-1",
          },
          {
            id: 5,
            label: "Level three 3-1-2",
            disabled: true,
          },
        ],
      },
      {
        id: 2,
        label: "Level two 2-2",
        disabled: true,
        children: [
          {
            id: 6,
            label: "Level three 3-2-1",
          },
          {
            id: 7,
            label: "Level three 3-2-2",
            disabled: true,
          },
        ],
      },
    ],
  },
];
let baseMapFlag = ref<boolean>(true);
let layerInfoFlag = ref<boolean>(true);
let switchViewFlag = ref<boolean>(true);
const checkList = ref(["Option A", "Option B"]);
const checked4 = ref(true);
const num = ref(20);

const state = reactive({
  latitude: 0,
  longitude: 0,
  height: 0,
  pitch: "-1.57",
  heading: "6.28",
  altitude: 0.0,
  zoom: 0,
  fps: "60 FPS",
  ms: "16.98 MS",
  fullScreenFlag: true,
  browserHeight: 0,
  isShow: true,
  grid1DViewFlag: false,
  grid2DViewFlag: false,
  grid3DViewFlag: true,
  inDept: true,
  entityShow: true,
});

const handleCheckChange = (data: Tree, checked: boolean, indeterminate: boolean) => {
  console.log(data, checked, indeterminate);
};

const handleChange = (value: number) => {
  console.log(value);
};

const initCesium = () => {
  proxy.viewer = new Cesium.Viewer("cesiumContainer", {
    animation: false, //是否创建动画小器件，左下角仪表
    timeline: false, //是否显示时间轴
    fullscreenButton: false, //是否显示全屏按钮
    sceneMode: Cesium.SceneMode.SCENE3D, //初始场景模式
    //图层选择器
    // baseLayerPicker: true,
    baseLayerPicker: false,
    //获取或设置可用于图像选择的ProviderViewModel实例数组。
    // imageryProviderViewModels: getImageryProviderArr(),
    //获取或设置可用于地形选择的ProviderViewModel实例数组。
    // terrainProviderViewModels: getTerrainProviderViewModelsArr(),
  });
  proxy.viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏cesium ion
  // proxy.viewer.scene.globe.show = false; //隐藏地球
  proxy.viewer.scene.debugShowFramesPerSecond = true; // 获取帧数FPS
  //添加另外一个图层
  //加载影像底图
  var layer = new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t0.tianditu.gov.cn/img_w/wmts?tk=9c117468801c8405aaddff93da98c1e6",
    layer: "img",
    style: "default",
    tileMatrixSetID: "w",
    format: "tiles",
    maximumLevel: 18,
  });
  proxy.viewer.imageryLayers.addImageryProvider(layer);
  proxy.viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏cesium ion
  //加载影像注记
  var layer1 = new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t0.tianditu.gov.cn/cia_w/wmts?tk=9c117468801c8405aaddff93da98c1e6",
    layer: "cia",
    style: "default",
    tileMatrixSetID: "w",
    format: "tiles",
    maximumLevel: 18,
  });
  proxy.viewer.imageryLayers.addImageryProvider(layer1);

  // 罗盘控件
  proxy.options = {};
  // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和Cesium.Rectangle.
  proxy.options.defaultResetView = Cesium.Cartographic.fromDegrees(110, 30, 2000000);
  // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
  proxy.options.enableCompass = true;
  // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件 将不会添加到地图中。
  proxy.options.enableZoomControls = true;
  // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
  proxy.options.enableDistanceLegend = true;
  // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
  proxy.options.enableCompassOuterRing = true;

  new CesiumNavigation(proxy.viewer, proxy.options);

  //鼠标移动事件
  var handler = new Cesium.ScreenSpaceEventHandler(proxy.viewer.scene.canvas);
  const mouseOverHandler = function (movement: any) {
    let endPosition = movement.endPosition;
    var ellipsoid = proxy.viewer.scene.globe.ellipsoid;
    var cartesian = proxy.viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
    if (cartesian) {
      //将笛卡尔坐标转换为地理坐标
      var cartographic = ellipsoid.cartesianToCartographic(cartesian);
      //将弧度转为度的十进制度表示
      state.longitude = Cesium.Math.toDegrees(cartographic.longitude);
      state.latitude = Cesium.Math.toDegrees(cartographic.latitude);
      state.altitude = proxy.viewer.scene.globe.getHeight(cartographic);

      state.longitude = parseFloat(state.longitude.toFixed(6));
      state.latitude = parseFloat(state.latitude.toFixed(6));
      if (state.altitude) {
        state.altitude = parseFloat(state.altitude.toFixed(1));
      }
      //获取高度
      state.height = Math.ceil(proxy.viewer.camera.positionCartographic.height);

      const heightToZoom = (height) => {
        var A = 40487.57;
        var B = 0.00007096758;
        var C = 91610.74;
        var D = -40467.74;
        return Math.round(D + (A - D) / (1 + Math.pow(height / C, B)));
      };

      state.zoom = heightToZoom(state.height);
    }
    //俯仰角
    state.pitch = Number(proxy.viewer.camera.pitch).toFixed(2);
    //方向
    state.heading = Number(proxy.viewer.camera.heading).toFixed(2);
    //帧率显示
    let ms = document.getElementsByClassName("cesium-performanceDisplay-ms")[0].innerHTML;
    let fps = document.getElementsByClassName("cesium-performanceDisplay-fps")[0]
      .innerHTML;

    state.ms = ms;
    state.fps = fps;
  };
  handler.setInputAction(mouseOverHandler, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
};

const imageMap = () => {
  proxy.viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
      url:
        "http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
    })
  );
};
const ArcServerMap = () => {
  proxy.viewer.imageryLayers.addImageryProvider(
    new Cesium.ArcGisMapServerImageryProvider({
      // url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
      url:
        "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
    })
  );
};
const BingMap = () => {
  proxy.viewer.imageryLayers.addImageryProvider(
    new Cesium.BingMapsImageryProvider({
      url: "https://dev.virtualearth.net",
      key: "AmnEtdBgHGnGoDMJOCeMKDUX1ms5kgnUBZoMnJZjIV7YF5ClZ9mqxA42PYW_Mk8_",
      mapStyle: Cesium.BingMapsStyle.AERIAL,
    })
  );
};
const openStreetMap = () => {
  proxy.viewer.imageryLayers.addImageryProvider(
    new Cesium.OpenStreetMapImageryProvider({
      url: "https://a.tile.openstreetmap.org/",
    })
  );
};

const homeChina = () => {
  //你要飞的位置
  proxy.viewer.camera.flyTo({
    destination: Cesium.Rectangle.fromDegrees(80, 22, 130, 55), // home定位到中国范围
  });
};

const zoomin = () => {
  // 获取当前镜头位置的笛卡尔坐标
  let cameraPos = proxy.viewer.camera.position;
  // 获取当前坐标系标准
  let ellipsoid = proxy.viewer.scene.globe.ellipsoid;

  // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
  let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
  let lon = Cesium.Math.toDegrees(cartographic.longitude);
  let lat = Cesium.Math.toDegrees(cartographic.latitude);
  // 获取镜头的高度
  let height = cartographic.height;
  proxy.viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(lon, lat, height / 1.8),
    duration: 1.0,
  });
};
const zoomout = () => {
  // 获取当前镜头位置的笛卡尔坐标
  let cameraPos = proxy.viewer.camera.position;
  // 获取当前坐标系标准
  let ellipsoid = proxy.viewer.scene.globe.ellipsoid;

  // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
  let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
  let lon = Cesium.Math.toDegrees(cartographic.longitude);
  let lat = Cesium.Math.toDegrees(cartographic.latitude);
  // 获取镜头的高度
  let height = cartographic.height;
  proxy.viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(lon, lat, height * 1.2),
    duration: 1.0, //动画持续时间
  });
};

const convert1D = () => {
  proxy.viewer.scene.morphTo2D(1); //二维
  state.grid1DViewFlag = true;
  state.grid2DViewFlag = false;
  state.grid3DViewFlag = false;
};
const convert2D = () => {
  // proxy.viewer.scene.morphTo2D(1) //二维
  proxy.viewer.scene.morphToColumbusView(1); //哥伦布视图
  // document.getElementById("btn-grid")!.id = 'btn-fullscreen';
  state.grid1DViewFlag = false;
  state.grid2DViewFlag = true;
  state.grid3DViewFlag = false;
};
const convert3D = () => {
  proxy.viewer.scene.morphTo3D(1); //三维
  state.grid1DViewFlag = false;
  state.grid2DViewFlag = false;
  state.grid3DViewFlag = true;
};

const change = () => {
  state.isShow = !state.isShow;
};

const fullscreen = () => {
  // document.getElementById("btn-fullscreen")!.style.backgroundImage = "url('../../assets/images/earth.svg')";
  if (state.fullScreenFlag) {
    document.getElementById("btn-fullscreen")!.id = "btn-fullscreen-exit";
    state.fullScreenFlag = false;
    document.getElementById("cesiumContainer")!.style.height = "100%";
    Cesium.Fullscreen.requestFullscreen(document.getElementById("mainContent"));
    state.browserHeight = window.innerHeight;
  } else {
    document.getElementById("btn-fullscreen-exit")!.id = "btn-fullscreen";
    state.fullScreenFlag = true;
    document.getElementById("cesiumContainer")!.style.height =
      String(state.browserHeight - 57.59) + "px";
    Cesium.Fullscreen.exitFullscreen();
  }
};

// 添加矩形
const addMatrix = () => {
  proxy.viewer.scene.primitives.removeAll();
  var points = [
    Cesium.Cartesian3.fromDegrees(116.5, 40.8),
    Cesium.Cartesian3.fromDegrees(116.9, 40.8),
    Cesium.Cartesian3.fromDegrees(116.9, 41.5),
  ];
  // console.log(points);
  // let pointstest1 = [116.5, 40.8, 200, 116.9, 40.8, 200, 116.9, 41.5, 200]
  // var points = Cesium.Cartesian3.fromDegreesArrayHeights(pointstest1)

  var pointsLength = points.length;
  var clippingPlanes = []; // 存储ClippingPlane集合
  for (var i = 0; i < pointsLength; ++i) {
    var nextIndex = (i + 1) % pointsLength;
    var midpoint = Cesium.Cartesian3.add(
      points[i],
      points[nextIndex],
      new Cesium.Cartesian3()
    );
    midpoint = Cesium.Cartesian3.multiplyByScalar(midpoint, 0.5, midpoint);

    var up = Cesium.Cartesian3.normalize(midpoint, new Cesium.Cartesian3());
    var right = Cesium.Cartesian3.subtract(
      points[nextIndex],
      midpoint,
      new Cesium.Cartesian3()
    );
    right = Cesium.Cartesian3.normalize(right, right);

    var normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3());
    normal = Cesium.Cartesian3.normalize(normal, normal);

    var originCenteredPlane = new Cesium.Plane(normal, 0.0);
    var distance = Cesium.Plane.getPointDistance(originCenteredPlane, midpoint);

    clippingPlanes.push(new Cesium.ClippingPlane(normal, distance));
  }

  // 设置挖方多边形
  proxy.viewer.scene.globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
    planes: clippingPlanes,
    edgeWidth: 1.0,
    edgeColor: Cesium.Color.YELLOW,
  });

  //底图
  let pointstest = [
    116.5,
    40.8,
    -2000,
    116.9,
    40.8,
    -2000,
    116.9,
    41.5,
    -2000,
    116.5,
    40.8,
    -2000,
  ];
  var polygon = new Cesium.PolygonGeometry({
    polygonHierarchy: new Cesium.PolygonHierarchy(
      Cesium.Cartesian3.fromDegreesArrayHeights(pointstest)
    ),
    perPositionHeight: true,
  });

  const geometry = Cesium.PolygonGeometry.createGeometry(polygon);

  const material = new Cesium.Material({
    fabric: {
      type: "Image",
      uniforms: {
        // image: '../../assets/images/image-list1.jpg'
        image: require("@/assets/images/image-list1.jpg"),
      },
    },
  });
  const appearance = new Cesium.MaterialAppearance({
    translucent: false,
    flat: true,
    material: material,
  });
  console.log(proxy.wellBotom);

  proxy.wellBotom = new Cesium.Primitive({
    geometryInstances: new Cesium.GeometryInstance({
      geometry: geometry,
    }),
    appearance: appearance,
    asynchronous: false,
  });
  proxy.viewer.scene.primitives.add(proxy.wellBotom);

  //墙壁贴图
  let maxHeights = [4145766.089272708, 4145766.089272708, 4204304.782364098];
  let minHeights = [4144328.56394393, 4144328.56394393, 4202847.018258024];
  // console.log(Cesium.Cartesian3.fromDegreesArrayHeights(points)[0].z);
  // console.log(Cesium.Cartesian3.fromDegreesArrayHeights(pointstest)[0].z);
  // console.log(Cesium.Cartesian3.fromDegreesArrayHeights(pointstest)[1].z);
  // console.log(Cesium.Cartesian3.fromDegreesArrayHeights(pointstest)[2].z);
  let wall = new Cesium.WallGeometry({
    // positions: Cesium.Cartesian3.fromDegreesArrayHeights(points),
    positions: Cesium.Cartesian3.fromDegreesArrayHeights(pointstest),
    // maximumHeights: maxHeights,
    // minimumHeights: minHeights,
    // vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
  });
  let geometry1 = Cesium.WallGeometry.createGeometry(wall);
  var material1 = new Cesium.Material({
      fabric: {
        type: "Image",
        uniforms: {
          image: require("@/assets/images/LX_SEGY001.jpg"),
        },
      },
    }),
    appearance1 = new Cesium.MaterialAppearance({
      translucent: false,
      flat: true,
      material: material1,
    });
  (proxy.wellWall = new Cesium.Primitive({
    geometryInstances: new Cesium.GeometryInstance({
      geometry: geometry1,
      attributes: {
        // color: new Cesium.ColorGeometryInstanceAttribute(0.1, 0.1, 0.1, 0.1)
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.GREY),
      },
      id: "PitWall",
    }),
    appearance: appearance1,
    asynchronous: !1,
  })),
    proxy.viewer.scene.primitives.add(proxy.wellWall);

  var regionlist = [
    113.0395,
    26.5239,
    113.0395,
    26.5229,
    113.0395,
    26.5169,
    113.0395,
    26.5129,
    113.0325,
    26.5108,
    113.0284,
    26.5108,
    113.0284,
    26.5239,
    113.0395,
    26.5239,
  ];

  // var positions = Cesium.Cartesian3.fromDegreesArray(regionlist);
  var maximumHeights = new Array(regionlist.length).fill(0);
  var minimumHeights = new Array(regionlist.length).fill(-600);
  // console.log(maximumHeights);
  // console.log(minimumHeights);
};

//多边形
const addPolygon = () => {
  var points = [
    Cesium.Cartesian3.fromDegrees(116.5, 40.8),
    Cesium.Cartesian3.fromDegrees(116.9, 40.8),
    Cesium.Cartesian3.fromDegrees(116.9, 41.5),
  ];
  var pointsLength = points.length;
  var clippingPlanes = []; // 存储ClippingPlane集合
  for (var i = 0; i < pointsLength; ++i) {
    var nextIndex = (i + 1) % pointsLength;
    var midpoint = Cesium.Cartesian3.add(
      points[i],
      points[nextIndex],
      new Cesium.Cartesian3()
    );
    midpoint = Cesium.Cartesian3.multiplyByScalar(midpoint, 0.5, midpoint);

    var up = Cesium.Cartesian3.normalize(midpoint, new Cesium.Cartesian3());
    var right = Cesium.Cartesian3.subtract(
      points[nextIndex],
      midpoint,
      new Cesium.Cartesian3()
    );
    right = Cesium.Cartesian3.normalize(right, right);

    var normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3());
    normal = Cesium.Cartesian3.normalize(normal, normal);

    var originCenteredPlane = new Cesium.Plane(normal, 0.0);
    var distance = Cesium.Plane.getPointDistance(originCenteredPlane, midpoint);

    clippingPlanes.push(new Cesium.ClippingPlane(normal, distance));
  }

  // 设置挖方多边形
  proxy.viewer.scene.globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
    planes: clippingPlanes,
    edgeWidth: 1.0,
    edgeColor: Cesium.Color.YELLOW,
  });

  let entityWall = new Cesium.Entity({
    id: "enttiyWall0",
    name: "entityWall",
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        116.5,
        40.8,
        -2000,
        116.9,
        40.8,
        -2000,
        116.9,
        41.5,
        -2000,
        116.5,
        40.8,
        -2000,
      ]),
      material: new Cesium.ImageMaterialProperty({
        image: require("@/assets/images/LX_SEGY001.jpg"),
        repeat: new Cesium.Cartesian2(32, 32),
      }),
    },
  });
  let wallGeom = proxy.viewer.entities.add(entityWall);

  // 底图
  let entityRectangle = new Cesium.Entity({
    id: "entityRectangle0",
    name: "entityRectangle",
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
        116.5,
        40.8,
        2000,
        116.9,
        40.8,
        2000,
        116.9,
        41.5,
        2000,
      ]), // west, south, east, north
      // material: Cesium.Color.PURPLE.withAlpha(0.6),
      material: require("@/assets/images/image-list1.jpg"),
      // outline: true, // height must be set for outline to display
      // outlineColor: Cesium.Color.RED,
      // extrudedHeight: 1000,
      height: -2000, //设置深度
    },
  });
  let rectangleGeom = proxy.viewer.entities.add(entityRectangle);

  proxy.viewer.zoomTo(entityWall);
};

const handleShow = () => {
  // proxy.viewer.scene.globe.show = state.entityShow;
  proxy.viewer.entities.show = state.entityShow;
  proxy.viewer.scene.globe.clippingPlanes.enabled = state.entityShow;
};
const handleDepth = () => {
  // 深度检测
  proxy.viewer.scene.globe.depthTestAgainstTerrain = !state.inDept;
};
// 清除
const removeall = () => {
  // proxy.viewer.entities.removeAll();
  proxy.viewer.scene.primitives.removeAll(); //谨慎使用，可能删除不必要的primitive
  // proxy.viewer.scene.primitives.remove(proxy.wellWall)
  // proxy.viewer.scene.primitives.remove(proxy.wellBotom)
  proxy.viewer.scene.globe.clippingPlanes.removeAll();
};
</script>
<style scoped lang="scss">
#cesiumContainer {
  width: 100%;
  height: 910px;
  // height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}

#toolBar {
  position: absolute;
  left: 10px;
  bottom: 50px;
  color: white;

  .buttonIcon {
    margin: 10px;

    .btn-home {
      background: #235ea73d url(../../assets/images/homepage_fill.svg);
      background-size: cover;
      border-radius: 5px;
      height: 32px;
      width: 32px;
      // opacity: 0.6;
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

    .btn-grid3D {
      background: #235ea73d url(../../assets/images/earthgrid.svg);
      background-size: cover;
      border-radius: 5px;
      height: 32px;
      width: 32px;
      z-index: 6;
      cursor: pointer;
    }

    .btn-grid3D:hover {
      opacity: 1;
      border-color: #235ea73d;
      background-color: #0864d4fa;
    }

    .btn-grid1D {
      background: #235ea73d url(../../assets/images/1D_grid.svg);
      background-size: cover;
      border-radius: 5px;
      height: 32px;
      width: 32px;
      z-index: 6;
      cursor: pointer;
    }

    .btn-grid1D:hover {
      opacity: 1;
      border-color: #235ea73d;
      background-color: #0864d4fa;
    }

    .btn-grid2D {
      background: #235ea73d url(../../assets/images/2D_grid.svg);
      background-size: cover;
      border-radius: 5px;
      height: 32px;
      width: 32px;
      z-index: 6;
      cursor: pointer;
    }

    .btn-grid2D:hover {
      opacity: 1;
      border-color: #235ea73d;
      // box-shadow: 0 0 5px #fff;
      background-color: #0864d4fa;
    }

    #btn-grid1D {
      background: #235ea73d url(../../assets/images/1D_grid.svg);
      background-size: cover;
      border-radius: 5px;
      height: 32px;
      width: 32px;
      // opacity: 0.6;
      z-index: 6;
      cursor: pointer;
      // border: 1px solid #bfc6ce;
    }

    #btn-grid1D:hover {
      opacity: 1;
      border-color: #235ea73d;
      // box-shadow: 0 0 5px #fff;
      background-color: #0864d4fa;
    }

    #btn-grid2D {
      background: #235ea73d url(../../assets/images/2D_grid.svg);
      background-size: cover;
      border-radius: 5px;
      height: 32px;
      width: 32px;
      // opacity: 0.6;
      z-index: 6;
      cursor: pointer;
      // border: 1px solid #bfc6ce;
    }

    #btn-grid2D:hover {
      opacity: 1;
      border-color: #235ea73d;
      background-color: #0864d4fa;
    }

    #btn-grid3D {
      background: #235ea73d url(../../assets/images/earthgrid.svg);
      background-size: cover;
      border-radius: 5px;
      height: 32px;
      width: 32px;
      z-index: 6;
      cursor: pointer;
    }

    #btn-grid3D:hover {
      opacity: 1;
      border-color: #235ea73d;
      background-color: #0864d4fa;
    }

    #btn-fullscreen {
      background: #235ea73d url(../../assets/images/fullscreen.svg);
      background-size: cover;
      border-radius: 5px;
      height: 32px;
      width: 32px;
      // opacity: 0.6;
      z-index: 6;
      cursor: pointer;
      background-color: #235ea73d;
      // border: 1px solid #bfc6ce;
    }

    #btn-fullscreen:hover {
      opacity: 1;
      border-color: #235ea73d;
      background-color: #0864d4fa;
      // box-shadow: 0 0 5px #fff;
    }

    #btn-fullscreen-exit {
      background: #235ea73d url(../../assets/images/fullscreen-exit.svg);
      background-size: cover;
      border-radius: 5px;
      height: 32px;
      width: 32px;
      z-index: 6;
      cursor: pointer;
      background-color: #235ea73d;
    }

    #btn-fullscreen-exit:hover {
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

  #baseMap {
    // #baseMapBtn,
    #baseMapInfo {
      // display: inline-block;
      color: white;
      position: absolute;
      bottom: 50px;
      left: 60px;

      .baseMapChoose {
        width: 100%;
        height: 100%;

        .baseMapContent {
          height: 250px;
          width: 250px;

          #baseMap-grid img {
            width: 100%;
          }

          .col-4 {
            padding: 0;
            display: flex;
            border-style: solid;
            border-width: 2px;
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
              font-size: 6px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              text-align: center;

              a {
                color: #eaecf0;
                text-decoration: none;
              }

              a:hover {
                color: #eaecf0;
                opacity: 0.8;
              }
            }
          }
        }
      }
    }
  }

  #layerDetails {
    #layerInfo {
      color: white;
      position: absolute;
      bottom: 20px;
      left: 60px;

      .layerInfoContainer {
        // border-radius: 15px;
        width: 250px;
        height: 500px;
        border: 1px solid #235ea7fb;
        background-color: #235ea73d;

        .layerInfoContent {
          // display: inline-block;
          width: 100%;
          height: 100%;

          :deep .el-tree {
            background-color: #235ea700;
            color: rgb(255, 255, 255) !important;
          }

          :deep .el-tree-node__content {
            &:hover {
              background-color: #235ea73d;
            }
          }

          // 选中背景色修改
          :deep .el-tree-node.is-current > .el-tree-node__content {
            background-color: #235ea73d !important;
          }
        }
      }
    }
  }

  #switchView {
    #gridTo2D,
    #gridTo3D {
      display: inline-block;
      color: white;
    }

    .gridChoose {
      width: 100%;
      height: 100%;
    }
  }
}

#analybox {
  color: white;
  position: absolute;
  bottom: 30px;
  right: 20px;
  border-radius: 5px;
  width: 380px;
  height: 80%;
  border: 1px solid #235ea7fb;
  background-color: #235ea73d;

  .analybox_chose {
    margin: 2px 10px;
  }

  .excavation_depth {
    font-size: 14px;
    margin: 2px 10px;

    :deep .el-input__inner {
      background-color: #235ea73d;
      color: white;
    }

    :deep .el-input-number__decrease {
      background-color: #235ea73d;
      color: white;
    }

    :deep .el-input-number__increase {
      background-color: #235ea73d;
      color: white;
    }
  }

  .analybox_btn {
    margin: 8px 10px;

    .el-button {
      font-size: 12px;
      background-color: #235ea73d;
      border: 1px solid #235ea73d;
      color: white;
      // height: 8px !important;
      // width: 12px;
    }

    .el-button:hover {
      // color: rgb(64, 158, 255);
      // background-color: #235ea73d;
      background-color: #0864d4fa;
    }
  }
}

#footInfo {
  position: absolute;
  bottom: 0px;
  height: 20px;
  width: 100%;
  background: #235ea73d;
  color: white;
  display: flex;
  justify-content: flex-end;
  font-size: 10px;
  opacity: 0.7;

  #footContent {
    margin-right: 10px;
    width: 120px;
  }

  #footContent1 {
    margin-right: 10px;
    width: 80px;
  }
}

:deep .cesium-performanceDisplay {
  display: none;
}

:deep .navigation-controls {
  display: none;
}

// 罗盘设置
:deep .compass {
  .compass-outer-ring-background {
    display: none;
    // height: 64px;
    // width: 64px;
  }

  .compass-rotation-marker {
    // display: none;
    height: 64px;
    width: 64px;
  }

  .compass-outer-ring {
    height: 64px;
    width: 64px;
    fill: #fff;
    // display: none;

    .cesium-svgPath-svg {
      height: 64px;
      width: 64px;
      // display: none;
    }
  }

  .compass-gyro {
    height: 64px;
    width: 64px;
    fill: #fff;
    // display: none;
  }

  .compass-gyro-background {
    display: none;
    // height: 64px;
    // width: 64px;
  }

  position: absolute;
  left: 5px;
  top: 480px;
  color: white;
  // background: #235ea73d url(../../assets/images/compass.svg);
  // background: #235ea73d;
  background-size: cover;
  border-radius: 5px;
  height: 64px;
  width: 64px;
  // opacity: 0.6;
  z-index: 6;
  cursor: pointer;
}

:deep .distance-legend {
  position: absolute;
  left: 30px;
  bottom: 0px;

  .distance-legend-label {
    font-size: 10px;
  }
}
</style>
