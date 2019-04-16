require('./profile.less');

ProfileController.$inject = ['$scope', '$location', 'api', '$routeParams'];
function ProfileController($scope, $location, api, $routeParams) {
  api.exec("core.profile_get", {id: $routeParams.id}).then(function(result){
    $scope.profile = result;
  });

}
module.exports = ProfileController;
