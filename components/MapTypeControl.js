import Constants from './constant';
/**
 * 地图类型 和 缩略图
 *
 * @class MapTypeControl
 */
class MapTypeControl extends Constants {
  constructor(props) {
    super();
    this.BMap = props.BMap;
  }
  /**
   * 地图类型
   *
   * @param {*} [mapTypes=[MapTypeControl.NORMAL_MAP]]
   * @param {*} [anchor=MapTypeControl.TOP_LEFT]
   * @returns
   * @memberof MapTypeControl
   */
  init(
    mapTypes = [MapTypeControl.NORMAL_MAP],
    anchor = MapTypeControl.TOP_LEFT
  ) {
    return new this.BMap.MapTypeControl({
      mapTypes,
      anchor
    });
  }
}

export default MapTypeControl;
