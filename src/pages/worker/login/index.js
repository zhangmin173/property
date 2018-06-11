/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-08 18:53:10
 */

import './index.less';
import Pop from '../../../components/pop';
import Toolkit from '../../../components/toolkit';

$(function() {
    class Index {
        constructor() {
            
            this.postData = {};
        }
        init() {
            this.ouath();
            this.events()
        }
        events() {
            
            // 登陆
            $('#btn').on('click',() => {
                this.postData.admin_name = $('#input-1').val();
                this.postData.admin_password = $('#input-2').val();
                this.postData.openid = this.oauthInfo.openid;
                console.log(this.postData);
                this.login(this.postData);
            })

        }
        ouath() {
            Toolkit.fetch({
                url: '/Worker/getOpenid',
                data: {
                    visit_url: window.location.href
                },
                success: (res) => {
                    if (res.success) {
                        this.oauthInfo = res.data;
                      } else {
                        window.location.href = res.data;
                      }
                }
            })
        }
        login(data) {
            Toolkit.fetch({
                url: '/Worker/loginAdmin',
                data,
                success: (res) => {
                    if (res.success) {
                        window.location.href = '../work/list/index.html';
                    } else {
                        Pop.show('error',res.msg).hide();
                    }
                }
            })
        }
    }

    new Index().init()
});
