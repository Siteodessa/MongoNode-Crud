  $( function() {

    function show_new_page_success(obj, result) {
        $(obj).html('Запись "'+result.title+'" успешно добавлена!<div class="page_added">Вы можете на нее <a href="/doma/'+result.page_link+'">Перейти</a></div>').addClass('shown');
    }
    function sendAjaxForm(result_form, ajax_form, url, close_after) {
            var form  = new saveform(result_form, ajax_form, url, close_after)
            form.senddata("POST")
      }
    function readURL(input) {
              if (input.files && input.files[0]) {
                  var reader = new FileReader();
                  reader.onload = function(e) {
                      $('#imagePreview').css('background-image', 'url('+e.target.result +')');
                      $('#imagePreview').hide();
                      $('#imagePreview').fadeIn(650);
                  }
                  reader.readAsDataURL(input.files[0]);
        }
      }





      $('span.content_column').click(function () {
        $(this).toggleClass('xpanded')
      })
      $(".db_group").each(function() {
      let obj = jQuery(this).find('.radion').first()
      obj.addClass('checked')
      obj.find('input').attr('checked', true)
    })
    function close_modal() {
        setTimeout(function(){
          $('button.btn.btn-outline.pull-left').click()
          }, 500)
          setTimeout(function(){
          window.location.reload()
          }, 1000)
      }

    function make_roundy_images(el1) {
            jQuery(el1).each(function(){
              jQuery(this).parent('a').wrap('<div class="roundy"> </div>')
            })
          }
    function CKEDITOR_activate(CKEDITOR) {
            CKEDITOR.replace('editor1')
            $('.textarea').wysihtml5()
    }




    var saveform = function (result_form, ajax_form, url, close_after) {
          this.getdata = function () {
                var iframe0 = $('iframe#media_upload');
                var iframe_select = iframe0.contents().find('div#imagedata').text().replace(/\r?\n/g, "").replace(' ', "").replace(',', "").replace(' ', "").replace(' ', "").replace(' ', "").replace(' ', "");
                  let z = $('.'+ ajax_form + ' input[name!=editor1]').serialize()
                  z = decodeURI(z)
                  let iframe = document.querySelector('iframe.cke_wysiwyg_frame.cke_reset');
                  let iframeDocument = iframe.contentWindow.document.activeElement.innerHTML;
                  z +=
                  b = '&content=' + iframeDocument + '&home_background=' + iframe_select;
                  console.log(z);
                  return z
          }
          this.get_iframe_description = function () {
            let iframe = document.querySelector('iframe.cke_wysiwyg_frame.cke_reset');
            let iframeDocument = iframe.contentWindow.document.activeElement.innerHTML;
            return iframeDocument;
           }
          this.senddata = function (method) {
            z = this.getdata()
            i = this.get_iframe_description()
                  $.ajax({
                      url:     url,
                      type:     method,
                      dataType: "multipart/form-data",
                      content: i,
                      data: z,
                      success: function(response, xhr) {
                        result = $.parseJSON(response);
                        show_new_page_success('#result_form p', result)
                         close_after ? close_after() : $('#result_form p') ;
                    },
                    error: function(response) {
                     if (response.responseText && response.responseText !== undefined) {
                if (response.status == 200) {
                  respo = JSON.parse(response.responseText);
                  show_new_page_success('#result_form p', respo)
                       close_after ? close_after() : $('#result_form p') ;
                  return
                }
                                 let str = response.responseText.split("title:");
                                let str1 = str[1].split('"');
                                let str2 = str1[0];
                                 $('#result_form p').text(str2).addClass('shown');
                              } else {
                                  $('#result_form p').text('Неизвестная ошибка 0041').addClass('shown');
                              }
                    }
                });
          }
    }


    var editform = function (result_form, ajax_form, url, close_after) {
        this.senddata = function (method) {
                  z = this.getdata()
                  i = this.get_iframe_description()
                        $.ajax({
                            url:     url,
                            type:     method,
                            dataType: "multipart/form-data",
                            content: i,
                            data: z,
                            success: function(response, xhr) {
                              result = $.parseJSON(response);
                              show_new_page_success('#result_form p', result)
                               close_after ? close_after() : $('#result_form p') ;
                          },
                          error: function(response) {
                           if (response.responseText && response.responseText !== undefined) {
                      if (response.status == 200) {
                        respo = JSON.parse(response.responseText);
                        show_new_page_success('#result_form p', respo)
                             close_after ? close_after() : $('#result_form p') ;
                        return
                      }
                                       let str = response.responseText.split("title:");
                                      let str1 = str[1].split('"');
                                      let str2 = str1[0];
                                       $('#result_form p').text(str2).addClass('shown');
                                    } else {
                                        $('#result_form p').text('Неизвестная ошибка 0041').addClass('shown');
                                    }
                          }
                      });
                }
        this.update_rows_data = function (rows, data ) {
            $(rows).each(function(){
              let dis = $(this)
              let field = dis.attr('name')
              let input = dis.find('input')
              input.val(data[field])
              if (input.attr('type') == 'radio' && input.val() == data[field] ) {
                input.parent('label').click()
              }
            })
          }
        this.listen = function (activator, add_new_obj_elem) {
           update_rows_data = this.update_rows_data
          $('.elems.edit').click(function(){
            let id = $(this).find('i').attr('id')
            $.get({
              url: "/notes/"+ id +"",
              beforeSend: function( xhr ) { xhr.overrideMimeType( "text/plain; charset=utf-8" ); }
              })
              .done(function( data ) {
                data = JSON.parse(data)
                update_rows_data('.db_group', data)
                  let iframe = document.querySelector('iframe.cke_wysiwyg_frame.cke_reset');
                  let iframeElement = iframe.contentWindow.document.activeElement.innerHTML = data["content"];
                  var iframe0 = $('iframe#media_upload');
                  var iframe_elem = iframe0.contents().find('#imagedata')
                  iframe_elem.html('<span id="the_image"><img src="' + data['home_background'] + '"></span><span>' + data['home_background'] + '</span>')
                  iframe_elem.css({"position":"absolute"})
                  iframe_elem.find('img').css({"max-width":"60px","margin":"0 20px -3px 90px","max-height":"40px"})

                  $(add_new_obj_elem).click()
                  $('button.save').toggle()
                  $('.modal-footer')
                  .append('<button type="button" id="update" class="btn btn-outline">Обновить</button>')
                  .append('<button type="button" id="update_and_close" class="btn btn-outline">Обновить и закрыть</button>')

              });
          }).bind(this)
        }
    }

    var tablo =    $('#example1').DataTable({  "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
    }})
    var tablo1 =  $('#example2').DataTable({
      'paging'      : true,
      'lengthChange': false,
      'searching'   : false,
      'ordering'    : true,
      'info'        : true,
      'autoWidth'   : false
    })

    var post_editor = new editform()
    post_editor.listen('.elems.edit', 'button.btn.btn-warning')


    jQuery("#imageUpload").change(function() {
        readURL(this);
    });
    jQuery('.radion').on('click', function(){
      jQuery(this).closest('div').find('.radion').removeClass('checked')
      jQuery(this).addClass('checked')
    })
    $("button.save").click( function(){

        let files = $('#image_uploads').val()
        if ($(this).hasClass('and_close') == true) {
          sendAjaxForm('result_form', 'form-horizontal', '/notes',  close_modal );
        }
        else {
          sendAjaxForm('result_form', 'form-horizontal', '/notes');
        }
        return false;
      });



    jQuery('a.trash').click(function(){
                let id = jQuery(this).find('i').attr('id')
                let parent = jQuery(this).parent('td').parent('tr')
                url = '/notes/' + id + ''
                $.ajax({
                  url:     url,
                  id:     id,
                  type:     "DELETE",
                  success: function(response, xhr) {
                  tablo.row(parent).remove().draw();
                  },
                  error: function(response) {
                  console.log('error occured');
                  }
                });
    })



    make_roundy_images('img.obj')
    CKEDITOR_activate(CKEDITOR)



  });
