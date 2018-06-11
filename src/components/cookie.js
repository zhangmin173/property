/*
 * @Author: 张敏
 * @Date: 2018-04-17 09:18:05
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-07 17:47:03
 */

/**
 * 封装cookie
 */
class Cookie {
	constructor(opt) {
	  this.opt = opt || {};
	  this.prefix = this.opt.prefix || '';
	}
	set(key, value, expiredays = 0) {
	  const now = new Date();
	  now.setHours(23, 59, 59, 59);
	  const timeStamp = now.getTime() + expiredays * 24 * 60 * 60 * 1000;
	  let date = new Date(timeStamp);
	  document.cookie = this._getkey(key) + '=' + JSON.stringify(value) + ';' + 'expires=' + date;
	}
	get(key) {
	  let value = null;
	  const curKey = this._getkey(key);
	  if (document.cookie.length) {
		for (let arr = document.cookie.split(';'), i = 0; i < arr.length; i++) {
		  const keyLen = curKey.length + 1;
		  const ck = this._trim(arr[i]);
  
		  if (ck.substring(0, keyLen) === curKey + '=') {
			value = JSON.parse(ck.substring(keyLen));
			break;
		  }
		}
	  }
	  return value;
	}
	remove(key) {
	  if (document.cookie.length) {
		let d = new Date();
		d.setTime(d.getTime() - 24 * 60 * 60 * 1000);
		document.cookie = this._getkey(key) + '=;' + 'expires=' + d;
	  }
	}
	_trim(str) {
	  return str.replace(/(^\s*)|(\s*$)/g, '');
	}
	_getkey(key) {
	  return `${this.prefix}-${key}`;
	}
  }
  
  export default Cookie;
  