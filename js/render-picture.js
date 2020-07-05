'use strict';
(function () {
  var pictures = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
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

  imgFilters.classList.remove('img-filters--inactive');

  window.render = function (photos) {
    var takeNumber = photos.length > 25 ? 25 : photos.length;
    for (var j = 0; j < takeNumber; j++) {
      createFragment(drawUser(photos[j]));
    }
    pictures.appendChild(fragment);
    imgFilters.classList.remove('img-filters--inactive');
  };

  window.removePictureElements = function () {
    var allPicture = pictures.querySelectorAll('.picture');

    allPicture.forEach(function (it) {
      pictures.removeChild(it);
    });
  };
})();
