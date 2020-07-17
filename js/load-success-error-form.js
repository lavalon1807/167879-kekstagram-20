'use strict';
(function () {
  var ESC_KEY = 27;
  var uploadImg = document.querySelector('.img-upload__preview img');
  var main = document.querySelector('main');

  function pressEsc(evt, type) {
    if (evt.keyCode === ESC_KEY) {
      delFormUpload(type);
      document.onkeydown = null;
    }
  }

  function delFormUpload(type) {
    type.classList.add('hidden');
  }

  function stayClick(item, type) {
    item.onclick = function () {
      delFormUpload(type);
      document.onkeydown = null;
    };
  }

  window.loadSuccessErrorForm = {
    errorUpload: function () {
      var errorTemplate = document.querySelector('#error')
        .content
        .querySelector('.error');
      var error = errorTemplate.cloneNode(true);
      main.append(error);
      var errorButton = error.querySelector('.error__button');
      // Закрывает на клик по кнопке
      stayClick(errorButton, error);
      stayClick(error, error);

      document.onkeydown = function (evt) {
        pressEsc(evt, error);
      };
    },

    successUpload: function () {
      var successTemplate = document.querySelector('#success')
        .content
        .querySelector('.success');
      var success = successTemplate.cloneNode(true);
      main.append(success);
      var successButton = success.querySelector('.success__button');
      // Закрывает на клик по кнопке
      stayClick(successButton, success);
      stayClick(success, success);

      document.onkeydown = function (evt) {
        pressEsc(evt, success);
      };
      uploadImg.src = 'img/upload-default-image.jpg';
    }
  };
})();
