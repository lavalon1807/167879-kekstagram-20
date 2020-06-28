'use strict';
(function () {
  var ESC_KEY = 27;
  var StatusCode = {
    OK: 200
  };

  var URL = 'https://javascript.pages.academy/kekstagram';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        successUpload();
      } else {
        onSuccess(xhr.response);
        errorUpload();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  function closeError(error) {
    error.classList.add('hidden');
  }

  function closeSuccess(success) {
    success.classList.add('hidden');
  }

  var errorUpload = function () {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(error);
    var errorButton = error.querySelector('.error__button');
    // Закрывает на клик по кнопке
    errorButton.onclick = function (evt) {
      evt.preventDefault();
      closeError(error);
    };
    // Закрывает на клик по произвольному месту
    document.onclick = function () {
      closeError(error);
    };
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEY) {
        closeError(error);
      }
    });
  };

  var successUpload = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var success = successTemplate.cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(success);
    var successButton = success.querySelector('.success__button');
    // Закрывает на клик по кнопке
    successButton.onclick = function () {
      closeSuccess(success);
    };
    // Закрывает на клик по произвольному месту
    document.onclick = function () {
      closeSuccess(success);
    };
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEY) {
        closeSuccess(success);
      }
    });
  };
})();
