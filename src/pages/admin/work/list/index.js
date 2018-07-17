/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-07-17 22:49:39
 */

import './index.less';
import Pop from '../../../../components/pop';
import Template from '../../../../../libs/lib-artTemplate/index';
import Tabsview from '../../../../components/tabsview/index';
import Toolkit from '../../../../components/toolkit';
import BetterPicker from 'better-picker';
import Wechat from '../../../../components/wehcat';

$(function () {
    class Index {
        constructor() {
            Wechat.config();
            Toolkit.adminLogin(data => {
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
            this.tabs.on('success', (res, tabIndex, tabContent, that) => {
                const html = Template('tpl-work-1', res);
                tabContent.find('ul').append(html);
            })
            this.tabs.init();

            // 获取报修类型
            this.getWorkers((data) => {
                this.workers = data;
                const workers = this.createData(this.workers);
                this.workerwheel = new BetterPicker({
                    data: [
                        workers
                    ],
                    title: '派单给维修员'
                });
                this.workerwheel.on('picker.select', (selectedVal, selectedIndex) => {
                    const worker = this.workers[selectedIndex[0]];
                    this.paijian(worker);
                })
            })
            
            this.events();
        }
        events() {
            const self = this;
            // todo
            $('.tabs-components').on('click', '.paijian', function() {
                self.work_id = $(this).data('id');
                self.workerwheel.show();
            })
            
            const player = Toolkit.player();
            $('body').on('click', '.yuyin', function() {
                const _this = $(this);
                const link = _this.data('voice');
                if (_this.data('play') === 'playing') {
                    player.pause();
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
        paijian(worker) {
            if (!this.work_id) {
                return false;
            }
            Toolkit.fetch({
                url: '/Work/updateWork',
                data: {
                    work_id: this.work_id,
                    work_worker_id: worker.worker_id,
                    work_worker_name: worker.worker_name,
                    work_worker_phone: worker.worker_phone,
                    work_status: this.workTypes[1]
                },
                success: res => {
                    if (res.success) {
                        window.location.reload();
                    }
                }
            })
        }
        createData(data) {
            let arr = [];
            data.forEach(item => {
                const obj = {
                    text: item.worker_name,
                    value: item.worker_id
                }
                arr.push(obj);
            })
            return arr;
        }
        getWorkers(cb) {
            Toolkit.fetch({
                url: '/Worker/getWorkers',
                success: (res) => {
                    if (res.success) {
                        cb && cb(res.data);
                    }
                }
            })
        }
    }

    new Index()
});
