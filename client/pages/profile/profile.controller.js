require('./profile.less');

ProfileController.$inject = ['$scope', '$location', 'api', '$routeParams', '$sce'];
function ProfileController($scope, $location, api, $routeParams, $sce) {
  api.exec("core.profile_get", {id: $routeParams.id}).then(function(result){
    $scope.profile = result;
    $scope.profile.video = $sce.trustAsResourceUrl( $scope.profile.video);
  });

  $scope.conditionsView = [
    {field: 'laws', name: 'участвовать в создании законов общей школьной жизни, в решении важных для всего школьного сообщества вопросов, в том числе связанных с учебным процессом;'},
    {field: 'humanity', name:'получить опыт уважения человеческого достоинства и принятия другого человека таким, каков он есть;'},
    {field: 'moral', name:'возможность глубокого и неформального обсуждения мировоззренческих взглядов, этических проблем, нравственных ценностей;'},
    {field: 'freedom', name:'возможность свободно высказывать свою точку зрения;'},
    {field: 'choise', name:'получить опыт разнообразного выбора, понимания про себя, свои особенности, интересы;'},
    {field: 'initiative', name:'возможность проявлять и реализовывать инициативы;'},
  ];
  $scope.competitionsView = [
    {field: 'responsibility', name: 'ответственность, готовность принять риск на себя'},
    {field: 'perseverance', name:'настойчивость в достижении цели'},
    {field: 'creativity', name:'креативность'},
    {field: 'openness', name:'открытость'},
    {field: 'independence', name:'самостоятельность'},
    {field: 'prioritization', name:'умение расставлять приоритеты'},
    {field: 'communicativeness', name:'коммуникативные способности'},
    {field: 'analitial', name: 'аналитические способности'},
    {field: 'teamwork', name:'умение работать в команде'},
    {field: 'leadership', name:'лидерские качества'},
    {field: 'design', name:'проектное мышление'},
    {field: 'reflexivity', name:'рефлексивность'},
  ];
  $scope.spacesViewLong = [
    {field: 'masters', name:'трудовая деятельность (трудовые мастерские, работа в школьном кафе, в рубке, школьном издательстве)'},
    {field: 'clubs', name:'клубы (дискуссионный, авторской песни, киноклуб, турклуб)'},
    {field: 'constitution', name:'школьная конституция и органы самоуправления (Общий сбор ,Совет школы, Суд чести)'},
    {field: 'charity', name:'благотворительные и патриотические проекты  (ярмарки, поисковый отряд, «Дети — узники второй мировой войны»)'},
    {field: 'self_assessment', name:'различные формы критериального и самооценивания'}
  ];
  $scope.spacesViewShort = [
    {field: 'atmosphere', name:'стиль взаимоотношений, школьная атмосфера'},
    {field: 'projects', name:'индивидуальные проекты, творческие экзамены '},
    {field: 'planning', name:'различные формы обсуждения и планирования общей жизни'},
    {field: 'expeditions', name:'экспедиции (Херсонес, Хоста, Белое море, биостанции)'},
    {field: 'deepenig', name:'предметные и межпредметные погружения'},
    {field: 'historic_games', name:'исторические и интеллектуальные игры'},
    {field: 'museems', name:'создание школьных музеев и выставок'},
    {field: 'sports', name:'спортивные секции и соревнования'},
    {field: 'mass_media', name:'школьные СМИ '},
    {field: 'internships', name:'профессиональные стажировки'},
    {field: 'lyceum', name:'Лицей'},
    {field: 'celebration', name:'общешкольные праздники'},
    {field: 'theater', name:'школьный театр'},
    {field: 'summer_school', name:'летняя  школа'},
    {field: 'hike', name:'походы, турслеты'},
    {field: 'capms', name:'школьные лагеря'},
    {field: 'trips', name:'поездки'},
    {field: 'business_game', name:'деловая игра'},
  ];
}
module.exports = ProfileController;
