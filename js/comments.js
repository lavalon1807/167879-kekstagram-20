'use strict';
(function () {
  var userComment = document.querySelector('.social__footer-text');
  var userAvatar = document.querySelector('.social__footer');
  var userImg = userAvatar.querySelector('.social__picture');
  var socialComments = document.querySelector('.social__comments');
  var socialButtonBtn = document.querySelector('.social__footer-btn');
  var newCommentImg = socialComments.querySelectorAll('.social__picture');
  var socialCommentsItem = socialComments.querySelectorAll('.social__comment');
  var socialText = socialComments.querySelectorAll('.social__text');
  var bigPicture = document.querySelector('.big-picture');
  var commentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  window.comments = {
    getMessage: function () {
      var time = 5;
      if (socialCommentsItem.length < time) {
        for (var i = 0; i < 5; i++) {
          genNewComments()
        }
      }
    },

    loadMessage: function (user) {
      var MAX_MESSAGE = 5;
      var socialCommentsItem = socialComments.querySelectorAll('.social__comment');

      if (socialCommentsItem.length < (user.comments.length - MAX_MESSAGE)) {
        for (var i = 0; i < MAX_MESSAGE; i++) {
          genNewComments()
        }
      } else if (socialCommentsItem.length < user.comments.length) {
        for (var i = socialCommentsItem.length; i < user.comments.length; i++) {
          genNewComments()
        }
      }
    },

      // Удаляем разметку из дом - сообщения
    delMessage: function () {
      var socialCommentsItem = socialComments.querySelectorAll('.social__comment');
      for (var element of socialCommentsItem) {
        socialComments.removeChild(element);
      }
      // Показываем кнопку загрузки комментариев
      commentsLoader.classList.remove('hidden');
    }
  };

  var genNewComments = function () {
    var newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    var userImg = document.createElement('img');
    userImg.classList.add('social__picture');
    userImg.src = "img/avatar-6.svg";
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
