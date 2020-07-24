import installMap from './installMap.js';
import initMap from './initMap.js';
import ScaleControl from './components/ScaleControl.js';
import MapTypeControl from './components/MapTypeControl.js';
import OverviewMapControl from './components/OverviewMapControl.js';
import NavigationControl from './components/NavigationControl.js';
import GeolocationControl from './components/GeolocationControl.js';
import LuShu from './components/LuShu.js';

export {
  ScaleControl,
  MapTypeControl,
  OverviewMapControl,
  NavigationControl,
  GeolocationControl,
  LuShu
};
export default class IMap {
  constructor(props = {}) {
    const { ak, config, installSrc, installLocalSrc } = props;
    this.ak = ak;
    this.config = config; // map init config
    this.installSrc = installSrc; // map install src
    this.installLocalSrc = installLocalSrc; // map 本地安装路径
    this.BMap = null;
    this.map = null;
    this.plugins = props.plugins || [];
    // 防止解构等操作后失去this指向IMap实例
    this.installMap = this.installMap.bind(this);
    this.initMap = this.initMap.bind(this);
    this.createMap = this.createMap.bind(this);
    this.initMap = this.initMap.bind(this);
    this.initPlugins = this.initPlugins.bind(this);
    this.createPoint = this.createPoint.bind(this);
    this.createPointCollection = this.createPointCollection.bind(this);
    this.createPolyline = this.createPolyline.bind(this);
    this.createPolygon = this.createPolygon.bind(this);
    this.createCircle = this.createCircle.bind(this);
    this.createRectangle = this.createRectangle.bind(this);
    this.createIcon = this.createIcon.bind(this);
    this.createSize = this.createSize.bind(this);
    this.createLabel = this.createLabel.bind(this);
    this.clearOverlays = this.clearOverlays.bind(this);
    this.createInfoWindow = this.createInfoWindow.bind(this);
    this.createMarker = this.createMarker.bind(this);
    this.addOverlay = this.addOverlay.bind(this);
    this.removeOverlay = this.removeOverlay.bind(this);
    this.getGeocoder = this.getGeocoder.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.markerEvent = this.markerEvent.bind(this);
    this.setIconSize = this.setIconSize.bind(this);
    this.setViewport = this.setViewport.bind(this);
  }
  // 装载地图
  installMap(...arg) {
    return installMap(...arg);
  }
  // 初始化地图
  async initMap(...arg) {
    await this.initPlugins(this.plugins, this.BMap);
    return initMap.apply(this, arg);
  }
  //  装载并初始化地图
  async createMap() {
    const { ak, config, installSrc, installLocalSrc } = this;
    const BMap = await this.installMap(ak, installSrc, installLocalSrc);
    this.BMap = BMap;
    this.map = await this.initMap(BMap, config);
    return this.map;
  }
  /**
   * 初始化插件
   *
   * @param {*} plugins 插件list
   * @param {*} BMap BMap
   * @memberof Map
   */
  async initPlugins(plugins, BMap) {
    for (let i = 0; i < plugins.length; i++) {
      let plugin = plugins[i];
      if (!(typeof plugin === 'function')) {
        throw new Error(plugin + ' is not a function');
      }
      /* eslint new-cap: 0 */
      const ins = new plugin({ BMap });

      ins.install && (await ins.install());
      this[plugin.name] = ins;
    }
    // plugins.forEach((plugin) => {
    //   if (!(typeof plugin === 'function')) {
    //     throw new Error(plugin + ' is not a function');
    //   }
    //   /* eslint new-cap: 0 */
    //   const ins = new plugin({ BMap });
    //   ins.install &&
    //   await ins.install();
    //   this[plugin.name] = ins;
    // });
  }
  /**
   * 点
   *
   * @param {*} lng 经度
   * @param {*} lat 纬度
   * @returns point
   * @memberof Map
   */
  createPoint(lng, lat) {
    return new this.BMap.Point(lng, lat);
  }

  /**
   * 海量点
   *
   * @param {*} [pointList=[]] 点数组
   * @param {*} Config 点配置
   * @returns pointCollection
   * @memberof Map
   */
  createPointCollection(pointList = [], Config) {
    return new this.BMap.PointCollection(pointList, Config);
  }

  /**
   * 聚焦视野
   *
   * @param {*} [pointList=[]] 点数组
   * @param {*} Config 点配置
   * @returns pointCollection
   * @memberof IMap
   */
  setViewport(pointList = [], Config, map) {
    map = map || this.map;
    map.setViewport(pointList, Config);
  }

  /**
   * 覆盖物
   * 覆盖物显示隐藏 http://lbsyun.baidu.com/jsdemo.htm#c2_1
   * @param {*} point map.point
   * @param {*} config map.config {icon:myIcon}
   * @returns marker
   * @memberof Map
   */
  createMarker(point, config = {}) {
    return new this.BMap.Marker(point, config);
  }

  /**
   * 折线
   * 是否可编辑 http://lbsyun.baidu.com/jsdemo.htm#c2_9
   * @param {*} [pointList=[]] 点数组
   * @param {*} Config 线配置 {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}
   * @returns Polyline Instance
   * @memberof Map
   */
  createPolyline(pointList = [], Config = {}) {
    return new this.BMap.Polyline(pointList, Config);
  }

