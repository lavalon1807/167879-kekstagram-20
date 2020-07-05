'use strict';
(function () {
  var LENGTH_PICTURE_RANDOM = 10;
  var filterForm = document.querySelector('.img-filters__form');
  var filterButton = filterForm.querySelectorAll('.img-filters__button');
  var filterRandom = filterForm.querySelector('#filter-random');
  var filterDefault = filterForm.querySelector('#filter-default');
  var filterDiscussed = filterForm.querySelector('#filter-discussed');

  filterForm.onclick = function (e) {
    var target = e.target;
    filterButton.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    target.classList.add('img-filters__button--active');
  };

  // Фильтруем массив 10 штук рандом
  var discussedPicture = function (arr) {
    var copyDis = arr.slice();

    var newPhoto = copyDis.sort(function (a, b) {
      if (a.comments > b.comments) {
        return 1;
      }
      if (a.comments < b.comments) {
        return -1;
      }
      return 0;
    });
    return newPhoto;
  };

  // второй список
  var getArrayElements = function (arr, length) {
    var resultArray = [];
    var copyRand = arr.slice();

    for (var i = 0; i < length; i++) {
      resultArray.push(copyRand.splice(Math.floor(Math.random() * copyRand.length), 1)[0]);
    }

    return resultArray;
  };

  var defaultPicture = function (arr) {
    var copyDef = arr.slice();

    return copyDef;
  };

  var genDiscussed = function () {
    genForFilter(discussedPicture(window.massPhoto));
  };

  var genRandom = function () {
    genForFilter(getArrayElements(window.massPhoto, LENGTH_PICTURE_RANDOM));
  };

  var genDefault = function () {
    genForFilter(defaultPicture(window.massPhoto));
  };

  var genForFilter = function (fn) {
    var copyArray = window.massPhoto.slice();
    window.removePictureElements();
    var newMass = fn;
    window.render(newMass);
    return copyArray;
  };

  filterDiscussed.addEventListener('click', function () {
    window.debounce(genDiscussed);
  });

  filterRandom.addEventListener('click', function () {
    window.debounce(genRandom);
  });

  filterDefault.addEventListener('click', function () {
    window.debounce(genDefault);
  });

})();
