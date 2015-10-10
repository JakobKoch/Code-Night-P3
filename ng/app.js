(function () {
  var app = angular.module('challenge', ['ngResource']);

  app.controller('ListController', ['$resource', function ($resource) {
    this.list = $resource('/list').query();
  }]);

})();
