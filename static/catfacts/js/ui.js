define(['jquery', 'consts', 'bacon'], function ($, consts) {


  function clearField(field) {
    return function (_) { $(field).val('') }
  }


  function addAlert(form, btn, msg) {
    return function (_) {
      if (form !== undefined) 
        $(form).addClass('has-error')
      if (btn !== undefined) {
        $(btn).addClass('btn-danger')
        $(btn).removeClass('btn-success')
      }
      if (msg !== undefined)
        $(msg).removeClass('hidden')
    }
  }
  

  function removeAlert(form, btn, msg) {
    return function (_) {
      if (form !== undefined) 
        $(form).removeClass('has-error')
      if (btn !== undefined) {
        $(btn).removeClass('btn-danger')
        $(btn).addClass('btn-success')
      }
      if (msg !== undefined)
        $(msg).addClass('hidden')
    }
  }


  function keySteam(id, code) {
    return $(id).asEventStream('keydown')
      .filter(function (event) { return event.keyCode === code })
  }


  function clickStream(id) {
    return $(id).asEventStream('click')
  }


  function fieldSubmitStream(field, btn) {
    return keySteam(field, 13)
      .merge(clickStream(btn))
      .map(function () { return $(field).val() })
  }
  

  function isTouchDevice() {
    return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/) !== null;
  }


  function scrollStream() {
    return $(window).asEventStream('scroll')
      .map(function (_) { return window.pageYOffset })
  }

  function bgParralax(id, amplitude, yStart) {
    scrollStream()
      .map(function (y) { return y * (amplitude || 2) + yStart })
      .onValue(function (y) { $(id).css('background-position-y', y) }) 
  } 


  return {
    'clearField': clearField,
    'addAlert': addAlert,
    'removeAlert': removeAlert,
    'bgParralax': bgParralax,
    'isTouchDevice': isTouchDevice,
    'fieldSubmitStream': fieldSubmitStream,
    'clickStream': clickStream,
    'keySteam': keySteam
  };
});
