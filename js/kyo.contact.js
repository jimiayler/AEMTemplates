/*
 * This is just a small demo script to show language changes on the
 * contact sidebar
 */
;var kyo = kyo || {};
kyo.contact = (function ($, window, document, undefined) {
    'use strict';

    var defaults = {
        target: '.kyo-contact-small',
        classPrefix: '.kyo-i18n-contact-'
    };
    var options;

    var init = function(settings) {
        options = $.extend({}, defaults, settings);
        $(options.target).each(function(index, item){
            var $target = $(this);
            $(this).on('change', 'select.country', function(e) {
                e.preventDefault();
                var file = $(this).val();
                if(file != 'de' && file != 'uk') {
                    return;
                }
                $.getJSON( "../data/contact-test." + file + ".json", function(data) {
                    $.each( data, function( key, val ) {
                        $target.find(options.classPrefix + key).html(val)
                    });
                });
            });
        })
    }


    return {
        init: init
    }

}(jQuery, window, document, undefined));