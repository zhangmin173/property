/*
 * @Author: Zhang Min 
 * @Date: 2018-05-16 21:34:41 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-21 09:08:11
 */

import './index.less';
import EventEmitter from '../../components/eventEmitter';

class Map extends EventEmitter {
    constructor(wrapper, opt) {
        super();
        this.opt = opt || {};

        this.id = +new Date();
        this.$wrapper = wrapper || $('body');
        this.markers = this.opt.data;
        this.init();
    }
    init() {
        this.$wrapper.append(this._createDom());
        this.map = new qq.maps.Map(document.getElementById(this.id), {
            center: new qq.maps.LatLng(this.opt.lat, this.opt.lng),
            zoom: this.opt.zoom || 13
        });
        this._createMarker(this.markers);
    }
    _createDom() {
        return `<div id="${this.id}" class="map-components"></div>`;
    }
    _createMarker(markers) {
        for (let index = 0; index < markers.length; index++) {
            const item = markers[index];
            // 添加标注
            const marker = new qq.maps.Marker({
                position: new qq.maps.LatLng(item.lat, item.lng),
                map: this.map,
                content: item.title,
                id: item.id,
                animation: qq.maps.MarkerAnimation.BOUNCE
            });
            // 添加标注点击事件
            qq.maps.event.addListener(marker, 'click', () => {
                this.emit('map-click',marker);
            });
        }
    }
    show() {
        $('#' + this.id).show();
    }
    hide() {
        $('#' + this.id).hide();
    }
}
export default Map;
