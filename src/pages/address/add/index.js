/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-08 19:19:16
 */

import './index.less';
import Toolkit from '../../../components/toolkit';
import pop from '../../../components/pop';
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

            Toolkit.userLogin((data) => {
                this.initAddressBox();
                this.events()
            })
        }
        initAddressBox() {
            this.$input1 = $('#input-1');
            this.$input2 = $('#input-2');
            this.$input3 = $('#input-3');
            this.$input4 = $('#input-4');
            if (this.debug) {
                this.getProjectsNear(30.24, 120.34, res => {
                    this.projectData = res.data;
                    const data = this.initProjectData(res.data);
                    this.map = new Map(null, {
                        data: data,
                        lat: data[0].lat,
                        lng: data[0].lng,
                        key: this.mapinfo.key,
                        app: this.mapinfo.app,
                        listview: 2
                    });
                    this.map.on('map-click', marker => {
                        this.markerClickSuccess(marker);
                    })
                })
            } else {
                Wechat.getLocation(res => {
                    this.getProjectsNear(res.lat, res.lng, res => {
                        this.projectData = res.data;
                        const data = this.initProjectData(res.data);
                        this.map = new Map(null, {
                            data: data,
                            lat: data[0].lat,
                            lng: data[0].lng,
                            key: this.mapinfo.key,
                            app: this.mapinfo.app,
                            listview: 2
                        });
                        this.map.on('map-click', marker => {
                            this.markerClickSuccess(marker);
                        })
                    })
                })
            }

            $('#address').show();
            // 打开地图
            this.$input1.on('click', () => {
                this.map.show();
            })

            // 保存
            $('#btn-save-addr').on('click', () => {
                this.formdata.address_txt_1 = this.$input1.find('input').val();
                this.formdata.address_txt_2 = this.$input2.find('input').val();
                this.formdata.address_user_name = this.$input3.find('input').val();
                this.formdata.address_phone = this.$input4.find('input').val();
                this.formdata.address_x = this.selectProjectData.address_x;
                this.formdata.address_y = this.selectProjectData.address_y;
                this.formdata.project_id = this.selectProjectData.project_id;
                if (!this.formdata.address_txt_1 || !this.formdata.address_txt_2 || !this.formdata.address_user_name || !this.formdata.address_phone) {
                    Pop.show('error', '所有选项均为必填').hide(800);
                    return false;
                }
                if (!reg.isMobile(this.formdata.address_phone)) {
                    Pop.show('error', '请填写正确的手机号').hide(800);
                    return false;
                }
                this.saveAddress(this.formdata, res => {
                    if (res.success) {
                        this.addressDesc = res.data;
                        this.$select3.find('.select-name').text(this.formdata.address_txt_1 + this.formdata.address_txt_2);
                        $('#address').hide();
                    }
                });
            })
        }
        markerClickSuccess(marker) {
            if (marker) {
                this.map.hide();
                this.selectProjectData = this.getProjectById(marker.id);
                if (this.selectProjectData) {
                    this.$input1.find('input').val(this.selectProjectData.project_address);
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
                    lat: item.address_x,
                    lng: item.address_y,
                    title: item.title,
                    addr: item.project_address
                };
                arr.push(element);
            }
            return arr;
        }
        events() {

            // 打开地图
            this.$input1.on('click', () => {
                this.map.show();
            })

            // 保存
            $('#btn').on('click', () => {
                this.formdata.address_txt_1 = this.$input1.find('input').val();
                this.formdata.address_txt_2 = this.$input2.find('input').val();
                this.formdata.address_user_name = this.$input3.find('input').val();
                this.formdata.address_phone = this.$input4.find('input').val();
                console.log(this.formdata);
                if (!this.formdata.address_txt_1 || !this.formdata.address_txt_2 || !this.formdata.address_user_name || !this.formdata.address_phone) {
                    pop.show('error', '所有选项均为必填').hide(800);
                    return false;
                }
                if (!reg.isMobile(this.formdata.address_phone)) {
                    pop.show('error', '请填写正确的手机号').hide(800);
                    return false;
                }
                this.saveAddress(this.formdata);
            })
        }
        getProjectsNear(lat, lng, cb) {
            Toolkit.fetch({
                url: '/Project/getProjectsNear',
                data: {
                    address_x: lat,
                    address_y: lng
                },
                success: (res) => {
                    pop.hide(0);
                    if (res.success) {
                        cb && cb(res);
                    } else {
                        pop.show('error', res.msg).hide();
                    }
                }
            })
        }
        saveAddress(data) {
            pop.show('success', '提交中，请稍后');
            Toolkit.fetch({
                url: '/Address/createAddress',
                data,
                success: (res) => {
                    pop.hide(0);
                    if (res.success) {
                        window.location.href = '../list/index.html';
                    } else {
                        pop.show('error', res.msg).hide();
                    }
                }
            })
        }
    }

    new Index().init()
});
