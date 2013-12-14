(function () {

  function add_alert() {
    $('#ph_form').addClass('has-error')
    $('#sub_button').addClass('btn-danger')
    $('#sub_button').removeClass('btn-success')
  }
  function remove_alert() {
    $('#ph_form').removeClass('has-error')
    $('#sub_button').addClass('btn-success')
    $('#sub_button').removeClass('btn-danger')
  }
  function submitPhoneNo() {
    var value = $(this).val().replace('+', '%2b');
    $.post('subscribe?ph=' + value)
  }
  function clearField() {
    $(this).val('')
  }

  function submit () {
    $('#submission').validPhoneNo(function () {
 
      remove_alert.bind(this)();
      submitPhoneNo.bind(this)();
      clearField.bind(this)();
 
    }, add_alert);
  }
  
  $(function () {

    $('#country_ops li a').click(setTextOf('#country_name').toThisText)
    $('#submission').enterPress(submit);
    $('#sub_button').click(submit);
  
  });
  
  $(window).scroll(function () {
    $('#cat_o_vision').css('background-position-y', window.pageYOffset/2 + 1075)
  })

})();
