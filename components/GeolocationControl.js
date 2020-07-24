import Constants from './constant';
/**
 * 比例尺
 *
 * @class GeolocationControl
 */
class GeolocationControl extends Constants {
  constructor(props) {
    super();
    this.BMap = props.BMap;
    this.anchor = GeolocationControl.TOP_LEFT;
    this.small = GeolocationControl.SMALL;
    this.pan = GeolocationControl.PAN;
    this.zoom = GeolocationControl.ZOOM;
  }
  /**
   * 定位
   *
   * @memberof GeolocationControl
   */
  init = () => {
    return new this.BMap.GeolocationControl();
  };
}

export default GeolocationControl;
