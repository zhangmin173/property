/*
 * @Author: Zhang Min 
 * @Date: 2018-05-03 07:50:42 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-07 08:08:51
 */

/**
 * picker选择器
 */
import './index.less';
import Toolkit from '../toolkit';
import Event from '../event';

class Demo {
    constructor(opt) {
        Object.assign(this, Event);
        this.opt = opt;
        
        this.debug = this.opt.debug || false; // 开启调试
        
    }
    init() {
        // 首次数据加载


    }
    _log(msg) {
        if (this.debug) {
            console.log(msg);
        }
    }
}
export default Demo;