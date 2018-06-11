/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-17 11:14:39
 */

import Layer from '../../components/layer/index';

$(function () {

    const layer = new Layer({
        data: {
            headimg: 'http://img0.imgtn.bdimg.com/it/u=489423423,2450269323&fm=27&gp=0.jpg',
            nickname: '游客18520',
            money: 1.3,
            coin: 3001
        },
        wrapper: $('body')
    })


    layer.show();
    
    layer.on('layer-close', () => {
        console.log('close');
    })
    layer.on('layer-click', () => {
        console.log('click');
    })
});
