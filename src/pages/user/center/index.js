/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-26 11:26:15
 */

import './index.less';
import Toolkit from '../../../components/toolkit';
import defaultHeadimg from '../../../common/images/default-headimg.jpg';

$(function () {

    class index {
        constructor() {
            Toolkit.userLogin(data => {
                this.setuserinfo({
                    headimg: data.user_img,
                    nickname: data.user_name,
                    mobile: data.user_phone
                })
                this.init();
            });
        }
        init() {
            Toolkit.uploadInit('uploadBtn', res => {
                if (res.success) {
                    this.uploadSuccess(res.rows);
                }
            }, 'property', 'headimg');
        }
        uploadSuccess(data) {
            this.saveuserinfo({
                user_img: data.attach_path
            }, data => {
                $('.headimg').css('backgroundImage', `url('${data.user_img}')`);
            })
        }
        saveuserinfo(data,cb) {
            Toolkit.fetch({
                url: '/User/updateUser',
                data,
                success: res => {
                    cb && cb(res.data);
                }
            })
        }
        setuserinfo(data) {
            if (data.headimg) {
                $('.headimg').css('backgroundImage', `url('${data.headimg}')`);
            } else {
                $('.headimg').css('backgroundImage', `url('${defaultHeadimg}')`);
            }
            if (data.nickname) {
                $('.nickname').text(data.nickname);
            } else {
                $('.nickname').text('暂未注册');
            }
            if (data.mobile) {
                $('.mobile').text(Toolkit.mobile2show(data.mobile));
            } else {
                $('.mobile').text('手机号暂未绑定');
            }
        }
    }

    new index();
});
