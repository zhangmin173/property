/*
 * @Author: Zhang Min 
 * @Date: 2018-05-03 07:50:42 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-05 23:22:12
 */

/**
 * 列表滚动加载
 */
import './index.less';
import Toolkit from '../toolkit';
import Event from '../event';

class Listview {
    constructor(opt) {
        Object.assign(this, Event);
        this.opt = opt || {};
        
        this.debug = this.opt.debug || false; // 开启调试
        this.dropDownRefresh = this.opt.dropDownRefresh || false; // 开启下拉刷新
        this.url = this.opt.url;
        this.type = this.opt.type || 'get';
        this.total = 0;
        this.pageIndex = this.opt.pageIndex || 1;
        this.pageSize = this.opt.pageSize || 10;
        this.querys = this.opt.querys || {};
        this.$wrapper = this.opt.wrapper || $('.listview-components ul');
        this.timeout = this.opt.timeout || 800;

        this.isLoading = false;
        this.finished = false;
        this.translateY = 100 * window.remScale;
    }
    init() {
        // 首次数据加载
        this._loading();
        // 上拉加载
        this.$wrapper.on('scroll', () => {
            this._log(this.$wrapper.scrollTop());
            if (this.$wrapper[0].clientHeight + this.$wrapper[0].scrollTop >= this.$wrapper[0].scrollHeight - 50 && !this.isLoading && !this.finished) {
                this._loading();
            }
        });
        // 下拉刷新
        this.on('dropDownRefresh',() => {
            this.reLoad();
        })
        if (this.dropDownRefresh) {
            let startPoint, endPoint, isStart = false;
            this.$wrapper.on('touchstart', (e) => {
                if (this.$wrapper[0].scrollTop <= 0) {
                    isStart = true;
                    startPoint = e.touches[0].pageY || e.pageY;
                    this._setTranslition(0);
                }
            });
            this.$wrapper.on('touchmove', (e) => {
                if (isStart) {
                    endPoint = e.touches[0].pageY || e.pageY;
                    if (endPoint > startPoint) {
                        e.preventDefault();
                        // 消除滑块动画时间
                        this._setTranslition(0);
                        // 移动滑块
                        const translateY = endPoint - startPoint;
                        if (translateY <= this.translateY) {
                            this._translate(translateY);
                        }
                    }
                }
            });
            this.$wrapper.on('touchend', (e) => {
                if (isStart) {
                    // 设置滑块回弹时间
                    this._setTranslition(1);
                    // 保留提示部分
                    this._translate(0);
                    // 触发刷新
                    this.emit('dropDownRefresh');
                    startPoint = 0;
                    endPoint = 0;
                    isStart = false;
                }
            });
        }

    }
    reLoad() {
        this.total = 0;
        this.pageIndex = this.opt.pageIndex || 1;
        this.$wrapper.empty();
        setTimeout(() => {
            this._loading();
        },this.timeout);
    }
    _log(msg) {
        if (this.debug) {
            console.log(msg);
        }
    }
    _loading() {
        this.isLoading = true;
        Toolkit.fetch({
            url: this.url,
            type: this.type,
            data: this._getQuerys(),
            success: (res) => {
                const data = res.data instanceof Array ? res.data : [];
                if (res.success && data.length) {
                    this.total += data.length;
                    this.pageIndex++;
                    this.emit('success', res);
                    this.isLoading = false;
                } else if (res.success && data.length === 0) {
                    this.finished = true;
                    this.emit('finished', res);
                } else {
                    console.error(res.msg);
                    this.emit('error', res);
                }
            }
        })
    }
    _getQuerys() {
        return Object.assign({ page_number: this.pageIndex, page_limit: this.pageSize, pageNumber: this.pageIndex, pageLimit: this.pageSize }, this.querys);
    }
    //移动容器
    _translate(diff) {
        this.$wrapper.css({
            "-webkit-transform": "translate(0," + diff + "px)",
            "transform": "translate(0," + diff + "px)"
        });
    }
    //设置效果时间
    _setTranslition(time) {
        this.$wrapper.css({
            "-webkit-transition": "all " + time + "s",
            "transition": "all " + time + "s"
        });
    }
}
export default Listview;