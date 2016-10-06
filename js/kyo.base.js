if( navigator.userAgent.match(/iP(hone|[ao]d)/i)) {
    document.title = "Kyocera";
}

 function msieversion() {
  var ua = window.navigator.userAgent
  var msie = ua.indexOf ( "MSIE " )

  if ( msie > 0 )      // If Internet Explorer, return version number
     return parseInt (ua.substring (msie+5, ua.indexOf (".", msie )))
  else                 // If another browser, return 0
     return 0

}


var kyo = kyo || {};
kyo.base = (function ($, document, undefined) {
    "use strict";

    var init = function() {

        $(document).on('kyo.domchanged', onDomchanged);
        $(document).on('kyo.tab.shown', onTabShown);

        $(window).on('resize', onResize).trigger('resize');


        if(msieversion() === 9 || msieversion() === 8){
            $('input[type=text]').each(function(){
                var $input = $(this);
                $input.val($input.attr('placeholder'));
                $input.focus(function(){
                    if ($input.val() ==  $input.attr('placeholder'))  $input.val('');
                });
                $input.blur(function(){
                    if (! $input.val())  $input.val( $input.attr('placeholder'));
                });
            });
            $('textarea').each(function(){
                var $textarea = $(this);
                $textarea.text($textarea.attr('placeholder'));
                $textarea.focus(function(){
                    if ($textarea.text() ==  $textarea.attr('placeholder'))  $textarea.text('');
                });
                $textarea.blur(function(){
                    if (! $textarea.text())  $textarea.text( $textarea.attr('placeholder'));
                });
            });
        }

         if(msieversion() === 8){
            $('body').addClass('ie8');
         }

    }

    var onResize = function(e) {
        //same height
        if($(window).width()>480){
            $('.row.fixedHeight .col-md-6').kyoSameheight({
                target: '> .teaser-linked-right',
                rowDetect: false
            });
            $('.row.fixedHeight .col-md-3').kyoSameheight({
                rowDetect: true
            });
        } else {
            $('.row.fixedHeight .col-md-6').kyoSameheight({
                target: '> .teaser-linked-right',
                rowDetect: true
            });
            $('.row.fixedHeight .col-md-3').kyoSameheight({
                rowDetect: true
            });
        }
    }

    var onTabShown = function(e, target, relatedTarget) {
        var $content = $($(target).attr('data-target'));
        $('.royalSlider', $content).royalSlider('updateSliderSize', true);
    }

    var onDomchanged = function(e, target) {
        kyo.rs.init({
            parent: target
        });
        kyo.video.init({
            parent: target
        });
    }


    return {
        init: init
    }
}(jQuery, document, undefined));


jQuery(document).ready(function($) {
    kyo.base.init();
});