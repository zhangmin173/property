/*
 * @Author: 张敏 
 * @Date: 2018-04-17 08:41:11 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-08 23:49:17
 */

/**
 * 微信类函数
 */
import Toolkit from '../components/toolkit';
const Wechat = (function () {
    return {
        /**
         * 微信接口注册
         * @param {微信接口注册的参数} data 
         */
        config(debug = false) {
            Toolkit.fetch({
                url: '/Weixin/getWxsdk',
                data: {
                    visitUrl: window.location.href
                },
                success: res => {
                    if (res.success) {
                        const data = res.data;
                        wx.config({
                            debug: debug,
                            appId: data.appId, // 必填，公众号的唯一标识
                            timestamp: data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: data.nonceStr, // 必填，生成签名的随机串
                            signature: data.signature,// 必填，签名
                            jsApiList: [
                                'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone',
                                'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'stopVoice', 'uploadVoice', 'downloadVoice',
                                'previewImage',
                                'getLocation'
                            ] // 必填，需要使用的JS接口列表
                        });
                    } else {
                        console.error('')
                    }
                }
            })
        },
        ready(cb) {
            wx.ready(function(){
                cb && cb();
            });
        },
        /**
         * 预览图片
         * @param {图片数组} urls 
         * @param {数组index或图片url} index 
         */
        previewImage(urls, index) {
            let current = null;
            if (index && typeof index === 'number') {
                current = urls[index]
            } else if (index && typeof index === 'string') {
                current = index;
            } else {
                current = urls[0];
            }
            wx.previewImage({
                current: current, // 当前显示图片的http链接
                urls: urls // 需要预览的图片http链接列表
            });
        },
        startRecord(cb) {
            wx.startRecord();
            wx.onVoiceRecordEnd({
                complete: function (res) {
                    cb && cb(res.localId);
                }
            });
        },
        stopRecord(cb) {
            wx.stopRecord({
                success: function (res) {
                    cb && cb(res.localId);
                }
            });
        },
        playVoice(localId) {
            wx.playVoice({
                localId
            });
        },
        pauseVoice(localId) {
            wx.pauseVoice({
                localId
            });
        },
        stopVoice(localId) {
            wx.stopVoice({
                localId
            });
        },
        uploadVoice(localId, cb, isShowProgressTips = 1) {
            wx.uploadVoice({
                localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                isShowProgressTips, // 默认为1，显示进度提示
                success: function (res) {
                    cb && cb(res.serverId);
                }
            });
        },
        downloadVoice(serverId, cb, isShowProgressTips = 1) {
            wx.downloadVoice({
                serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
                isShowProgressTips, // 默认为1，显示进度提示
                success: function (res) {
                    cb && cb(res.localId);
                }
            });
        },
        getLocation(cb) {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    const lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    const lng = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    cb && cb({lat, lng});
                }
            });
        }
    }
})();
export default Wechat