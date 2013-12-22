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
  

  function sanitizeNumber(phoneNo) {
    return phoneNo[0] === '+' ? phoneNo : '+' + phoneNo;
  }


  function not(f) {
    return function (a) {
      return !f(a)
    }
  }


  return {
    'playSound': playSound,
    'validPhoneNum': validPhoneNum,
    'sanitizeNumber': sanitizeNumber, 
    'not': not
  };
})
