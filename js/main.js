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
      closePicture();
    }
  }

  function openPicture() {
    bigPicture.classList.remove('hidden');
    if (userComment !== document.activeElement) {
      document.addEventListener('keydown', onPressEscape);
    }
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

  function openUploadImg() {
    redactorForm.classList.remove('hidden');
    mainBody.classList.add('modal-open');
  }

  function closeUploadImg() {
    redactorForm.classList.add('hidden');
    // Удаляет запрет на прокручивание основному экрану, пока показана большая картинка
    mainBody.classList.remove('modal-open');
  }

  // Временное постановление ОБЯЗАТЕЛЬНО ВЫНЕСУ ПОТОМ В МОДУЛИ
  function timeLoad() {
    document.addEventListener('keydown', function (evt) {
      if (evt.key === ESC_KEY) {
        closeUploadImg();
      }
    });
  }

  uploadFile.onclick = function (evt) {
    evt.preventDefault();
    timeLoad();
    openUploadImg();
  };

  imgUploadCancel.onclick = function () {
    redactorForm.classList.add('hidden');
    closeUploadImg();
  };

  // Выбираем эффект для картинки

  var effectsRadio = document.querySelectorAll('.effects__radio');
  var imgUploadPreview = document.querySelector('.img-upload__preview');

  for (var k = 0; k < effectsRadio.length; k++) {
    checkEffects(effectsRadio[k]);
  }

  function checkEffects(effect) {
    effect.onchange = function () {
      if (effect.value) {
        imgUploadPreview.className = 'effects__preview--' + effect.value;
        imgUploadPreview.classList.add('img-upload__preview');
      }
    };
  }

})();
