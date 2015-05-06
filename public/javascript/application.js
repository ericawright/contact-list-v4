
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
    $.each(contacts, display_contacts);
  }

  function refresh_contacts(){
    $('#results').empty();
    $.getJSON('/contacts', get_contacts);
  }

  $("#btn").on('click', refresh_contacts);

  $("#submission").on('click', function(e){
    e.preventDefault();
    var data = $('#new_contact').serialize();
    console.log(data);
    $.ajax({
      url: "/",
      type: "POST",
      data: data,
      success: function (d) {
       $("form").trigger('reset');
        // console.log(d)
        refresh_contacts();

      },
      error: function(e) {
        console.log(e)
      }
    });
  });
});

