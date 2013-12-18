define(['jquery', 'consts'], function ($, consts) {

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
    'setupParralaxBg': setupParralaxBg,
    'isTouchDevice':   isTouchDevice
  };
});
