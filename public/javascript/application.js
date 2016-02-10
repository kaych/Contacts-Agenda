$(document).ready(function() {

  $('#btn-all').on('click', function() {
    $('#contact-form').hide();
    $('#search-form').hide();
    $('#delete-form').hide();
    $.getJSON('/contacts', function(contacts) {
      var table = $('#all-contacts').find('#new-body').empty();
      contacts.forEach(function(contact) {
        var row = $('<tr>').addClass('contact').appendTo(table);
        row.attr('data-id', contact.id);
        $('<td>').text(contact.id).appendTo(row);
        $('<td>').text(contact.first_name).appendTo(row);
        $('<td>').text(contact.last_name).appendTo(row);
        $('<td>').text(contact.email).appendTo(row);
        row.appendTo($('#new-body'));
      });
      $('#all').slideDown();
    });
  });

  $('#btn-create').on('click', function() {
    $('#all').hide();
    $('#search-form').hide();
    $('#delete-form').hide();
    $('#contact-form').slideDown();
  });

  $('#newContact').on('submit', function() {
    var firstName = $('#first-name').val();
    var lastName = $('#last-name').val();
    var email = $('#email').val();

    if (firstName === "" || lastName === "" || email === "") {
      alert('Bleep bloop. All fields must be filled in.');
      return false;
    }

    $.post('/contacts', {first_name: firstName, last_name: lastName, email: email}, function(data) {
      if (data.result) {
        $('#first-name').val('');
        $('#last-name').val('');
        $('#email').val('');
        alert("Contact was successfully added!");
      } else {
        alert("Whomp whomp, something went wrong. Fail whale.");
      }
    }, 'json');

    return false;
  });

  $('#btn-search').on('click', function() {
    $('#all').hide();
    $('#contact-form').hide();
    $('#delete-form').hide();
    $('#search-form').slideDown();
  });

  $('#searchContact').on('submit', function() {
    var contactID = $('#id').val();
    var firstName = $('#first-search').val();
    var lastName = $('#last-search').val();
    var email = $('#email-search').val();

    $.getJSON('/search', {id: contactID, first_name: firstName, last_name: lastName, email: email}, function(contacts) {
      var table = $('#matching-contacts').find('#search-body').empty();
      contacts.forEach(function(contact) {
        var row = $('<tr>').addClass('match').appendTo(table);
        $('<td>').text(contact.id).appendTo(row);
        $('<td>').text(contact.first_name).appendTo(row);
        $('<td>').text(contact.last_name).appendTo(row);
        $('<td>').text(contact.email).appendTo(row);
        row.appendTo($('#search-body'));  
      });
    });
    return false;
  });

  $('#btn-delete').on('click', function() {
    $('#all').hide();
    $('#contact-form').hide();
    $('#search-form').hide();
    $('#delete-form').slideDown();
  })

  $('#delete-form').on('submit', function(e) {
    e.preventDefault();
    var input = $(this).find('#delete-id').val();
    $.ajax({
      url: '/delete',
      method: 'post',
      data: {id: input},
      success: function(contact) {
        $('.contact[data-id="' + contact.id + '"]').remove();
        $('#delete-id').val('');
        confirm('Are you sure?!??!');
        alert('Contact was deleted successfully.');
      },
      error: function(error) {
        console.log(error);
      }
    });
  });

});
