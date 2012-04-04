// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/


// http://confluence.atlassian.com/display/DOC/Confluence+4.0+Editor+-+What's+Changed+for+Wiki+Markup+Users
// https://wikis.nyu.edu/display/DOC/Using+Autocomplete+in+the+Rich+Text+Editor

$(document).ready(function(){

    showToolbar();

    $("#page-body").focusout(function() {
        console.log("Focused Out");
        var data = $("#page-body").html();

        jsondata = JSON.stringify( { page: { body: data }});

        $.ajax({
            type: "PUT",
            url: "http://localhost:3000/pages/1.json",
            datatype: "json",
            data: jsondata,
            processData: false,
        	contentType: "application/json",
        	beforeSend: function(xhr) {
        		xhr.setRequestHeader("X-Http-Method-Override", "PUT");
        	},
            complete: function() {
                console.log("complete");
            },
            success: function() {
                console.log("success!");
            },
            error: function(jqXHR, textStatus) {
                console.log( "Request failed: " + textStatus);
            }
        })
    });

    $("#toolbar #bold").click(function() {
        document.execCommand('bold',null,false);
    });
    $("#toolbar #italic").click(function() {
        document.execCommand('italic',null,false);
    });

});


function showToolbar() {
    $("#toolbar").toggleClass("hidden");
}

// 
//  $("#add-link-to-page-dialog").dialog({
//      autoOpen: false,
//      title: 'Add a Link'
//  });
//  
//  $(".page-edit").keydown(function() {
//      console.log(event.which);
//      
//      if (event.which == 219) {
//          $('#add-link-to-page-dialog').dialog('open');
//    }
//  });
// 
// 
// 
// $('#addText').click(function(evt) {
//     // Insert the selected text into a given textarea
//          console.log('clicked addText');
//     var textarea = $('.page-edit');
//     textarea.val(textarea.val() + getSelectedText());
//          console.log('added text?');
//     evt.preventDefault();
// });


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