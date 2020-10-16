
## 使用方法

```js
import IMap, { NavigationControl } from './components/map';

// 配置
const config = {
    element: 'map',
    point: [116.404, 39.915],
    zoom: 11,
    zoomConfig: { minZoom: 0, maxZoom: 20 }
  };

//  配置IMap 获取实例
const ins = new IMap({
  plugins: [ NavigationControl ],
  ak: '百度申请ak',
  config:config
});
// 配置插件
const n = ins.NavigationControl.init(
  NavigationControl.BOTTOM_RIGHT
  // NavigationControl.ZOOM
);
// 创建地图
ins.createMap().then(map=>{
  console.log('map: ', map);
  map.enableScrollWheelZoom();
  map.addControl(n);
})


```