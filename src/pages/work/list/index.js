/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-08 08:20:58
 */

import './index.less';
import Template from '../../../../libs/lib-artTemplate/index';
import Tabsview from '../../../components/tabsview/index';
import Toolkit from '../../../components/toolkit';

$(function () {
    class Index {
        constructor() {
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
                const link = $(this).data('voice');
                if ($(this).data('play') === 'playing') {
                    player.pause();
                    $(this).data('play', 'puase');
                } else {
                    player.play(link);
                    $(this).data('play', 'playing');
                }
                
            })
        }
    }

    new Index().init()
});
