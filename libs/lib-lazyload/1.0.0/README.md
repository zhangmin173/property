
## lazyload

* lazyload(config) - 初始化一个图片延迟加载
    * config.placeholder - 图片占位符，默认'http://s0.husor.cn/image/blank.png'
    * config.initload - 插件初始化之后立即载入图片
    * config.event - 触发图片载入事件，scroll滚动，click点击，默认scroll
    * config.defaultTap - 点击事件使用click或者tap，默认click，目前不支持tap
    * config.threshold - 图片显示阀值，单位px
    * config.originImgAttr - 获取图片原始地址的属性
    * config.markAttr - 标示需要图片延迟加载的属性
    * config.inside - 容器内滚动， 默认false
    * config.horizontal - 水平滚动，默认false，当horizontal为true时，inside也为true，且panel与container必填（不能是window）
    * config.panel - 内部面板，默认window,horizontal为tru时必填
    * config.container - 外部容器,默认window，horizontal为tru时必填
* lazyload.getLazyImg() - 当有新的图片插入到dom中，可以通过此方法获取需要延迟加载的图片
* lazyload.scrollLoadImg() - 根据当前滚动条的情况，载入图片
* lazyload.loadedImg - 已经载入的图片
* lazyload.watingImg - 等待载入的图片


### examples

1、垂直滚动
```
 lazyload({
      threshold:2000
 });
```
 2、水平容器内滚动
``` 
lazyload({
      threshold:2000,
      inside:true,
      horizontal:true,
      panel:'.lazyload',
      container:'.container'
 })；
```
3、垂直容器内滚动
```
lazyload({
      threshold:2000,
      inside:true,
      horizontal:false,
      panel:'.lazyload',
      container:'.container'
 });
```