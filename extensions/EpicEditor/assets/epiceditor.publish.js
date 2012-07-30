jQuery(document).ready(function($) {

	var assets  = '/../../../assets'; // relative to options.basePath

	var options = {

		basePath: Symphony.Context.get('root') + '/extensions/epiceditor/lib/EpicEditor/epiceditor',

		// switching themes
		
		themes: {

			editor:  assets + '/themes/editor/epic-light.css',
			preview: assets + '/themes/preview/github.css'
		}
	};

	// don't touch

	$('.markdown, .markdown_extra, .markdown_extra_with_smartypants, .markdown_with_purifier').each(function() {

		var textarea = $(this);
	
		if (textarea.attr('rows') > 10) {
			
			textarea.hide();
						
			var wrapper = $('<div></div>').insertAfter(textarea).css('height', textarea.height());
			var editor  = new EpicEditor(wrapper.get(0));

			// load content

			options.file = { 
			
				name: textarea.parent().parent().attr('id'), 
				defaultContent: textarea.val()
			};
			
			editor
				.options(options)

				.on('save', function() {

					// update original textarea
				
					textarea.val($(editor.get('editor')).val());
				})

				.load(function() {

					var iframe = $('iframe', wrapper);
					
					// workaround for EpicEditor preserving it's width
					
					$(window).resize(function() {
					
						iframe.css('width', '100%');
					});
				});
		}
	});
});