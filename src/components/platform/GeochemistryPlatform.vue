<template>
  <div id="CMHeaderBar">
    <CMHeader />
  </div>
  <div id="mainContent">
    <div id="cesiumContainer"></div>
    <div id="analybox">
      <span>Interpolation:</span>
      <el-select v-model="value" clearable placeholder="Select" @change="selectTrigger">
        <el-option
          v-for="item in state.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <button type="button" class="btn btn-primary" @click="viewTopDown">
        viewTopDown
      </button>
      <button type="button" class="btn btn-primary" @click="viewSide">viewSide</button>
      <button type="button" class="btn btn-primary" @click="viewAircraft">
        viewAircraft
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import CMHeader from "@/components/CMHeader.vue";
import { onMounted, inject, getCurrentInstance, reactive, ref } from "vue";
let { proxy }: any = getCurrentInstance();
let Cesium: any = inject("$Cesium");
const value = ref("");
onMounted(() => {
  initCesium();
});
const state = reactive({
  options: [
    {
      value: "Linear Approximation",
      label: "Linear Approximation",
    },
    {
      value: "Lagrange Polynomial Approximation",
      label: "Lagrange Polynomial Approximation",
    },
    {
      value: "Hermite Polynomial Approximation",
      label: "Hermite Polynomial Approximation",
    },
  ],
});
const initCesium = () => {
  proxy.viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false, //Disable InfoBox widget
    selectionIndicator: false, //Disable selection indicator
    shouldAnimate: true, // Enable animations
    terrainProvider: Cesium.createWorldTerrain(),
  });

  //Enable lighting based on the sun position
  proxy.viewer.scene.globe.enableLighting = true;

  //Enable depth testing so things behind the terrain disappear.
  proxy.viewer.scene.globe.depthTestAgainstTerrain = true;

  // 设置一个默认的 trackedEntity
  proxy.viewer.trackedEntity = proxy.entity;

  //Set the random number seed for consistent results.
  Cesium.Math.setRandomNumberSeed(3);

  //Set bounds of our simulation time
  const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
  const stop = Cesium.JulianDate.addSeconds(start, 360, new Cesium.JulianDate());

  //Make sure proxy.viewer is at the desired time.
  proxy.viewer.clock.startTime = start.clone();
  proxy.viewer.clock.stopTime = stop.clone();
  proxy.viewer.clock.currentTime = start.clone();
  proxy.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
  proxy.viewer.clock.multiplier = 10;

  //Set timeline to simulation bounds
  proxy.viewer.timeline.zoomTo(start, stop);

  //Generate a random circular pattern with varying heights.
  function computeCirclularFlight(lon: any, lat: any, radius: any) {
    const property = new Cesium.SampledPositionProperty();
    for (let i = 0; i <= 360; i += 45) {
      const radians = Cesium.Math.toRadians(i);
      const time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
      const position = Cesium.Cartesian3.fromDegrees(
        lon + radius * 1.5 * Math.cos(radians),
        lat + radius * Math.sin(radians),
        Cesium.Math.nextRandomNumber() * 500 + 1750
      );
      property.addSample(time, position);

      //Also create a point for each sample we generate.
      proxy.viewer.entities.add({
        position: position,
        point: {
          pixelSize: 8,
          color: Cesium.Color.TRANSPARENT,
          outlineColor: Cesium.Color.YELLOW,
          outlineWidth: 3,
        },
      });
    }
    return property;
  }

  //Compute the entity position property.
  const position = computeCirclularFlight(-112.110693, 36.0994841, 0.03);

  //Actually create the entity
  proxy.entity = proxy.viewer.entities.add({
    //Set the entity availability to the same interval as the simulation time.
    availability: new Cesium.TimeIntervalCollection([
      new Cesium.TimeInterval({
        start: start,
        stop: stop,
      }),
    ]),

    //Use our computed positions
    position: position,

    //Automatically compute orientation based on position movement.
    orientation: new Cesium.VelocityOrientationProperty(position),

    //Load the Cesium plane model to represent the entity
    model: {
      uri: "Cesium_Air.glb",
      minimumPixelSize: 64,
    },

    //Show the path as a pink line sampled in 1 second increments.
    path: {
      resolution: 1,
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 0.1,
        color: Cesium.Color.YELLOW,
      }),
      width: 10,
    },
  });
};
const viewTopDown = () => {
  proxy.viewer.trackedEntity = undefined;
  proxy.viewer.zoomTo(
    proxy.viewer.entities,
    new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90))
  );
};
const viewSide = () => {
  proxy.viewer.trackedEntity = undefined;
  proxy.viewer.zoomTo(
    proxy.viewer.entities,
    new Cesium.HeadingPitchRange(
      Cesium.Math.toRadians(-90),
      Cesium.Math.toRadians(-15),
      7500
    )
  );
};
const viewAircraft = () => {
  proxy.viewer.trackedEntity = proxy.entity;
};
const selectTrigger = () => {
  console.log(value.value);
  switch (value.value) {
    case "Linear Approximation":
      proxy.entity.position.setInterpolationOptions({
        interpolationDegree: 1,
        interpolationAlgorithm: Cesium.LinearApproximation,
      });
      break;
    case "Lagrange Polynomial Approximation":
      proxy.entity.position.setInterpolationOptions({
        interpolationDegree: 5,
        interpolationAlgorithm: Cesium.LagrangePolynomialApproximation,
      });
      break;
    case "Hermite Polynomial Approximation":
      proxy.entity.position.setInterpolationOptions({
        interpolationDegree: 2,
        interpolationAlgorithm: Cesium.HermitePolynomialApproximation,
      });
      break;
  }
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
}
</style>
