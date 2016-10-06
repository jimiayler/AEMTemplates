console.log('load solution-internal bottom.js');
    require(['jwplayer' ,'kyo.rs' ,'kyo.video', 'kyo.tabload', 'kyo.base', 'kyo.sitesearch', 'kyo.productfilter','kyo.productcompare'],
            function(jwplayer) {
                window.jwplayer = jwplayer; /!* fix needed if flash player should be loaded*!/
                kyo.rs.init();
                kyo.video.init();
                kyo.tabload.init();
                kyo.productfilter.init();
                kyo.productcompare.init();

                $('#sitesearch-input').typeahead({
                    minLength: 3,
                    highlight: false,
                    hint: false
                }, {
                    name: 'products',
                    displayKey: 'value',
                    source: obj_suggest.ttAdapter()
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
                    // $("h2").on("click", function(){
                    //     alert("The paragraph was clicked.");
                    // });
                });

            }
    );