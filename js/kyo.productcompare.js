/*
 */
;var kyo = kyo || {};
kyo.productcompare = (function ($, document, undefined) {
    'use strict';

    var $compare,
        $compareCon,
        $products,
        $productsCloneCon,
        $productsClone,
        $productPins,
        $productPinsCloned,
        $compareDockedShadow,
        $productDelete,
        $productDeleteCloned,
        $addAttribute,
        $removeAttribute,
        $mobileToggle,
        $compareBox;


    var init = function() {

        $compare = $('#kyo-compare');
        $compareCon = $('#kyo-compare').find('.compare-con');
        $products = $('#kyo-compare').find('.compare-table');
        $productsCloneCon = $('#kyo-compare').find('.compare-table-con-docked').find('.dock-overflow');
        $productPins = $compare.find('.compare-table-con').find('h2.pin');
        $compareDockedShadow = $compare.find('.compare-docked-shadow');
        $productDelete = $compare.find('.compare-table-con').find('.delete-product');
        $mobileToggle = $compare.find('.compare-docked-mobile-toggle');
        $compareBox = $compare.find('.compare-box');


        if(msieversion() === 9){
            $compare.addClass('ie9');
        }

        cloneProducts();
        setStripedFeatureRows();
        adjustHeight();

        $(window).on('resize', function(){
            adjustHeight();
        });



        $productPins.each(function(){
            var $pin = $(this);
            var id =  $pin.data('product-id');

            if($pin.hasClass('pinned')){
                var index = $productsClone.find('h2[data-product-id='+ id +']').closest('.compare-cell').index();
                $pin.removeClass('pinned');
                pin(id, index);
            }

            $pin.bind('click', function(){
                var index = $productsClone.find('h2[data-product-id='+ id +']').closest('.compare-cell').index();
                pin(id, index);
                return false;
            });

        });



        $productDelete.each(function(){
            var $deleteButton = $(this);
            $deleteButton.bind('click', function(){
                var index = $(this).closest('.compare-cell').index();
                var id = $compare.find('.compare-table-con').find('h2.pin').eq(index-1).data('product-id');
                deleteProduct(id,index);
            });
        });


        $mobileToggle.bind('click', function(){
            if($compare.hasClass('mobile-in')){
                $compare.removeClass('mobile-in');
            } else {
                $compare.addClass('mobile-in');
            }
        });
    }



    var adjustHeight = function() {
        $compareCon.height($products.height());
        $compareDockedShadow.height($products.height());
    }

    var setStripedFeatureRows = function() {
        $compare.find('.compare-table').each(function(){
            $(this).find('.compare-table-row[data-product-attribute]').removeClass('even');
            $(this).find('.compare-table-row[data-product-attribute]').filter(':visible').filter(':even').addClass('even');
        });
    }


    var cloneProducts = function() {
        $productsClone = $products.clone();
        $productsCloneCon.append($productsClone);
        $productsClone.addClass('docked');
        $productPinsCloned = $productsClone.find('h2.pin');

        $productPinsCloned.each(function(){
            var $unPin = $(this);
            var id =  $unPin.data('product-id');
            $unPin.bind('click', function(){
                $compare.removeClass('product-pinned');
                var index = $productsClone.find('h2[data-product-id='+ id +']').closest('.compare-cell').index();
                unPin(id, index);
                $unPin.removeClass('pinned');
                return false;
            });
        });



        $productDeleteCloned = $productsClone.find('.delete-product');

        $productDeleteCloned.each(function(){
            var $deleteButton = $(this);
            $deleteButton.bind('click', function(){

                if($compare.find('h2.pin').length == 2){
                    return;
                }
                var index = 1;

                $products.find('.compare-table-row').each(function(){
                    $(this).children('.compare-cell').eq(index).remove();
                });

                $productsClone.find('.compare-table-row').each(function(){
                    $(this).children('.compare-cell').eq(index).remove();
                });
            });
        });

        var $addAttribute = $productsClone.find('.add-attribute');
        var $removeAttribute = $productsClone.find('.remove-attribute');

        $addAttribute.change(function(){

            var attributeId = $(this).val();
            if(attributeId == '0'){
                return;
            }

            var $option = $addAttribute.children('option[value="'+attributeId+'"]');
            $option.addClass('hidden').prop('disabled','disabled');
            $removeAttribute.children('option[value="'+attributeId+'"]').removeClass('hidden').removeAttr('disabled');

            $addAttribute.children('option').eq(0).prop('selected', 'selected');
            $removeAttribute.children('option').eq(0).prop('selected', 'selected');
            $compare.find('.compare-table-row[data-product-attribute="'+attributeId+'"]').removeClass('attribute-disabled');
            setStripedFeatureRows();
            adjustHeight();
        });

        $removeAttribute.change(function(){
            var attributeId = $(this).val();

            if(attributeId == '0'){
                return;
            }

            var $option = $removeAttribute.children('option[value="'+attributeId+'"]');
            $option.addClass('hidden').prop('disabled','disabled');
            $addAttribute.children('option[value="'+attributeId+'"]').removeClass('hidden').removeAttr('disabled');

            $addAttribute.children('option').eq(0).prop('selected', 'selected');
            $removeAttribute.children('option').eq(0).prop('selected', 'selected');
            $compare.find('.compare-table-row[data-product-attribute="'+attributeId+'"]').addClass('attribute-disabled');
            setStripedFeatureRows();
            adjustHeight();
        });

    }


    var pin = function(productId,index) {

        $compare.addClass('product-pinned');

        $products.find('.compare-table-row').each(function(){
            var $cell = null;
            $cell = $(this).children('.compare-cell').eq(index).detach();
            $(this).children('.compare-cell').eq(0).after($cell);
        });

        $productsClone.find('.compare-table-row').each(function(){
            var $cell = null;
            $cell = $(this).children('.compare-cell').eq(index).detach();
            $(this).children('.compare-cell').eq(0).after($cell);
            $cell.find('h2.pin').addClass('pinned');
        });
    }


    var unPin = function(productId,index) {
        $compare.removeClass('product-pinned');
    }

    var deleteProduct = function(productId,index) {

        if($compare.find('h2.pin').length == 2){
            return;
        }

        $products.find('.compare-table-row').each(function(){
            $(this).children('.compare-cell').eq(index).remove();
        });

        var indexClone = $productsClone.find('h2[data-product-id='+ productId +']').closest('.compare-cell').index();

        $productsClone.find('.compare-table-row').each(function(){
            $(this).children('.compare-cell').eq(indexClone).remove();
        });

        adjustHeight();
    }

    return {
        init: init
    }
}(jQuery, document, undefined));
