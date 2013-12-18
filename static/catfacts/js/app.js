define(['consts', 'ui'], function (consts, ui) {
  var phone_regex = '^[0-9-+() ]+$';


  function handelSubmission(text) {
    if (text.match(phone_regex))
      console.log('valid');
    else
      console.log('invalid')
  }



  function beforeDOM() {
    if (ui.isTouchDevice()) {
      ui.setupParralaxBg({
        'id':     '.jumbotron', 
        'degree': 0.5, 
        'offset': consts.BG_OFFSET
      });
    }
  }


  function afterDom() {
    ui.submitStream().onValue(handelSubmission); 
  }


  return { 
    'init':      afterDom,
    'beforeDOM': beforeDOM 
  };
});
