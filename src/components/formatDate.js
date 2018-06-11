/*
 * @Author: Zhang Min
 * @Date: 2018-05-07 15:56:30
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-07 17:48:20
 */

/**
 * 日期类
 */
class FormatDate {
    constructor() {
      this.date = +new Date();
    }
    formatDate(format = 'yyyy-MM-dd', date) {
      const now = date || new Date();
      const rule = {
        'M+': now.getMonth() + 1,
        'd+': now.getDate(),
        'h+': now.getHours(),
        'm+': now.getMinutes(),
        's+': now.getSeconds(),
        'q+': Math.floor((now.getMonth() + 3) / 3),
        'S+': now.getMilliseconds()
      };
      let formatStr = format;
      if (/(y+)/i.test(formatStr)) {
        formatStr = formatStr.replace(RegExp.$1, (now.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (let k in rule) {
        if (new RegExp(`(${k})`).test(formatStr)) {
          formatStr = formatStr.replace(RegExp.$1, RegExp.$1.length === 1
            ? rule[k] : ('00' + rule[k]).substr(('' + rule[k]).length));
        }
      }
      return formatStr;
    }
  }
  export default FormatDate;
  