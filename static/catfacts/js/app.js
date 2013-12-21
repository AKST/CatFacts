define(['consts', 'ui', 'util', 'jquery', 'bootstrap'], function (consts, ui, util, $) {


  function removeAlert(_) {
    $('#ph_form').removeClass('has-error')
    $('#sub_button').removeClass('btn-danger')
    $('#sub_button').addClass('btn-success')
    $('#invalid_input').addClass('hidden')
  }


  function addAlert(_) {
    $('#ph_form').addClass('has-error')
    $('#sub_button').addClass('btn-danger')
    $('#sub_button').removeClass('btn-success')
    $('#invalid_input').removeClass('hidden')
  }


  function modal(id) {
    return function (res) {
      $(id).modal()
    }
  }


  function submitNumber(phoneNo) {
    phoneNo = phoneNo[0] === '+' ? phoneNo : '+'+phoneNo
    var submit = $.post('/subscribe', { 'phonenumber': phoneNo })

    submit.done(modal('#success_msg'))
    submit.done(util.playSound('assets/catfacts/audio/meow.mp3', 0.2))

    submit.fail(modal('#400_msg'))
  }


  function beforeDOM() {
    if (!ui.isTouchDevice()) 
      ui.bgParralax('#cat_o_vision', 0.5, consts.BG_OFFSET)
  }


  var not   = util.not
  var valid = util.validPhoneNum


  function afterDom() {
    var subStream = ui.fieldSubmitStream('#submission', '#sub_button')
    var invalidSubmit = subStream.filter(not(valid))
    var validSubmit = subStream.filter(valid)

    invalidSubmit.onValue(ui.addAlert('#ph_form', '#sub_button', '#invalid_input'))
    
    validSubmit.onValue(submitNumber) 
    validSubmit.onValue(ui.clearField('#submission'))
    validSubmit.onValue(ui.removeAlert('#ph_form', '#sub_button', '#invalid_input'))

    ui.clickStream('#unsubscribe_btn').onValue(modal('#unsub_modal'))
      
    var unsubStream = ui.fieldSubmitStream('#unsub_field', '#confirm_unsub')
    var validUnsub = unsubStream.filter(valid)
    var invalidUnsub = unsubStream.filter(not(valid))

    invalidUnsub.onValue(ui.addAlert('#unsub_form', '#confirm_unsub'))

    validUnsub.onValue(ui.removeAlert('#unsub_form', '#confirm_unsub'))
    validUnsub.onValue(ui.clearField('#unsub_field'))
  }


  return { 
    'afterDom': afterDom,
    'beforeDom': beforeDOM 
  };
});
