define(['jquery', 'consts', 'bacon'], function ($, consts) {


  function clearField(field) {
    return function (_) { $(field).val('') }
  }


  function keySteam(id, code) {
    return $(id).asEventStream('keydown')
      .filter(function (event) { return event.keyCode === code })
  }


  function clickStream(id) {
    return $(id).asEventStream('click')
  }


  function submissionContent() {
    return $('#submission').val(); 
  }


  function submitStream() {
    return keySteam('#submission', 13)
      .merge(clickStream('#sub_button'))
      .map(submissionContent)
  }
  

  function isTouchDevice() {
    return window.innerWidth > consts.TABLET_WIDTH;
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
    'clearField':    clearField,
    'bgParralax':    bgParralax,
    'isTouchDevice': isTouchDevice,
    'submitStream':  submitStream
  };
});
