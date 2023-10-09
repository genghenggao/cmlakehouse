class Coordinates {
    constructor(viewer){
      if (viewer && viewer instanceof Cesium.Viewer) {
        this._viewer = viewer
      }
    }
    // 弧度 转 度
    RadianToDegrees (radian) {
        return radian ? Cesium.Math.toDegrees(radian) : null
        // parseInt(radian * (180 / Math.PI))
    }
  
    // 度 转 弧度
    DegreesToRadian (deg) {
        return deg ? Cesium.Math.toRadians(deg) : null
        // parseInt(deg / 180 * Math.PI)
    }
  
    /**
     * @description: 笛卡尔3 转 弧度
     * @param {Object} cartesian Cartesian3 
     * @return {Object} Cartographic
     */
    Cartesian3ToCartographic (cartesian) {
      if (this._viewer && cartesian) {
        return Cesium.Cartesian3.fromCartesian(cartesian)
      }
    }
  
    /**
     * @description: 弧度 转 笛卡尔3
     * @param {Object} cartographic Cartographic 
     * @return {Object} Cartesian3
     */
    CartographicToCartesian3 (cartographic) {
      if (this._viewer && cartographic) {
        return Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height || 0)
      }
    }
  
    /**
     * @description: 84经纬度 转 弧度
     * @param {Object | Array} position wgs84
     * @return {Object} Cartographic 
     */  
    LonLatToCartographic (position) {
        if(this._viewer && position){
          let longitude, latitude, height
          if(Array.isArray(position)){
            longitude = position[0]
            latitude = position[1]
            height = position[2] || 0
          }else{
              longitude = position.longitude
              latitude = position.latitude
              height = position.height || 0
          }
          return Cesium.Cartographic.fromDegrees(longitude, latitude, height)
        }else{
          return Cesium.Cartographic.ZERO
        }
    }
  
    /**
     * @description: 弧度 转 84经纬度
     * @param {Object} cartographic Cartographic 
     * @return {Object} wgs84
     */
    CartographicToLonLat (cartographic) {
      if (this._viewer && cartographic) {
        return {
          longitude: this.RadianToDegrees(cartographic.longitude),
          latitude: this.RadianToDegrees(cartographic.latitude),
          height: cartographic.height || 0
        }
      }
    }
  
    /**
     * @description: 笛卡尔3 转 84经纬度
     * @param {Object} cartesian Cartesian3 
     * @return {Object} wgs84
     */  
    Cartesian3ToLonLat (cartesian) {
      if (this._viewer && cartesian) {
        const ellipsoid = Cesium.Ellipsoid.WGS84
        let cartographic = ellipsoid.cartesianToCartographic(cartesian)
        // let cartographic = this.Cartesian3ToCartographic(cartesian) // 笛卡尔 转 弧度
        return this.CartographicToLonLat(cartographic)
      }
    }
  
    /**
     * @description: 84经纬度 转 笛卡尔3 
     * @param {Object} lonlat wgs84
     * @return {Object} Cartesian3 
     */  
    LonLatToCartesian3 (lonlat) {
      if (this._viewer) {
        return lonlat
            ? Cesium.Cartesian3.fromDegrees(
              lonlat.longitude,
              lonlat.latitude,
              lonlat.height = lonlat.height || 0,
              Cesium.Ellipsoid.WGS84
            )
            : Cesium.Cartesian3.ZERO
      }
    }
  
  }
  
  const coordinates = new Coordinates() // 坐标转换实例
  
  /**
   * @description: 批量转换坐标
   * @param {Array} arr 被转换数组
   * @param {String} from 被转换数据的类型（首字母大写）
   * @param {String} to 要转换的数据类型（首字母大写）
   * @return {Array} 转换后的数组
   */
  const batchChange = function(arr, from, to) {
      return arr.reduce((result, item) => {
          result.push(coordinatesChange(item, from, to))
          return result
      }, [])
  }
  
  /**
   * @description: 单个坐标转换
   * @param {Object} obj 被转换的坐标
   * @param {String} from 被转换数据的类型（首字母大写）
   * @param {String} to 要转换的数据类型（首字母大写）
   * @return {Object} 转换后的坐标
   */
  const coordinatesChange = function(obj, from, to){
      const functionName = `${from}To${to}`
      return coordinates[functionName] ? coordinates[functionName](obj) : null
  }
  
  export {
      batchChange,
      coordinatesChange
  }
  
  export default coordinates;
  