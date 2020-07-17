'use strict';
(function () {
  var MAX_SCALE = 100;
  // Показ тестовой загруженной фотографии
  var mainPicture = document.querySelector('img');
  var textHashtag = document.querySelector('.text__hashtags');
  var div = document.querySelector('.img-upload__effect-level');
  var mainBody = document.querySelector('body');
  var redactorForm = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('.cancel');
  var textDescription = document.querySelector('.text__description');
  var scaleUpload = document.querySelector('.img-upload__scale');
  var scaleValue = scaleUpload.querySelector('.scale__control--value');
  var uploadPreview = document.querySelector('.img-upload__preview img');

  function pressEscUpload(evt) {
    if (textDescription !== document.activeElement && textHashtag !== document.activeElement) {
      window.util.isEscEvent(evt, closeUploadImg);
    }
  }

  window.openUploadImg = function () {
    redactorForm.classList.remove('hidden');
    mainBody.classList.add('modal-open');
    div.style.display = 'none';
    document.addEventListener('keydown', pressEscUpload);
  };

  function closeUploadImg() {
    redactorForm.classList.add('hidden');
    mainPicture.style.filter = '';
    uploadPreview.style.transform = 'scale(1)';
    window.constants.SCALE = MAX_SCALE;
    scaleValue.value = window.constants.SCALE + '%';
    // Удаляет запрет на прокручивание основному экрану, пока показана большая картинка
    mainBody.classList.remove('modal-open');

    textHashtag.value = '';
    textDescription.value = '';
    uploadPreview.src = '';
  }

  imgUploadCancel.onclick = function () {
    redactorForm.classList.add('hidden');
    closeUploadImg();
  };
})();
