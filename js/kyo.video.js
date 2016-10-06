/*
 */
;var kyo = kyo || {};
kyo.video = (function ($, window, document, undefined) {
    "use strict";

    var defaults = {
        parent: false,
        target: '.vplayer',
        flashplayer: "/Users/IBM_ADMIN/Documents/Adobe Templates/img/jwplayer.flash.swf"
    }
    var options;
    var init = function(settings) {
        var $collection;
        options = $.extend({}, defaults, settings);
        $collection = (options.parent) ? $(options.target, $(options.parent)) : $(options.target);
        $collection.each(function(){
            var $player = $(this);
            var playerConfig = {
                width: '100%',
                // aspectratio: '16:9',
                primary: 'html5',
                flashplayer: options.flashplayer
            };
            playerConfig.file = $player.data('file');
            jwplayer.key = "8urH7xBKodg7PHiIpPTMi8l34he46SFMl4YBFg==";
            jwplayer($player.attr('id')).setup(playerConfig);
        });
    }

    return {
        init: init
    }

}(jQuery, window, document, undefined));