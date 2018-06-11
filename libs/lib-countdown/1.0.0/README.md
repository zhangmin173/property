## countdown 倒计时使用说明

```javascript
var countdown = require('../lib-countdown/2.1.0/countdown');//层级自己写明确就好，此处仅作举栗子
```

* countdown(config) - 

	

* 新版支持“秒” 支持 精确到小数点后 1位 ， 2位， 3位

	* secfixedtoten---1位
	* secfixedtohun---2位
	* secfixedtothus---3位

* countdown(config) - 
	* config.gmt_begin - 活动开始时间(此参数必须） 
	* config.gmt_end - 活动结束时间 (此参数必须)
	* config.selector - 倒计时容器类名或id名,默认为:‘'.countdown' 
	* config.msgPattern - 默认格式”剩{days}天{hours}时{minutes}分{seconds}秒” ,最大可以支持到年
    * config.msgBefore - 活动未开始时的倒计时提示，默认为'距开团仅剩{beginremain}分钟'
    * config.msgAfter -  活动结束信息，'特卖已经结束'
	* config.leadingZeros - 头位数为零去掉，默认FALSE
	* config.currentTime - 当前时间，如果不传此参数则取本地时间
	* config.finishCallback - 默认值function() {},倒计时已结束的回调


* 新增参数：

    * config.msgStartPatternBegin - '剩',
    * config.msgPrePatternBegin - '剩',
    * config.msgDayPattern  - '{days}天',
    * config.msgHourPattern  - '{hours}时',
    * config.msgMinPattern  - '{minutes}分',
    * config.msgSecondPattern  - '{seconds}秒',
    * config.msgStartPatternEnd - '',
    * config.msgPrePatternEnd - '',
    
    * config.patternType - 默认值{pre:1,start:1}, 为1时使用原来的msgPattern或msgBefore，为2时使用pattern拼接
    * config.hidePattern - 默认值[],可传参数如['{days}']，与patternType为2时配合使用，表示取值为0时，要省略的pattern
    
    * config.startCallback  - 默认值function() {},//进行时的倒计时运行前的回调
    * config.preCallback  - 默认值function(){}//未开始的倒计时运行前的回调