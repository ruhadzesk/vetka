var angular = require('angular');

homeConfig.$inject = ['$routeProvider'];
function homeConfig($routeProvider) {
  $routeProvider.when('/', {
    controller: require('./home.controller'),
    template: require('./home.html')
  });
}
module.exports = angular
  .module('home', [])
  .config(homeConfig);
