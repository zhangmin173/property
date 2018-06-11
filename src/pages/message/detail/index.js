/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-06 23:11:51
 */

import './index.less';
import Pop from '../../../components/pop';
import Toolkit from '../../../components/toolkit';
import Template from '../../../../libs/lib-artTemplate/index';

$(function() {
    class Index {
        constructor() {
            
            this.id = Toolkit.getUrlParameter('id');
            this.postData = {
                writer_name: '',
                writer_img: '',
                message_txt: '',
                is_reply: 'Y',
                dialogue_id: this.id
            };
            
            Toolkit.userLogin(data => {
                this.postData.writer_name = data.user_name;
                this.postData.writer_img = data.user_img;
                this.init();
            })
            
        }
        init() {
            this.getMessage(data => {
                const tplData = this.initData(data);
                const htmlStr = Template('tpl',tplData);
                $('#app').append(htmlStr);
                this.events();
            })
            
        }
        events() {

            // 保存
            $('#btn').on('click',() => {
                this.postData.message_txt = $('#replayTxt').val();
                console.log(this.postData);
                if (this.postData.message_txt) {
                    this.save(this.postData);
                }
            })

        }
        initData(array) {
            const data = {
                data1: [],
                data2: []
            };
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                if (element.is_readed === 'N') {
                    data.data1.push(element);
                } else {
                    data.data2.push(element);
                }
            }
            return data;
        }
        getMessage(cb) {
            Toolkit.fetch({
                url: '/Message/getMessagesByDialogue_User',
                data: {
                    dialogue_id: this.id
                },
                success: (res) => {
                    if (res.success) {
                        cb && cb(res.data);
                    }
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

    new Index()
});
