/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: 张敏
 * @Last Modified time: 2018-07-19 22:27:13
 */

import './index.less';
import moonpng from '../../../common/images/moon.png';

import Pop from '../../../components/pop';
import Toolkit from '../../../components/toolkit';
import BetterPicker from 'better-picker';
import Formatdate from '../../../components/formatDate';
import Wechat from '../../../components/wehcat';
import Map from '../../../components/map/index';

$(function () {
    class Index {
        constructor() {
            this.userinfo = null;

            this.type1 = 0;
            this.type2 = 0;
            this.imgs = [];
            this.formdata = {
                address_txt_1: '',
                address_txt_2: '',
                address_x: '',
                address_y: '',
                address_user_name: '',
                address_phone: ''
            };
            this.workData = {
                address_txt_1: '',
                address_txt_2: '',
                address_x: '',
                address_y: '',
                address_user_name: '',
                address_phone: '',
                work_voice: '',
                voice_time: 0,
            };
            this.mapinfo = Toolkit.getMapInfo();
            this.debug = window.location.hostname === 'localhost' ? true : false;
        }
        init() {
            // 夜晚模式
            if (this.isNight()) {
                $('#night .moon').css('background-image', `url('${moonpng}')`);
                $('#night').show();
            } else {
                Wechat.config();
                $('#app').show();
                this.$select1 = $('#select1');
                this.$select2 = $('#select2');
                this.$select3 = $('#select3');
                Toolkit.userLogin((data) => {
                    this.userinfo = data;
                    this.setUserInfo(this.userinfo);
                    this.event();
                })
            }
        }
        event() {
            // 初始化上传
            $('.upload').on('click', () => {
                Wechat.uploadImage(serverId => {
                    console.log('uploadImage: ' + serverId);
                    Toolkit.fetch({
                        url: '/Work/uploadImg',
                        data: {
                            img_id: serverId
                        },
                        success: res => {
                            console.log('uploadImage: ' + res);
                            if (res.success) {
                                this.uploadSuccess(res.data);
                            }
                        }
                    })
                })
            })

            // 点击上传点图片删除
            $('.imgs-box').on('click', '.img', (e) => {
                const index = e.target.dataset.index;
                this.imgs.splice(index, 1);
                $('.imgs-box').find('.img').eq(index).remove();
                $('.upload').show();
            })
            // 获取报修类型
            this.getTypes((data) => {
                this.types = data;
                const type1 = this.getFirstType();
                this.type1wheel = new BetterPicker({
                    data: [
                        type1
                    ],
                    title: '请选择大类'
                });
                const type2 = this.getSecondType(type1[0].value);
                this.type2wheel = new BetterPicker({
                    data: [
                        type2
                    ],
                    title: '请选择小类'
                });

                this.type1wheel.on('picker.select', (selectedVal, selectedIndex) => {
                    if (selectedVal[0] !== this.type1) {
                        this.type1 = selectedVal[0];
                        this.$select1.find('.select-name').text(this.getTypeById(this.type1).type_name);
                        if (this.type2) {
                            this.type2 = 0;
                            this.$select2.find('.select-name').text('请选择');
                        }
                        const type2 = this.getSecondType(this.type1);
                        this.type2wheel = new BetterPicker({
                            data: [
                                type2
                            ],
                            title: '请选择小类'
                        });
                        this.type2wheel.on('picker.select', (selectedVal, selectedIndex) => {
                            this.type2 = selectedVal[0];
                            this.$select2.find('.select-name').text(this.getTypeById(this.type2).type_name);
                        })
                    }
                })

                this.type2wheel.on('picker.select', (selectedVal, selectedIndex) => {
                    this.type2 = selectedVal[0];
                    this.$select2.find('.select-name').text(this.getTypeById(this.type2).type_name);
                })
            })

            // 选择大类
            this.$select1.on('click', () => {
                this.type1wheel.show();
            })
            // 选择小类
            this.$select2.on('click', () => {
                this.type2wheel.show();
            })

            // 获取用户地址列表
            this.getAddress((data) => {
                if (data.length) {
                    this.addressData = data;
                    const pickerData = this.getAddressPickerData();
                    this.addressPicker = new BetterPicker({
                        data: [
                            pickerData
                        ],
                        title: '请选择地址'
                    });

                    this.addressPicker.on('picker.select', (selectedVal, selectedIndex) => {
                        const addressId = selectedVal[0];
                        this.addressDesc = this.getAddressById(addressId);
                        this.$select3.find('.select-name').text(this.addressDesc.address_txt_1 + this.addressDesc.address_txt_2);
                    })
                }
            })
            // 选择地址
            this.$select3.on('click', () => {
                if (this.addressData) {
                    this.addressPicker.show();
                } else {
                    this.initAddressBox();
                }
            })

            // 开始录音
            this.$luyin = $('#luyin');
            this.$yuyin = $('#yuyin');
            this.$cancel = $('#cancel');
            this.localId = null;
            this.isLuyin = false;
            let luyinTime = 0;
            this.$luyin.on('click', () => {
                if (this.isLuyin) {
                    Wechat.stopRecord(localId => {
                        window.clearInterval(this.luyinTimer);
                        this.$luyin.find('.label').text('录音结束，正在上传...');
                        this.localId = localId;
                        Wechat.uploadVoice(this.localId, (serverId) => {
                            this.uploadVoiceSuccess(serverId, luyinTime);
                        })
                    })
                } else {
                    // 开始录音 todo
                    this.isLuyin = true;
                    this.$luyin.find('.label').text('请开始说话，再次点击结束');
                    this.luyinTimer = window.setInterval(() => {
                        luyinTime += 1;
                    },1000);
                    Wechat.startRecord((localId, time) => {
                        window.clearInterval(this.luyinTimer);
                        this.localId = localId;
                        this.$luyin.find('.label').text('录音结束，正在上传...');
                        Wechat.uploadVoice(this.localId, (serverId) => {
                            this.uploadVoiceSuccess(serverId, luyinTime);
                        })
                    })
                }
            })
            // 点击播放
            let isPlay = false;
            this.$yuyin.on('click', () => {
                if (!isPlay) {
                    isPlay = true;
                    this.$yuyin.addClass('playing');
                    Wechat.playVoice(this.localId, () => {
                        isPlay = false;
                        this.$yuyin.removeClass('playing');
                    });
                } else {
                    isPlay = false;
                    this.$yuyin.removeClass('playing');
                    Wechat.stopVoice(this.localId);
                }
                
            })
            // 重新录音
            this.$cancel.on('click', () => {
                this.$yuyin.hide();
                this.$cancel.hide();
                this.$luyin.find('.label').text('请点击说话');
                this.$luyin.show();
            })
            // 提交
            let btnDisabled = false;
            const submitBtn = $('#submitBtn');
            submitBtn.on('click', () => {
                if (btnDisabled || !this.addressDesc) {
                    Pop.show('error', '请选择所在地址').hide();
                    return false;
                }
                submitBtn.text('提交中...');
                btnDisabled = true;
                this.workData.work_imgs = JSON.stringify(this.imgs);
                this.workData.work_type_1 = this.type1;
                this.workData.work_type_2 = this.type2;
                this.workData.work_phone = this.addressDesc.address_phone;
                this.workData.work_user_name = this.userinfo.user_name;
                this.workData.work_address = this.addressDesc.address_txt_1 + this.addressDesc.address_txt_2;
                this.workData.work_address_x = this.addressDesc.address_x;
                this.workData.work_address_y = this.addressDesc.address_y;
                this.workData.project_id = this.addressDesc.project_id;
                this.workData.work_user_note = $('#beizhu').val();
                console.log(this.workData);
                Toolkit.fetch({
                    url: '/Work/createWork',
                    data: this.workData,
                    success: (res) => {
                        submitBtn.text('提交');
                        btnDisabled = false;
                        if (res.success) {
                            window.location.href = '../list/index.html';
                        } else {
                            Pop.show('error', res.msg).hide();
                        }
                    }
                })
            })

            // 取消地址选择
            $('#btn-cancel-addr').on('click', () => {
                $('#address').hide();
            })
        }
        uploadVoiceSuccess(serverId, luyinTime) {
            this.workData.work_voice = serverId;
            this.workData.voice_time = luyinTime;
            this.$luyin.find('.label').text('上传成功');
            this.isLuyin = false;
            this.$luyin.hide();
            this.$yuyin.find('.time').text(luyinTime);
            if (luyinTime < 30) {
                luyinTime = 30;
            }
            this.$yuyin.css('width', luyinTime + '%');
            this.$yuyin.show();
            this.$cancel.show();
        }
        uploadSuccess(data) {
            const imgpath = data.attach_path;
            this.imgs.push(imgpath);
            const index = this.imgs.length - 1;
            $('.imgs-box').append(`<div class="img" data-index=${index} data-url="${imgpath}" style="background-image:url('${imgpath}');"></div>`);
            if (this.imgs.length >= 3) {
                $('.upload').hide();
            }
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
                    this.getProjectsNear(res.lng, res.lat, res => {
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
                            app: this.mapinfo.app,
                            listview: 2
                        });
                        this.map.on('map-click', marker => {
                            this.markerClickSuccess(marker);
                        })
                        $('#address').show();
                    })
                })
            }

            
            // 打开地图
            this.$input1.on('click', () => {
                if (this.map) {
                    this.map.show(); 
                } else {
                    Pop.show('error', '初始化中，稍后再试').hide();
                }
                
            })

            // 保存
            let btnSaveAddrDisabled = false;
            $('#btn-save-addr').on('click', () => {
                if (btnSaveAddrDisabled) {
                    return false;
                }
                btnSaveAddrDisabled = true;
                this.formdata.address_txt_1 = this.$input1.find('.input-enter').text();
                this.formdata.address_txt_2 = this.$input2.find('input').val();
                this.formdata.address_user_name = this.$input3.find('input').val();
                this.formdata.address_phone = this.$input4.find('input').val();
                this.formdata.address_x = this.selectProjectData.address_x;
                this.formdata.address_y = this.selectProjectData.address_y;
                this.formdata.project_id = this.selectProjectData.project_id;
                this.saveAddress(this.formdata, res => {
                    if (res.success) {
                        this.addressDesc = res.data;
                        this.addressData = [];
                        this.addressData.push(res.data);
                        this.$select3.find('.select-name').text(this.formdata.address_txt_1 + this.formdata.address_txt_2);
                        $('#address').hide();
                        const pickerData = this.getAddressPickerData();
                        this.addressPicker = new BetterPicker({
                            data: [
                                pickerData
                            ],
                            title: '请选择地址'
                        });

                        this.addressPicker.on('picker.select', (selectedVal, selectedIndex) => {
                            const addressId = selectedVal[0];
                            this.addressDesc = this.getAddressById(addressId);
                            this.$select3.find('.select-name').text(this.addressDesc.address_txt_1 + this.addressDesc.address_txt_2);
                        })
                    }
                }, btnSaveAddrDisabled);
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
                    address_x: lng,
                    address_y: lat
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
        saveAddress(data, cb, btnSaveAddrDisabled) {
            Pop.show('success', '提交中，请等待').hide();
            Toolkit.fetch({
                url: '/Address/createAddress',
                data,
                success: (res) => {
                    if (res.success) {
                        cb && cb(res);
                    } else {
                        Pop.show('error', res.msg).hide();
                    }
                },
                complete: () => {
                    btnSaveAddrDisabled = false;
                }
            })
        }
        isNight() {
            return false;
            const format = new Formatdate();
            const time = format.formatDate('hh');
            let isNight = false;
            console.log('now time: ' + time);
            if (time >= 0 && time <= 6 || time >= 22 && time <= 24) {
                isNight = true;
            }
            return isNight;
        }
        getAddress(cb) {
            Toolkit.fetch({
                url: '/Address/getAddresss',
                success: (res) => {
                    if (res.success) {
                        cb && cb(res.data);
                    }
                }
            })
        }
        getAddressPickerData() {
            let arr = [];
            this.addressData.forEach(item => {
                const obj = {
                    text: item.address_txt_1 + item.address_txt_2,
                    value: item.address_id
                }
                arr.push(obj);
            })
            return arr;
        }
        getAddressById(address_id) {
            let val = null;
            this.addressData.forEach(item => {
                if (item.address_id == address_id) {
                    val = item;
                }
            });
            return val;
        }
        getTypeById(type_id) {
            let val = null;
            this.types.forEach(item => {
                if (item.type_id == type_id) {
                    val = item;
                }
            });
            return val;
        }
        getFirstType() {
            let arr = [];
            this.types.forEach(item => {
                if (item.type_level == '1') {
                    const obj = {
                        text: item.type_name,
                        value: item.type_id
                    }
                    arr.push(obj);
                }
            })
            return arr;
        }
        getSecondType(type_id) {
            let arr = [];
            this.types.forEach(item => {
                if (item.type_parent_id == type_id) {
                    const obj = {
                        text: item.type_name,
                        value: item.type_id
                    }
                    arr.push(obj);
                }
            })
            return arr;
        }
        getTypes(cb) {
            Toolkit.fetch({
                url: '/Type/getTypes',
                type: 'get',
                success: res => {
                    if (res.success) {
                        cb && cb(res.data);
                    }
                }
            })
        }
        setUserInfo(data) {
            $('.headimg').css('background-image', `url('${data.user_img}')`);
            $('.nickname').text(data.user_name);
            if (data.user_phone) {
                $('.mobile').text(Toolkit.mobile2show(data.user_phone));
            } else {
                $('.mobile').hide();
                $('.userinfo').show();
            }
        }
    }

    new Index().init()
});
