var kyo = kyo || {};
kyo.dock = (function ($, window, document, undefined) {
    "use strict";

    var config = {
        scrollSpeed: 800
    };

    var docks = {};
    docks.nav = {
        heightMod: 20,
        adjustStyle: 'padding-top',
        adjustValue: 20
    }
    docks.filter = {
        heightMod: 0,
        adjustStyle: 'margin-bottom',
        adjustValue: 0
    }

    var scrollPos = 0;
    var $el = null,
        $dock = null,
        $adjust,
        $docknavToggle,
        $docknavCollapse,
        offsetTop,
        height,
        docknavCollapseHeight,
        adjustStyle,
        adjustValue;

    var init = function() {

        config.type = getType();
        switch (config.type) {
            case 'nav':
                $el = $("#docknav");
                $dock = $("#docknav-con");
                $adjust = $dock.closest("section");
                $docknavToggle = $('#docknav-con').find('.docknav-toggle');
                $docknavCollapse = $('#docknav-con').find('.docknav-collapse');
                break;

            case 'filter':
                $el = $("#dockfilter-con").find('.filter-options');
                $dock = $("#dockfilter-con");
                $adjust = $dock.prev();
                break;

            default:
                return;
        }



        $el.find('a').bind('click', function(e) {
            if($docknavToggle.is(':visible')){
                $docknavToggle.find('span').text(this.text).click();
            }
            jumpTo(this.hash);
            return false;
        });

        offsetTop = getOffsetTop();
        height = $dock.height();
        docknavCollapseHeight = 0;
        adjustStyle = docks[config.type].adjustStyle;
        adjustValue = docks[config.type].adjustValue;


        $('body').scrollspy({
            target: '#docknav-con',
            offset: height + 10
        })

        $('.docknav-collapse').on('shown.bs.collapse', function () {
            docknavCollapseHeight = $docknavCollapse.height();
        });
        $('.docknav-collapse').on('hidden.bs.collapse', function () {
            docknavCollapseHeight = 0;
        });


        $('#docknav').find('li').on('activate.bs.scrollspy', function(){
            var activeText =  $('#docknav').find("li.active").children("a").text();
            if(activeText != ""){
                $docknavToggle.find('span').text(activeText);
            }
        });

        $(window).on('scroll', function(e){
            scrollPos = $(this).scrollTop();
            offsetTop = getOffsetTop();
            if (!$dock.hasClass('docked') && scrollPos > offsetTop ) {
                $dock.addClass("docked");
                $adjust.css(adjustStyle, height + docknavCollapseHeight + docks[config.type].heightMod);
            } else if ($dock.hasClass('docked') && scrollPos <= offsetTop) {
                $dock.removeClass("docked");
                $adjust.css(adjustStyle, adjustValue);
            }
        }).trigger('scroll');
    }

    var getType = function() {
        var type = false;
        if($('.dock-top').length !== 0 ) {
            type = 'nav';
        }
        if ($('#dockfilter-con').length !== 0) {
            type = 'filter';
        }
        return type;
    }

    var getOffsetTop = function() {
        return $dock.next().offset().top - $dock.height();
    }

    var jumpTo =function(el) {
        $('html, body').stop( true, false ).animate({
            scrollTop: $(el).offset().top - height + 20
        }, config.scrollSpeed);
    }

    var getScrollPos = function() {
        return scrollPos;
    }

    var setScrollSpeed = function(speed) {
        config.scrollSpeed = speed;
    }

    return {
        init: init,
        getScrollPos: getScrollPos,
        jumpTo: jumpTo,
        setScrollSpeed: setScrollSpeed
    }

}(jQuery, window, document, undefined));