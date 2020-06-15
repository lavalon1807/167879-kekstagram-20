'use strict';
(function () {
  // Валидация хеш-тегов
  var textHashtag = document.querySelector('.text__hashtags');
  var re = /(#[а-яА-Я\w][а-яА-Я\w]{0,18})(([ ]?(#[а-яА-Я\w])[а-яА-Я\w]{0,18}){1,4})?$/;

  textHashtag.addEventListener('input', function () {
    var textFill = textHashtag.value;
    var massTextFill = textFill.split(' ');
    var newMassTextFill = massTextFill.filter(function (elem, pos) {
      return massTextFill.indexOf(elem) === pos;
    });

    var filterMassTextFill = (newMassTextFill.length !== massTextFill.length);
    if (filterMassTextFill) {
      textHashtag.setCustomValidity('Хештеги не должны повторяться! Пример: #tigrica');
    } else if (re.test(textHashtag.value)) {
      textHashtag.setCustomValidity('');
    } else {
      textHashtag.setCustomValidity('Неправильно набран хеш-тег! Пример: #tigrica');
    }
  });
})();
