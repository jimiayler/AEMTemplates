/*
 */
;var kyo = kyo || {};
kyo.scrollTop = (function ($, window, document, undefined) {
    'use strict';

    var defaults = {
        target: '#scrollTop',
        triggerPoint: 725,
        scrollSpeed: 800
    };
    var options;
    var pos;
    var $scrollTop;

    var init = function(settings) {

        options = $.extend({}, defaults, settings);

        $scrollTop = $(options.target);
        $scrollTop.on('click', function() {
            $('html, body').animate({scrollTop: $('body').offset().top}, options.scrollSpeed);
            return false;
        })
        $(window).on('scroll', function(e){
            pos = $(this).scrollTop();
            if(pos >= options.triggerPoint && !$scrollTop.hasClass('visible')) {
                $scrollTop.addClass('visible');
            } else if (pos < options.triggerPoint && $scrollTop.hasClass('visible')) {
                $scrollTop.removeClass('visible');
            }
        });
    }

    return {
        init: init
    }

}(jQuery, window, document, undefined));