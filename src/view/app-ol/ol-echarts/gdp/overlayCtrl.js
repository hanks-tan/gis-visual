import overlay from './overlay'
import Vue from 'vue'

class OverlayCtrl {
  _Overlay = Vue.extend(overlay)
  constructor (options) {
    this.options = Object.assign({}, options)
    this.mapObj = options.mapObj
  }

  showOverlayInMap (poistion, data) {
    this._createOverlay(poistion, data)
  }

  _createOverlay (poistion, data) {
    let OverlayClass = this._Overlay
    let overlayObj = new OverlayClass({ // 注意这里
      data: {
        mapObj: this.mapObj,
        poistion: poistion,
        data: data
      }
    })
    overlayObj.show()
    return overlayObj
  }
}
export default OverlayCtrl
