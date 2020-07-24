// <script type="text/javascript" src="//api.map.baidu.com/api?v=2.0&ak=您的密钥"></script>
// ak = Q0swsmDQmoK2WzPtt9K7NpeR

import { createElement, appendElement } from './utils';

/**
 * 加载地图
 *
 * @param {string} [ak='Q0swsmDQmoK2WzPtt9K7NpeR'] 地图ak
 * @param {string} [src=''] src
 * @param {string} [localSrc=''] 本地安装src
 */
function installMap(ak = '', src = '', localSrc = '') {
  return new Promise((resolve, reject) => {
    if (window.BMap) {
      resolve(window.BMap);
      return;
    }
    src =
      src ||
      'https://api.map.baidu.com/api?v=3.0&ak=' +
        ak +
        '&callback=_initBaiduMap';
    const ele = createElement(src, 'text/javascript');
    const parentEle = appendElement(ele);
    const timer = localSrc && installTimeout(localSrc);
    window._initBaiduMap = function() {
      clearTimeout(timer);
      parentEle.removeChild(ele);
      resolve(window.BMap);
      console.log('_initBaiduMap');
    };
    ele.onload = function() {
      // setTimeout(function() {
      //   resolve(window.BMap);
      // }, 1000);
      console.log('onload');
    };
  });
}

function installTimeout(src, delay = 5000) {
  const timer = setTimeout(() => {
    // TODO 安装本地
    src && installMap('', src);
    throw new Error('install online Timeout');
  }, delay);
  return timer;
}

export default installMap;
