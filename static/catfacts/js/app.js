define(['consts', 'ui', 'util', 'jquery', 'bootstrap'], function (consts, ui, util, $) {


  function removeAlert(_) {
    $('#ph_form').removeClass('has-error')
    $('#sub_button').removeClass('btn-danger')
    $('#sub_button').addClass('btn-success')
  }


  function addAlert(_) {
    $('#ph_form').addClass('has-error')
    $('#sub_button').addClass('btn-danger')
    $('#sub_button').removeClass('btn-success')
  }


  function successfulModal(res) {
    $('#success_msg').modal()
  }


  function errorModal(res) {
    $('#400_msg').modal()
  }


  function submitNumber(phoneNo) {
    var submit = $.post('/subscribe', { 'phonenumber': phoneNo })

    submit.done(successfulModal)
    submit.done(util.playSound('assets/catfacts/audio/meow.mp3', 0.2))

    submit.fail(errorModal)
  }


  function beforeDOM() {
    if (ui.isTouchDevice()) 
      ui.bgParralax('#cat_o_vision', 0.5, consts.BG_OFFSET)
  }


  var not   = util.not
  var valid = util.validPhoneNum


  function afterDom() {
    var validSubmit   = ui.submitStream().filter(valid)
    var invalidSubmit = ui.submitStream().filter(not(valid))

    invalidSubmit.onValue(addAlert)
    
    validSubmit.onValue(submitNumber)    
    validSubmit.onValue(ui.clearField('#submission'))
    validSubmit.onValue(removeAlert)
  }


  return { 
    'afterDom':  afterDom,
    'beforeDom': beforeDOM 
  };
});
