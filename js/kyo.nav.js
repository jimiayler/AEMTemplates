kyo.nav = (function ($, document, undefined) {
    'use strict';

    var defaults = {
        parent: false,
        target: '.kyo-linked'
    }
    var options;
    var init = function(settings) {
        options = $.extend({}, defaults, settings);


        $('.navbar-nav .hasfold').each(function() {
            $(this).click(function(e) {
                var item = $(this);
                var itemId = $(this).attr('id');
                var ulTarget = $(this).next('ul');
                if($(window).width() > 991) {

                    e.preventDefault();

                    // normal view
                    if($(this).hasClass('activated')) {
                        $('.navbar-nav .activated').removeClass('activated');
                        $('.nav-foldout .active').removeClass('active').fadeOut('fast');
                        $('.nav-foldout').slideUp(300, function() {
                            $('.nav-foldout .active').removeClass('active').hide();
                        });
                    } else {
                        $('.navbar-nav .activated').removeClass('activated');
                        $(this).addClass('activated');
                        if($('.nav-foldout .active').length > 0) {
                            $('.nav-foldout .active').removeClass('active').fadeOut('fast', function() {
                                $('.nav-foldout .fold-' + itemId).addClass('active').fadeIn();
                            });
                        } else {
                            $('.nav-foldout .fold-' + itemId).addClass('active').fadeIn(300);
                            $('.nav-foldout').slideDown(400);
                        }
                    }
                }
            });
        });

        $('.navbar-nav .chevy').each(function() {
            $(this).click(function(e) {

                var item = $(this).parent();
                var itemId = $(this).parent().attr('id');
                var ulTarget = item.next('ul');
                if($(window).width() < 991) {

                    e.preventDefault();

                    item.parent().siblings().find('.open').removeClass('open');

                    // mobile view
                    if(ulTarget.hasClass('activated')) {
                        ulTarget.removeClass('activated').slideUp(300, function() {
                            item.parent().removeClass('activated');
                            //item.parent().removeClass('active');
                            item.removeClass('open');
                            ulTarget.find('.open').removeClass('open');
                            ulTarget.find('.activated').removeClass('activated');
                            ulTarget.find('ul').hide();
                        });
                    } else {
                        $('ul.activated').each(function() {
                            if($(this).has(item).length == 0) {
                                $(this).removeClass('activated').slideUp(400);
                            }
                        });

                        $('li.activated').removeClass('activated');
                        item.addClass('open');
                        item.parent().addClass('activated');
                        ulTarget.addClass('activated').slideDown(350);
                    }
                }
            });
        });


        $('.navbar-nav a.active').each(function() {
            $(this).parentsUntil('.navbar-offcanvas','.navbar-nav').show().addClass('activated').prev('.hasfold').addClass('open');
        });


        $('.fold-close a').click(function(e) {
            e.preventDefault();
            $('.navbar-nav .activated').removeClass('activated');
            $('.nav-foldout .active').removeClass('active').fadeOut('fast');
            $('.nav-foldout').slideUp(300);

        });

        $('.navbar-header .navbar-toggle2').unbind();
        var menuDelay = false;
        $('.navbar-header .navbar-toggle2').click(function(e) {
            e.preventDefault();
            if($('#page').hasClass('show_nav')) {
                $('.offcanvas').animate({left: -260}, 160);
                menuDelay = setTimeout(function() {
                    $('#page').removeClass('show_nav').animate({left: 0}, 400);
                    $('body').removeClass('offcanvas-nav-open');
                }, 100);
                $('#mobileNavOverlay').fadeOut(400, function() {
                    $(this).remove();
                });
            } else {
                $('#page').addClass('show_nav').animate({left: 260}, 600);
                $('body').addClass('offcanvas-nav-open');
                $('#mobileNavOverlay').fadeIn(1, function() {
                    $(this).click(function() {
                        $('#page').removeClass('show_nav').animate({left: 0}, 400);
                        $('body').removeClass('offcanvas-nav-open');
                        $('#mobileNavOverlay').fadeOut(1);
                    });
                });
            }




        });
    }

    return {
        init: init
    }
}(jQuery, document, undefined));
