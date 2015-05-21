/*
 * jquery-counter plugin
 *
 * Copyright (c) 2009 Martin Conte Mac Donell <Reflejo@gmail.com>
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 */
window.jquerycounters = new Array();
jQuery.fn.countdown = function (userOptions)
{
	// Default options
	var options = {
		stepTime: 60,
		// startTime and format MUST follow the same format.
		// also you cannot specify a format unordered (e.g. hh:ss:mm is wrong)
		format: "dd:hh:mm:ss",
		startTime: "01:12:32:55",
		digitImages: 6,
		digitWidth: 53,
		digitHeight: 77,
		timerEnd: function () {
			location.reload();

		},
		image: "/img/digits.png" 
	};
	var digits = [], interval;

	// Draw digits in given container
	var createDigits = function (where)
	{
		var c = 0;
		// Iterate each startTime digit, if it is not a digit
		// we'll asume that it's a separator
		for (var i = 0; i < options.startTime.length; i++)
		{
			if (parseInt(options.startTime[i]) >= 0)
			{
				elem = $('<div id="cnt_' + i + '" class="cntDigit" />').css({
					height: options.digitHeight * options.digitImages * 10,
					float: 'left', background: 'url(\'' + options.image + '\')',
					width: options.digitWidth});
				digits.push(elem);
				margin(c, -((parseInt(options.startTime[i]) * options.digitHeight *
						options.digitImages)));
				digits[c].__max = 9;
				// Add max digits, for example, first digit of minutes (mm) has 
				// a max of 5. Conditional max is used when the left digit has reach
				// the max. For example second "hours" digit has a conditional max of 4 
				switch (options.format[i]) {
					case 'h':
						digits[c].__max = (c % 2 == 0) ? 2 : 9;
						if (c % 2 == 0)
							digits[c].__condmax = 4;
						break;
					case 'd':
						digits[c].__max = 9;
						break;
					case 'm':
					case 's':
						digits[c].__max = (c % 2 == 0) ? 5 : 9;
				}
				++c;
			}
			else
				elem = $('<div class="cntSeparator"/>').css({float: 'left'})
						.text(options.startTime[i]);

			where.append(elem)
		}
	};

	// Set or get element margin
	var margin = function (elem, val)
	{
		if (val !== undefined)
			return digits[elem].css({'marginTop': val + 'px'});

		return parseInt(digits[elem].css('marginTop').replace('px', ''));
	};

	// Makes the movement. This is done by "digitImages" steps.
	var moveStep = function (elem)
	{
		digits[elem]._digitInitial = -(digits[elem].__max * options.digitHeight * options.digitImages);
		return function _move() {
			mtop = margin(elem) + options.digitHeight;
			if (mtop == options.digitHeight) {
				margin(elem, digits[elem]._digitInitial);
				if (elem > 0)
					moveStep(elem - 1)();
				else
				{
					clearInterval(interval);
					for (var i = 0; i < digits.length; i++)
						margin(i, 0);
					options.timerEnd();
					return;
				}
				if ((elem > 0) && (digits[elem].__condmax !== undefined) &&
						(digits[elem - 1]._digitInitial == margin(elem - 1)))
					margin(elem, -(digits[elem].__condmax * options.digitHeight * options.digitImages));
				return;
			}

			margin(elem, mtop);
			if (margin(elem) / options.digitHeight % options.digitImages != 0)
				setTimeout(_move, options.stepTime);

			if (mtop == 0)
				digits[elem].__ismax = true;
		}
	};

	$.extend(options, userOptions);
	this.css({height: options.digitHeight, overflow: 'hidden'});
	createDigits(this);
	interval = setInterval(moveStep(digits.length - 1), 1000);
	jquerycounters[(jquerycounters.length + 1)] = interval
};

