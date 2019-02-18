var angular = require('angular');
var _ = require('underscore');

var seqId = 0;
var pendingDefers = {};

var NOT_AUTHORIZED = -32000;

ApiService.$inject = ['$q', '$location', '$http', '$rootScope', '$interval', '$window'];
function ApiService($q, $location, $http, $rootScope, $interval,$window) {
  var URL = '/ajax';

  $rootScope.scrollTop = function() {
    $window.scrollTo(0, 0);
  };

  // Отработка начала перехода на новый скрин
  $rootScope.$on('$routeChangeStart', function() {
    $rootScope.scrollTop();
  });

  return {
    exec: function(method, params) {
      var defer = $q.defer();

      var encodedData = JSON.stringify({
        id: ++seqId,
        method: method,
        params: params
      });

      console.log('<<< POST ' + URL, encodedData);
      $http({
        method: 'POST',
        url: URL,
        data: encodedData
      }).then(
        function successCallback(response) {
          if (response.data.error) {
            console.error('>>> POST ' + URL, response.data);
            defer.reject(response.data.error);
          } else {
            console.log('>>> POST ' + URL, response.data);
            defer.resolve(response.data.result);
          }
        }
      );
      return defer.promise;
    }
  };
}

module.exports = angular.module('api', [])
  .factory('api', ApiService);
