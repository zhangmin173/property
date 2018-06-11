/*
 * @Author: Zhang Min 
 * @Date: 2018-05-16 21:34:41 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-18 08:47:46
 */

import './index.less';

class Map {
    constructor(opt) {
        this.opt = opt || {};

        this.id = +new Date();
        this.key = this.opt.key;
        this.app = this.opt.app || 'myapp';
        this.listView = this.opt.listview || 1;
        this.type = this.opt.type || 0;
        this.data = this.opt.data || [];
        this.addr = this._createData();
        this.api = `http://apis.map.qq.com/tools/poimarker?init_view=${this.listView}&type=${this.type}&marker=${this.addr}&key=${this.key}&referer=${this.app}`;
        this.$dom = this._createDom();
    }
    show() {
        $('body').append(this.$dom);
    }
    remove() {
        $('#' + this.id).remove();
    }
    _createDom() {
        return `<iframe name="qq-map" id="${this.id}" class="map2-components" src="${this.api}"></iframe>`;
    }
    _createData() {
        let arr = [];
        for (let index = 0; index < this.data.length; index++) {
            const item = this.data[index];
            const element = `coord:${item.lat},${item.lng};title:${item.title};addr:${item.addr}`;
            arr.push(element);
        }
        return arr.join('|');
    }
}
export default Map;
