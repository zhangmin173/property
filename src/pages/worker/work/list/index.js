/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-07-17 22:49:56
 */

import './index.less';
import Pop from '../../../../components/pop';
import Template from '../../../../../libs/lib-artTemplate/index';
import Tabsview from '../../../../components/tabsview/index';
import Toolkit from '../../../../components/toolkit';
import Datepicker from '../../../../components/datePicker/index';
import Wechat from '../../../../components/wehcat';

$(function () {
    class Index {
        constructor() {
            Wechat.config();
            Toolkit.workerLogin(data => {
                this.init()
            });
        }
        init() {
            this.workTypes = Toolkit.getWorkTypes();
            this.tabs = new Tabsview({
                timeout: 300,
                tabs: [
                    {
                        title: '待处理',
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
            this.tabs.on('success', (res, tabIndex, tabContent, that) => {
                const html = Template('tpl-work-1', res);
                tabContent.find('ul').append(html);
            })
            this.tabs.init();
            
            this.events();
        }
        events() {
            const self = this;

            const postData = {
                work_id: 0,
                work_worker_note: '',
                work_delay_time: '',
                work_status: 'over'
            };

            $('body').on('click', '.jiedan', function() {
                const data = {
                    work_id: $(this).data('id'),
                    work_status: $(this).data('type')
                };
                console.log(data);
                self.update(data);
            })

            $('body').on('click', '.select-item', function() {
                const type = $(this).data('type');
                const work_id = $(this).data('id');
                postData.work_id = work_id;
                if (type == 1) {
                    postData.work_status = 'to_delay';
                    $(this).parents('.panel').find('.select').show();
                } else {
                    postData.work_status = 'over';
                    $(this).parents('.panel').find('.select').hide();
                }
                $('.select-item').removeClass('active');
                $(this).addClass('active');
                $(this).parents('.panel').find('.footer').show();
            })

            
            $('body').on('click', '.select', function() {
                const datePicker = new Datepicker();
                const $date = $(this).find('.date');
                datePicker.on('datepicker-confirm', date => {
                    console.log(date);
                    postData.work_delay_time = `${date.y.id}-${date.m.id}-${date.d.id} ${date.h.id}-${date.i.id}-00`;
                    $date.html(postData.work_delay_time );
                })
            })

            $('body').on('click', '.btn', function() {
                postData.work_worker_note = $(this).parent().find('.text').val();
                self.update(postData);
            })

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
        update(data) {
            Toolkit.fetch({
                url: '/Work/updateWork',
                data,
                success: res => {
                    if (res.success) {
                        window.location.reload();
                    }
                }
            })
        }
    }

    new Index()
});
