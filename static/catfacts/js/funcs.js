$.fn.extend({
  enterPress: function (callback) {
    return this.keypress(function (e) {
      if (e.which == 13) 
        callback.bind(this)()
    })
  },
  validPhoneNo: function (concequence, alternative) {
    if ($(this).val().match('^[0-9-+() ]+$')) 
      concequence.bind(this)();
    else if (alternative != undefined)
      alternative.bind(this)();
    return this;
  }
})

function setTextOf(dom_selector) {
  return { "toThisText": function () {
    $(dom_selector).text($(this).text())
  }}
}
