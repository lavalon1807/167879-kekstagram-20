'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var lastTimeout;
  window.debounce = function (cd) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cd, DEBOUNCE_INTERVAL);
  };
})();
