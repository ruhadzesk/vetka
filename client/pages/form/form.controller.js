require('./form.less');

FormController.$inject = ['$scope', '$location', 'api'];
function FormController($scope, $location, api) {
  $scope.send = function() {
    api.exec("core.person_add", $scope.model).then(function(result){
      $location.path('/');
    });
  };

  $scope.model= {};
}
module.exports = FormController;
