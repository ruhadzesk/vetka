var angular = require('angular');

profileConfig.$inject = ['$routeProvider'];
function profileConfig($routeProvider) {
  $routeProvider.when('/profile/:id/', {
    controller: require('./profile.controller'),
    template: require('./profile.html')
  });
}
module.exports = angular
  .module('profile', [])
  .config(profileConfig);
