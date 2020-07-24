import Constants from './constant';
/**
 * 地图类型 和 缩略图
 *
 * @class OverviewMapControl
 */
class OverviewMapControl extends Constants {
  constructor(props) {
    super(props);
    this.BMap = props.BMap;
  }
  /**
   * 地图缩略图
   *
   * @param {boolean} [isOpen=true]
   * @param {*} [anchor=OverviewMapControl.TOP_LEFT]
   * @returns
   * @memberof OverviewMapControl
   */
  init(isOpen = true, anchor = OverviewMapControl.TOP_LEFT) {
    return new this.BMap.OverviewMapControl({
      isOpen,
      anchor
    });
  }
}

export default OverviewMapControl;
