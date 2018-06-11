
## lib.slider  精简版

* swiper.js  某些特例情况下有BUG，使用需谨慎 
* 老的Swipe 有BUG 慎用！！！！！！！！！！！ 只为兼容老的

## 例子

Swipe(document.getElementById('swipe'), {
    auto: 3000,
    startSlide: 0,
    continuous: true,
    disableScroll: false,
    callback: function(index) {
        if ((index + 1) > swipelength) {
            index = index % 2;
        }
        $('.db-banner-position strong').html(index + 1)
    }
});

