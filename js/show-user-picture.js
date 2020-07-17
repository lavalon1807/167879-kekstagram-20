'use strict';
(function () {
  var TAB = 'Tab';
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

  window.showUserPicture = {
    // Делаем модальное окно доступным
    modalClickTab: function (last) {
      userComment.onkeydown = function (e) {
        if (e.key === TAB && !e.shiftKey) {
          pictureCancel.focus();
        }
        return false;
      };
      pictureCancel.onkeydown = function (e) {
        if (e.key === TAB && !e.shiftKey) {
          last.focus();
        }
        return false;
      };
    },

    openPicture: function (user) {
      loadBigPicture(user);
      window.showUserPicture.modalClickTab(commentsLoader);
      bigPicture.classList.remove('hidden');
      document.addEventListener('keydown', onPressEscape);

      // Добавляем в разметку 5 требуемых сообщений
      window.comments.getMessage(user);

      // Показываем пользователю сколько сообщений есть к фотографии
      var socialCommentsItem = socialComments.querySelectorAll('.social__comment');
      socialCommentCount.textContent = socialCommentsItem.length + ' из' + ' ' + user.comments.length + ' комментариев';

      // Показываем данные каждого сообщения полученные с сервера
      var newCommentImg = socialComments.querySelectorAll('.social__picture');
      var socialText = socialComments.querySelectorAll('.social__text');

      window.comments.showLoadMessage(user, newCommentImg, socialText, socialCommentsItem);

      // Добавляем обработчик на кнопку загрузить еще комментарии
      window.comments.genLoadMessage(user, newCommentImg, socialText, socialCommentsItem);

      // Не дает прокручиваться основному экрану, пока показана большая картинка
      mainBody.classList.add('modal-open');
      userComment.focus();
    }
  };

  // Показывает большую фотографию и информацию
  var loadBigPicture = function (user) {
    imgBigPicture.src = user.url;
    likesCount.textContent = user.likes;
    commentsCount.textContent = user.comments;
    socialCaption.textContent = user.description;
  };

  function onPressEscape(evt) {
    if (userComment !== document.activeElement) {
      window.util.isEscEvent(evt, closePicture);
    }
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
