$(function() {


  function show_new_page_success(obj, result) {
    $(obj).html('Запись "' + result.title + '" успешно добавлена!<div class="page_added">Вы можете на нее <a href="/doma/' + result.page_link + '">Перейти</a></div>').addClass('shown');
  }
  function sendAjaxForm(result_form, ajax_form, url, method, close_after) {
    var form = new saveform(result_form, ajax_form, url, method, close_after)
    form.senddata()
  }
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
        $('#imagePreview').hide();
        $('#imagePreview').fadeIn(650);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  function removeParent(el) {
    el.parent().detach()
  }

  function is_empty_object(el) {
  if  (JSON.stringify(el) === '{}') { return true  } else {return false}
  }
  function is_empty_data(el) {
  if  ( el && el !== '' && !is_empty_object(el) ) { return true }  else { return false }
  }

  function close_modal() {
    setTimeout(function() {
      $('button.btn.btn-outline.pull-left').click()
    }, 500)
    setTimeout(function() {
      window.location.reload()
    }, 1000)
  }
  function make_roundy_images(el1) {
    jQuery(el1).each(function() {
      jQuery(this).parent('a').wrap('<div class="roundy"> </div>')
    })
  }
  function CKEDITOR_activate(CKEDITOR) {
    if (document.getElementById('editor1')) {
      CKEDITOR.replace('editor1')
      $('.textarea').wysihtml5()
    }
  }
  $('span.content_column').click(function() {
    $(this).toggleClass('xpanded')
  })
  $(".db_group").each(function() {
    let obj = jQuery(this).find('.radion').first()
    obj.addClass('checked')
    obj.find('input').attr('checked', true)
  })




  // editform OBJECT START
  var editform = function(result_form, ajax_form, url, close_after) {
    this.update_rows_data = function(rows, data) {
      $(rows).each(function() {
        let dis = $(this)
        let field = dis.attr('name')
        let input = dis.find('input').not("[type='radio']")
        let input_radio = dis.find('input[type="radio"]')
        input_radio.each(function() {
          let radio_name = $(this).attr('name')
          if (data[radio_name] && typeof data[radio_name] !== 'undefined' && data[radio_name].trim() == $(this).attr('value')) {
            $(this).parent('label').click()
          }
        })
        input.val(data[field])
      })
    }
    this.update_iframes = function(iframe0, iframe_elem, data) {
      var iframe0 = $(iframe0);
      var name = iframe0.attr('name');
      console.log('name', name);
      var iframe_elem = iframe0.first().contents().find(iframe_elem)
       iframe_elem.html('<span id="the_image"><img src="/uploads/' + data[name] + '"></span><span>' + data[name] + '</span>')
      iframe_elem.css({ "position": "absolute" })
      iframe_elem.find('img').css({ "max-width": "60px", "margin": "0 20px -3px 90px", "max-height": "40px" })
    }
    this.update_multimedia_iframes = function(iframe0, iframe_elem, data) {
      var iframe0 = $(iframe0);
      var iframe_elem = iframe0.contents().find(iframe_elem)
      if (typeof(data['gallery']) == 'undefined') return
      gallery_html = '<div class="gallery">'
      data['gallery'] = data['gallery'].split('"')[1]
      if (typeof(data['gallery']) == 'undefined') return
      data['gallery'] = data['gallery'].substring(0, data['gallery'].length - 1)
      iframe0.contents().find('div#multimediadata').text(data['gallery'])
      data['gallery'].split(',').forEach(elem => {
        gallery_html += '<div class="gallery_elem"><span id="the_image"><img src="/uploads/' + elem + '"></span></div>'
      });
       iframe_elem.html(gallery_html + '</div>')
    }

    this.listen = function(activator, add_new_obj_elem) {
      update_rows_data = this.update_rows_data
      update_iframes = this.update_iframes
      update_multimedia_iframes = this.update_multimedia_iframes
      $('.elems.edit').click(function() {
        let id = $(this).find('i').attr('id')
        $.get({
            url: "/notes/" + id + "",
            beforeSend: function(xhr) {
              xhr.overrideMimeType("text/plain; charset=utf-8");
            }
          })
          .done(function(data) {
            data = JSON.parse(data)

            update_rows_data('.db_group', data)
            let iframe = document.querySelector('iframe.cke_wysiwyg_frame.cke_reset');
            let iframeElement;
            if (iframe) { iframeElement = iframe.contentWindow.document.activeElement.innerHTML = data["content"]; }
            var modal_body = $('.modal-body');



          let editor_iframes = ''
           $('iframe').each(function(){
                  let name = $(this).attr('name')

                  let imdata_node = $(this).contents().find('div#multimediadata')

                  if (name && imdata_node && name !== 'structure')  {
                          data[name].split(',').forEach(elem => {
                            elem = elem.replace(/['"«»\\]/g, '');
                            imdata_node.append('<div class="chosen_image"><img src="/uploads/'+ elem +'"><div class="link">'+ elem +'</div></div>')
                          });
                          imdata_node.children().wrapAll('<div class="chosen_images"></div>')
                  }

                  if (name && imdata_node && name === 'structure')  {
                    let parent = $('div[name="layouts"]').find('.ministructure')
                        JSON.parse(data["layouts"]).forEach(function(elem){
                          parent.prepend('<div class="minigroups"><div class="discard"><i class="fa fa-close"></i></div><div class="minigroup" type="media"><div class="db_group" name="structure" input_type="media"> <img src="/uploads/' + elem.media + '"><input class="hidden" value="' + elem.media + '" type="text" name="structure"> </div> </div><div class="minigroup" type="text"><div class="db_group" name="text" input_type="text"> <label></label> <input class="form-control input-lg" value="' + elem.text + '" name="text" type="text"> </div></div></div>')
                        })

                  }
                });

            update_iframes('iframe#media_upload', '#multimediadata', data)
            update_multimedia_iframes('iframe#multimedia_upload', '#multimediadata', data)
            update_multimedia_iframes('iframe#layout_upload', '#multimediadata', data)

            modal_body.attr('id', id)
            $(add_new_obj_elem).click()
            $('button.save').hide()
            $('button.update').show()
          });
      }).bind(this)
    }
  }
  // editform OBJECT END


  // saveform OBJECT START
  var saveform = function(result_form, ajax_form, url, method, close_after) {
    this.clear_image_data = function (obj) {
      if (obj.text) return obj.text().replace(/\r?\n/g, "").replace(' ', "").replace(' ', "").replace(' ', "").replace(' ', "").replace(' ', "");
      return obj
    }
    this.read_non_iframe_inputs = function(z) {
      $('.db_group').each(function() {
        let labels = $(this).find('div').children('label')
        labels.each(function() {
          if ($(this).hasClass('checked') === true) {
            let inp = $(this).find('input')
            let name = inp.attr('name')
            let vall = $(this).text().trim()
            if (name == 'home_background') {
              vall = $(this).text()
            }
            z += '&' + name + '=' + vall
          }
        })
      })
      return z
    }
    this.read_iframes = function(z) {
      let editor_iframes = ''
      $('iframe').each(function(){
        let name = $(this).attr('name')
        let imdata = $(this).contents().find('div#multimediadata').text()
        if (name && imdata && name !== 'structure')  {editor_iframes += '&' + name + '=' + imdata;   }
      });
      let result = JSON.stringify(editor_iframes).replace (/\\n/g, '').replace (/ /g, '')
      z += result
      return z
    }
    this.read_datepickers = function(z) {
      z += '&house_deploy_date=' + $('#datepicker').val()
      return z
    }
    this.read_structures = function(z) {

        // z += '&house_deploy_date=' + $('#datepicker').val()
        // finally you must get &layouts=[{media: 'bla.jpg', text: 'bla bla'}, {...}]&otherstructure=[{media:

        let result = []
        let all_structures_data = {}

          $('.db_group[input_type="structure"]').each(function() {
            let name =  $(this).attr('name')
            console.log(name);
            $(this).find('.minigroups').each(function(){
              let minigroup_result = {}
            $(this).find('.minigroup').each(function(){
              let this_attr = $(this).attr('type')
              if (this_attr === 'text') {
                let value = $(this).find('input').val().replace(/[\n\r]+/g, '');
              if (value && value !== '' ) minigroup_result[this_attr] = value
              }
              if (this_attr === 'media') {
                let value = $(this).find('iframe').contents().find('div#multimediadata').text().replace(/[\n\r]+/g, '').replace(/[      ]+/g, '');
                  if (value && value !== '' && JSON.stringify(value) !== '{}' ) {minigroup_result[this_attr] = value} else {
                    let value = $(this).find('input').val();
                          if (value && value !== '' && JSON.stringify(value) !== '{}')
                    minigroup_result[this_attr] = value
                  }
              }


            })
            if (JSON.stringify(minigroup_result) !== '{}') { result.push(minigroup_result) }

            })
           all_structures_data[name] = result

          })


            console.log(JSON.stringify(all_structures_data));


          for (let prop in all_structures_data) {
        z += '&' + prop + '=' + JSON.stringify(all_structures_data[prop])
            }


          return z
        }
        this.getdata = function() {
          read_structures = this.read_structures;
          clear_image_data = this.clear_image_data;
          read_iframes = this.read_iframes;
          read_non_iframe_inputs = this.read_non_iframe_inputs;
          read_datepickers = this.read_datepickers;
          let z = $('.' + ajax_form + ' input[name!=editor1]').not("[name='home_background']").not("[type='radio']").not(".structure input").serialize()
          if (document.querySelector('iframe.cke_wysiwyg_frame.cke_reset')) {
           z += '&content=' + document.querySelector('iframe.cke_wysiwyg_frame.cke_reset').contentWindow.document.activeElement.innerHTML ;
         }

          z = read_iframes(z);
          z = read_non_iframe_inputs(z);
          z = read_datepickers(z);
          z = read_structures(z)
          z = decodeURI(z)


          return z
        }
        this.get_iframe_description = function() {
          let iframe = document.querySelector('iframe.cke_wysiwyg_frame.cke_reset');
          if (iframe) {
            let iframeDocument = iframe.contentWindow.document.activeElement.innerHTML;
            return iframeDocument;
          }
          return false;
        }
    this.senddata = function() {
      z = this.getdata()
      i = this.get_iframe_description()

       console.log('SENDING DATA STOPPED. You must re-enable content in "getdata" .AND Z is');
        return false
      if (url === '/c_update') {
        let id = $('.modal-body').attr('id')
        url = '/cupdate/' + id
      }
      $.ajax({
        url: url,
        type: method,
        dataType: "multipart/form-data",
        content: i,
        data: z,
        success: function(response, xhr) {
          result = $.parseJSON(response);
          show_new_page_success('#result_form p', result)
          close_after ? close_after() : $('#result_form p');
        },
        error: function(response) {
          if (response.responseText && response.responseText !== undefined) {
            if (response.status == 200) {
              respo = JSON.parse(response.responseText);
              show_new_page_success('#result_form p', respo)
              close_after ? close_after() : $('#result_form p');
              return
            }
            let str = response.responseText.split("title:");
            if (str[1] == undefined) {
              $('#result_form p').text(response.responseText).addClass('shown');
            } else {
              let str1 = str[1].split('"');
              let str2 = str1[0];
              $('#result_form p').text(response.responseText).addClass('shown');
            }
          } else {
            $('#result_form p').text('Неизвестная ошибка 0041').addClass('shown');
          }
        }
      });
    }
  }
    // saveform OBJECT END



  $("button.update").click(function() {
    let files = $('#image_uploads').val()
    let close_form = null
    if ($(this).hasClass('and_close') == true) {
      close_form = close_modal
    } else {
      close_form = false
    }
    sendAjaxForm('result_form', 'form-horizontal', '/c_update', 'PUT', close_form);
    return false;
  });
  $('.btn-warning').click(function() {
    $('button.save').show()
    $('button.update').hide()
  })
  $('#example1').ready(function() {
var tablo = $('#example1').DataTable({
  "language": {
    "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
  }
})
var tablo1 = $('#example2').DataTable({
  'paging': true,
  'lengthChange': false,
  'searching': false,
  'ordering': true,
  'info': true,
  'autoWidth': false
})
})
  var post_editor = new editform()
  post_editor.listen('.elems.edit', 'button.btn.btn-warning')
  jQuery("#imageUpload").change(function() {
    readURL(this);
  });
  jQuery('.radion').on('click', function() {
    jQuery(this).closest('div').find('.radion').removeClass('checked')
    jQuery(this).addClass('checked')
  })
  $("button.save").click(function() {
    let files = $('#image_uploads').val()
    if ($(this).hasClass('and_close') == true) {
      sendAjaxForm('result_form', 'form-horizontal', '/notes', 'POST', close_modal);
    } else {
      sendAjaxForm('result_form', 'form-horizontal', '/notes', 'POST');
    }
    return false;
  });
  $("div").on('click', '.discard', (function(el) {
    removeParent($(this))
  }));

  $(".minicontrols").click(function() {
    let minigroup_data = $(this).siblings('.ministructure').find('.minigroups').first().html()
    $(this).siblings('.ministructure').append('<div class="minigroups"><div class="discard"><i class="fa fa-close"></i></div>' + minigroup_data + '</div>')
    return false;
  });
  jQuery('a.trash').click(function() {
    let id = jQuery(this).find('i').attr('id')
    let parent = jQuery(this).parent('td').parent('tr')
    url = '/notes/' + id + ''
    $.ajax({
      url: url,
      id: id,
      type: "DELETE",
      success: function(response, xhr) {
        tablo.row(parent).remove().draw();
      },
      error: function(response) {
      }
    });
  })


  make_roundy_images('img.obj')
      CKEDITOR_activate(CKEDITOR)
});
