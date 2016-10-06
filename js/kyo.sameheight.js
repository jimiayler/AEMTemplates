/*
 */
;(function ($) {
    "use strict";

    // extend jquery with our plugin function
    $.fn.kyoSameheight = function (settings) {
        /**
        * Default plugin options
        *
        * @property defaults
        * @type {Object}
        */
        var defaults = {
            // target must be child of the selector. Defaults to selector.
            target: false,
            // rowDetect triggers row detection and sets maxHeight for each row
            rowDetect: false,
            // Minimum height for each row.
            minHeight: false
        };

        /**
        * Merged plugin options
        *
        * @property options
        * @type {Object}
        */
        var options = $.extend(true, defaults, settings);

        /**
        * jQuery Element collection
        *
        * @property $col
        * @type {Object}
        * @default null
        */
        var $col = null;

        /**
        * jQuery Element
        *
        * @property $el
        * @type {Object}
        * @default null
        */
        var $el = null;

        /**
        * Current element height
        *
        * @property elementHeight
        * @type {Number}
        * @default 0
        */
        var elementHeight = 0;

        /**
        * Current element offset top
        *
        * @property offsetTop
        * @type {Number}
        * @default 0
        */
        var offsetTop = 0;

        /**
        * Current element offset top backup
        *
        * @property offsetTopBak
        * @type {Number}
        * @default 0
        */
        var offsetTopBak = offsetTop;


        /**
         * Resets row.
         *
         * @method rowInit
         * @return {Object} Empty row object .
         */
        var rowInit = function(){
            return {
                elements:[],
                targetHeight:0
            }
        }

        /**
         * Sets the height for each Element in elements.
         *
         * @method setHeight
         */
        var setHeight = function() {
            if(row.targetHeight < options.minHeight) {
                row.targetHeight = options.minHeight;
            }
            $.each(row.elements, function() {
                $(this).css('height', row.targetHeight);
            });
        }

        var row = rowInit();
        $col = (options.target) ? $(options.target, this) : $(this);
        $col.css('height', 'auto').each(function() {
            $el = $(this);
            if(options.rowDetect) {
                // parseInt offeset, because (in IE) offset top can be floats
                offsetTop = parseInt($el.offset().top);
                if(offsetTop !== offsetTopBak) {
                    // row changed, set height for last row
                    setHeight();
                    row = rowInit();
                }
                offsetTopBak = offsetTop;
            }
            // use .css('height') instead of height() to avoid boxmodel problems
            var elementHeight = parseInt($el.css('height'));
            row.targetHeight = Math.max(elementHeight, row.targetHeight);
            row.elements.push($el);
        });
        // set height
        setHeight();

        return this;
    }

}(jQuery));