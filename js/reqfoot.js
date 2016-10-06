console.log('load homepage bottom.js');
    require(['kyo.rs', 'kyo.tabload', 'kyo.base', 'royalslider', 'typeahead.bundle.min'],
            function() {
                $("#cps6812" ).attr( "scrolling", "no" );
                $("#cps6812" ).attr( "width", "100%" );
                $(".fancybox-media").fancybox({
                    type : "iframe",
                    onComplete : function () {
                        $("#fancybox-frame").attr("allowfullscreen", "allowfullscreen")
                    }
                });
                jQuery('.full-width-slider').royalSlider({
                    arrowsNav: true,
                    loop: true,
                    keyboardNavEnabled: true,
                    controlsInside: false,
                    imageScaleMode: 'none',
                    arrowsNavAutoHide: true,
                    arrowsAutoHide: true,
                    arrowsNavHideOnTouch: true,
                    autoScaleSlider: true,
                    autoScaleSliderWidth: '100%',
                    autoHeight: true,
                    imageAlignCenter: true,
                    controlNavigation: 'bullets',
                    thumbsFitInViewport: false,
                    navigateByClick: true,
                    startSlideId: 0,
                    autoPlay: {
                        enabled: true,
                        delay: 4000,
                        stopAtAction: false
                    },
                    transitionType: 'move',
                    globalCaption: false,
                    slidesSpacing: 0,
                    deeplinking: {
                        enabled: true,
                        change: false
                    },
                    block: {
                        fadeEffect: false,
                        moveEffect: 'none'
                    }
                });
                jQuery('#news-slider').royalSlider({
                    arrowsNav: false,
                    autoScaleSlider: true,
                    autoScaleSliderWidth: 255,
                    autoScaleSliderHeight: 100,
                    controlNavigation: 'none',
                    fadeinLoadedSlide: true,
                    keyboardNavEnabled: false,
                    loop: true,
                    loopRewind: false,
                    navigateByClick: false,
                    sliderDrag: false,
                    slidesOrientation: 'vertical',
                    sliderTouch: true,
                    transitionType: 'move',
                    transitionSpeed: 2000,
                    autoPlay: {
                        delay: 4000,
                        enabled: true
                    },
                    deeplinking: {
                        enabled: true,
                        change: false
                    }
                });
                jQuery('#news-slider2').royalSlider({
                    arrowsNav: false,
                    autoScaleSlider: true,
                    autoScaleSliderWidth: 255,
                    autoScaleSliderHeight: 100,
                    controlNavigation: 'none',
                    fadeinLoadedSlide: true,
                    keyboardNavEnabled: false,
                    loop: true,
                    loopRewind: false,
                    navigateByClick: false,
                    sliderDrag: false,
                    slidesOrientation: 'vertical',
                    sliderTouch: true,
                    transitionType: 'move',
                    transitionSpeed: 2000,
                    autoPlay: {
                        delay: 4000,
                        enabled: true
                    },
                    deeplinking: {
                        enabled: true,
                        change: false
                    }
                });
                jQuery('#event-slider').royalSlider({
                    arrowsNav: false,
                    autoScaleSlider: true,
                    autoScaleSliderWidth: 255,
                    autoScaleSliderHeight: 100,
                    controlNavigation: 'none',
                    fadeinLoadedSlide: true,
                    keyboardNavEnabled: false,
                    loop: true,
                    loopRewind: false,
                    navigateByClick: false,
                    sliderDrag: false,
                    slidesOrientation: 'vertical',
                    sliderTouch: true,
                    transitionType: 'move',
                    transitionSpeed: 2000,
                    autoPlay: {
                        delay: 3000,
                        enabled: true
                    },
                    deeplinking: {
                        enabled: true,
                        change: false
                    }
                 }); 
                jQuery('#event-slider2').royalSlider({
                    arrowsNav: false,
                    autoScaleSlider: true,
                    autoScaleSliderWidth: 255,
                    autoScaleSliderHeight: 100,
                    controlNavigation: 'none',
                    fadeinLoadedSlide: true,
                    keyboardNavEnabled: false,
                    loop: true,
                    loopRewind: false,
                    navigateByClick: false,
                    sliderDrag: false,
                    slidesOrientation: 'vertical',
                    sliderTouch: true,
                    transitionType: 'move',
                    transitionSpeed: 2000,
                    autoPlay: {
                        delay: 3000,
                        enabled: true
                    },
                    deeplinking: {
                        enabled: true,
                        change: false
                    }
                 }); 
                
                $( document ).ready(function() {
                    $('#englink').on('click', function(e) {
                      //$(this).toggleClass("langon langoff");
                      if ($(this).hasClass("langon")) {
                        $(this).addClass('langoff').removeClass('langon');
                        $('#spanlink').addClass('langon').removeClass('langoff');
                      } else if ($(this).hasClass("langoff")) {
                        $(this).addClass('langon').removeClass('langoff');
                        $('#spanlink').addClass('langoff').removeClass('langon');
                      }
                      e.preventDefault();
                    });
                    $('#spanlink').on('click', function(e) {
                      //$(this).toggleClass("langon langoff");
                      if ($(this).hasClass("langon")) {
                        $(this).addClass('langoff').removeClass('langon');
                        $('#englink').addClass('langon').removeClass('langoff');
                      } else if ($(this).hasClass("langoff")) {
                        $(this).addClass('langon').removeClass('langoff');
                        $('#englink').addClass('langoff').removeClass('langon');
                      }
                      e.preventDefault();
                    });
                });

            }
    );