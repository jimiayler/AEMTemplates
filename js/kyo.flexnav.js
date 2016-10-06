/**
 * Kyocera namespace
 * @type {Object}
 */
;var kyo = kyo || {};

/**
 * Kyocera flexnav module. Adds smooth scrolling for main navigation with lots of first level elements
 * @param  {Object} $         jQuery reference for local namespace
 * @param  {[type]} window    window reference for local namespace
 * @param  {[type]} document  document reference for local namespace
 * @param  {[type]} undefined define undefined for local namespace
 * @return {Object}           Public functions
 */
kyo.flexnav = (function ($, window, document, undefined) {
    'use strict';
    /**
     * Default module options
     * @type {Object}
     */
    var defaults = {
        /**
         * Main navigation container
         * @type {String}
         */
        nav: '#main-nav'
    };

    var options;
    var $nav,
        $navBarContainer,
        $navBar,
        $navList,
        $navEntries,
        $prev,
        $next;

    var navWidth = 0;
    var overflowWidth = 0;

    /**
     * Initializes the flexnav module
     * @param  {Object} settings Custom settings
     */
    var init = function(settings) {

        // create the module options
        options = $.extend({}, defaults, settings);

        $nav = $(options.nav);
        $nav.addClass('flexnav');
        $navBar =  $nav.find('.navbar-offcanvas, .navbar-collapse').eq(0);
        $navBarContainer = $navBar.closest('.container');
        $navList = $navBar.children('.navbar-nav');
        $navEntries = $navList.children('li');
        $prev = $('<a class="prev" />');
        $next = $('<a class="next" />');


        $navBarContainer.addClass('flexnav-con');
        setWidth();
        $navBarContainer.prepend( $prev );
        $navBarContainer.append($next);


        $navEntries.bind('click', function(){
            var entryPosition = $(this).position();
            var entryWidth = $(this).width();
            var entryPositionLeft = entryPosition.left;

            if(entryPositionLeft < 20) {
                showNext();
            } else if ((entryPositionLeft + entryWidth + 30) > $navBarContainer.outerWidth()) {
                showPrev();
            }
        });

        $prev.bind('click', function(){
            showNext();
            $('.fold-close a').click();
        });

        $next.bind('click', function(){
            showPrev();
            $('.fold-close a').click();
        });


        $(window).on('resize', function(){
            setWidth();
        });

    };

    var showNext = function() {
        $navList.css('margin-left', 0);
        $next.show();
        $prev.hide();
    };

    var showPrev = function() {
        $navList.css('margin-left', -overflowWidth);
        $next.hide();
        $prev.show();
    };


    /**
     * Private function to set navigation width on window resize
     */
    var setWidth = function() {
        // use vanilla window.innerWidth for crossbrowser reliable width value
        if(window.innerWidth > 991) {

            navWidth = 0;
            overflowWidth = 0;
            $prev.hide();
            $next.hide();
            $navList.css('margin-left', 0);

            $nav.addClass('flexnav');
            $navBarContainer.addClass('flexnav-con');

            $navEntries.each(function(){
                navWidth += $(this).outerWidth(true) + 1;
            });
            $navList.css('width', navWidth);

            overflowWidth = parseInt(navWidth - $navBarContainer.outerWidth());

            if(overflowWidth > 0) {
                $next.show();
            }
        } else {
            $nav.removeClass('flexnav');
            $navBarContainer.removeClass('flexnav-con');
            $navList.css({
                'width': 'auto',
                'margin-left': 'inherit'
            });
        }
    };


    return {
        init: init
    };

}(jQuery, window, document, undefined));