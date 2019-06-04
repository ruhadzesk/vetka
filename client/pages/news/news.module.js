var angular = require('angular');

newsConfig.$inject = ['$routeProvider'];
function newsConfig($routeProvider) {
  $routeProvider.when('/news/:id/', {
    controller: require('./news.controller'),
    template: require('./news.html')
  });
}
module.exports = angular
  .module('news', [])
  .config(newsConfig);
