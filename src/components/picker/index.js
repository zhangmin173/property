/*
 * @Author: Zhang Min 
 * @Date: 2018-05-03 07:50:42 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-07 20:06:15
 */

/**
 * 级联选择器
 */
import './index.less';

import BScroll from 'better-scroll';
import Toolkit from '../toolkit';
import EventEmitter from '../eventEmitter';

class Picker extends EventEmitter {
    constructor(opt) {
        //Object.assign(this, Event);
        super();
        this.opt = opt;
        
        this.debug = this.opt.debug || false; // 开启调试

        this.title = this.opt.title || '请选择';
        this.level = this.opt.level || 1;
        this.key = this.opt.key || 'id';
        this.data = opt.data || [
            {
                id: 1,
                name: 'p1'
            },
            {
                id: 2,
                name: 'p2'
            },
            {
                id: 3,
                name: 'p3'
            },
            {
                id: 4,
                name: 'p4'
            },
            {
                id: 5,
                name: 'p5'
            },
            {
                id: 6,
                name: 'p6'
            }
        ];
        this.wheels = [];
    }
    init() {
        // 首次数据加载
        const doms = this._creatDom(this.data);
        $('body').append(doms);
        this.bs = new BScroll('.picker-wheel');
        
    }
    _creatDom(data) {
        const wheel = this._createWheel(data);
        return `<div class="picker-components">
            <div class="picker-header">
                <div class="picker-cancel">取消</div>
                <div class="picker-title">${this.title}</div>
                <div class="picker-confirm">确定</div>
            </div>
            <div class="picker-container">
                <div class="picker-mask-top"></div>
                <div class="picker-mask-bottom"></div>
                <div class="picker-wheel-wrap">
                ${wheel}
                </div>
            </div>
        </div>`
    }
    _createWheel(data) {
        let htmlStr = '';
        data.forEach(item => {
            htmlStr += this._createItem(item);
        });
        return `<div class="picker-wheel">
            <ul>${htmlStr}</ul>
        </div>`;
    }
    _createItem(data) {
        return `<li data-id=${data[this.key]}>${data.name}</li>`;
    }
    _log(msg) {
        if (this.debug) {
            console.log(msg);
        }
    }
}
export default Picker;