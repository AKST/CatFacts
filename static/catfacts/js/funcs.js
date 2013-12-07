$.fn.extend({
  enterPress: function (callback) {
    return this.keypress(function (e) {
      if (e.which == 13) 
        callback.bind(this)()
    })
  },
  validPhoneNo: function (callback, otherwise) {
    if ($(this).val().match('^[0-9-+() ]+$')) 
      callback.bind(this)();
    else if (otherwise != undefined)
      otherwise.bind(this)();
    return this;
  }
})

function setTextOf(dom_selector) {
  return { "toThisText": function () {
    $(dom_selector).text($(this).text())
  }}
}

Function.prototype.and = function and(next) {
  this();
  return next;
}
