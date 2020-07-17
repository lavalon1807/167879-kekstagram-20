'use strict';
(function () {
  // Заставляем двигаться пин и менять эффект
  var redactorPhoto = document.querySelectorAll('.effects__radio');
  var instrument = document.querySelector('.img-upload__overlay');
  var effect = document.querySelector('input[name="effect"]:checked');
  var instrumentHandl = instrument.querySelector('.effect-level__pin');
  var instrumentLine = instrument.querySelector('.effect-level__line');
  var instrumentDepth = instrument.querySelector('.effect-level__depth');
  var wrapperPicture = document.querySelector('.img-upload__preview');
  var mainPicture = wrapperPicture.querySelector('img');
  var div = document.querySelector('.img-upload__effect-level');
  var effectValue = document.querySelector('.effect-level__value');

  redactorPhoto.forEach(function (effects) {
    effects.onchange = function () {
      div.style.display = (effects.value !== 'none') ? 'block' : 'none';

      mainPicture.className = 'effects__preview--' + effect.value;
      instrumentDepth.style.width = '100%';
      instrumentHandl.style.left = '453px';
      effectValue.value = 100;

      for (var l = 0; l < window.constants.EFFECT_VALUE.length; l++) {
        if (effects.value === window.constants.EFFECT_VALUE[l]) {
          mainPicture.style.filter = window.constants.EFFECT_DEAPTH[l];
        }
      }
    };
  });

  var massTypes = ['chrome', 'sepia', 'marvin', 'phobos', 'heat'];
  var massEffects = [
    'grayscale(',
    'sepia(',
    'invert(',
    'blur(',
    'brightness('
  ];

  var massProcents = [100, 100, 100, 25, 33];
  var massStyles = ['', '', '', 'px', ''];

  var genEffectPicture = function (instrumentEffect, procent) {
    var brightness = procent / 33;
    if (parseInt(brightness, 10) === 0) {
      brightness = 0.8;
    }
    for (var i = 0; i < massTypes.length; i++) {
      if (instrumentEffect.value === massTypes[i]) {
        mainPicture.style.filter = massEffects[i] + (procent / massProcents[i]) + massStyles[i] + ')';
      }
    }
  };

  instrumentHandl.addEventListener('mousedown', function () {
    var sliderCoords = getCoords(instrumentLine);
    var rightEdge = instrumentLine.offsetWidth;

    document.onmousemove = function (evt) {
      var newLeft = evt.pageX - sliderCoords.left;
      var moveBar = instrumentHandl.style.left;
      var procent = parseInt((parseInt(moveBar, 10) * 100) / rightEdge, 10);
      var instrumentEffect = document.querySelector('input[name="effect"]:checked');

      instrumentDepth.style.width = parseInt(moveBar, 10) + 'px';

      genEffectPicture(instrumentEffect, procent);

      if (newLeft < 0) {
        newLeft = 0;
      }

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      instrumentHandl.style.left = newLeft + 'px';
    };

    document.addEventListener('mouseup', function () {
      document.onmousemove = null;
      document.onmouseup = null;
    });
  });

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }
})();
