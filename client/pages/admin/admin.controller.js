require('./admin.less');

AdminController.$inject = ['$scope', '$location', '$localStorage', 'api'];
function AdminController($scope, $location, $localStorage, api) {

  $scope.login = function() {
    $scope.error = false;
    api.exec("core.login", {
      user: $scope.user,
      password: $scope.password
    }).then(function(result){
      if (result && result.token) {
        $localStorage.token = result.token;
        $location.path('/');
      } else {
        $scope.error = true;
      }
    });
  };
  $scope.error = false;

}
module.exports = AdminController;
