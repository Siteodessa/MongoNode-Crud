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
          // if (input_radio.attr('value') == data[field] ) {
          //   console.log('obj');
          //   input_radio.parent('label').click()
          // }
        })
      }
      this.update_iframes = function(iframe0, iframe_elem, data) {
        var iframe0 = $(iframe0);
        var iframe_elem = iframe0.contents().find(iframe_elem)
         iframe_elem.html('<span id="the_image"><img src="/uploads/' + data['home_background'] + '"></span><span>' + data['home_background'] + '</span>')
        iframe_elem.css({
          "position": "absolute"
        })
        iframe_elem.find('img').css({
          "max-width": "60px",
                    "margin": "0 20px -3px 90px",
          "max-height": "40px"
        })

      }
      this.update_multimedia_iframes = function(iframe0, iframe_elem, data) {
        var iframe0 = $(iframe0);
        var iframe_elem = iframe0.contents().find(iframe_elem)
        if (typeof(data['gallery']) == 'undefined') return
        gallery_html = '<div class="gallery">'
        data['gallery'] = data['gallery'].split('"')[1]
        if (typeof(data['gallery']) == 'undefined') return
        iframe0.contents().find('div#multimedialinks').text(data['gallery'])
        data['gallery'].split(',').forEach(elem => {
          gallery_html += '<div class="gallery_elem"><span id="the_image"><img src="/uploads/' + elem + '"></span></div>'
        });
         iframe_elem.html(gallery_html + '</div>')
      }
      // ?DANGER
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
              // console.log(data);
              update_rows_data('.db_group', data)
              let iframe = document.querySelector('iframe.cke_wysiwyg_frame.cke_reset');
              let iframeElement;
              if (iframe) { iframeElement = iframe.contentWindow.document.activeElement.innerHTML = data["content"]; }
              var modal_body = $('.modal-body');
              update_iframes('iframe#media_upload', '#imagedata', data)
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
    var saveform = function(result_form, ajax_form, url, method, close_after) {
      this.getdata = function() {
        var iframe0 = $('iframe#media_upload');
        var iframe1 = $('iframe#multimedia_upload');
        var iframe_select = iframe0.contents().find('div#imagedata').text().replace(/\r?\n/g, "").replace(' ', "").replace(',', "").replace(' ', "").replace(' ', "").replace(' ', "").replace(' ', "");
        var iframe_multimedia = '' + iframe1.contents().find('div#multimedialinks').text()
        console.log(iframe_multimedia);
        let z = $('.' + ajax_form + ' input[name!=editor1]').not("[name='home_background']").not("[type='radio']").serialize()
        let iframe = document.querySelector('iframe.cke_wysiwyg_frame.cke_reset');
        let iframeDocument = iframe.contentWindow.document.activeElement.innerHTML;
        z +=
          b = '&content=' + iframeDocument +
          '&home_background=' + iframe_select +
          '&gallery=' + iframe_multimedia +

        $('.db_group').each(function() {
          let labels = $(this).find('div').children('label')
          labels.each(function() {
            if ($(this).hasClass('checked') === true) {
              let inp = $(this).find('input')
              let name = inp.attr('name')
              let vall = $(this).text().trim()
              if (name == 'home_background') {
                vall = $(this).text()
                // console.log(vall);
              }
              z += '&' + name + '=' + vall
            }
          })
        })

        z += '&house_deploy_date=' + $('#datepicker').val()
        z = decodeURI(z)
        console.log(z);
        // alert(z);
        return z
      }
      this.get_iframe_description = function() {
        let iframe = document.querySelector('iframe.cke_wysiwyg_frame.cke_reset');
        let iframeDocument = iframe.contentWindow.document.activeElement.innerHTML;
        return iframeDocument;
      }
      this.senddata = function() {
        z = this.getdata()
        i = this.get_iframe_description()
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
            // console.log(response);
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
                // console.log(response);
                $('#result_form p').text(response.responseText).addClass('shown');
              } else {
                // console.log('and response is');
                // console.log(response);
                // console.log('and response text is');
                // console.log(response.responseText);
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
          // console.log('error occured');
        }
      });
    })
    make_roundy_images('img.obj')


        CKEDITOR_activate(CKEDITOR)


  });
