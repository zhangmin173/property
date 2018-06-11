/*
 * @Author: Zhang Min 
 * @Date: 2018-05-03 08:19:32 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-04 14:29:32
 */

/**
 * 自定义事件
 */
const Event = (function () {
    return {
        /**
         * 注册事件
         * @param {事件名词} eventName 
         * @param {事件执行} callback 
         */
        on(eventName, callback) {
            if (!this.handlers) {
                Object.defineProperty(this, "handlers", {
                    value: {},
                    enumerable: false,
                    configurable: true,
                    writable: true
                })
            }

            if (!this.handlers[eventName]) {
                this.handlers[eventName] = [];
            }
            this.handlers[eventName].push(callback);
        },
        /**
         * 触发事件
         * @param {事件名词} eventName 
         */
        emit(eventName) {
            if (this.handlers && this.handlers[arguments[0]]) {
                for (var i = 0; i < this.handlers[arguments[0]].length; i++) {
                    this.handlers[eventName][i].apply(null, [].slice.call(arguments, 1));
                }
            }
        },
        remove(eventName, callback) {
            if (this.handlers[type] instanceof Array) {
                const handlers = this.handlers[type];
                for (let i = 0, len = handlers.length; i < len; i++) {
                    if (handlers[i] === handler) {
                        break;
                    }
                }
                handlers.splice(i, 1);
            }
        }
    }
})();
export default Event;