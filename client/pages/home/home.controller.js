require('./home.less');

HomeController.$inject = ['$scope', '$location', 'api'];
function HomeController($scope, $location, api) {

  $scope.getItems = function() {
    api.exec("core.profile_list", {status: 'approved'}).then(function(result){
      $scope.items = result;
    });
  };
  $scope.goToProfile = function(item) {
    $location.path('/profile/'+item.id);
  };
  $scope.join = function() {
    $location.path('/form');
  };

  $scope.getItems();
}
module.exports = HomeController;
