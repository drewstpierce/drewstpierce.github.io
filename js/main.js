/* This should let canvas element spill over outside of Boorstrap's borders.
I could probably just modify bootstrap, but I'll most likely want its frames
and grids for the actual UI elements (hence the fact that I'm using it in the
first place). */

(function() {
    var canvas = document.getElementById('skyLines'),
            context = canvas.getContext('2d');

    // Make the canvas stretch forever (dynamic, responsive, etc.)
    window.addEventListener('resize', resizeCanvas, false);

    /* by making its size equal to whatever the window's inner dimensions happen
    to be at that moment (we'll call this in a moment) */
    function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            /* The function for drawing what's actually on the canvas */
            drawSky();

    }

    /* Calling the function we made above indefinitely so it'll always
    know when the browser window has been resized*/
    resizeCanvas();

    /* The "sky" in question here is actually the ground. I originally
    planned for these to go up to, but once I saw them on the ground,
    I decided they serve better as horizon lines leading from the horizon
    down */
    function drawSky() {
      var i;
      context.beginPath();
      context.strokeStyle = "#eee8d5";
      context.lineWidth = "3" + i;
      /* Using a for loop to make a bunch of rectangles spaced out by i's
      value to emulate that old school pseudo raycasting effect. We're only
      really seeing the tops of them, with their bottoms disappearing against
      the background outside the gradient. */
            for (i = 0; i <= 16; i++) {;
              context.rect(0, 0, canvas.width, canvas.height/i + 340);
            }
            context.stroke();
    }
})();




 $(window).scroll(function() {
    console.log($(window).scrollTop());
    var topDivHeight = $(".intro-section").height();
    var viewPortSize = $(window).height();

    var triggerAt = viewPortSize / 2.5;
    var triggerHeight = (topDivHeight - viewPortSize) + triggerAt;

    if ($(window).scrollTop() >= triggerHeight) {
	$('.hideMe').css('visibility',
			      'visible').hide().fadeIn();
	$(this).off('scroll');
    }
}); 

//lightbox stuff

(function($) {

	skel
		.breakpoints({
			desktop: '(min-width: 737px)',
			tablet: '(min-width: 737px) and (max-width: 1200px)',
			mobile: '(max-width: 736px)'
		})
		.viewport({
			breakpoints: {
				tablet: {
					width: 1080
				}
			}
		});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'fade',
				noOpenerFade: true,
				alignment: 'center'
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

	});

})(jQuery);