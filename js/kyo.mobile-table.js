/**
 * Kyocera namespace
 * @type {Object}
 */

/**
 * Kyocera method 'mobiletable'
 */
;var kyo = kyo || {};

/**
 * Kyocera mobile table module. Adds navigation arrows to responsive tables
 * @param  {Object} $         jQuery reference for local namespace
 * @param  {[type]} window    window reference for local namespace
 * @param  {[type]} document  document reference for local namespace
 * @param  {[type]} undefined define undefined for local namespace
 * @return {Object}           Public functions
 */
kyo.mobiletable = (function ($, window, document, undefined) {
    'use strict';

    var $sLeft, $sRight, $tables, scrollInterval, scrollSpeed, buttonPressed;

    var init = function() {
        $sLeft = $('<div class="kyo-table-s kyo-table-s-left disabled"></div>');
        $sRight = $('<div class="kyo-table-s kyo-table-s-right"></div>');
        $tables = $('.table-responsive');

        scrollSpeed = 4;
        buttonPressed = false;

        // Disable context for tablescroll buttons
        $(document).on('contextmenu', '.kyo-table-s', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });

        $tables.scroll(function() {
            var $this = $(this);
            var $buttonLeft = $this.parent().find('.kyo-table-s-left');
            var $buttonRight = $this.parent().find('.kyo-table-s-right');

            if ($this.scrollLeft() === 0) {
                $buttonLeft.addClass('disabled');
            } else if ($this.scrollLeft() == ($this[0].scrollWidth - $this.width())) {
                $buttonRight.addClass('disabled');
            } else {
                $buttonLeft.removeClass('disabled');
                $buttonRight.removeClass('disabled');
            }
        });

        $(window).on('resize', checkTables);
        checkTables();
    };

    var checkTables = function() {
        $tables.each(function() {
            var $this = $(this),
                $parent = $this.parent(),
                scrollWidth = $this[0].scrollWidth,
                w = $this.width();

            if(w < scrollWidth && $parent.hasClass('table-responsive-wrapper')) {
                $parent.removeClass('no-buttons');
            } else if(w >= scrollWidth && $parent.hasClass('table-responsive-wrapper')) {
                $parent.addClass('no-buttons');
            } else if(w < scrollWidth) {
                addScrollButtons($this);
            }
        });
    }

    var addScrollButtons = function($table) {
        $table
          .wrap('<div class="table-responsive-wrapper" />')
          .parent()
          .prepend($sLeft.clone(), $sRight.clone());

        scrollButtonSetup($table.parent().find('.kyo-table-s-right'), 1);
        scrollButtonSetup($table.parent().find('.kyo-table-s-left'), -1);
    }

    var scrollButtonSetup = function($button, step) {
        $button.off('mousedown touchstart mouseup touchend pointerup');

        $button.on('mousedown touchstart', function(event) {
            if(event.which > 1) return false;
            var $this = $(this);
            buttonPressed = true;
            var $wrapper = $this.parent().find('.table-responsive');
            $this.addClass('pressed');
            scrollTable($this, $wrapper, step);
        });

        $button.on('mouseup touchend pointerup', function() {
            var $this = $(this);
            buttonPressed = false;
            $this.removeClass('pressed');
            clearInterval(scrollInterval);
            scrollInterval = false;
        });
    }

    var scrollTable = function($button, $wrapper, step) {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(function() {
            if(buttonPressed) {
                var currentLeft = $wrapper.scrollLeft();
                $wrapper.scrollLeft(currentLeft + (step * scrollSpeed));
            }
        }, 2);
    }

    return {
        init: init
    };

}(jQuery, window, document, undefined));