require('./home.less');

HomeController.$inject = ['$scope', '$location', '$localStorage', 'api'];
function HomeController($scope, $location, $localStorage, api) {

  $scope.getItems = function(search) {
    api.exec("core.profile_list", {
      token: $localStorage.token,
      status: $localStorage.token ? 'new' : 'published',
      search: search || '',
    }).then(function(result){
      $scope.items = result;
    });
  };

  $scope.goToProfile = function(item) {
    $location.path('/profile/'+item.id);
  };

  $scope.goToProfileEdit = function(item) {
    $location.path('/form/'+item.id);
  };

  $scope.removeItem = function(item) {
    if (confirm("Удалить анкету?")){
      api.exec("core.profile_delete", {
        token: $localStorage.token,
        id: item.id
      }).then($scope.getItems);
    }
  };

  $scope.join = function() {
    $location.path('/form');
  };

  $scope.goAdmin = function() {
    $location.path('/admin');
  };

  $scope.logout = function() {
    $localStorage.token = null;
    $scope.token = $localStorage.token;
     $scope.getItems();
  };

  $scope.token = $localStorage.token;
  $scope.search = '';
  $scope.getItems();
}
module.exports = HomeController;
