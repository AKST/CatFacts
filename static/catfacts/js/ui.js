define(['jquery', 'consts', 'bacon'], function ($, consts) {


  function keySteam(id, code) {
    return $(id).asEventStream('keydown')
      .filter(function (event) { return event.keyCode === code });
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
      .map(submissionContent);
  }
  

  function isTouchDevice() {
    return window.innerWidth > consts.TABLET_WIDTH;
  }


  function setupParralaxBg(options) {
    $(window).scroll(function () {
      var newYPosition = window.pageYOffset 
        * (options.degree || 2) 
        + (options.offset || 0); 
      $(options.id).css('background-position-y', newYPosition);
    });
  }


  return {
    'setupParralaxBg':  setupParralaxBg,
    'isTouchDevice':    isTouchDevice,
    'submitStream':     submitStream
  };
});
