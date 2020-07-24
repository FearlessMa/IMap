import Constants from './constant';
/**
 * 比例尺
 *
 * @class NavigationControl
 */
class NavigationControl extends Constants {
  constructor(props) {
    super();
    this.BMap = props.BMap;
    this.anchor = NavigationControl.TOP_LEFT;
    this.small = NavigationControl.SMALL;
    this.pan = NavigationControl.PAN;
    this.zoom = NavigationControl.ZOOM;
  }
  /**
   * 导航
   *
   * @memberof NavigationControl
   */
  init = (anchor, type, enableGeolocation = false) => {
    return new this.BMap.NavigationControl({
      anchor,
      type,
      enableGeolocation
    });
  };
}

export default NavigationControl;
