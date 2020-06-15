'use strict';
(function () {
  // Показ тестовой загруженной фотографии
  var mainPicture = document.querySelector('img');
  var textHashtag = document.querySelector('.text__hashtags');
  var div = document.querySelector('.img-upload__effect-level');
  var mainBody = document.querySelector('body');
  var uploadFile = document.querySelector('#upload-file');
  var redactorForm = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('.cancel');
  var textDescription = document.querySelector('.text__description');

  function pressEscUpload(evt) {
    if (textDescription !== document.activeElement && textHashtag !== document.activeElement) {
      window.util.isEscEvent(evt, closeUploadImg);
    }
  }

  function openUploadImg() {
    redactorForm.classList.remove('hidden');
    mainBody.classList.add('modal-open');
    div.style.display = 'none';
    document.addEventListener('keydown', pressEscUpload);
  }

  function closeUploadImg() {
    redactorForm.classList.add('hidden');
    mainPicture.style.filter = '';
    document.removeEventListener('keydown', pressEscUpload);
    // Удаляет запрет на прокручивание основному экрану, пока показана большая картинка
    mainBody.classList.remove('modal-open');

    textHashtag.value = '';
    textDescription.value = '';
  }

  uploadFile.onclick = function (evt) {
    evt.preventDefault();
    openUploadImg();
  };

  imgUploadCancel.onclick = function () {
    redactorForm.classList.add('hidden');
    closeUploadImg();
  };
})();
