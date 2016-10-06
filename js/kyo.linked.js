/*
 */
;var kyo = kyo || {};
kyo.linked = (function ($, document, undefined) {
    'use strict';

    var defaults = {
        parent: false,
        target: '.kyo-linked'
    }
    var options;
    var $el;
    var init = function(settings) {
        options = $.extend({}, defaults, settings);
        $(options.target).each(function(){
            $el = $(this);
            $el.on('click', function() {
                document.location.href = $(this).data('href');
            })
        })
    }

    return {
        init: init
    }
}(jQuery, document, undefined));
