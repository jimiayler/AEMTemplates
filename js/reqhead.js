console.log('load rebrush-base-template bottom.js');
		var require = {
		    baseUrl: 'js/',
		    paths: {
		        jquery: 'jquery.min',
		        jqueryMig: 'jquery-migrate.min',
		        bootstrap: 'bootstrap.min',
		        modernizr: 'modernizr.min',
		        modernizrCustom: 'modernizr.custom.min',
		
		        datatables: 'jquery.dataTables.min',
		        datatablesColVis: 'dataTables.colVis.min',
		        datatablesTools: 'dataTables.tableTools.min',
		        datatablesBootstrap: 'dataTables.bootstrap.min',
		        datatablesresponsiv: 'datatables.responsive.min',
		        fileupload: 'jquery.fileupload',
		        imagecropper: 'cropper.min',
		        jqueryUI: 'jquery-ui.min',
		        jqueryUIwidget: 'jquery.ui.widget',
		        jqueryIframeTransport: 'jquery.iframe-transport',
		        jwplayer: 'jwplayer.min',
		        swfobject: 'swfobject_source',
		        royalslider: 'jquery.royalslider.min',
		        vectormap: 'jquery-jvectormap-1.2.2.min',
		        fancyboxpack: 'jquery.fancybox.pack',
            	fancyboxmedia: 'jquery.fancybox-media'
		    },
		    waitSeconds: 0,
		
		    shim: {
		        'bootstrap': {
		            deps: ['jquery']
		        },
		        'datatables': {
		            deps: ['jquery'],
		            exports: 'jquery.dataTables.min'
		        },
		        'datatablesresponsiv': ['bootstrap'],
		        'datatablesBootstrap': ['bootstrap', 'datatables'],
		        'datatablesColVis': ['datatables'],
		        'datatablesTools': ['datatables'],
		        'easyzoom': ['jquery'],
		        'fileupload': {
		            deps: ['jquery', 'jqueryUI', 'jqueryIframeTransport'],
		            exports: 'jquery.fileupload'
		        },
		        'imagecropper': {
		            deps: ['jquery'],
		            exports: 'cropper.min'
		        },
		        'jquery-ui.min': ['jquery'],
		        'kyo': ['jquery', 'bootstrap'],
		        'kyo.base': ['jquery', 'bootstrap', 'kyo.sameheight'],
		        'kyo.contact': ['jquery'],
		        'kyo.dock':['jquery'],
		        'kyo.flexnav':['jquery'],
		        'kyo.linked': ['jquery'],
		        'kyo.mobile-table': ['jquery'],
		        'kyo.nav': ['jquery'],
		        'kyo.productfilter': ['jquery'],
		        'kyo.productcompare': ['jquery'],
		        'kyo.rs': ['jquery', 'royalslider'],
		        'kyo.sameheight': ['jquery'],
		        'kyo.sitesearch': ['jquery'],
		        'kyo.scrolltop': ['jquery'],
		        'kyo.tabload': ['kyo.base'],
		        'kyo.video': ['jquery', 'jwplayer'],
		        'jwplayer': ['jquery'],
		        'jqueryMig': ['jquery'],
		        'jqueryUI': ['jquery'],
		        'royalslider': ['jquery'],
		        'fancyboxpack': ['jquery'], 
            	'fancyboxmedia': ['jquery'], 
		        'vectormap': ['jquery'],
		        '360': ['jquery','jqueryMig'],
		        'bootstrap-datepicker.min': ['bootstrap'],
		        'bootstrap-multiselect.min': ['bootstrap'],
		        'bootstrap.file-input': ['bootstrap'],
		        'bootstrap-tagsinput.min': ['bootstrap'],
		        'pwstrength-bootstrap-1.2.7.min': ['bootstrap'],
		        'dygraph-combined.min': ['jquery'],
		        'iframeResizer.min': ['jquery'],
		        'jquery.iframe-transport': ['jquery'],
		        'jquery.nestable.min': ['jquery'],
		        'jquery.knob.min': ['jquery'],
		        'morris.min': ['jquery'],
		        'raphael.min': ['jquery'],
		        'jquery.sparkline.min': ['jquery'],
		        'typeahead.bundle.min': ['jquery'],
		        'jquery-jvectormap-ch-mill-en': ['vectormap'],
		        'wizard': ['jquery'],
		        'x-editable.min': ['jquery']
		    },
		    deps: ['jquery', 'bootstrap', 'modernizrCustom', 'kyo.flexnav', 'kyo.mobile-table', 'kyo.dock', 'kyo.scrolltop', 'kyo.nav', 'fancyboxpack', 'fancyboxmedia'],
		    callback: function ($) {
		        kyo.flexnav.init();
		        kyo.dock.init();
		        kyo.scrollTop.init();
		        kyo.nav.init();
		        if (!navigator.userAgent.match(/msie/i) ){
		            kyo.mobiletable.init();
		        }

		        //basic design functions (toggle search input)
	            $('.search-toggle').bind('click',function(){
	                var tgt = $(this).attr('data-target');
	                $(this).hide();
	                $(tgt).find('.collapse').removeClass('collapse');
	                $(tgt).show();
	                $(tgt).find('input').first().focus();
	            });
	            $('a.info').on('mouseover',function(){
	                $(this).tooltip('show');
	            });
	            $('a.info').on('mouseout',function(){
	                $(this).tooltip('hide');
	            });
		
		        //TYPEAHEAD for search box
		        var obj_suggest = new Bloodhound({
		            datumTokenizer: function (datum) {
		                return Bloodhound.tokenizers.whitespace(datum.value);
		            },
		            queryTokenizer: Bloodhound.tokenizers.whitespace,
		            remote: {
		                url: '//ac.kyocera.eu/de_de/standard_fulltext/ac.html?term=%QUERY',
		                filter: function (suggests) {
		                    return $.map(suggests.suggestions, function (suggest) {
		                        return {
		                            value: suggest.value,
		                            desc: '<i class="fa fa-print"></i> ' + suggest.value
		                        };
		                    });
		                },
		                ajax: {
		                    dataType: "jsonp"
		                }
		            }
		        });
		
		        obj_suggest.initialize();
		
		        $('#searchbox').typeahead(
		                {
		                    minLength: 3,
		                    highlight: false,
		                    hint: false
		                }, {
		                    name: 'products',
		                    displayKey: 'value',
		                    source: obj_suggest.ttAdapter()
		                }); 
		
		        window.is_touch = Modernizr.touch;
		        window.is_chrome = window.chrome;
		
		    }
		};