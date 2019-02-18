/* globals __CONFIG__ */
require('./app.less');

var angular = require('angular');
var moment = require('moment');

// Angular modules
require('angular-route');
require('angular-sanitize');
require('./components/api/api.module');

require('./pages/home/home.module');

moment.locale('ru');

var app = angular.module('vetka', [
  'ngRoute',
  'ngSanitize',
  'api',
  'home'
]);

// __CONFIG__ - object from webpack
// app.constant('config', __CONFIG__);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.otherwise({redirectTo: '/'});
}]);

module.exports = app;
