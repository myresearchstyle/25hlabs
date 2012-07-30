(function($) {
	$(document).ready(function() {
		$('textarea.doccy').each(function() {
			var $textarea = $(this);

			// It's in a duplicator template, wait to init:
			if ($textarea.closest('li.template').length) {
				$textarea.closest('div.frame')
					.on('constructshow.duplicator', 'li.instance', function() {
						$('textarea.doccy', this).snickedDoccy();
					});
			}

			else {
				$textarea.snickedDoccy();
			}
		});
	});
})(jQuery);