  /**
   * 多边形
   * 是否可编辑 http://lbsyun.baidu.com/jsdemo.htm#c2_9
   * @param {*} [pointList=[]]
   * @param {*} [Config={}] {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}
   * @returns
   * @memberof Map
   */
  createPolygon(pointList = [], Config = {}) {
    return new this.BMap.Polygon(pointList, Config);
  }

  /**
   * 圆
   *
   * @param {*} point 点
   * @param {*} R 半径
   * @param {*} [Config={}] 样式配置
   * @returns Circle
   * @memberof Map
   */
  createCircle(point, R, Config = {}) {
    return new this.BMap.Circle(point, R, Config);
  }

  /**
   * 矩形
   * 是否可编辑 http://lbsyun.baidu.com/jsdemo.htm#c2_9
   * @param {*} pointStart 起始点
   * @param {*} pointEnd 结束点
   * @param {*} config 样式配置
   * @returns rectangle
   * @memberof Map
   */
  createRectangle(pointStart, pointEnd, config) {
    return new this.BMap.Polygon(
      [
        new this.BMap.Point(pointStart.lng, pointStart.lat),
        new this.BMap.Point(pointEnd.lng, pointStart.lat),
        new this.BMap.Point(pointEnd.lng, pointEnd.lat),
        new this.BMap.Point(pointStart.lng, pointEnd.lat)
      ],
      config
    );
  }
  /**
   * 图标
   *
   * @param {*} path 路径
   * @param {*} width width
   * @param {*} height
   * @returns icon
   * @memberof Map
   */
  createIcon(path, width, height) {
    const size = this.createSize(width, height);
    return new this.BMap.Icon(path, size);
  }

  /**
   * size
   *
   * @param {*} width
   * @param {*} height
   * @returns
   * @memberof Map
   */
  createSize(width, height) {
    return new this.BMap.Size(width, height);
  }
  /**
   * 文字标签
   * marker文字标签 http://lbsyun.baidu.com/jsdemo.htm#c2_3
   * @param {*} text 文本
   * @param {*} point 点
   * @param {*} left 偏移量
   * @param {*} right 偏移量
   * @returns
   * @memberof Map
   */
  createLabel(text, point, left, right) {
    const opts = {
      position: point, // 指定文本标注所在的地理位置
      offset: this.createSize(left, -right) // 设置文本偏移量
    };
    return new this.BMap.Label(text, opts);
  }
  /**
   * 清除所有覆盖物
   *
   * @memberof Map
   */
  clearOverlays(map) {
    map = map || this.map;
    map.clearOverlays();
  }
  /**
   * 创建信息窗口
   * http://lbsyun.baidu.com/jsdemo.htm#d0_1
   *
   * @param {*} content 文本或html字符串
   * @param {*} opts 样式设置
   * @returns window
   * @memberof Map
   */
  createInfoWindow(content, opts) {
    return new this.BMap.InfoWindow(content, opts);
  }
  /**
   * 渲染marker
   *
   * @param {*} marker
   * @param {*} map
   * @memberof IMap
   */
  addOverlay(marker, map) {
    map = map || this.map;
    map.addOverlay(marker);
  }
  /**
   * 移除覆盖物
   *
   * @param {*} overlay
   * @param {*} map
   * @memberof IMap
   */
  removeOverlay(overlay, map) {
    map = map || this.map;
    map.removeOverlay(overlay);
  }
  /**
   * 获取用户的地址解析
   */
  getGeocoder() {
    return new this.BMap.Geocoder();
  }
  // 根据经纬度获取地址位置
  getLocation(lng, lat) {
    var myGeo = new this.BMap.Geocoder();
    // 根据坐标得到地址描述
    var address = '';
    return new Promise((resolve) => {
      myGeo.getLocation(new this.BMap.Point(lng, lat), function (result) {
        if (result) {
          address = result.address;
          resolve(address);
        }
        resolve('');
      });
    });
  }
  /*
   * markerEvent 绑定事件
   *
   * @param {*} marker marker实例
   * @param {*} cb callback
   * @param {string} [type='click'] event type
   * @memberof IMap
   */
  markerEvent(marker, cb, type = 'click') {
    if (!(marker instanceof this.BMap.Marker)) {
      throw new Error('marker is not BMap.marker');
    }
    marker.addEventListener(type, (e) => {
      cb && cb(e, marker, this.map, this);
    });
  }
  /**
   * 设置图标大小
   *
   * @param {*} marker marker
   * @param {*} width
   * @param {*} height
   * @param {*} setTop marker置于其他marker上
   * @memberof IMap
   */
  setIconSize(marker, width, height, setTop = false) {
    const icon = marker.getIcon();
    marker.setTop(setTop);
    icon.setSize(this.createSize(width, height));
    icon.setImageSize(this.createSize(width, height));
    marker.setIcon(icon);
  }

  // TODO 添加行政区 http://lbsyun.baidu.com/jsdemo.htm#c1_10
  // TODO 添加自定义覆盖物 http://lbsyun.baidu.com/jsdemo.htm#c1_18
  // TODO 点聚合 http://lbsyun.baidu.com/jsdemo.htm#c1_4
  // TODO 鼠标绘图 http://lbsyun.baidu.com/jsdemo.htm#f0_7
  // TODO 路书 http://lbsyun.baidu.com/jsdemo.htm#c2_8

  // extends(dep) {
  //   if (typeof dep === 'function') {
  //     console.log('extends: ', dep);
  //   }
  // }
}
