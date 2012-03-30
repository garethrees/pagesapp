// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$(document).ready(function(){

	$("#add-link-to-page-dialog").dialog({
		autoOpen: false,
		title: 'Add a Link'
	});
	
	$(".page-edit").keydown(function() {
		console.log(event.which);
		
		if (event.which == 219) {
			$('#add-link-to-page-dialog').dialog('open');
	  }
	});



  $('#addText').click(function(evt) {
      // Insert the selected text into a given textarea
			console.log('clicked addText');
      var textarea = $('.page-edit');
      textarea.val(textarea.val() + getSelectedText());
			console.log('added text?');
      evt.preventDefault();
  });


});



function getSelectedText() {
		console.log('getSelectedText');
    if (window.getSelection) {
        return window.getSelection();
				console.log('window.getSelection');
    }
    else if (document.selection) {
        return document.selection.createRange().text;
				console.log('document.selection');
    }
    return 'ruh roh';
}