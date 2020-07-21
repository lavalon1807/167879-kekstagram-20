'use strict';
(function () {
  var StatusCode = {
    OK: 200
  };
  var ADRESS_SERVER_UPLOAD = 'https://javascript.pages.academy/kekstagram';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        window.loadSuccessErrorForm.successUpload();
      } else {
        onSuccess(xhr.response);
        window.loadSuccessErrorForm.errorUpload();
      }
    });

    xhr.open('POST', ADRESS_SERVER_UPLOAD);
    xhr.send(data);
  };
})();
