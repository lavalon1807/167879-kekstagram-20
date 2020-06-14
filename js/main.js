'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var DESCRIPTIONS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var NAMES = ['Артем', 'Егор', 'Трактор', 'Надира', 'Толасьо', 'Вася'];

  var templePicture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var socialButtonBtn = document.querySelector('.social__footer-btn');
  var socialCommentsss = document.querySelector('.social__comments');
  var userComment = document.querySelector('.social__footer-text');
  var mainBody = document.querySelector('body');
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var imgBigPicture = bigPicture.querySelector('img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialCaption = bigPicture.querySelector('.social__caption');
  var massUser = [];

  function genNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function genUser(count) {
    var usersObject =
      {
        url: 'photos/' + count + '.jpg',
        avatar: 'img/avatar-' + genNumber(1, 6) + '.svg',
        description: DESCRIPTIONS[genNumber(1, 6)],
        name: NAMES[genNumber(1, 6)],
        likes: genNumber(15, 200),
        comments: genNumber(5, 180)
      };
    return usersObject;
  }

  function genMassUsers(getuser) {
    massUser.push(getuser);
  }

  function drawUser(user) {
    var usersElement = templePicture.cloneNode(true);

    usersElement.querySelector('.picture__img').src = user.url;
    usersElement.querySelector('.picture__likes').textContent = user.likes;
    usersElement.querySelector('.picture__comments').textContent = user.comments;

    return usersElement;
  }

  var fragment = document.createDocumentFragment();

  var createFragment = function (frag) {
    fragment.appendChild((frag));
  };

  for (var i = 1; i <= 25; i++) {
    genMassUsers(genUser(i));
  }

  for (var j = 0; j < 25; j++) {
    createFragment(drawUser(massUser[j]));
  }

  pictures.appendChild(fragment);

  // Добавляем элемент (комментарий) к большой фотографии

  function genNewComments() {
    var newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    var newCommentImg = document.createElement('img');
    newCommentImg.classList.add('social__picture');
    newCommentImg.src = massUser[genNumber(1, 6)].avatar;
    newCommentImg.alt = massUser[0].name;
    newCommentImg.style = 'width: 35px; height: 35px';
    newComment.append(newCommentImg);
    var newCommentText = document.createElement('p');
    newCommentText.classList.add('social__text');
    newCommentText.textContent = userComment.value;
    newComment.append(newCommentText);
    socialCommentsss.append(newComment);
    userComment.value = '';
  }

  // Показывает большую фотографию и информацию

  function loadBigPicture() {
    imgBigPicture.src = massUser[0].url;
    likesCount.textContent = massUser[0].likes;
    commentsCount.textContent = massUser[0].comments;
    socialCaption.textContent = massUser[0].description;
    var socialCommentCount = document.querySelector('.social__comment-count');
    socialCommentCount.classList.add('hidden');
    var commentsLoader = document.querySelector('.comments-loader');
    commentsLoader.classList.add('hidden');
  }

  loadBigPicture();

  // Отправляет коментарий пользователя

  socialButtonBtn.onclick = function (evt) {
    evt.preventDefault();
    genNewComments();
  };

  userComment.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      genNewComments();
    }
  });

  // Открывает пользовательскую картинку и закрывает
  var pictureUser = document.querySelector('.picture');
  var pictureCancel = document.querySelector('#picture-cancel');

  function onPressEscape(evt) {
    if (evt.key === ESC_KEY) {
      if (userComment !== document.activeElement) {
        closePicture();
      }
    }
  }

  function openPicture() {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPressEscape);
    // Не дает прокручиваться основному экрану, пока показана большая картинка
    mainBody.classList.add('modal-open');
  }

  function closePicture() {
    bigPicture.classList.add('hidden');
    userComment.value = '';
    document.removeEventListener('keydown', onPressEscape);
    // Удаляет запрет на прокручивание основному экрану, пока показана большая картинка
    mainBody.classList.remove('modal-open');
  }

  pictureUser.onclick = function () {
    openPicture();
  };

  pictureCancel.onclick = function () {
    closePicture();
  };

  // Показ тестовой загруженной фотографии
  var uploadFile = document.querySelector('#upload-file');
  var redactorForm = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('.cancel');
  var textDescription = document.querySelector('.text__description');

  function pressEscUpload(evt) {
    if (evt.key === ESC_KEY) {
      if (textDescription !== document.activeElement && textHashtag !== document.activeElement) {
        closeUploadImg();
      }
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

  var EFFECT_DEAPTH = [
    'none',
    'grayscale(1)',
    'sepia(1)',
    'invert(100%)',
    'blur(3px)',
    'brightness(3)'
  ];

  var EFFECT_VALUE = [
    'none',
    'chrome',
    'sepia',
    'marvin',
    'phobos',
    'heat'
  ];

  redactorPhoto.forEach(function (effects) {
    effects.onchange = function () {
      div.style.display = (effects.value !== 'none') ? 'block' : 'none';

      mainPicture.className = 'effects__preview--' + effect.value;
      instrumentDepth.style.width = '100%';
      instrumentHandl.style.left = '100%';

      for (var l = 0; l < EFFECT_VALUE.length; l++) {
        if (effects.value === EFFECT_VALUE[l]) {
          mainPicture.style.filter = EFFECT_DEAPTH[l];
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

      if (instrumentEffect.value === 'chrome') {
        mainPicture.style.filter = 'grayscale(' + (procent / 100) + ')';
      } else if (instrumentEffect.value === 'sepia') {
        mainPicture.style.filter = 'sepia(' + (procent / 100) + ')';
      } else if (instrumentEffect.value === 'marvin') {
        mainPicture.style.filter = 'invert(' + (procent / 100) + ')';
      } else if (instrumentEffect.value === 'phobos') {
        mainPicture.style.filter = 'blur(' + (procent / 25) + 'px)';
      } else if (instrumentEffect.value === 'heat') {
        var brightness = procent / 33;

        if (parseInt(brightness, 10) === 0) {
          brightness = 1;
        }

        mainPicture.style.filter = 'brightness(' + brightness + ')';
      } else {
        mainPicture.style.filter = '';
      }

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

