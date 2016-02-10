$(function() {

  // populates tables with contact information
  var populateTable = function(contacts, tableName) {
    var table = $(tableName).find('tbody').empty();
    contacts.forEach(function(contact) {
      var row = $('<tr>').appendTo(table);
      row.attr('data-id', contact.id);
      $('<td>').text(contact.id).appendTo(row);
      $('<td>').text(contact.first_name).appendTo(row);
      $('<td>').text(contact.last_name).appendTo(row);
      $('<td>').text(contact.email).appendTo(row);
      row.appendTo($(tableName + ' tbody'));
    });
  }

  // hides all forms other than 'form'
  var showForm = function(form) {
    var allForms = [ '#all', 
                    '#contact-form', 
                    '#delete-form', 
                    '#search-form'];
    for(var i = 0; i < allForms.length; i++) {
      if(allForms[i] === form) {
        continue;
      }
      $(allForms[i]).hide();
    }
    $(form).slideDown();
  }

  $('#btn-all').on('click', function() {
    $('#contact-form').hide();
    $('#search-form').hide();
    $('#delete-form').hide();

    $.getJSON('/contacts', function(contacts) {
      populateTable(contacts, '#all-contacts');
      $('#all').slideDown();
    });
  });

  $('#btn-delete').on('click', function() {
    showForm('#delete-form');
  });

  $('#btn-create').on('click', function() {
    showForm('#contact-form');
  });

  $('#btn-search').on('click', function() {
    showForm('#search-form');
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

  $('#searchContact').on('submit', function() {
    var contactID = $('#id').val();
    var firstName = $('#first-search').val();
    var lastName = $('#last-search').val();
    var email = $('#email-search').val();

    $.getJSON('/search', {id: contactID, first_name: firstName, last_name: lastName, email: email}, function(contacts) {
      populateTable(contacts, '#matching-contacts');
    });
    return false;
  });

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
