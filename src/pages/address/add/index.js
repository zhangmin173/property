/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-07-21 19:42:20
 */

import './index.less';
import Toolkit from '../../../components/toolkit';
import Pop from '../../../components/pop';
import reg from '../../../components/reg';
import Map from '../../../components/map/index';
import Wechat from '../../../components/wehcat';

$(function () {

    class Index {
        constructor() {
            this.$input1 = $('#input-1');
            this.$input2 = $('#input-2');
            this.$input3 = $('#input-3');
            this.$input4 = $('#input-4');
            this.formdata = {
                address_txt_1: '',
                address_txt_2: '',
                address_x: '',
                address_y: '',
                address_user_id: '',
                address_user_name: '',
                address_phone: ''
            };
            this.mapinfo = Toolkit.getMapInfo();
            this.debug = window.location.hostname === 'localhost' ? true : false;
        }
        init() {
            Wechat.config();

            Toolkit.userLogin(data => {
                this.event();
            })
        }
        event() {
            // 打开地图
            this.$input1.on('click', () => {
                if (this.map) {
                    this.map.show();
                } else {
                    this.initAddressBox();
                }
            })
        }
        initAddressBox() {
            if (this.debug) {
                this.getProjectsNear(30.24, 120.34, res => {
                    this.projectData = res.data || [];
                    if (this.projectData.length === 0) {
                        Pop.show('error', '一公里内没有匹配项目，如果情况紧急请给我们留言').hide(2000);
                        return false;
                    }
                    const data = this.initProjectData(res.data);
                    this.map = new Map(null, {
                        data: data,
                        lat: data[0].lat,
                        lng: data[0].lng,
                        key: this.mapinfo.key,
                        app: this.mapinfo.app
                    });
                    this.map.on('map-click', marker => {
                        this.markerClickSuccess(marker);
                    })
                    this.map.show();
                })
            } else {
                Wechat.getLocation(res => {
                    this.getProjectsNear(res.lat, res.lng, res => {
                        this.projectData = res.data || [];
                        if (this.projectData.length === 0) {
                            Pop.show('error', '一公里内没有匹配项目，如果情况紧急请给我们留言').hide(2000);
                            return false;
                        }
                        const data = this.initProjectData(res.data);
                        this.map = new Map(null, {
                            data: data,
                            lat: data[0].lat,
                            lng: data[0].lng,
                            key: this.mapinfo.key,
                            app: this.mapinfo.app
                        });
                        this.map.on('map-click', marker => {
                            this.markerClickSuccess(marker);
                        })
                        this.map.show();
                    })
                })
            }
            

            // 保存
            let btnSaveAddrDisabled = false;
            $('#btn').on('click', () => {
                if (btnSaveAddrDisabled) {
                    return false;
                }
                btnSaveAddrDisabled = true;
                this.formdata.address_txt_1 = this.$input1.find('.input-enter').text();
                this.formdata.address_txt_2 = this.$input2.find('input').val();
                this.formdata.address_user_name = this.$input3.find('input').val();
                this.formdata.address_phone = this.$input4.find('input').val();
                if (this.selectProjectData) {
                    this.formdata.address_x = this.selectProjectData.address_x;
                    this.formdata.address_y = this.selectProjectData.address_y;
                    this.formdata.project_id = this.selectProjectData.project_id;
                }
                this.saveAddress(this.formdata);
            })
        }
        markerClickSuccess(marker) {
            if (marker) {
                this.map.hide();
                this.selectProjectData = this.getProjectById(marker.id);
                if (this.selectProjectData) {
                    this.$input1.find('.input-enter').text(this.selectProjectData.project_address);
                }
            }
        }
        getProjectById(id) {
            let data = null;
            for (let index = 0; index < this.projectData.length; index++) {
                const element = this.projectData[index];
                if (element.project_id == id) {
                    data = element
                }
            }
            return data;
        }
        initProjectData(array) {
            let arr = [];
            for (let index = 0; index < array.length; index++) {
                const item = array[index];
                const element = {
                    id: item.project_id,
                    lat: item.address_y,
                    lng: item.address_x,
                    title: item.project_name,
                    addr: item.project_address
                };
                arr.push(element);
            }
            return arr;
        }
        getProjectsNear(lat, lng, cb) {
            Toolkit.fetch({
                url: '/Project/getProjectsNear',
                data: {
                    address_x: lat,
                    address_y: lng
                },
                success: (res) => {
                    if (res.success) {
                        cb && cb(res);
                    } else {
                        Pop.show('error', res.msg).hide();
                    }
                }
            })
        }
        saveAddress(data) {
            Toolkit.fetch({
                url: '/Address/createAddress',
                data,
                success: (res) => {
                    if (res.success) {
                        window.location.href = '../list/index.html';
                    } else {
                        Pop.show('error', res.msg).hide();
                    }
                }
            })
        }
    }

    new Index().init()
});
