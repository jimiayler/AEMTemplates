if( navigator.userAgent.match(/iP(hone|[ao]d)/i)) { document.title = "Kyocera"; }

var is_touch = Modernizr.touch
var is_chrome = window.chrome;

jQuery(document).ready(function($) {

	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
		var sliderEl = $( $(e.target).attr('href') ).find('.royalSlider');
		if(sliderEl.length) {
			sliderEl.royalSlider('updateSliderSize', true);
		}
	});
  
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

	// datepicker implemented for non-touch devices only
	var show_dp = true;
	if ((is_touch) || (is_chrome)) show_dp = false;
	if (show_dp) {
		$('div.date').datepicker({
			format: "dd.mm.yyyy",
			weekStart: 1,
			autoclose: true
		});
	}

	$('button.has-spinner').bind('click',function(e){
		e.stopPropagation();
		e.preventDefault();
		if (!$(this).hasClass('active')) {
			$(this).toggleClass('active');
			// go ahead with form submit here
		}
	});

	/* SocialSharePrivacy 1.6 */
	$('#socialshareprivacy').each(function(){
		$(this).socialSharePrivacy({
			services : {
				facebook : {
					'perma_option': 'on',
					'dummy_img': '/img/ssp/dummy_facebook.png'
				}, 
				twitter : {
					'perma_option': 'on',
					'dummy_img': '/img/ssp/dummy_twitter.png'
				},
				gplus : {
					'perma_option': 'on',
					'dummy_img': '/img/ssp/dummy_gplus.png'
				}
			},
			'css_path': '/css/socialshareprivacy.css',
			'lang_path': '/js/ssp/',
			'language': 'de',
			'info_link': ''
		});
	});
});
