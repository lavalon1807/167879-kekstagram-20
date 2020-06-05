'use strict';
(function () {
  var DESCRIPTIONS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var NAMES = ['Артем', 'Егор', 'Трактор', 'Надира', 'Толасьо', 'Вася'];

  var templePicture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var pictures = document.querySelector('.pictures');
  var massUser = [];

  function genNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function genUser(count) {
    var usersObject =
      {
        url: 'photos/' + count + '.jpg',
        avatar: 'img/avatar-' + genNumber(1, 6) + '.svg',
        description: DESCRIPTIONS[genNumber(1, 6)],
        name: NAMES[genNumber(1, 6)],
        likes: genNumber(15, 200),
        comments: genNumber(5, 180)
      };
    return usersObject;
  }

  function genMassUsers(user) {
    massUser.push(user);
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
    createFragment(drawUser(massUser[j]));
  }

  pictures.appendChild(fragment);
})();
