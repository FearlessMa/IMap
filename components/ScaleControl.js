import Constants from './constant';
/**
 * 比例尺
 *
 * @class ScaleControl
 */
class ScaleControl extends Constants {
  constructor(props) {
    super();
    this.BMap = props.BMap;
    this.anchor = ScaleControl.TOP_LEFT;
    this.small = ScaleControl.SMALL;
    this.pan = ScaleControl.PAN;
    this.zoom = ScaleControl.ZOOM;
  }
  // 左上角，添加比例尺
  init = (anchor) => {
    anchor = anchor || this.anchor;
    return new this.BMap.ScaleControl({ anchor });
  };
}

export default ScaleControl;
