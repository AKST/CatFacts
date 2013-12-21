define([], function () {

  function playSound (url, volume) {
    return function (_) {
      var a = new Audio(url);
      a.volume = (volume||1);
      a.play();
    }
  }
           

  function validPhoneNum(phoneNo) {
    return phoneNo.length > 3
        && phoneNo.match('^[0-9-+() ]+$')
  }


  function not(f) {
    return function (a) {
      return !f(a)
    }
  }


  return {
    'playSound':     playSound,
    'validPhoneNum': validPhoneNum,
    'not':           not
  };
})
