/**
 * @desc    图片延迟加载插件
 *          使用属性 use-lazyload
 */


// default config
var defaultConfig = {

    placeholder : 'https://yun.tuisnake.com/webapp/img/blank.jpg',

    initload : true,

    // 'scroll' or 'click'
    event : 'scroll',

    // 'click' or 'tap'
    defaultTap : 'click',

    // px
    threshold :$(window).height() * 2,

    originImgAttr : 'data-original',

    markAttr : 'use-lazyload'

};

var lazyload = function( config ){

    var cf = $.extend( {}, defaultConfig, config ),
        $t, len, img,
        scrollTop = 0, $win = $(window), screenHeight = $win.height(), cantTrigger = false,
        loadedImg = [], watingImg = [];

    var scrollLoadImg = function(){

        scrollTop = $win.scrollTop();
        len = watingImg.length;
        for ( ; len--; ) {
            img = watingImg[len];
            if ( img.showTop <= scrollTop+screenHeight && scrollTop <= img.showBottom ) {
                img.$img.attr( 'src', img.oriImg );
                watingImg.splice( len, 1 );
                loadedImg.push(img);
            }
        }
    };

    var clickLoadImg = function( ev ){

        $t = $(this);

        len = watingImg.length;

        for ( ; len--; ) {

            img = watingImg[len];
            if ( $t[0] === img.$img[0] ) {
                $t.attr( 'src', img.oriImg );
                watingImg.splice( len, 1 );
                loadedImg.push(img);
            }

        }

        $t.off('click', clickLoadImg);

    };

    var getLazyImg = function(){

        var $imgs = $('['+cf.markAttr+']');

        // get lazylog img list
        $imgs.each(function(){

            $t = $(this);

            if ( cf.placeholder !== null ) {
                $t.attr('src', cf.placeholder);
            }

            var info = {
                $img : $t,
                oriImg : $t.attr( cf.originImgAttr )
            };

            if ( cf.event === 'scroll' ) {
                info.showTop = $t.offset().top - cf.threshold;
                info.showBottom = $t.offset().top + $t.height() + cf.threshold;
            }

            watingImg.push(info);
            $t.removeAttr( cf.markAttr ).removeAttr( cf.originImgAttr );

            if ( cf.event === 'click' ) {
                $t.on('click', clickLoadImg);
            }

        });

    };

    // init
    getLazyImg();

    // first load img
    if ( cf.initload && cf.event === 'scroll' ) {
        setTimeout(function(){
            scrollLoadImg();
        });
    }

    if ( cf.event === 'scroll' ) {
        $(window).on('scroll', scrollLoadImg);
    }

    return {

        getLazyImg : getLazyImg,
        scrollLoadImg : scrollLoadImg,
        loadedImg : loadedImg,
        watingImg : watingImg

    };

};

window.lazyload = lazyload;
