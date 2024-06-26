// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "@rails/actiontext"
import "./burger_menus"
import "./add_jquery"

Turbo.setFormMode("optin")

window.open_modal = function(link, url){
  
    var e = window.event;
    if (e) {
      e.preventDefault();
    }
  
    $(link).addClass("disabled");
    $(link).attr("disabled","disabled");
    let old_html = $(link).html();
    $(link).html('<svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/></svg>');
    $.ajax({
      type: "GET",
      url: url,
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      dataType: "html",
      success: function(result){
        document.getElementById("modal-container").innerHTML = result;
        init_modal();
        $(link).html(old_html);
        $(link).removeClass("disabled");
        $(link).removeAttr("disabled");
      },
      statusCode: {
        401: function (xhr, error, thrown) {
          window.location ="/404"
          return false
        }
      },
      error: function ( data ) {
  
      }
    });
}

window.init_modal = function(){
    var closemodal = document.querySelectorAll('.modal-close')
    for (var i = 0; i < closemodal.length; i++) {
        closemodal[i].addEventListener('click', remove_modal)
    }

    tinymce.remove();

    tinymce.init({
      selector: 'textarea',
      plugins: 'anchor autolink image link lists media searchreplace table',
      toolbar: 'undo redo | bold italic underline strikethrough | link image media table mergetags | align lineheight',
      license_key: 'gpl',
      promotion: false
    });
}

window.remove_modal = function(){
    document.getElementById("modal-container").innerHTML = ""
}

if ($("form").length) {
  $("form").submit(function(event) {
    let xChecked = $("div.checkbox-group.required :checkbox:checked").length;
    let checkboxes = $("div.checkbox-group.required :checkbox");
    if(xChecked == 0){
      checkboxes.each(function() {
        this.setCustomValidity("Please select at least one checkbox.");
      });
      
      if (!this.reportValidity()) {
        event.preventDefault();
      }
    }else{
      checkboxes.each(function() {
        this.setCustomValidity("");
      });
    }
  })

  $("div.checkbox-group.required :checkbox").change(function() {
    let checkboxes = $("div.checkbox-group.required :checkbox");
    let xChecked = $("div.checkbox-group.required :checkbox:checked").length;
    if (xChecked > 0) {
      checkboxes.each(function() {
        this.setCustomValidity("");
      });
    }
  });
}