/*
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2022-05-26 20:20:54
 * @LastEditors: henggao
 * @LastEditTime: 2022-05-26 20:33:43
 */
import { inject,getCurrentInstance} from "vue";
let { proxy }: any = getCurrentInstance();
let Cesium: any = inject("$Cesium");
class Coordinates {
    constructor(viewer:any){
      if (viewer && viewer instanceof Cesium.Viewer) {
        proxy.viewer = viewer
      }
    }
    // 弧度 转 度
    RadianToDegrees (radian:any) {
        return radian ? Cesium.Math.toDegrees(radian) : null
    }
}

// const coordinates:Coordinates = new Coordinates(x); // 坐标转换实例

// export default coordinates;