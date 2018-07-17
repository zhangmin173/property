/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-07-17 22:49:56
 */

import './index.less';
import Template from '../../../../libs/lib-artTemplate/index';
import Tabsview from '../../../components/tabsview/index';
import Toolkit from '../../../components/toolkit';
import Wechat from '../../../components/wehcat';

$(function () {
    class Index {
        constructor() {
            Wechat.config();
            this.workTypes = Toolkit.getWorkTypes();
            this.tabs = new Tabsview({
                timeout: 300,
                tabs: [
                    {
                        title: '待处理',
                        url: '/Work/getWorks',
                        querys: {
                            work_status: this.workTypes[0]
                        }
                    },
                    {
                        title: '派单中',
                        url: '/Work/getWorks',
                        querys: {
                            work_status: this.workTypes[1]
                        }
                    },
                    {
                        title: '处理中',
                        url: '/Work/getWorks',
                        querys: {
                            work_status: this.workTypes[2]
                        }
                    },
                    {
                        title: '已完成',
                        url: '/Work/getWorks',
                        querys: {
                            work_status: this.workTypes[4]
                        }
                    },
                    {
                        title: '延期转单',
                        url: '/Work/getWorks',
                        querys: {
                            work_status: this.workTypes[3]
                        }
                    }
                ]
            });

        }
        init() {
            this.tabs.on('success', (res, tabIndex, tabContent, that) => {
                const html = Template('tpl-work-1', res);
                tabContent.find('ul').append(html);
            })

            Toolkit.userLogin(() => {
                this.tabs.init();
                this.events();
            });
        }
        events() {
            // todo
            const player = Toolkit.player();
            $('body').on('click', '.yuyin', function() {
                const _this = $(this);
                const link = _this.data('voice');
                if (_this.data('play') === 'playing') {
                    player.pause();
                    _this.removeClass('playing');
                    _this.data('play', 'puase');
                } else {
                    player.play(link, () => {
                        _this.removeClass('playing');
                        _this.data('play', 'puase');
                    });
                    _this.addClass('playing');
                    _this.data('play', 'playing');
                }
            })

            $('body').on('click', '.img', function() {
                const _this = $(this);
                const link = _this.data('url');
                const imgArr = [];
                _this.parents('.imgs').find('.img').each(function() {
                    const url = $(this).data('url');
                    imgArr.push(url);
                })
                Wechat.previewImage(imgArr, link);
            })
        }
    }

    new Index().init()
});
