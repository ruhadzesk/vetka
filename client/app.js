/* globals __CONFIG__ */
require('./app.less');
require('typeface-montserrat');

var angular = require('angular');
var moment = require('moment');

// Angular modules
require('angular-route');
require('angular-sanitize');
require('ngstorage');
require('./components/api/api.module');
require('dropzone');
require('./node_modules/js-datepicker');
require('./node_modules/js-datepicker/dist/datepicker.min.css');

require('./pages/home/home.module');
require('./pages/form/form.module');
require('./pages/newsForm/newsForm.module');
require('./pages/profile/profile.module');
require('./pages/news/news.module');
require('./pages/admin/admin.module');

moment.locale('ru');

var app = angular.module('vetka', [
  'ngRoute',
  'ngSanitize',
  'ngStorage',
  'api',
  'home',
  'form',
  'newsForm',
  'profile',
  'news',
  'admin'
]);

// __CONFIG__ - object from webpack
// app.constant('config', __CONFIG__);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.otherwise({redirectTo: '/'});
}]);

module.exports = app;
