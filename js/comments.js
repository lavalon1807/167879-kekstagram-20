'use strict';
(function () {
  var userComment = document.querySelector('.social__footer-text');
  var socialComments = document.querySelector('.social__comments');
  var socialButtonBtn = document.querySelector('.social__footer-btn');
  var commentsLoader = document.querySelector('.comments-loader');

  window.comments = {
    getMessage: function (user) {
      var time = 5;
      if (user.comments.length < time) {
        for (var i = 0; i < user.comments.length; i++) {
          genNewComments();
          window.showUserPicture.modalClickTab(userComment);
          commentsLoader.classList.add('hidden');
        }
      } else if (user.comments.length > time) {
        for (var g = 0; g < 5; g++) {
          genNewComments();
        }
      }
    },

    loadMessage: function (user) {
      var MAX_MESSAGE = 5;
      var socialCommentItems = socialComments.querySelectorAll('.social__comment');

      if (socialCommentItems.length < (user.comments.length - MAX_MESSAGE)) {
        for (var i = 0; i < MAX_MESSAGE; i++) {
          genNewComments();
        }
      } else if (socialCommentItems.length < user.comments.length) {
        for (var j = socialCommentItems.length; j < user.comments.length; j++) {
          genNewComments();
        }
      }
    },
    // Показываем данные каждого сообщения полученные с сервера
    showLoadMessage: function (user, comment, text, item) {
      item.forEach(function (it, index) {
        comment[index].src = user.comments[index].avatar;
        text[index].textContent = user.comments[index].message;
        comment[index].alt = user.comments[index].name;
      });
    },
    // Добавляем обработчик на кнопку загрузить еще комментарии
    genLoadMessage: function (user, comment, text, item) {
      commentsLoader.onclick = function () {
        // Загружаем в разметку сообщения
        window.comments.loadMessage(user);
        // Показываем данные каждого сообщения полученные с сервера
        item = socialComments.querySelectorAll('.social__comment');
        comment = socialComments.querySelectorAll('.social__picture');
        text = socialComments.querySelectorAll('.social__text');
        window.comments.showLoadMessage(user, comment, text, item);
        // Показываем пользователю сколько сообщений есть к фотографии
        comment.textContent = item.length + ' из' + ' ' + user.comments.length + ' комментариев';
        // Прячем кнопку загрузки сообщения когда достигается последнее сообщение при загрузке
        if (item.length === user.comments.length) {
          commentsLoader.classList.add('hidden');
          window.showUserPicture.modalClickTab(userComment);
        }
      };
    },
    // Удаляем разметку из дом - сообщения
    delMessage: function () {
      var socialCommentItem = socialComments.querySelectorAll('.social__comment');
      socialCommentItem.forEach(function (item) {
        socialComments.removeChild(item);
      });

      // Показываем кнопку загрузки комментариев
      commentsLoader.classList.remove('hidden');
    }
  };

  var genNewComments = function () {
    var newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    var userImg = document.createElement('img');
    userImg.classList.add('social__picture');
    userImg.src = 'img/avatar-6.svg';
    userImg.alt = 'Танк';
    userImg.style = 'width: 35px; height: 35px';
    newComment.append(userImg);
    var newCommentText = document.createElement('p');
    newCommentText.classList.add('social__text');
    newCommentText.textContent = userComment.value;
    newComment.append(newCommentText);
    socialComments.append(newComment);
    userComment.value = '';
  };

  // Отправляет коментарий пользователя
  socialButtonBtn.onclick = function (evt) {
    evt.preventDefault();
    if (userComment.value !== '') {
      genNewComments();
    }
  };

  userComment.addEventListener('keydown', function (evt) {
    if (userComment.value !== '') {
      window.util.isEnterEvent(evt, genNewComments);
    }
  });
})();
