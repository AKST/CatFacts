define(['consts', 'ui', 'util'], function (consts, ui, util) {


  function subscribeNumber(phoneNo) {
    var submit = $.post('/subscribe', { 'phonenumber': util.sanitizeNumber(phoneNo) })
    submit.done(ui.modal('#success_msg'))
    submit.done(util.playSound('assets/catfacts/audio/meow.mp3', 0.2))
    submit.fail(ui.modal('#400_msg'))
  }


  function unsubscribeNumber(phoneNo) {
    var submit = $.post('/subscribe/undo', { 'phonenumber': util.sanitizeNumber(phoneNo) })
    submit.done(util.playSound('assets/catfacts/audio/sad_meow.mp3', 0.2))
    submit.done(ui.closeModal('#unsub_modal'))
    
    submit.fail(ui.addAlert(undefined, undefined, '#400_alert'))
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
    
    validSubmit.onValue(subscribeNumber) 
    validSubmit.onValue(ui.clearField('#submission'))
    validSubmit.onValue(ui.removeAlert('#ph_form', '#sub_button', '#invalid_input'))

    ui.clickStream('#unsubscribe_btn').onValue(ui.modal('#unsub_modal'))
      
    var unsubStream = ui.fieldSubmitStream('#unsub_field', '#confirm_unsub')
    var validUnsub = unsubStream.filter(valid)
    var invalidUnsub = unsubStream.filter(not(valid))

    invalidUnsub.onValue(ui.addAlert('#unsub_form', '#confirm_unsub', '#unsub_alert'))

    validUnsub.onValue(unsubscribeNumber)
    validUnsub.onValue(ui.removeAlert('#unsub_form', '#confirm_unsub', '#unsub_alert'))
    validUnsub.onValue(ui.clearField('#unsub_field'))
  }


  return { 
    'afterDom': afterDom,
    'beforeDom': beforeDOM 
  };
});
