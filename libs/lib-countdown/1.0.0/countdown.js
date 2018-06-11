'use strict';

var defaultConfig = {
    // bengin-time && end-time
    gmt_begin: null,
    gmt_end: null,

    // default countdown container element
    selector: '.countdown',
    // messages
    msgPattern :'剩{days}天{hours}时{minutes}分{seconds}秒',
    msgBefore: '距开团仅剩{beginremain}分钟',
    msgAfter: '特卖已经结束',
    msgStartPatternBegin: '剩',
    msgPrePatternBegin: '剩',
    msgDayPattern : '{days}天',
    msgHourPattern : '{hours}时',
    msgMinPattern : '{minutes}分',
    msgSecondPattern : '{seconds}秒',
    msgStartPatternEnd: '',
    msgPrePatternEnd: '',
    leadingZeros: false,
    currentTime: 0,
    patternType:{//为1时使用原来的msgPattern或msgBefore，为2时使用pattern拼接
        pre:1,
        start:1
    }, 
    hidePattern:[],//可传参数如'{days}',与patternType为2时配合使用，表示取值为0时，要省略的pattern
    finishCallback: function() {},//倒计时已结束
    startCallback :function() {},//进行时的倒计时运行前的回调
    preCallback :function(){}//未开始的倒计时运行前的回调
};

