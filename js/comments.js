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

  function genNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  window.delMessege = function (index) {

    var time = 5;
    if (socialCommentsItem.length > time) {
      for (var i=5; i<socialCommentsItem.length; i++) {
        socialComments.remove(socialCommentsItem[i])
      }
    }

    // socialComments.remove(socialCommentsItem[0]);
  }

  // Добавляем элемент (комментарий) к большой фотографии
  window.genMessagePicture = function (profile) {
    socialCommentsItem.forEach(function (item, index) {
      newCommentImg[index].src = profile.comments[index].avatar;
      socialText[index].textContent = profile.comments[index].message;
    })
  };

  window.getMessage = function () {
    var socialComments = document.querySelector('.social__comments');
    var socialCommentsItem = socialComments.querySelectorAll('.social__comment');
    var time = 5;
    if (socialCommentsItem.length < time) {
      for (var i = 0; i < 5; i++) {
        window.genComments()
      }
    }
  }
  window.getMessage2 = function (user) {
    var bigPicture = document.querySelector('.big-picture');
    var commentsCount = bigPicture.querySelector('.social__comment-count');
    console.log(commentsCount)
    var maxMessage = 5;
    var minMessage = 1;
    var socialComments = document.querySelector('.social__comments');
    var socialCommentsItem = socialComments.querySelectorAll('.social__comment');

    if (socialCommentsItem.length < (user.comments.length - 5)) {
      for (var i = 0; i < 5; i++) {
        window.genComments()
      }
      console.log(user.comments.length)
    } else if (socialCommentsItem.length < user.comments.length) {
      for (var i = socialCommentsItem.length; i < user.comments.length; i++) {
        window.genComments()
      }
      console.log(user.comments.length)
    }
  }

  window.genComments = function (user) {
    var newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    var userImg = document.createElement('img');
    userImg.classList.add('social__picture');
    userImg.src = 'img/avatar-6.svg';
    userImg.alt = 'Tank';
    userImg.style = 'width: 35px; height: 35px';
    newComment.append(userImg);
    var newCommentText = document.createElement('p');
    newCommentText.classList.add('social__text');
    newCommentText.textContent = 'Новые комментарии';
    newComment.append(newCommentText);
    socialComments.append(newComment);
    userComment.value = '';
  };

  window.genNewComments = function () {
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
