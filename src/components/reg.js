/*
 * @Author: 张敏 
 * @Date: 2018-04-17 08:41:11 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-04-29 16:20:07
 */

/**
 * 正则类函数
 */
const Reg = (function () {
  return {

    isMobile(mobile) {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      return reg.test(mobile);
    }

  }
})();
export default Reg