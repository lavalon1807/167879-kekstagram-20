'use strict';
(function () {
  var upload = document.querySelector('#upload-file');
  var pictureOverlay = document.querySelector('.img-upload__overlay');
  var pictureOverlayPreview = pictureOverlay.querySelector('.img-upload__preview');
  var pictureOverlayItem = pictureOverlayPreview.querySelector('img');

  var readFile = function () {
    var file = upload.files[0];

    if (file) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        pictureOverlayItem.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var showFilesUpload = function () {
    upload.addEventListener('change', function () {
      readFile(upload, window.debounce(window.openUploadImg));
    });
  };
  showFilesUpload();
})();
