'use strict';
(function () {
  var LEFT_KEY = 37;
  var RIGHT_KEY = 39;
  var MIN_BAR = 0;
  var MAX_BAR = 453;
  var STEP_LEFT = -10;
  var STEP_RIGHT = 10;
  // Заставляем двигаться пин и менять эффект
  var effectInstrument = document.querySelector('.img-upload__overlay');
  var handRule = effectInstrument.querySelector('.effect-level__pin');
  var lineRule = effectInstrument.querySelector('.effect-level__line');
  var depthRule = effectInstrument.querySelector('.effect-level__depth');
  var listPicture = document.querySelector('.img-upload__preview');
  var pictureRule = listPicture.querySelector('img');

  var massTypes = ['chrome', 'sepia', 'marvin', 'phobos', 'heat'];
  var massEffects = ['grayscale', 'sepia', 'invert', 'blur', 'brightness'];
  var massProcents = [100, 100, 100, 25, 33];
  var massStyles = ['', '', '', 'px', ''];

  window.genEffectPicture = function (instrumentEffect, procent) {
    var brightness = procent / 33;
    if (parseInt(brightness, 10) === 0) {
      brightness = 0.8;
    }
    for (var i = 0; i < massTypes.length; i++) {
      if (instrumentEffect.value === massTypes[i]) {
        pictureRule.style.filter = massEffects[i] + '(' + (procent / massProcents[i]) + massStyles[i] + ')';
      }
    }
  };

  var genPinPicture = function (type) {
    var rightEdge = lineRule.offsetWidth;
    var moveBar = handRule.style.left;
    var barPosition = parseInt(moveBar, 10);
    var procent = parseInt((barPosition * 100) / rightEdge, 10);
    var itemInstrument = document.querySelector('input[name="effect"]:checked');

    barPosition = barPosition + type;
    handRule.style.left = barPosition + 'px';
    depthRule.style.width = barPosition + 'px';

    window.genEffectPicture(itemInstrument, procent);

    if (barPosition < MIN_BAR) {
      handRule.style.left = MIN_BAR + 'px';
    } else if (barPosition > MAX_BAR) {
      handRule.style.left = MAX_BAR + 'px';
    }
  };

  handRule.addEventListener('keydown', function (evt) {
    if (evt.keyCode === LEFT_KEY) {
      genPinPicture(STEP_LEFT);
    }

    if (evt.keyCode === RIGHT_KEY) {
      genPinPicture(STEP_RIGHT);
    }
  });
})();
