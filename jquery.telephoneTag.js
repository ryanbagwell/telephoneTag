/* jQuery Telephone Tag v1.0
Copyright 2012 Ryan Bagwell (ryan at ryanbagwell.com)
This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/
(function($) {
	var methods = {
		init: function() {
			var numbers = {};
			$(this).each(function() {
				var number = methods['search'].apply(this);
				if (number)
					numbers[number] = false;
			});
			
			$.map(numbers,function(val,key) {
				var node = methods['findNode'](key);
				if (node)
				    methods['replace'].apply(node,[key]);
			});
		},
		search:function() {
			var pattern = /(?:1-)?\(?\d{3}\)?\s?[- ]?\d{3}[- ]?\d{4}/;
			var matches = $(this).html().match(pattern);
			return matches ? matches[0]:false;
		},
		replace:function(number) {
			var anchor = methods['getAnchorTag'](number);
			var newContent = $(this).html().replace(number,anchor);
			$(this).html(newContent);
		},
		getAnchorTag:function(number) {
			var a = $('<a />').attr('href','tel:'+number).html(number);
			return $('<div>').append(a).clone().html();
		},
		findNode:function(number) {
			var node = false;
			$(':contains('+number+')').each(function() {
				if ($(this).children(':contains('+number+')').length == 0) {
					node = this;
					return false;
				};
			});
			return node;
		},
		isMobile:function() {
			pattern =  /android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i
			return pattern.test(navigator.userAgent||navigator.vendor||window.opera);
			
		}
	}
	$.fn.telephoneTag = function() {
	    if (!methods.isMobile())
			return;
		methods['init'].apply(this);
  	};
})( jQuery );