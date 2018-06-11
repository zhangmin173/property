/*
 * @Author: Zhang Min 
 * @Date: 2018-05-19 15:20:04 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-19 16:14:07
 */

/**
 * 基于iosselect的datePicker
 */
import './index.less';
import EventEmitter from '../eventEmitter';
import IosSelect from 'iosselect';
class datePicker extends EventEmitter {
    constructor(opt) {
        super();
        this.opt = opt || {};
        this.init();
    }
    init() {
        this.today = this.getToday();
        this.picker = new IosSelect(5, 
            [this.yearData.bind(this), this.monthData.bind(this), this.dateData.bind(this), this.hourData.bind(this), this.minuteData.bind(this)], {
            title: '时间选择',
            itemHeight: 35,
            itemShowCount: 9,
            oneLevelId: this.today.y,
            twoLevelId: this.today.m,
            threeLevelId: this.today.d,
            fourLevelId: this.today.h,
            fiveLevelId: this.today.i,
            callback: (selectOneObj, selectTwoObj, selectThreeObj, selectFourObj, selectFiveObj) => {
                // showDateDom.attr('data-year', selectOneObj.id);
                // showDateDom.attr('data-month', selectTwoObj.id);
                // showDateDom.attr('data-date', selectThreeObj.id);
                // showDateDom.attr('data-hour', selectFourObj.id);
                // showDateDom.attr('data-minute', selectFiveObj.id);
                this.emit('datepicker-confirm',{
                    y: selectOneObj,
                    m: selectTwoObj,
                    d: selectThreeObj,
                    h: selectFourObj,
                    i: selectFiveObj
                })
            }
        });
    }
    getToday() {
        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth() + 1;
        const d = now.getDate();
        return {
            y,
            m,
            d,
            h: 0,
            i: 0
        };
    }
    formatYear(nowYear) {
        var arr = [];
        for (var i = nowYear - 5; i <= nowYear + 5; i++) {
            arr.push({
                id: i + '',
                value: i + '年'
            });
        }
        return arr;
    }
    formatMonth() {
        var arr = [];
        for (var i = 1; i <= 12; i++) {
            arr.push({
                id: i + '',
                value: i + '月'
            });
        }
        return arr;
    }
    formatDate(count) {
        var arr = [];
        for (var i = 1; i <= count; i++) {
            arr.push({
                id: i + '',
                value: i + '日'
            });
        }
        return arr;
    }
    yearData(cb) {
        cb(this.formatYear(this.today.y));
    }
    monthData(year, cb) {
        cb(this.formatMonth());
    }
    dateData(year, month, cb) {
        if (/^(1|3|5|7|8|10|12)$/.test(month)) {
            cb(this.formatDate(31));
        }
        else if (/^(4|6|9|11)$/.test(month)) {
            cb(this.formatDate(30));
        }
        else if (/^2$/.test(month)) {
            if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                cb(this.formatDate(29));
            }
            else {
                cb(this.formatDate(28));
            }
        }
        else {
            throw new Error('month is illegal');
        }
    }
    hourData(one, two, three, cb) {
        const hours = [];
        for (var i = 0, len = 24; i < len; i++) {
            hours.push({
                id: i,
                value: i + '时'
            });
        }
        cb(hours);
    }
    minuteData(one, two, three, four, cb) {
        const minutes = [];
        for (var i = 0, len = 60; i < len; i++) {
            minutes.push({
                id: i,
                value: i + '分'
            });
        }
        cb(minutes);
    }
}
export default datePicker;
