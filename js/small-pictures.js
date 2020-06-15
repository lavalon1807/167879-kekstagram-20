'use strict';
(function () {
  var pictures = document.querySelector('.pictures');
  var templePicture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  window.massUser = [];

  function genNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function genUser(count) {
    var usersObject =
      {
        url: 'photos/' + count + '.jpg',
        avatar: 'img/avatar-' + genNumber(1, 6) + '.svg',
        description: window.constants.DESCRIPTIONS[genNumber(1, 6)],
        name: window.constants.NAMES[genNumber(1, 6)],
        likes: genNumber(15, 200),
        comments: genNumber(5, 180)
      };
    return usersObject;
  }

  function genMassUsers(getuser) {
    window.massUser.push(getuser);
  }

  function drawUser(user) {
    var usersElement = templePicture.cloneNode(true);

    usersElement.querySelector('.picture__img').src = user.url;
    usersElement.querySelector('.picture__likes').textContent = user.likes;
    usersElement.querySelector('.picture__comments').textContent = user.comments;

    return usersElement;
  }

  var fragment = document.createDocumentFragment();

  var createFragment = function (frag) {
    fragment.appendChild((frag));
  };

  for (var i = 1; i <= 25; i++) {
    genMassUsers(genUser(i));
  }

  for (var j = 0; j < 25; j++) {
    createFragment(drawUser(window.massUser[j]));
  }

  pictures.appendChild(fragment);
})();
