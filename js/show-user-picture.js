'use strict';
(function () {
  var mainBody = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var imgBigPicture = bigPicture.querySelector('img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialCaption = bigPicture.querySelector('.social__caption');
  var userComment = document.querySelector('.social__footer-text');
  var socialComments = document.querySelector('.social__comments');
  var commentsLoader = document.querySelector('.comments-loader');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var pictureCancel = document.querySelector('#picture-cancel');

  // Показывает большую фотографию и информацию
  var loadBigPicture = function (user) {
    imgBigPicture.src = user.url;
    likesCount.textContent = user.likes;
    commentsCount.textContent = user.comments;
    socialCaption.textContent = user.description;
  }

  function onPressEscape(evt) {
    if (userComment !== document.activeElement) {
      window.util.isEscEvent(evt, closePicture);
    }
  }

  window.openPicture = function (user) {
    loadBigPicture(user);

    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPressEscape);
    // Добавляем в разметку 5 требуемых сообщений
    window.comments.getMessage();
    // Показываем пользователю сколько сообщений есть к фотографии
    // var socialComments = document.querySelector('.social__comments');
    var socialCommentsItem = socialComments.querySelectorAll('.social__comment');

    socialCommentCount.textContent = socialCommentsItem.length + ' из' + ' ' + user.comments.length + ' комментариев';
    // Показываем данные каждого сообщения полученные с сервера
    var newCommentImg = socialComments.querySelectorAll('.social__picture');
    var socialText = socialComments.querySelectorAll('.social__text');
    socialCommentsItem.forEach(function (item, index) {
      newCommentImg[index].src = user.comments[index].avatar;
      socialText[index].textContent = user.comments[index].message;
      newCommentImg[index].alt = user.comments[index].name;
    })
    // Добавляем обработчик на кнопку загрузить еще комментарии
    commentsLoader.onclick = function () {;
      // Загружаем в разметку сообщения
      window.comments.loadMessage(user);
      // Показываем данные каждого сообщения полученные с сервера
      // socialComments = document.querySelector('.social__comments');
      socialCommentsItem = socialComments.querySelectorAll('.social__comment');
      newCommentImg = socialComments.querySelectorAll('.social__picture');
      socialText = socialComments.querySelectorAll('.social__text');
      socialCommentsItem.forEach(function (item, index) {
        newCommentImg[index].src = user.comments[index].avatar;
        socialText[index].textContent = user.comments[index].message;
        newCommentImg[index].alt = user.comments[index].name;
      })
      // Показываем пользователю сколько сообщений есть к фотографии
      socialCommentCount.textContent = socialCommentsItem.length + ' из' + ' ' + user.comments.length + ' комментариев';
      // Прячем кнопку загрузки сообщения когда достигается последнее сообщение при загрузке
      if (socialCommentsItem.length === user.comments.length) {
        commentsLoader.classList.add('hidden');
      }
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

  pictureCancel.onclick = function () {
    closePicture();
  };
})();
