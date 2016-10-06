/*
 */
;var kyo = kyo || {};
kyo.productfilter = (function ($, document, undefined) {
    'use strict';

    var defaults = {
        targetSelect: '.kyo-compare-product',
        targetFilter: '.selected-products',
        targetFilterLabel: '.selected-products-label',
        compareMin: 2,
        compareMax: 4
    }
    var tmpl = {
        compareLayer: '<div class="compare-layer"><a class="btn btn-ghost" href="#"><i class="fa fa-angle-right"></i> Compare now!</a></div>',
        selectedProduct: '<span class="selected-product"><a href="#" title="Remove selection"><i class="fa fa-times"></i></a> <strong class="selected-product-name"></strong></span>'
    }
    var options;
    var checked = 0;
    var $col;
    var $msgChoose;
    var $compareButton;

    var init = function(settings) {
        options = $.extend({}, defaults, settings);
        if(options.compareMin < 2) options.compareMin = 2;
        if(options.compareMax < options.compareMin) options.compareMax = options.compareMin;
        $col = $(options.targetSelect);
        $col.each(function(){
            var $el = $(this);
            $el.on('change', function() {
                isChecked($el);
            })
        });
        $msgChoose = $('.msg-choose');
        $compareButton = $('.compare-selected-products');
    }

    var isChecked = function($el) {
        var isChecked = $el.prop('checked');
        var $checkbox = $el.closest(".checkbox");
        console.log('isChecked', isChecked, $checkbox)
        if(isChecked) {
            checked++;
            if($checkbox.find('.compare-layer').length === 0){
                initCompare($el);
            }
            addToFilter($el);
        } else {
            if(checked > 0) {
                checked--;
            }
            removeFromFilter($el);
        }
        showCompare($el);
    }

    var initCompare = function($el) {
        var $checkbox = $el.closest(".checkbox");
        var $compareLayer = $(tmpl.compareLayer);
        $compareLayer.on('click', 'a.btn', compareNow);
        $checkbox.append($compareLayer);
        $checkbox.on('mouseleave', function(e){
            hideCompare($el);
        }).on('mouseenter', function(e) {
            showCompare($el);
        })
    }

    var showCompare = function($el) {
        var isChecked = $el.prop('checked');
        $('.show-layer').removeClass('show-layer');
        if(isChecked && checked >= options.compareMin){
            $el.closest(".checkbox").addClass('show-layer');
        }
    }

    var hideCompare = function($el) {
        $el.closest(".checkbox").removeClass('show-layer');
    }

    var addToFilter = function($el) {
        var $item = $(tmpl.selectedProduct);
        $item.addClass('id-' + $el.val())
            .find('.selected-product-name')
            // wierd bug in ff when trying tgo get $el.data('kyo-product')
            // so using attr works just fine
            .html($el.attr('data-kyo-product'));
        $item.on('click', 'a', function(e) {
            e.preventDefault();
            $el.prop('checked', false);
            if(checked > 0) {
                checked--;
            }
            removeFromFilter($el);
        })
        console.log($item, $(options.targetFilter));
        $(options.targetFilter).append($item);
        toggleSelectedLabel();
        toggleMsgChoose();
        toggleCompareButton();
    }

    var removeFromFilter = function($el) {
        var $item = $('.id-' + $el.val());
        $item.off('click').remove();
        toggleSelectedLabel();
        toggleMsgChoose();
        toggleCompareButton();
    }

    var toggleSelectedLabel = function() {
       if(checked !== 0){
          $(options.targetFilterLabel).addClass('visible');
       } else {
          $(options.targetFilterLabel).removeClass('visible');
       }
    }


    var toggleMsgChoose = function() {
        var choose = options.compareMin - checked;
        if(choose === 1) {
            $msgChoose.show();
        } else {
            $msgChoose.hide();
        }
    }

    var toggleCompareButton = function() {
        if(checked >= options.compareMin) {
            $compareButton
                .on('click', compareNow)
                .show()
                .find('.compare-selected-products-count').html(checked);

        } else {
            $compareButton
                .off('click')
                .hide();
        }
    }

    var compareNow = function(e) {
        e.preventDefault();
        // do something
    }

    return {
        init: init
    }
}(jQuery, document, undefined));
