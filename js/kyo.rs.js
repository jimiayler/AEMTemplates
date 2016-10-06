/*
 */
;var kyo = kyo || {};
kyo.rs = (function ($, document, undefined) {
    'use strict';

    /**
    * Default module settings
    *
    * @property defaults
    * @type {Object}
    */
    var defaults = {
        parent: false,
        target: '.royalSlider'
    };

    /**
    * Default royalslider variants settings
    *
    * @property config
    * @type {Object}
    */
    var config = {};

    /**
    * Basic settings for all royalslider variants
    *
    * @property config.base
    * @type {Object}
    */
    config.base = {
        autoScaleSlider: false,
        imageScaleMode: 'none',
        navigateByClick: false,
        controlNavigation: 'bullets',
        arrowsNav:true,
        arrowsNavAutoHide: false,
        arrowsNavHideOnTouch: true,
        controlsInside:false,
        imageAlignCenter: true,
        keyboardNavEnabled: true,
        fadeinLoadedSlide: true,
        globalCaption: true,
        globalCaptionInside: false,
        addActiveClass:true
    }

    /**
    * Settings for royalslider stageGallery variant
    *
    * @property config.base
    * @type {Object}
    */
    config.stageGallery = {
        autoScaleSlider: true,
        autoScaleSliderWidth: '100%',
        autoHeight: true,
        controlNavigation: false,
        arrowsNavHideOnTouch: false
    }

    /**
    * Settings for royalslider contentGallery variant
    *
    * @property config.base
    * @type {Object}
    */
    config.contentGallery = {
        autoScaleSlider: true,
        autoScaleSliderWidth: '100%',
        autoHeight: true,
        controlsInside:true,
        arrowsNavHideOnTouch: false
    }

    /**
    * Settings for royalslider imageGallery variant
    *
    * @property config.base
    * @type {Object}
    */
    config.imgGallery = {
        numImagesToPreload:2,
        imageScaleMode: 'fit',
        arrowsNavHideOnTouch: false
    }

    /**
    * Settings for royalslider productGallery variant
    *
    * @property config.base
    * @type {Object}
    */
    config.productGallery = {
        sliderDrag:false,
        sliderTouch: false,
        navigateByClick: false,
        numImagesToPreload:2,
        controlNavigation: 'thumbnails',
        arrowsNav:false,
        imageAlignCenter: false,
        imageScaleMode: 'fit',
        autoHeight: true
    }


    // royalslider plugin loading
    // removes custom rs-loading class on rs init.
    // needs to be called as a rs plugin to catch the rsAfterInit event.
    $.extend($.rsProto, {
        _kyoLoading: function() {
            this.ev.on('rsAfterInit', function(e) {
                var $rs = $(e.target.slider.context);
                // remove initial rs-loading class
                $rs.closest('.royalSlider-con').removeClass('rs-loading');
                e.target.updateSliderSize(true);
            });
        }
    });
    $.rsModules.kyoLoading = $.rsProto._kyoLoading;



    /**
    * Module initialisation
    *
    * @method init
    * @param {Object} settings custom module settings
    */
    var init = function(settings) {
        var $collection;
        var options = $.extend({}, defaults, settings);
        var that = this;
        $collection = (options.parent) ? $(options.target, $(options.parent)) : $(options.target);

        $collection.each(function(){
            var $rs = $(this);
            $.each(config, function(index, item){
                if($rs.hasClass(index)) {
                    var rsConfig = $.extend({}, config.base, config[index]);
                    var slider = $rs.royalSlider(rsConfig).data('royalSlider');
                    arrowText($rs);
                    if (index == 'productGallery') {
                        initFeatures($rs);
                    }
                    slider.ev.on('rsAfterSlideChange', function(e){
                        onAfterSlideChange.apply($rs, [e, index]);
                    });
                    slider.ev.on('rsAfterContentSet', function(e, slideObject) {
                        onAfterContentSet.apply($rs, [e, slideObject, index]);
                    });
                }
            });
        });
    }

    /**
    * Royalslider Callback method for rsAfterContentSet.
    * Method scope is the royalslider base element (jQuery element).
    *
    * @method onAfterContentSet
    * @param {Object} e royalslider event object
    * @param {Object} slideObject royalslider object that contains the generated slide.
    * @param {String} royalslider variant. actually the classname (e.a. "contentGallery")
    */
    var onAfterContentSet = function(e, slideObject, type) {
        var $rs = $(this);
        // init new videos
        /*
        kyo.video.init({
            parent: $rs
        })
        */
    }

    /**
    * Royalslider Callback method for rsAfterSlideChange
    * Method scope is the royalslider base element (jQuery element).
    *
    * @method onAfterSlideChange
    * @param {Object} e royalslider event object
    * @param {String} royalslider variant. actually the classname (e.a. "contentGallery")
    */
    var onAfterSlideChange = function(e, type) {
        var $rs = $(this);
        // pause videos
        $('.rsSlide:not(.rsActiveSlide) .jwplayer', $rs).each(function(){
            var id = $(this).attr('id');
            jwplayer(id).pause(true);
        });
    }

    var arrowText = function($rs) {
        //console.log('arrow text');
        var prevArrow = $rs.find('.rsArrowLeft').find(".rsArrowIcn");
        var nextArrow = $rs.find('.rsArrowRight').find(".rsArrowIcn");

        var prevArrowLabel = $rs.next(".rsKyoControls").find('.arrowLeftLabel').text();
        var nextArrowLabel = $rs.next(".rsKyoControls").find('.arrowRightLabel').text();

        if(prevArrowLabel != '') {
            prevArrow.addClass('has-label');
            prevArrow.append('<span>'+prevArrowLabel+'</span>');
        }
        if(nextArrowLabel != "") {
            nextArrow.addClass("has-label");
            nextArrow.append('<span>'+nextArrowLabel+'</span>');
        }
    }



  var animations3D = [];


    var stop3DAnimation = function($viewer){
        var $playButton = $viewer.find('.button.t-play-pause');

        if(!$playButton.hasClass('kyo-stopped')){
            $playButton.trigger('click').addClass('kyo-stopped');
        } else if ($playButton.hasClass('on')){
            $playButton.trigger('click').addClass('kyo-stopped');
        }
    }


    var init3DAnimation = function($feature){

        animations3D.push($feature.data('3d-con'));

        $feature.bind('click', function(){
            var $featureCon = $("#"+$(this).data('3d-con'));
            $featureCon.siblings().hide();

            $featureCon.siblings().each(function(){
                stop3DAnimation($(this));
            });

            $featureCon.thavis360({
                serverLocation:'/pagetypes/img/v2/thavis',
                objDir:'fs1041',
                imgTotal:72,
                imgStart:1,
                stepping:10,
                spinInterval:70,
                spinDirection:'forward',
                navPosition:'top',
                zoomMode:'move'
            });
            $featureCon.show();

            if($featureCon.find('.nav .t-close').length == 0){
                $featureCon.find('.nav').append('<a href="javascript:void(0);" class="button t-close">Close</a>');
                $featureCon.find('.nav .t-close').bind('click', function(){
                    $(this).closest('.kyo-thavis').hide();
                });
            }
        });
    }

    var initZoom = function($feature){
       $feature.easyZoom();
       console.log('init zoom');
    }

    var initZoomToggle = function($rs){
        var events = "mouseenter mouseleave";
        if(Modernizr.touch){
            events = "touchstart touchend";
        }

        $rs.on(events, '.easyzoom', function(e){

            var zoom = $(this);


            var activeSlide = zoom.closest('.rsActiveSlide');
            var rsOverflow = zoom.closest('.rsOverflow');
            var rsCon = zoom.closest('.royalSlider-con');

            if(activeSlide.length > 0){

                if(rsOverflow.hasClass('zoomed')){
                    rsOverflow.find('.rsSlide').removeClass('zoomed');
                    rsOverflow.removeClass("zoomed");
                    rsCon.removeClass("zoomed");
                } else {
                    activeSlide.addClass("zoomed").siblings().removeClass('zoomed');
                    rsOverflow.addClass("zoomed");
                    rsCon.addClass("zoomed");

                }
            }
        });
    }


    var initFeatures = function($rs) {
        var sliderE =  $rs.data('royalSlider');
        sliderE.ev.on('rsAfterContentSet rsAfterSlideChange', function(e, slideObject) {
            //$('.easyzoom').easyZoom();
        });

        sliderE.ev.on('rsDragStart', function(e, slideObject) {
            $rs.find('.rsSlide').removeClass('zoomed');
            $rs.find('.rsOverflow').removeClass("zoomed");
        });

        $rs.find('.icon-3d').parent().addClass('rs-thumbnail-3d');
        $rs.find('.icon-zoom').parent().addClass('rs-thumbnail-zoom');
        $rs.find('.icon-video').parent().addClass('rs-thumbnail-video');


        $rs.find('.rs-thumbnail-3d').on('click', function(){
            //console.log('3d');
        });


        $rs.find('.rs-thumbnail-zoom').on('click', function(){
            //console.log('zoom');
        });


        $rs.find('.rs-thumbnail-video').on('click', function(){
            //console.log('video');
        });


        //QS - todo
        if(screen.width > 480){
            initZoomToggle($rs);
        }


        sliderE.ev.on('rsAfterContentSet', function(e, slideObject) {

            $rs.find('.slide').each(function(){

                var $slide = $(this) ;
                if($slide.hasClass('processed')){
                    //console.log('processed');
                } else {

                    $slide.find('.feature-3d').each(function(){
                        init3DAnimation($(this));
                        //console.log('3d feature');
                    });

                    $slide.find('.feature-zoom').each(function(){
                        initZoom($(this));
                        //console.log('zoom feature');
                    });

                    $slide.find('.feature-video').each(function(){
                        //console.log('video feature');
                    });

                    //console.log('not processed');
                   $slide.addClass('processed');
                }
            });
        });

        sliderE.ev.on('rsBeforeAnimStart', function(event) {
            $.each( animations3D, function( key, value ) {
                //console.log( key + ": " + value );
                $('#'+value).hide();
                stop3DAnimation($('#'+value));
            });
        });
    }

    return {
        init: init
    }

}(jQuery, document, undefined));