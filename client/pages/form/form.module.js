var angular = require('angular');

formConfig.$inject = ['$routeProvider'];
function formConfig($routeProvider) {
  $routeProvider.when('/form', {
    controller: require('./form.controller'),
    template: require('./form.html')
  });
}
module.exports = angular
  .module('form', [])
  .config(formConfig);
