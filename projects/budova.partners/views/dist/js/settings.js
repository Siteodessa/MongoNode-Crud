let update_iframes = function(iframe, data) {


setTimeout(function(){
  let iframe0 = $(iframe);
  let iframe_elem = iframe0.first().contents().find('div').first()
  iframe_elem.html('<span id="the_image"><img src="/uploads/' + data + '"></span><span style="display:none">' + data + '</span>')
  iframe_elem.css({ "position": "absolute" })
  iframe_elem.find('img').css({ "max-width": "60px", "margin": "0 20px -3px 90px", "max-height": "40px" })
}, 1500)

}


$('iframe').each(function(){
  let this_obj = $(this)
  let this_val = $(this).attr('value')
  let this_id = $(this).attr('id')
  let this_selector = String('iframe#' + this_id)
  update_iframes(this_selector, this_val)
})