module.exports = function(conf) {
    var cf = $.extend({}, defaultConfig, conf),
        started = false,
        interval = 1000,
        container = $(cf.selector),
        patterns = [{
                pattern: '{years}',
                secs: 31536000
            }, {
                pattern: '{months}',
                secs: 2628000
            }, {
                pattern: '{weeks}',
                secs: 604800
            }, {
                pattern: '{days}',
                secs: 86400
            }, {
                pattern: '{hours}',
                secs: 3600
            }, {
                pattern: '{minutes}',
                secs: 60
            }, {
                pattern: '{seconds}',
                secs: 1
            }, {
                pattern: '{secfixedtoten}',
                secs: 1
            }, {
                pattern: '{secfixedtohun}',
                secs: 1
            }, {
                pattern: '{secfixedtothus}',
                secs: 1
            }

        ],
        patternMap={
            '{years}':cf.msgYearPattern||'',
            '{months}':cf.msgMonPattern||'',
            '{weeks}':cf.msgWeekPattern||'',
            '{days}':cf.msgDayPattern||'',
            '{hours}':cf.msgHourPattern||'',
            '{minutes}':cf.msgMinPattern||'',
            '{seconds}':cf.msgSecondPattern||'',
            '{secfixedtoten}':cf.msgSecondFixtotenPattern||'',
            '{secfixedtohun}':cf.msgSecondFixtohunPattern||'',
            '{secfixedtothus}':cf.msgSecondFixtothusPattern||''
        },
        output,
        timer,


        defineInterval = function() {
            for (var e = patterns.length; e > 0; e--) {
                var currentPattern = patterns[e - 1];

                if (cf.msgPattern.indexOf(currentPattern.pattern) !== -1) {
                    interval = currentPattern.secs * 1000;
                    return;
                }
            }
        },

        outOfInterval = function(beginremain,type) {
            var tpl = beginremain > 0 ? cf.msgBefore : cf.msgAfter;
            var minTimer;
            if (beginremain > 0) {
                if(type==1){
                    minTimer = setInterval(function() {

                        beginremain -= 1;
                        var number = Math.floor(beginremain / 60);
                        var displayed = cf.leadingZeros && number <= 9 ? "0" + number : number;
                        if (beginremain < 0) {
                            window.clearInterval(minTimer);
                        }                   
                        output = tpl.replace('{beginremain}', displayed);

                        if (container.html() != output) {
                            container.html(output);
                        }

                    }, 1000);                    
                }


            } else {
                cf.finishCallback(container,output);
            }
        },

        display = function(sec,patternType,isStart,pattern) { 

            var output= (pattern||cf.msgPattern);//默认模板

           if(isStart){//如果已经开始
                patternType=patternType.start;
           }else{//未开始
                patternType=patternType.pre;
           }
            if(patternType==2){//如果要省略0，使用拼接式的模板
                output=isStart?cf.msgStartPatternBegin:cf.msgPrePatternBegin;
            }
                
            for (var i = 0, len = patterns.length; i < len; i++) {
                var currentPattern = patterns[i];
                //获取当前模板，如果patternType不为2，用默认模板
                var currentTpl=patternType==2?(patternMap[currentPattern.pattern]||''):output;
                var currentPatternSecs = currentPattern.secs * 10;
                if (currentTpl.indexOf(currentPattern.pattern) !== -1) {
                    if (currentPattern.pattern === '{secfixedtoten}') {
                        var number = new Number(sec / currentPatternSecs).toFixed(1);

                    } else if (currentPattern.pattern === '{secfixedtohun}') {
                        var number = new Number(sec / currentPatternSecs).toFixed(2);

                    } else if (currentPattern.pattern === '{secfixedtothus}') {
                        var number = new Number(sec / currentPatternSecs).toFixed(3);

                    } else {
                        var number = Math.floor(sec / currentPatternSecs);

                    }
                    var displayed = cf.leadingZeros && number <= 9 ? "0" + number : number;
                    sec -= number * currentPatternSecs;
                    // 省略值为0的pattern
                    if(patternType==2){
                        if(cf.hidePattern && Number(displayed)==0 && cf.hidePattern.indexOf(currentPattern.pattern)!==-1){
                            output+='';
                        }else{
                            output+=currentTpl.replace(currentPattern.pattern, displayed);
                        }                            
                    }else{
                        output = output.replace(currentPattern.pattern, displayed);
                    }

                }
            }
            if(patternType==2){
                output+= isStart?cf.msgStartPatternEnd:cf.msgPrePatternEnd;
            }
            container.html(output);
        },

        run = function() {
            //var sec  = Math.abs(cf.gmt_end - (+new Date / 1000)),
            var newDate = cf.currentTime * 1000 || new Date;
            var sec = Math.abs(cf.gmt_end * 10 - (+newDate / 100));
            var beginremain = cf.gmt_begin - (+newDate / 1000);
            //msgBefore的类型，它可以是默认的分钟倒计时，也可以是天时分秒倒计时
            var type=cf.msgBefore.indexOf('{beginremain}')!==-1?1:2;
            if (isStarted(cf.gmt_begin)) {
                started = true;
                cf.startCallback(container);
                display(sec,cf.patternType,started);
            } else if (beginremain > 0) {
                cf.preCallback(container);

                if(type==2 || cf.patternType.pre==2){
                    sec=beginremain*10;
                    display(sec,cf.patternType,started,cf.msgBefore);
                }else{
                    outOfInterval(beginremain,type);
                }
                
            } else {
                outOfInterval();
            }

            // Vanilla JS alternative to $.proxy
            timer = window.setInterval(function() {
                sec--;
                
                if (isStarted(cf.gmt_begin) && !isOver(cf.gmt_end)) {
                    if (!started) {
                        sec=Math.abs(cf.gmt_end * 10 - (+newDate / 100));
                        started = true;
                        cf.startCallback(container);
                    }
                    display(sec,cf.patternType,started);
                    
                }else if(sec>0){
                    if(type==2 || cf.patternType.pre==2){
                        display(sec,cf.patternType,started,cf.msgBefore);
                    }
                }else if(sec <= 0){// Time over
                    window.clearInterval(timer);
                    outOfInterval();                    
                }
            }, interval / 10);
        },

        init = function() {
            defineInterval();
            // Already over
            if (isOver(cf.gmt_end)) {
                return outOfInterval();
            }

            run();
        };

    init();

    return output;
};

function isStarted(startTime) {
    return +new Date() / 1000 >= startTime;
}

function isOver(endTime) {
    return +new Date() / 1000 >= endTime;
}
