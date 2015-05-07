
$(function() {

  var display_contacts = function(index, contact) {
    var each_result = $("<div>").addClass("each-result").appendTo("#results");
    var p1 = $("<p>").text(contact.first_name).appendTo(each_result);
    var p2 = $("<p>").text(contact.last_name).appendTo(each_result);
    var p3 = $("<p>").text(contact.email).appendTo(each_result);
    // if(contact.phone_numbers){
    //   var p4 = $("<p>").text(contact.phone_numbers.first.phone_number).appendTo(each_result);
    // }
  }

  function get_contacts(contacts) {
    $('#results').empty();
    $.each(contacts, display_contacts);
  }

  function refresh_contacts(){
      $.getJSON('/contacts', get_contacts);
  }

  $("#show").on('click', refresh_contacts);

  $("#submission").on('click', function(e){
    e.preventDefault();
    var data = $('#new_contact').serialize();
    $.ajax({
      url: "/",
      type: "POST",
      data: data,
      success: function (d) {
       $("form").trigger('reset');
        refresh_contacts(d);
      },
      error: function(e) {
        console.log(e)
      }
    });
  });

  // $("form").on('submit', function(e){
  // });
  $("#find").on('submit', function(e){
    e.preventDefault();
    var data = $('#find').serialize();
    $.ajax({
      url: "/contacts",
      type: "GET",
      data: data,
      success: function (d) {
       $("form").trigger('reset');
        console.log(d);
         get_contacts(d);
      },
      error: function(e) {
      }
    });
  });


});

