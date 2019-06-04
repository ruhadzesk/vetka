require('./home.less');

HomeController.$inject = ['$scope', '$location', '$localStorage', 'api'];
function HomeController($scope, $location, $localStorage, api) {

  $scope.getItems = function(search) {
    if (search || $localStorage.token) $scope.intro = false;
    api.exec("core.profile_list", {
      token: $localStorage.token,
      status: $scope.mode === 'moder' ? 'new' : 'published',
      search: search || '',
    }).then(function(result){
      $scope.items = result;
    });
  };

  $scope.goToProfile = function(item) {
    $location.path('/profile/'+item.id);
  };
  $scope.goToNews = function(item) {
    $location.path('/news/'+item.id);
  };
  $scope.goToNewsForm = function() {
    $location.path('/newsForm/');
  };
  $scope.goToProfileEdit = function(item) {
    $location.path('/form/'+item.id);
  };
  $scope.setMode = function(mode) {
    $scope.mode = mode;
    $scope.getItems();
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

  $scope.types = {
    video: 'Видео',
    profile: 'Анкета',
    text: 'Эссе',
    news: 'Новость',
  };

  $scope.token = $localStorage.token;
  $scope.mode = 'default';
  $scope.search = '';
  $scope.intro = true;
  $scope.getItems();
}
module.exports = HomeController;
