
var AppSettings = {
	easing: 'easeOutQuad',
	scrollPos: 0,
	winHeight: 0,
	winWidth: 0
};

var Events = {

	bindEvents: function () {

		// bind scroll & resize event handlers
		$(window).on('load debouncedresize', function () {
			Events.resizeEvents();
		});
		$(window).on('load scroll', function () {
			Events.scrollEvents();
		});
	},

	resizeEvents: function () {

		// run scroll events
		this.scrollEvents();

		// get window dimensions and header height
		AppSettings.winHeight = $(window).outerHeight();
		AppSettings.winWidth = $(window).outerWidth();
	},

	scrollEvents: function () {

		// set scroll position
		AppSettings.scrollPos = $(window).scrollTop();

		if($(PageExhibition.selector).length) {
			PageExhibition.scrollEvent();
		}
	},

	unbindScrollEvent: function () {

		$(window).off('scroll');
	}
};

var Links = {

	element: '[data-target]',
	targetNewWindow: 'newWindow',
	targetPageTop: 'pageTop',
	targetOnPage: 'onPage',
	$viewport: $('html, body'),

	init: function () {
		this.bindClickEvent();
	},

	bindClickEvent: function () {

		// bind click event on any data-target
		$(this.element).on('click', function (e) {

			var $this = $(this),
				linkHref = $this.attr('href'),
				linkTarget = $this.data('target');

			// match data-target and run relevant function
			switch (linkTarget) {
				case Links.targetNewWindow:
					Links.newWindow(linkHref);
					break;
				case Links.targetPageTop:
					Links.pageTop();
					break;
				case Links.targetOnPage:
					Links.smoothScroll(linkHref);
			}

			e.preventDefault();
		});

	},

	newWindow: function (href) {
		// open new window with params
		window.open(href, 'popup', 'width=500, height=420, resizable=yes');
	},

	pageTop: function () {
		// scroll to top
		this.$viewport.stop().animate({
			scrollTop: 0
		}, 500, AppSettings.Easing);
	},

	smoothScroll: function (href) {
		// scroll to offset of target
		this.$viewport.stop().animate({
			scrollTop: $(href).offset().top
		}, 750, AppSettings.Easing);
	}

};



// Components

var Carousel = {

	selector: '[data-swiper]',
	direction: '[data-swiper-direction]',
	pagination: '[data-swiper-pagination]',

	init: function() {
		this.build();
		this.bindDirectionButtons();
	},

	build: function() {

		$(this.selector).swiper({
			grabCursor: true,
			keyboardControl: true,
			loop: true,
			mode:'horizontal',
			pagination: Carousel.pagination,
			paginationClickable: true,
			paginationElement: 'li',
			speed: 500
		});
	},

	bindDirectionButtons: function() {

		$(this.direction).on('click', function () {

			var $this = $(this),
				carousel = $(Carousel.selector).data('swiper'),
				direction = $this.data('swiper-direction');

			// go to next slide else go to prev slide
			if (direction == 'next') {
				carousel.swipeNext();
			} else if (direction == 'prev') {
				carousel.swipePrev();
			}

		});
	}

};

var Expander = {

	selector: '[data-expander]',
	buttonSelector: '[data-expander-button]',
	contentSelector: '[data-expander-content]',
	duration: 250,

	init: function () {
		if ($(this.selector).length) {

			// add aria attributes to aid accessibility
			this.setAriaAttrs();

			// bind click events for toggle
			this.bindClickEvents();
		}
	},

	setAriaAttrs: function () {

		// loop through each accordion
		$(this.selector).each(function (i) {

			// store $this value and unique accordion ID
			var $this = $(this),
				expanderId = 'expander-' + i;

			// add aria-controls to button
			$(Expander.buttonSelector, $this).attr('aria-controls', expanderId);

			// add matching id to its content div
			$(Expander.contentSelector, $this).attr('id', expanderId);

		});
	},

	bindClickEvents: function () {

		// bind click event
		$(this.buttonSelector).on('click', function () {

			// store btn and accordion objects
			var $this = $(this),
				$thisExpander = $this.parents(Expander.selector),
				$thisContent = $(Expander.contentSelector, $thisExpander),
				// textClosed = $this.data('content-closed'),
				// textOpen = $this.data('content-open'),
				state = $this.attr('aria-expanded') === 'false' ? true : false;

			// set btn state
			$this.attr('aria-expanded', state);

			// disable multiple button clicks
			$this.attr('disabled', true);

			// animate, set content aria-hidden state to opposite and remove disabled state
			$thisContent.slideToggle(Expander.duration, function () {
				$thisContent.attr('aria-hidden', !state);
				$this.attr('disabled', false);
			});

			// set focus and swap text content


		});
	}

};



// Page specific

var PageExhibition = {

	item: '[data-exhibitor-item]',
	heroCaption: '[data-exhibition-hero-caption]',
	selector: '[data-exhibitor-list]',

	classActive: 'is_active',

	init: function() {
		if($(this.selector).length) {
			this.bindHoverEvent();
		}
	},

	bindHoverEvent: function() {
		$(this.item).on({
			'mouseover': function() {
				var $this = $(this);
				$this.parents(PageExhibition.selector).addClass(PageExhibition.classActive);
			},
			'mouseleave': function() {
				var $this = $(this);
				$this.parents(PageExhibition.selector).removeClass(PageExhibition.classActive);
			}
		});
	},

	scrollEvent: function() {

		// test if caption is in viewport
		if (AppSettings.scrollPos < AppSettings.winHeight) {

			// get transform scale
			var transformPosition = AppSettings.scrollPos / 2;

			// apply transform
			$(this.heroCaption).css({
				'-webkit-transform': 'translateY(' + transformPosition + 'px)',
				'-moz-transform': 'translateY(' + transformPosition + 'px)',
				'-ms-transform': 'translateY(' + transformPosition + 'px)',
				'-o-transform': 'translateY(' + transformPosition + 'px)',
				'transform': 'translateY(' + transformPosition + 'px)'
			});
		}
	}

};




var Main = {

	run: function () {

		// Utils/Events
		Events.bindEvents();
		Links.init();

		// Components
		Carousel.init();
		Expander.init();

		// Pages
		PageExhibition.init();
	}

};

$(document).ready(Main.run());