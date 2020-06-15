'use strict';
(function () {
  var mainBody = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var imgBigPicture = bigPicture.querySelector('img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialCaption = bigPicture.querySelector('.social__caption');
  var userComment = document.querySelector('.social__footer-text');

  // Показывает большую фотографию и информацию
  function loadBigPicture(count) {
    imgBigPicture.src = window.massUser[count].url;
    likesCount.textContent = window.massUser[count].likes;
    commentsCount.textContent = window.massUser[count].comments;
    socialCaption.textContent = window.massUser[count].description;
    var socialCommentCount = document.querySelector('.social__comment-count');
    socialCommentCount.classList.add('hidden');
    var commentsLoader = document.querySelector('.comments-loader');
    commentsLoader.classList.add('hidden');
  }

  // Открывает пользовательскую картинку и закрывает
  var pictureUser = document.querySelectorAll('.picture');
  var pictureCancel = document.querySelector('#picture-cancel');

  function onPressEscape(evt) {
    if (userComment !== document.activeElement) {
      window.util.isEscEvent(evt, closePicture);
    }
  }

  function onPressEnter(evt) {
    if (userComment.value !== '') {
      window.util.isEnterEvent(evt, window.genNewComments);
    }
  }

  function openPicture() {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPressEscape);
    userComment.addEventListener('keydown', onPressEnter);
    // Не дает прокручиваться основному экрану, пока показана большая картинка
    mainBody.classList.add('modal-open');
  }

  function closePicture() {
    bigPicture.classList.add('hidden');
    userComment.value = '';
    document.removeEventListener('keydown', onPressEscape);
    userComment.removeEventListener('keydown', onPressEnter);
    // Удаляет запрет на прокручивание основному экрану, пока показана большая картинка
    mainBody.classList.remove('modal-open');
  }

  pictureUser.forEach(function (item, index) {
    item.onclick = function () {
      openPicture();
      loadBigPicture(index);
    };
  });

  pictureCancel.onclick = function () {
    closePicture();
  };
})();
