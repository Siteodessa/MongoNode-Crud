  $( document ).ready(function() {
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
  }
    $("#save_and_close").click(
     function(){
      let files = $('#image_uploads').val()
  // console.log(files);
      sendAjaxForm('result_form', 'form-horizontal', '/notes',  close_modal );
      return false;
    }
  );
      $("#save").click(
      function(){
        let files = $('#image_uploads').val()
  // console.log(files);
       sendAjaxForm('result_form', 'form-horizontal', '/notes');
        return false;
      }
    );
  });
  function show_new_page_success(obj, result) {
      $(obj).html('Запись "'+result.title+'" успешно добавлена!<div class="page_added">Вы можете на нее <a href="/doma/'+result.page_link+'">Перейти</a></div>').addClass('shown');
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
  this.senddata = function () {
    z = this.getdata()
    i = this.get_iframe_description()
          $.ajax({
              url:     url,
              type:     "POST",
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
  function sendAjaxForm(result_form, ajax_form, url, close_after) {
var form  = new saveform(result_form, ajax_form, url, close_after)
form.senddata()
  }
    $(function () {
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
      jQuery('img.obj').each(function(){
        jQuery(this).parent('a').wrap('<div class="roundy"> </div>')
      })
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
    })
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
jQuery("#imageUpload").change(function() {
    readURL(this);
});
jQuery('.radion').on('click', function(){
jQuery(this).closest('div').find('.radion').removeClass('checked')
jQuery(this).addClass('checked')
})
$(function () {
  CKEDITOR.replace('editor1')
  $('.textarea').wysihtml5()
})
