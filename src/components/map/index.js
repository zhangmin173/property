/*
 * @Author: Zhang Min 
 * @Date: 2018-05-16 21:34:41 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-07-17 23:23:13
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
        console.log(this.markers);
        this.init();
    }
    init() {
        const _this = this;
        this.$wrapper.append(this._createDom());
        $('#' + this.id).on('click', '.map-item', function() {
            const index = $(this).data('index');
            _this.emit('map-click', _this.markers[index]);
        })
        $('#' + this.id).on('click', '.map-close', function() {
            _this.hide();
        })
    }
    _createDom() {
        let htmlStr = `<div id="${this.id}" class="map-components">`
        for (let index = 0; index < this.markers.length; index++) {
            const item = this.markers[index];
            htmlStr += `<div class="map-item" data-index="${index}">
                <div class="map-icon icon-address"></div>
                <div class="map-name">${item.title}</div>
                <div class="map-info">${item.addr}</div>
            </div>`;
        }
        htmlStr += '<div class="map-close">关闭</div>';
        htmlStr += '</div>';
        return htmlStr;
    }
    show() {
        $('#' + this.id).show();
    }
    hide() {
        $('#' + this.id).hide();
    }
}
export default Map;
