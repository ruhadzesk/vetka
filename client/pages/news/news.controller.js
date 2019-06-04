ProfileController.$inject = ['$scope', '$location', 'api', '$routeParams', '$sce'];
function ProfileController($scope, $location, api, $routeParams, $sce) {
  api.exec("core.news_get", {id: $routeParams.id}).then(function(result){
    result.video = $sce.trustAsResourceUrl(result.video);
    $scope.news = result;
  });

}
module.exports = ProfileController;
