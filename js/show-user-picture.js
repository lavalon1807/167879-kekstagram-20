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
  window.loadBigPicture = function (user) {
    imgBigPicture.src = user.url;
    likesCount.textContent = user.likes;
    commentsCount.textContent = user.comments;
    socialCaption.textContent = user.description;
  }

  // Открывает пользовательскую картинку и закрывает
  var pictureUser = document.querySelectorAll('.picture');
  var pictureCancel = document.querySelector('#picture-cancel');

  function onPressEscape(evt) {
    if (userComment !== document.activeElement) {
      window.util.isEscEvent(evt, closePicture);
    }
  }

  window.openPicture = function (user) {
    var socialComments = document.querySelector('.social__comments');
    var socialCommentsItem = socialComments.querySelectorAll('.social__comment');
    var commentsLoader = document.querySelector('.comments-loader');
    commentsLoader.classList.remove('hidden');
    for (var element of socialCommentsItem) {
      socialComments.removeChild(element);
    }

    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPressEscape);
    window.getMessage();

    var socialComments = document.querySelector('.social__comments');
    var socialCommentsItem = socialComments.querySelectorAll('.social__comment');
    var socialCommentCount = document.querySelector('.social__comment-count');
    socialCommentCount.textContent = socialCommentsItem.length + ' из' + ' ' + user.comments.length + ' комментариев';

    var socialComments = document.querySelector('.social__comments');
    var socialCommentsItem = socialComments.querySelectorAll('.social__comment');
    var newCommentImg = socialComments.querySelectorAll('.social__picture');
    var socialCommentsItem = socialComments.querySelectorAll('.social__comment');
    var socialText = socialComments.querySelectorAll('.social__text');
    socialCommentsItem.forEach(function (item, index) {
      newCommentImg[index].src = user.comments[index].avatar;
      socialText[index].textContent = user.comments[index].message;
      newCommentImg[index].alt = user.comments[index].name;
    })
    // Добавляем обработчик на кнопку загрузить еще комментарии
    var commentsLoader = document.querySelector('.comments-loader');
    commentsLoader.onclick = function () {;
      window.getMessage2(user);
      var socialComments = document.querySelector('.social__comments');
      var socialCommentsItem = socialComments.querySelectorAll('.social__comment');
      var newCommentImg = socialComments.querySelectorAll('.social__picture');
      var socialCommentsItem = socialComments.querySelectorAll('.social__comment');
      var socialText = socialComments.querySelectorAll('.social__text');
      socialCommentsItem.forEach(function (item, index) {
        newCommentImg[index].src = user.comments[index].avatar;
        socialText[index].textContent = user.comments[index].message;
        newCommentImg[index].alt = user.comments[index].name;
      })
      var socialComments = document.querySelector('.social__comments');
      var socialCommentsItem = socialComments.querySelectorAll('.social__comment');
      var socialCommentCount = document.querySelector('.social__comment-count');
      socialCommentCount.textContent = socialCommentsItem.length + ' из' + ' ' + user.comments.length + ' комментариев';
      if (socialCommentsItem.length === user.comments.length) {
        commentsLoader.classList.add('hidden');
      }
    }
    // commentsLoader.classList.add('hidden');
    // Не дает прокручиваться основному экрану, пока показана большая картинка
    mainBody.classList.add('modal-open');
  }

  function closePicture() {
    var commentsLoader = document.querySelector('.comments-loader');
    var socialComments = document.querySelector('.social__comments');
      var socialCommentsItem = socialComments.querySelectorAll('.social__comment');
    bigPicture.classList.add('hidden');
    userComment.value = '';
    document.removeEventListener('keydown', onPressEscape);

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
