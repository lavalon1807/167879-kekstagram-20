'use strict';
(function () {
  var borderError = '3px solid red';
  var borderSuccess = '3px solid green';

  var textHashtag = document.querySelector('.text__hashtags');
  var re = /(#[а-яА-Я\w][а-яА-Я\w]{0,18}){1,5}?$/;

  function genValidHashtag() {
    var textFill = textHashtag.value;
    var massTextFill = textFill.split(' ');

    var newMassTextFill = massTextFill.filter(function (elem, pos) {
      return massTextFill.indexOf(elem) === pos;
    });

    var filterMassTextFill = (newMassTextFill.length !== massTextFill.length);
    var filterMassTextFills = (newMassTextFill.length > 5);

    if (filterMassTextFills) {
      textHashtag.setCustomValidity('Не больше 5-ти хештегов');
      textHashtag.style.border = borderError;
    } else if (filterMassTextFill) {
      textHashtag.setCustomValidity('Хештеги не должны повторяться! Пример: #tigrica');
      textHashtag.style.border = borderError;
    } else if (re.test(textFill) || textFill === '') {
      textHashtag.setCustomValidity('');
      textHashtag.style.border = borderSuccess;
    } else {
      textHashtag.setCustomValidity('Неправильно набран хештег! Не больше 20-ти символов!');
      textHashtag.style.border = borderError;
    }
  }

  textHashtag.addEventListener('focus', genValidHashtag);
  textHashtag.addEventListener('input', genValidHashtag);

  textHashtag.addEventListener('blur', function () {
    textHashtag.style.border = '3px solid grey';
  });

  var form = document.querySelector('.img-upload__form');
  var modalForm = form.querySelector('.img-upload__overlay');
  var uploadSubmit = form.querySelector('.img-upload__submit');

  form.addEventListener('submit', function (evt) {
    uploadSubmit.textContent = 'Данные отправляются ...';
    uploadSubmit.disabled = true;

    window.upload(new FormData(form), function () {
      modalForm.classList.add('hidden');
      uploadSubmit.textContent = 'ОПУБЛИКОВАТЬ';
      uploadSubmit.disabled = false;
    });
    evt.preventDefault();
    form.reset();
  });
})();

