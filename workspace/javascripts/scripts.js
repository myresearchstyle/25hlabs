$("#categories").chosen().change(function() {
	var href =	$("#categories option:selected").val();
	console.log(href);
	window.location.replace(href);
});