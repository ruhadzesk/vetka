var dropzone = require('dropzone');
var datepicker = require('js-datepicker');

newsFormController.$inject = ['$scope', '$location', '$routeParams', '$localStorage', 'api'];
function newsFormController($scope, $location, $routeParams, $localStorage, api) {
  $scope.send = function() {
    var method = ($scope.model.id) ? "core.news_edit" : "core.news_add";
    $scope.model.token = $localStorage.token;
    api.exec(method, $scope.model).then(function(result){
      $location.path('/');
    });
  };

  $scope.model = {
    photo: '',
    date: '',
    time: '',
    place: '',
    header: '',
    content: '',
    video: '',
    src: [],
  };

  if ($routeParams.id) {
    api.exec("core.news_get", {id: $routeParams.id}).then(function(result){
      $scope.model = result;
    });
  }

  $scope.src = {
    link: '',
    name: ''
  };

  $scope.addSrc = function() {
    $scope.model.src.push(angular.copy($scope.src));
  };

  $scope.addSrc();

  var myDropzone = new dropzone("#avatar", {
    url: "/upload/",
    maxFilesize: 0.5,
    success: function(file, res) {
      $scope.model.photo = res.filename;
      $scope.$apply();
    },
    renameFile: function (file) {
      let newName = new Date().getTime() + '_' + file.name;
      return newName;
    },
    dictDefaultMessage: 'asd',
    previewTemplate: '<div class="dz-error-message"><span data-dz-errormessage></span></div>'
  });

  const picker = datepicker('#date', {
    onSelect: function(instance, date) {
      $scope.model.date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
      $scope.$apply();
  }});

}
module.exports = newsFormController;