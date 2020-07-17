'use strict';
(function () {
  window.massPhoto = [];

  var successHandler = function (data) {
    window.massPhoto = data;
    window.render(data);
    var filterForm = document.querySelector('.img-filters__form');
    // Показывает фильтры только после загрузки всех фотографий
    filterForm.classList.remove('hidden');
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
