'use strict';
(function () {
  var UP_KEY = 38;
  var DOWN_KEY = 40;
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

  var effectFocus = function (evt, list) {
    evt.preventDefault();
    list.focus();
  };

  redactorPhoto.forEach(function (effects) {
    effects.addEventListener('keydown', function (evt) {
      if (evt.keyCode === UP_KEY) {
        effectFocus(evt, instrumentHandl);
      }

      instrumentHandl.addEventListener('keydown', function (e) {
        if (e.keyCode === DOWN_KEY) {
          effectFocus(e, effects);
        }
      });
    });

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

  instrumentHandl.addEventListener('mousedown', function () {
    var sliderCoords = getCoords(instrumentLine);
    var rightEdge = instrumentLine.offsetWidth;

    document.onmousemove = function (evt) {
      var newLeft = evt.pageX - sliderCoords.left;
      var moveBar = instrumentHandl.style.left;
      var procent = parseInt((parseInt(moveBar, 10) * 100) / rightEdge, 10);
      var instrumentEffect = document.querySelector('input[name="effect"]:checked');

      instrumentDepth.style.width = parseInt(moveBar, 10) + 'px';

      window.genEffectPicture(instrumentEffect, procent);

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

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  };
})();
