var angular = require('angular');

formConfig.$inject = ['$routeProvider'];
function formConfig($routeProvider) {
  $routeProvider.when('/form/:id/', {
    controller: require('./form.controller'),
    template: require('./form.html')
  });
  $routeProvider.when('/form/', {
    controller: require('./form.controller'),
    template: require('./form.html')
  });
}
module.exports = angular
  .module('form', [])
  .config(formConfig);
