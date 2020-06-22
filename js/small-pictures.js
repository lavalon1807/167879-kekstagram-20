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
      window.openPicture(user);
      loadBigPicture(user);
    })

    return usersElement;
  }

  var fragment = document.createDocumentFragment();

  var createFragment = function (frag) {
    fragment.appendChild((frag));
  };

  window.load(function (photos) {
    for (var j = 0; j < photos.length; j++) {
      createFragment(drawUser(photos[j]));
    }
    pictures.appendChild(fragment);
  })
})();
