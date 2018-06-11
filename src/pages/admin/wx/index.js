/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-06 22:15:56
 */

import './index.less';
import Pop from '../../../components/pop';
import Toolkit from '../../../components/toolkit';

$(function() {
    class Index {
        constructor() {
            
            this.oauthInfo = {};
        }
        init() {
            this.ouath(data => {
                $('#openid').html('您的邀请码： ' + data.openid);
            });
        }
        ouath(cb) {
            Toolkit.fetch({
                url: '/Admin/getOpenid',
                data: {
                    visit_url: window.location.href
                },
                success: (res) => {
                    if (res.success) {
                        this.oauthInfo = res.data;
                        cb && cb(res.data);
                      } else {
                        window.location.href = res.data;
                      }
                }
            })
        }
    }

    new Index().init()
});
