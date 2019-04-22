var angular = require('angular');

adminConfig.$inject = ['$routeProvider'];
function adminConfig($routeProvider) {
  $routeProvider.when('/admin', {
    controller: require('./admin.controller'),
    template: require('./admin.html')
  });
}
module.exports = angular
  .module('admin', [])
  .config(adminConfig);
