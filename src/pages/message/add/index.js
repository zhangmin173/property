/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-05 23:05:50
 */

import './index.less';
import Pop from '../../../components/pop';
import Toolkit from '../../../components/toolkit';

$(function() {
    class Index {
        constructor() {
            this.$complaint = $('#complaint');

            this.postData = {
                writer_name: '',
                writer_img: '',
                message_txt: '',
                is_reply: 'N',
            };
            
            Toolkit.userLogin(data => {
                this.postData.writer_name = data.user_name;
                this.postData.writer_img = data.user_img;
            })
            
        }
        init() {
            
            this.events()
        }
        events() {

            // 保存
            $('#btn').on('click',() => {
                this.postData.message_txt = this.$complaint.val();
                console.log(this.postData);
                if (this.postData.message_txt) {
                    this.save(this.postData);
                }
            })

        }
        save(data) {
            Toolkit.fetch({
                url: '/Message/createMessageByUser',
                data,
                success: (res) => {
                    if (res.success) {
                        window.location.href = '../list/index.html';
                    } else {
                        Pop.show('error',res.msg).hide();
                    }
                }
            })
        }
    }

    new Index().init()
});
