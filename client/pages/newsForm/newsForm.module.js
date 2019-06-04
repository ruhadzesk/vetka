var angular = require('angular');

newsFormConfig.$inject = ['$routeProvider'];
function newsFormConfig($routeProvider) {
  $routeProvider.when('/newsForm/', {
    controller: require('./newsForm.controller'),
    template: require('./newsForm.html')
  });
}
module.exports = angular
  .module('newsForm', [])
  .config(newsFormConfig);
