var dropzone = require('dropzone');
var datepicker = require('js-datepicker');

newsFormController.$inject = ['$scope', '$location', '$routeParams', '$localStorage', 'api'];
function newsFormController($scope, $location, $routeParams, $localStorage, api) {
  $scope.send = function() {
    api.exec("core.news_add", $scope.model).then(function(result){
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
      $scope.model.date = date;
  }});

}
module.exports = newsFormController;