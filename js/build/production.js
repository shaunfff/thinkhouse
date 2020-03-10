$( document ).ready(function() {
	// Nav Control    
	$('.header__menu-toggle a').click(function(){
		$(this).toggleClass('open');
		$('.header__pnav').toggleClass('open');
		$('body').toggleClass('freeze');		
		return false;
	});
	
});
$(window).scroll(function() {
	var topPos = $(this).scrollTop();
	if (topPos > 240) {
		$('header').addClass("nav-small");	
		$('.header__nav').addClass("fixed");			
	}else{
	  $('header').removeClass("nav-small");
	  $('.header__nav').removeClass("fixed");		
	}
	
});
jQuery(document).click(function(event){
    // Check if clicked outside .target-div
    if (!(jQuery(event.target).closest(".header__pnav").length)) {
        // Hide .target-div
        $(".header__pnav").removeClass("open");
        $('body').removeClass('freeze');
        $('.header__menu-toggle a').removeClass("open");        
    }
});