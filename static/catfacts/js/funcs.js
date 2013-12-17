$.fn.extend({
  enterPress: function (callback) {
    return this.keypress(function (e) {
      if (e.which == 13) 
        callback.call(this);
    });
  },
  validPhoneNo: function (concequence, alternative) {
    if ($(this).val().match('^[0-9-+() ]+$')) 
      concequence.call(this);
    else if (alternative != undefined)
      alternative.call(this);
    return this;
  }
})


var sanitizeInput = (function () {
  var HEX_CHARS = {
    " ": "20",
    "-": "2d",
    "+": "2b",
    "(": "28",
    ")": "29",
  };
  
  return function (raw) {
    return _.reduce(raw, function (acc, e) {
      return acc + (e in HEX_CHARS ? "%" + HEX_CHARS[e] : e);
    }, "");
  }
})();

