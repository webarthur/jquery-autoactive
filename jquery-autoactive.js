//~ Add active class automatically when page scrolling

(function($){
	
	$.fn.autoactive = function( options )
	{
		// Merge default options.
        var settings = $.extend({
            diff: 0,		// differece added in calcs
            class: 'active',// class name
            interval: 200,	// interval
            clickSleep: 0,	// sleep a time after menu click
            noSaveData: 0,	// dont rewrite options: used in setInterval loop
        }, options );
        
   		// Get scrolltop and menu selector
		var scrolltop = $(document).scrollTop(),
			selector = this.selector,
			body = $('body');
		
		// clickSleep function
		if( body.data('autoactive_hold') )
			return false;
		
		// Save settings
		if( !settings.noSaveData )
			body.data('autoactive_settings', settings );
		else
			settings = $('body').data('autoactive_settings');
		
		// Create timer/interval
		if( !$('body').data('autoactive_timer') )
			$('body').data('autoactive_timer', setInterval("jQuery('"+this.selector+"').autoactive({noSaveData:1});", settings.interval));
		
		// Return object
		return this.each(function(){
			
			// Check if link is ID
			if( $(this).attr('href').indexOf('#')>-1 ) {
				
				// Add HOLD when menu is clicked (fix changing classes when page scroll by click)
				if( settings.clickSleep && !settings.noSaveData ) {
					
					// Unbind click to avoid duplicate click
					$(this).unbind('click.autoactive_hold');
					
					// Add click to hold autoactive
					$(this).bind('click.autoactive_hold', function(){
						
						// Hold autoactive
						body.data('autoactive_hold', 1);
						
						// Clear timeout to avoid clear on second click
						clearTimeout( body.data('autoactive_hold_tout') );
						
						// Register and run timeout
						body.data('autoactive_hold_tout', setTimeout("jQuery('body').data('autoactive_hold', 0);", settings.clickSleep) );
					});
				}
				
				// Get section ID
				var id = $(this).attr('href');
				
				var diff = settings.diff, // set differece added in calcs
					objecttop = $(id).offset().top, // get section top
					objectH = $(id).height();		// get section height
				
				// Check scrolltop and sections
				if( scrolltop>=objecttop-diff && scrolltop<objecttop+objectH-diff ) {
					
					// Remove all active classes
					$(selector).removeClass( settings.class );
					
					// Add active class in the specific menu link
					$('a[href^="'+id+'"]').addClass( settings.class );
				}
				
			}
			
		});
		
	};
   
})(jQuery);
