require('./home.less');

HomeController.$inject = ['$scope', '$location', 'api'];
function HomeController($scope, $location, api) {
  $scope.getItems = function() {
    api.exec("core.person_list", {status: 'approved'}).then(function(result){
      $scope.items = result;
    });
  };

  $scope.getItems();
  // $scope.list = function() {
  //   api.exec("core.person_list", {status: 'approved'});
  // };
  // $scope.add = function() {
  //   api.exec("core.person_add", {
  //     id: 1,
  //     name: '1',
  //     change_name: true,
  //     graduated: new Date(),
  //     status: 'approved'
  //   });
  // };
}
module.exports = HomeController;
