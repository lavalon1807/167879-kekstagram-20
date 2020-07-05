'use strict';
(function () {
  var MAX_SCALE = 100;
  var MIN_SCALE = 25;
  var scaleUpload = document.querySelector('.img-upload__scale');
  var scaleSmaller = scaleUpload.querySelector('.scale__control--smaller');
  var scaleBigger = scaleUpload.querySelector('.scale__control--bigger');
  var scaleValue = scaleUpload.querySelector('.scale__control--value');
  var uploadPreview = document.querySelector('.img-upload__preview img');
  uploadPreview.style.transform = 'scale(1)';

  var genScale = function (cns) {
    window.constants.SCALE = cns;
    uploadPreview.style.transform = 'scale(' + window.constants.SCALE / MAX_SCALE + ')';
    scaleValue.value = window.constants.SCALE + '%';
  };

  scaleSmaller.addEventListener('click', function () {
    if (window.constants.SCALE > MIN_SCALE) {
      genScale(window.constants.SCALE - MIN_SCALE);
    }
  });

  scaleBigger.addEventListener('click', function () {
    if (window.constants.SCALE < MAX_SCALE) {
      genScale(window.constants.SCALE + MIN_SCALE);
    }
  });

})();
