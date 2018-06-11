/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-29 21:20:40
 */

import './index.less';
import Pop from '../../../components/pop';
import Toolkit from '../../../components/toolkit';
import Template from '../../../../libs/lib-artTemplate/index';
import Listview from '../../../components/listview/index';

$(function() {
    class Index {
        constructor() {
            this.$wrap = $('.msg-list');
        }
        init() {
            
            Toolkit.userLogin(data => {
                this.Listview = new Listview({
                    url: '/Message/getMessages',
                    query: {
                        user_id: data.user_id
                    }
                })
                this.Listview.on('success', res => {
                    const htmlStr = Template('tpl', res);
                    this.$wrap.append(htmlStr);
                })
                this.Listview.init();
            });
        }
    }

    new Index().init()
});
