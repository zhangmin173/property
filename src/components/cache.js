/*
 * @Author: 张敏
 * @Date: 2018-04-17 09:18:17
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-07 17:46:49
 */

/**
 * 兼容locastorage和cookie的前端存储类
 */
import Cookie from './cookie';
import Storage from './storage';

class Cache {
  constructor(opt) {
    const opts = opt || {};

    this.cache = new Cookie(opts);
    if (window.localStorage) {
      this.cache = new Storage(opts);
    }
  }
  set(key, value, expiredays = 0) {
    this.cache.set(key, value, expiredays);
  }
  get(key) {
    return this.cache.get(key);
  }
  remove(key) {
    this.cache.remove(key);
  }
}

export default Cache;
