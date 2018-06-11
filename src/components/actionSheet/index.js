/*
 * @Author: Zhang Min 
 * @Date: 2018-05-03 07:50:42 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-07 08:31:56
 */

/**
 * 普通选择器
 */
import './index.less';
import Toolkit from '../toolkit';
import EventEmitter from '../eventEmitter';

class ActionSheet extends EventEmitter {
    constructor(opt) {
        super();
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
export default ActionSheet;