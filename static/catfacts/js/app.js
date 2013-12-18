define(['consts', 'ui'], function (consts, ui) {


  function beforeDOM() {
    if (ui.isTouchDevice())
      ui.setupParralaxBg({
        'id':    '.jumbotron', 
        'degree': 0.5, 
        'offset': consts.BG_OFFSET
      })
  }


  function init() {
    console.log('hello')
  }


  return { 
    'init':      init,
    'beforeDOM': beforeDOM 
  };
});
