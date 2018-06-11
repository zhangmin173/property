/*
 * @Author: 张敏
 * @Date: 2018-04-17 09:18:17
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-07 17:47:58
 */

/**
 * 封装localStorage
 */
import FormatDate from './formatDate';

class Storage {
  constructor(opt) {
    this.opt = opt || {};
    this.prefix = this.opt.prefix || '';
  }
  set(key, value, expiredays = 0) {
    const formatDate = new FormatDate();
    const dbData = {
      data: value,
      expire_time: formatDate.formatDate('yyyy-MM-dd', new Date(new Date().getTime() + expiredays * 24 * 3600 * 1000))
    };
    try {
      window.localStorage.setItem(this._getkey(key), JSON.stringify(dbData));
    } catch (e) {

    }
  }
  get(key) {
    const formatDate = new FormatDate();
    const today = formatDate.formatDate();
    let value = null;
    try {
      const dbData = JSON.parse(window.localStorage.getItem(this._getkey(key)));
      if (dbData.expire_time >= today) {
        value = dbData.data;
      }
    } catch (e) {

    }
    return value;
  }
  remove(key) {
    let data = null;
    try {
      data = window.localStorage.getItem(this._getkey(key));
    } catch (e) {

    }
    if (data) {
      try {
        window.localStorage.removeItem(this._getkey(key));
      } catch (e) {

      }
    }
  }
  _getkey(key) {
    return `${this.prefix}-${key}`;
  }
}

export default Storage;
