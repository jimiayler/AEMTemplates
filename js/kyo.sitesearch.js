/**
 * Kyocera namespace
 * @type {Object}
 */
;var kyo = kyo || {};

/**
 * Kyocera sitesearch module.
 * @param  {Object} $         jQuery reference for local namespace
 * @param  {[type]} window    window reference for local namespace
 * @param  {[type]} document  document reference for local namespace
 * @param  {[type]} undefined define undefined for local namespace
 * @return {Object}           Public functions
 */
kyo.sitesearch = (function ($, window, document, undefined) {
    'use strict';

    var $sitesearchFilters, $toggle, $page, toggled;

    var init = function() {
        $sitesearchFilters = $('.sitesearch-filters');
        $toggle = $('.sitesearch-toggle');
        $page = $('#page');

        $toggle.click(function(e) {
            e.preventDefault();
            if(window.innerWidth >= 990) return;
            if($sitesearchFilters.hasClass('open')) {
                $sitesearchFilters.removeClass('open');
            } else {
                toggled = true;
                $sitesearchFilters.addClass('open');
            }
            setTimeout(function() {
                toggled = false;
            }, 50);
        });

        $page.click(function(e) {
            if(!toggled) {
                if($sitesearchFilters.hasClass('open')) {
                    $sitesearchFilters.removeClass('open');
                }
            }
        });
    };

    return {
        init: init
    };

}(jQuery, window, document, undefined));

kyo.sitesearch.init();