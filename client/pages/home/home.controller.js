require('./home.less');

HomeController.$inject = ['$scope', '$location', 'api'];
function HomeController($scope, $location, api) {
  console.log("INIT HOME");
  $scope.exec = function() {
    api.exec("core.login", {id: 2});
  };
}
module.exports = HomeController;
