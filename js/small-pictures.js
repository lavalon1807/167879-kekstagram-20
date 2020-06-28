'use strict';
(function () {
  var pictures = document.querySelector('.pictures');
  var templePicture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  function drawUser(user) {
    var usersElement = templePicture.cloneNode(true);

    usersElement.querySelector('.picture__img').src = user.url;
    usersElement.querySelector('.picture__likes').textContent = user.likes;
    usersElement.querySelector('.picture__comments').textContent = user.comments.length;

    usersElement.addEventListener('click', function () {
      window.comments.delMessage();
      window.openPicture(user);
    });

    return usersElement;
  }

  var fragment = document.createDocumentFragment();

  var createFragment = function (frag) {
    fragment.appendChild((frag));
  };

  var successHandler = function (photos) {
    for (var j = 0; j < photos.length; j++) {
      createFragment(drawUser(photos[j]));
    }
    pictures.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);
})();
