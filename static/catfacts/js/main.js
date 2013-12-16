(function () {
  var SUBMIT_BTN   = '#sub_button',
      SUBMIT_FIELD = '#submission',
      JUMBOTRON    = '#cat_o_vision',
      PHONE_FORM   = '#ph_form',
      TABLET_WIDTH = 767;

  function add_alert() {
    $(PHONE_FORM).addClass('has-error');
    $(SUBMIT_BTN).addClass('btn-danger');
    $(SUBMIT_BTN).removeClass('btn-success');
  }

  function remove_alert() {
    $(PHONE_FORM).removeClass('has-error');
    $(SUBMIT_BTN).addClass('btn-success');
    $(SUBMIT_BTN).removeClass('btn-danger');
  }

  function submitPhoneNo() {
    var value = sanitizeInput($(this).val());
    $.post('subscribe?ph=' + value);
  }

  function clearField() {
    $(this).val('');
  }

  function submit () {
    $(SUBMIT_FIELD).validPhoneNo(function () {
      remove_alert();
      submitPhoneNo.call(this);
      clearField.call(this);
    }, add_alert);
  }
  
  $(function () {
    $(SUBMIT_FIELD).enterPress(submit);
    $(SUBMIT_BTN).click(submit);
  });
  

  if (window.innerWidth > TABLET_WIDTH) $(window).scroll(function () {
    $(JUMBOTRON).css('background-position-y', window.pageYOffset/2 + 1075);
  });

})();
