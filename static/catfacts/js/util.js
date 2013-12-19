define([], function () {

  function validPhoneNum(phoneNo) {
    return phoneNo.match('^[0-9-+() ]+$')
  }

  function not(f) {
    return function (a) {
      return !f(a)
    }
  }

  return {
    'validPhoneNum': validPhoneNum,
    'not':           not
  };
})
