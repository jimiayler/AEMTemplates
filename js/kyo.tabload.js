/*
 */
;var kyo = kyo || {};
kyo.tabload = (function ($, window, document, undefined) {
    "use strict";

    var config = {
        trigger: 'tab-request'
    }


    var init = function() {

        // preload active tab
        $('li.active a[data-toggle="' + config.trigger + '"]').each(tabload);

        $('a[data-toggle="' + config.trigger + '"]').click(function(e) {
            e.preventDefault()
            //sets tabload this scope to Element
            tabload.apply(this);
            return false;
        }).on('shown.bs.tab', function (e) {
            $(e.target).trigger('kyo.tab.shown', [e.target, e.relatedTarget]);
        });

    };


    var tabload = function() {
        var $el = $(this),
            $target = $($el.attr('data-target'));

        if(!$target.hasClass('tab-loaded')) {
            var url = $el.attr('href');
            $.get(url, function(data) {
                $target
                    .addClass('tab-loaded')
                    .html(data);
                    $target.trigger('kyo.domchanged', [$target[0]]);
            });
        }
        $el.tab('show');
        return false;
    };


    return {
        init: init
    }

}(jQuery, window, document, undefined));