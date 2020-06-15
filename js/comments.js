'use strict';
(function () {
  var userComment = document.querySelector('.social__footer-text');
  var socialCommentsss = document.querySelector('.social__comments');
  var socialButtonBtn = document.querySelector('.social__footer-btn');

  function genNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  // Добавляем элемент (комментарий) к большой фотографии
  var genNewComments = function () {
    var newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    var newCommentImg = document.createElement('img');
    newCommentImg.classList.add('social__picture');
    newCommentImg.src = window.massUser[genNumber(1, 6)].avatar;
    newCommentImg.alt = window.massUser[0].name;
    newCommentImg.style = 'width: 35px; height: 35px';
    newComment.append(newCommentImg);
    var newCommentText = document.createElement('p');
    newCommentText.classList.add('social__text');
    newCommentText.textContent = userComment.value;
    newComment.append(newCommentText);
    socialCommentsss.append(newComment);
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
