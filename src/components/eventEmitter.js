/*
 * @Author: Zhang Min
 * @Date: 2018-05-07 08:16:25
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-07-02 20:12:33
 */

class EventEmitter {
  constructor() {
    this.handlers = {};
  }
  /**
       * 注册事件
       * @param {事件名词} eventName
       * @param {事件执行} callback
       */
  on(eventName, callback) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(callback);
  }
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
  }
  /**
   * 触发事件
   * @param {事件名词} eventName
   */
  trigger(eventName) {
    if (this.handlers && this.handlers[arguments[0]]) {
      for (var i = 0; i < this.handlers[arguments[0]].length; i++) {
        this.handlers[eventName][i].apply(null, [].slice.call(arguments, 1));
      }
    }
  }
  /**
   * 移除事件
   * @param {事件名词} eventName
   * @param {事件} callback
   */
  remove(eventName, callback) {
    if (this.handlers[eventName] instanceof Array) {
      const handlers = this.handlers[eventName];
      for (let i = 0, len = handlers.length; i < len; i++) {
        if (handlers[i] === callback) {
          this.handlers[eventName].splice(i, 1);
          break;
        }
      }
    }
  }
}

export default EventEmitter;
