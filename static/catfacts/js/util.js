define([], function () {

  var context = new (window.AudioContext || window.webkitAudioContext)();

  function playSound (url, volume) {
    return function (_) {
      var a = new Audio(url);
      a.volume = (volume||1);
      a.play();
    }
  }

  function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++)
      bufView[i] = str.charCodeAt(i);
    return buf;
  }
           

  function validPhoneNum(phoneNo) {
    return phoneNo.match('^[0-9-+() ]+$')
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