function ResetCounters() {
	for (var i in jquerycounters) {
		if (!jquerycounters.hasOwnProperty(i))
			continue;
		clearInterval(jquerycounters[i]);
	}
	jquerycounters = new Array();



	if ($('.counter').size()) {
		$('.counter').each(function () {
			$(this).html('');
			function addZeros(n, needLength) {
				needLength = needLength || 2;
				n = String(n);
				while (n.length < needLength) {
					n = "0" + n;
				}
				return n
			}

			var end_time = $(this).parent().children('.end_time').text();
			var interval = $(this).parent().children('.interval').text();
			interval = parseInt(interval);
			if (interval <= 0) {
				interval = 1;
			}

			end_time = end_time.replace(/:| /g, "-");

			var YMDhms = end_time.split("-");

			var endDate = new Date();
			endDate.setFullYear(parseInt(YMDhms[0]), parseInt(YMDhms[1]) - 1, parseInt(YMDhms[2]));
			endDate.setHours(parseInt(YMDhms[3]), parseInt(YMDhms[4]), parseInt(YMDhms[5]), 0);

			var nowDate = new Date();

			var diff_date = endDate.getTime() - nowDate.getTime();

			if (diff_date < 0) {
				while (diff_date < 0) {
					diff_date = diff_date + interval * 24 * 60 * 60 * 1000;
				}
			}

			var days = Math.floor(diff_date / 1000 / 60 / 60 / 24);
			var hours = Math.floor((diff_date - days * 1000 * 60 * 60 * 24) / 1000 / 60 / 60);
			var minutes = Math.floor((diff_date - days * 1000 * 60 * 60 * 24 - hours * 60 * 60 * 1000) / 1000 / 60);
			var seconds = Math.floor((diff_date - days * 1000 * 60 * 60 * 24 - hours * 60 * 60 * 1000 - minutes * 60 * 1000) / 1000);





			$(this).countdown({startTime: addZeros(days) + ':' + addZeros(hours) + ':' + addZeros(minutes) + ':' + addZeros(seconds)});
		})
	}
        
	if ($('.counter_mini').size()) {
		$('.counter_mini').each(function () {
			$(this).html('');
			function addZeros(n, needLength) {
				needLength = needLength || 2;
				n = String(n);
				while (n.length < needLength) {
					n = "0" + n;
				}
				return n
			}

			var end_time = $(this).parent().children('.end_time').text();
			var interval = $(this).parent().children('.interval').text();
			interval = parseInt(interval);
			if (interval <= 0) {
				interval = 1;
			}

			end_time = end_time.replace(/:| /g, "-");

			var YMDhms = end_time.split("-");

			var endDate = new Date();
			endDate.setFullYear(parseInt(YMDhms[0]), parseInt(YMDhms[1]) - 1, parseInt(YMDhms[2]));
			endDate.setHours(parseInt(YMDhms[3]), parseInt(YMDhms[4]), parseInt(YMDhms[5]), 0);

			var nowDate = new Date();

			var diff_date = endDate.getTime() - nowDate.getTime();

			if (diff_date < 0) {
				while (diff_date < 0) {
					diff_date = diff_date + interval * 24 * 60 * 60 * 1000;
				}
			}

			var days = Math.floor(diff_date / 1000 / 60 / 60 / 24);
			var hours = Math.floor((diff_date - days * 1000 * 60 * 60 * 24) / 1000 / 60 / 60);
			var minutes = Math.floor((diff_date - days * 1000 * 60 * 60 * 24 - hours * 60 * 60 * 1000) / 1000 / 60);
			var seconds = Math.floor((diff_date - days * 1000 * 60 * 60 * 24 - hours * 60 * 60 * 1000 - minutes * 60 * 1000) / 1000);





			$(this).countdown({startTime: addZeros(days) + ':' + addZeros(hours) + ':' + addZeros(minutes) + ':' + addZeros(seconds), digitWidth: 24, digitHeight: 35, image: "/img/digit-sm.png" });
		})
	}        
        
}

