function add_alert() {
  $('#ph_form').addClass('has-error')
}
function remove_alert() {
  $('#ph_form').removeClass('has-error')
}
function submitPhoneNo() {
  $.post('subscribe?ph=' + $(this).val())
}

$(function () {
  $('#country_ops li a').click(
    setTextOf('#country_name')
    .toThisText)

  $('#submission').enterPress(function () {
    $(this).validPhoneNo(
      remove_alert.and(submitPhoneNo), 
      add_alert)
  })
})
