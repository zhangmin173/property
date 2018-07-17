/*
 * @Author: 张敏 
 * @Date: 2018-04-17 08:41:11 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-07-17 21:56:43
 */

/**
 * 工具类函数
 */
const Toolkit = (function () {
  return {
    /**
     * ajax请求
     * @param {ajax参数} options 
     */
    fetch(options) {
      let _default = {
        url: options.url,
        type: options.type || 'post',
        data: options.data || {},
        success: (res) => {
          // console.log(res);
          options.success && options.success(res);
        },
        error: (err) => {
          options.error && options.error(err);
        },
        complete: () => {
          options.complete && options.complete();
        }
      };
      if (window.location.href.indexOf('admin.nextdog.cc') > -1) {
        _default.url = 'http://admin.nextdog.cc/Projects/WuYe/index.php/home' + _default.url
      }
      if (window._global && window._global.userinfo) {
        _default.data.user_id = window._global.userinfo.user_id;
      }
      if (window._global && window._global.admininfo) {
        _default.data.admin_id = window._global.admininfo.admin_id;
      }
      if (window._global && window._global.workerinfo) {
        _default.data.worker_id = window._global.workerinfo.worker_id;
      }
      $.ajax(_default);
    },
    /**
     * 用户登陆
     */
    userLogin(cb) {
      window._global = window._global || {};
      if (!window._global.userinfo) {
        this.fetch({
          url: '/User/createUser',
          data: {
            visit_url: window.location.href
          },
          success: res => {
            if (res.success) {
              window._global.userinfo = res.data;
              cb && cb(res.data);
            } else {
              window.location.href = res.data;
            }
          }
        })
      } else {
        cb && cb(window._global.userinfo);
      }
    },
    /**
     * 主管登陆
     */
    adminLogin(cb) {
      window._global = window._global || {};
      if (!window._global.admininfo) {
        this.fetch({
          url: '/Admin/ifLogin',
          data: {
            visit_url: window.location.href
          },
          success: res => {
            if (res.success) {
              window._global.admininfo = res.data;
              cb && cb(window._global.admininfo);
            } else {
              window.location.href = 'http://admin.nextdog.cc/Projects/WuYe/dist/admin/login/index.html';
            }
          }
        })
      } else {
        cb && cb(window._global.admininfo);
      }
    },
    /**
     * 主管登陆
     */
    workerLogin(cb) {
      window._global = window._global || {};
      if (!window._global.workerinfo) {
        this.fetch({
          url: '/Worker/ifLogin',
          data: {
            visit_url: window.location.href
          },
          success: res => {
            if (res.success) {
              window._global.workerinfo = res.data;
              cb && cb(window._global.workerinfo);
            } else {
              window.location.href = 'http://admin.nextdog.cc/Projects/WuYe/dist/worker/login/index.html';
            }
          }
        })
      } else {
        cb && cb(window._global.workerinfo);
      }
    },
    /**
     * 上传初始化
     * @param {*} obj 
     * @param {*} cb 
     * @param {*} key 
     * @param {*} type 
     */
    uploadInit(obj, cb, key = 'property', type = 'source') {
      $("#" + obj).uploadifive({
        formData: { relation_key: key, relation_type: type },
        fileObjName: 'postedFile',
        removeCompleted: true,
        fileSizeLimit: '20240KB',
        buttonClass: 'upload-components',
        fileType: 'image/*',
        uploadScript: 'http://admin.nextdog.cc/Projects/weiLuoXuan/index.php/home/attachment/upload',
        buttonText: '',
        onUploadComplete: (file, res, response) => {
          res = $.parseJSON(res);
          res.data = res.rows;
          if (res.success) {
            res.data.attach_path = 'http://admin.nextdog.cc' + res.data.attach_path;
          }
          cb && cb(res);
        }
      })
    },
    /**
     * 上传初始化
     * @param {*} obj 
     * @param {*} cb 
     * @param {*} key 
     * @param {*} type 
     */
    uploadify(obj, cb, key = 'property', type = 'source') {
      $("#" + obj).uploadify({
        formData: { relation_key: key, relation_type: type },
        fileObjName: 'postedFile',
        removeCompleted: true,
        fileSizeLimit: '20240KB',
        buttonClass: 'upload-components',
        swf: '//admin.nextdog.cc/Projects/WuYe/dist/libs/uploadify/uploadify.swf',
        fileType: 'image/*',
        uploader: 'http://admin.nextdog.cc/Projects/weiLuoXuan/index.php/home/attachment/upload',
        buttonText: '',
        onUploadComplete: (file, res, response) => {
          res = $.parseJSON(res);
          res.data = res.rows;
          if (res.success) {
            res.data.attach_path = 'http://admin.nextdog.cc' + res.data.attach_path;
          }
          cb && cb(res);
        }
      })
    },
    /**
     * 获取url参数
     * @param {参数名称} name 
     * @param {utl地址} path 
     */
    getUrlParameter(name, path = window.location.href) {
      const result = decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(path) || [undefined, ''])[1].replace(/\+/g, '%20')) || null;
      return result ? result.split('/')[0] : '';
    },
    /**
     * 手机号隐藏4位
     * @param {手机号} tel 
     */
    mobile2show(tel) {
      return tel.substr(0, 3) + '****' + tel.substr(7);;
    },
    /**
     * 获取工单类型
     * @param {工单类型} type 
     */
    getWorkTypes(index) {
      return ['to_send', 'to_deal', 'in_deal', 'to_delay', 'over'];
    },
    /**
     * 获取工单类型字段
     * @param {工单类型} type 
     */
    getWorkStatus(type) {
      const status = {
        to_send: '待处理',
        to_deal: '派单中',
        in_deal: '处理中',
        to_delay: '延期转单',
        over: '已完成'
      };
      if (status[type]) {
        return status[type];
      }
      return status.to_send;
    },
    /**
     * 获取腾讯地图key
     */
    getMapInfo() {
      return {
        key: 'YL2BZ-2MRLU-HG7VH-B46PY-DMJW3-55FCV',
        app: 'xiongwei'
      };
    },
    player() {
      if (!$('#player').size()) {
          $('body').append('<audio id="player" src="">您的浏览器不支持 audio 标签。</audio>');
      }
      const player = document.getElementById("player");
      return {
        play: function(link, cb) {
          player.src = link;
          player.play();
          player.addEventListener('ended', function () {  
            cb && cb();
            player.removeEventListener('ended', cb);
          }, false);
        },
        pause: function() {
          player.pause();
        }
      };
    }
  }
})();
export default Toolkit