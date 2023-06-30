//В этом файле реализованы запросы к авторизации / регистрации через разные панели
$(document).ready(function () {
    captchaVersion = $('meta[name="get_captcha_version"]').attr('content');


    //это необходимо только для капчи, которая идет по умолчанию
    $(".captcha_img").click(function (e) {
           get_captcha()
    });

    function registration(email, password, captcha) {
        $.ajax({
            type: "POST",
            url: "/registration/user",
            data: {
                email: email,
                password: password,
                captcha: captcha,
            },
            dataType: "json",
            encode: true,
        }).done(function (data) {
            if (data.ok) {
                location.reload()
            } else {
                notify_error(data.message)
                get_captcha()
            }
        });
    }


    $("#auth").click(function (e) {
        e.preventDefault();
        authorization($("#email").val(), $("#password").val(), $("#captcha").val())
    });

    $("#auth_page").click(function (e) {
       e.preventDefault();
       authorization_panel($('#form_auth_page'));
    });

    $("#auth_panel").click(function (e) {
        e.preventDefault();
        authorization_panel($('#form_auth_panel'));
        $("#captcha_panel").val("");
    });

    //Модальное окно регистрации пользователя
    $("#registration_panel").click(function (e) {
        e.preventDefault();
        registration_panel("/registration/user", $('#model_registration'));
        $("#captcha_registration_panel").val("");
    });

    //Страница регистрации
    $("#registration_page_button").click(function (e) {
        e.preventDefault();
        registration_panel("/registration/user", $('#panel_registration_page'));
    });

    $("#page_new_user_registration_button").click(function (e) {
        e.preventDefault();
        registration_panel("/registration/user", $('#page_new_user_registration'));
    });

    function authorization_panel(authPanel) {
        var formData = new FormData();
        var inputs = authPanel.find('input');
        inputs.each(function() {
          formData.append(this.name, this.value);
        });
        if (captchaVersion == "google") {
           google_captcha_key = $('meta[name="google_captcha_key"]').attr('content');
           grecaptcha.execute(google_captcha_key, { action: 'submit' }).then(function (token) {
               formData.append("captcha", token);
               sendAjax("/auth", formData)
           });
        }else{
            sendAjax("/auth", formData)
        }
    }

    function registration_panel(url, form) {
        var formData = new FormData();
        var inputs = form.find('input');
        inputs.each(function() {
          formData.append(this.name, this.value);
        });
        if (captchaVersion == "google") {
           google_captcha_key = $('meta[name="google_captcha_key"]').attr('content');
           grecaptcha.execute(google_captcha_key, { action: 'submit' }).then(function (token) {
               formData.append("captcha", token);
               sendAjax(url, formData)
           });
        }else{
            sendAjax(url, formData)
        }
    }

    function sendAjax(url, formData){
      $.ajax({
          type: "POST",
          url: url,
          data: formData,
          dataType: "json",
          processData:false,
          contentType:false,
          encode: true,
      }).done(function (data) {
          console.log(data);
          if (data.ok) {
              location.reload()
          } else {
              notify_error(data.message)
              if (captchaVersion != "google") {
                  get_captcha()
              }
          }
      });
    }

    function authorization(email, password, captcha) {
        $.ajax({
            type: "POST",
            url: "/auth",
            data: {
                email: email,
                password: password,
                captcha: captcha,
            },
            dataType: "json",
            encode: true,
        }).done(function (data) {
            console.log(data);
            if (data.ok) {
                location.reload()
            } else {
                notify_error(data.message)
                get_captcha()
            }
        });
    }

    $('#password_auth_page').keypress(function (e) {
        if (e.which == 13) {
           authorization_panel($('#form_auth_page'));
        }
    });

    $('#password_panel').keypress(function (e) {
        if (e.which == 13) {
           authorization_panel($('#form_auth_panel'));
           $("#captcha_panel").val("");
        }
    });

    $('#password_registration_panel').keypress(function (e) {
        if (e.which == 13) {
           registration_panel("/registration/user", $('#model_registration'));
        }
    });

    $('#registration_page_password').keypress(function (e) {
        if (e.which == 13) {
           registration_panel("/registration/user", $('#panel_registration_page'));
        }
    });

    $('#page_new_user_registration_button').keypress(function (e) {
        if (e.which == 13) {
           registration_panel("/registration/user", $('#page_new_user_registration'));
        }
    });


    $('#captcha').keypress(function (e) {
        if (e.which == 13) {
            authorization($("#email").val(), $("#password").val(), $("#captcha").val())
        }
    });

});
