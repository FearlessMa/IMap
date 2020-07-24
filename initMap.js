/**
 *  初始化地图
 *
 * @param {*} BMap
 * @param {string} [config] { element: 'map', point: [116.404, 39.915], zoom: 11 ,zoomConfig:{ minZoom: 0, maxZoom: 14 }}
 */
function initMap(BMap, config = {}) {
  const defaultConfig = {
    element: 'map',
    point: [116.404, 39.915],
    zoom: 11,
    zoomConfig: { minZoom: 0, maxZoom: 20 }
  };
  if (!BMap || !BMap.Map) {
    throw new Error('BMap.Map is undefined');
  }
  const { element, point, zoom, zoomConfig } = (config = Object.assign(
    defaultConfig,
    config
  ));
  const map = new BMap.Map(element, zoomConfig);
  // 创建地图实例
  const p = new BMap.Point(...point);
  // 创建点坐标
  map.centerAndZoom(p, zoom);
  // 初始化地图， 设置中心点坐标和地图级别
  // const marker = new BMap.Marker(p);
  // map.addOverlay(marker);
  return map;
}

export default initMap;
