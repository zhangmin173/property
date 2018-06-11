/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-11 21:08:56
 */

import './index.less';
import Pop from '../../../../components/pop';
import Toolkit from '../../../../components/toolkit';
import Template from '../../../../../libs/lib-artTemplate/index';
import Listview from '../../../../components/listview/index';

$(function() {
    class Index {
        constructor() {
            this.$wrap = $('.msg-list');
        }
        init() {
            
            Toolkit.adminLogin(data => {
                this.Listview = new Listview({
                    url: '/Message/getMessagesByAdmin',
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
