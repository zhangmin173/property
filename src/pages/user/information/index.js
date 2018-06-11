/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-27 20:09:53
 */

import './index.less';
import Toolkit from '../../../components/toolkit';
import Pop from '../../../components/pop';
import Reg from '../../../components/reg';

$(function() {
    
    class Index {
        constructor() {
            this.$apptitle = $('.app-nav-title');
            this.$input1 = $('#input-1');
            this.$input2 = $('#input-2');
            this.$tip = $('.tip');
            this.formdata = {};
            this.ajaxing = false;
        }
        init() {
            Toolkit.userLogin(data => {
                this.$input1.find('input').val(data.user_name);
                this.$input2.find('input').val(data.user_phone);
                this.$apptitle.text(this.getAppTitle());
                this.events()
            })
            
        }
        events() {

            // 保存
            $('#btn').on('click',() => {
                if (this.ajaxing) {
                    return false;
                }
                this.ajaxing = true;
                this.formdata.user_name = this.$input1.find('input').val();
                this.formdata.user_phone = this.$input2.find('input').val();
                console.log(this.formdata);
                this.saveInformation(this.formdata);
            })

            
        }
        getAppTitle() {
            let apptitle = '';
            const action = Toolkit.getUrlParameter('action');
            switch(action) {
                case 'nickname':
                    apptitle = '修改昵称';
                    this.$input1.show();
                    break;
                case 'mobile':
                    apptitle = '修改手机号';
                    this.$input2.show();
                    break;
                default:
                    break;
            }
            return apptitle;
        }
        saveInformation(data) {
            Toolkit.fetch({
                url: '/User/updateUser',
                data,
                success: (res) => {
                    if (res.success) {
                        window.location.href = '../center/index.html';
                    } else {
                        Pop.show('error',res.msg).hide();
                    }
                },
                complete: () => {
                    this.ajaxing = false;
                }
            })
        }
    }

    new Index().init()
});
