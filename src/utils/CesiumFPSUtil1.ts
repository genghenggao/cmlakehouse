/*
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2022-05-27 09:05:39
 * @LastEditors: henggao
 * @LastEditTime: 2022-05-27 10:34:48
 */
const getTimestamp = () => {
  var getTime;

  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function" &&
    isFinite(performance.now())
  ) {
    getTime = function () {
      return performance.now();
    };
  } else {
    getTime = function () {
      return Date.now();
    };
  }
  return getTime();
}
class CesiumFPSUtil {
  public id: any;
  public lastFpsSampleTime: any;
  public lastMsSampleTime: any;
  public fpsFrameCount: any;
  public msFrameCount: any;
  private fpsText: any;
  private msText: any;
  constructor(containerId: any) {
    this.id = containerId || "fpsdiv";
    this.lastFpsSampleTime = getTimestamp();
    this.lastMsSampleTime = getTimestamp();
    this.fpsFrameCount = 0;
    this.msFrameCount = 0;
    this.createDiv();
  }

  createDiv = () => {

    let parent: HTMLElement | null;
    parent = document.getElementById(this.id)!;
    const fpsDiv = document.createElement("div");
    fpsDiv.className = "info-content";

    this.fpsText = document.createElement("span");
    this.msText = document.createElement("span");
    fpsDiv.append(this.fpsText);
    fpsDiv.append(this.msText);
    parent.append(fpsDiv);
  }


  update() {
    let time = getTimestamp();
    this.fpsFrameCount++;
    let updateDisplay = true;
    let fpsElapsedTime = time - this.lastFpsSampleTime;
    if (fpsElapsedTime > 1000) {
      var fps = "N/A";
      if (updateDisplay) {
        fps = String(((this.fpsFrameCount * 1000) / fpsElapsedTime) | 0);
      }

      this.fpsText.innerText = fps + " FPS";
      this.lastFpsSampleTime = time;
      this.fpsFrameCount = 0;
    }
    this.msFrameCount++;
    let msElapsedTime = time - this.lastMsSampleTime;
    if (msElapsedTime > 200) {
      let ms = "N/A";
      if (updateDisplay) {
        ms = (msElapsedTime / this.msFrameCount).toFixed(2);
      }

      this.msText.innerText = ms + " MS";
      this.lastMsSampleTime = time;
      this.msFrameCount = 0;
    }
  }
}

const cesiumFPSUtil = new CesiumFPSUtil("fpsdiv") // 坐标转换实例

export default cesiumFPSUtil;