require('./form.less');

var dropzone = require('dropzone');

FormController.$inject = ['$scope', '$location', '$routeParams', '$localStorage', 'api'];
function FormController($scope, $location, $routeParams, $localStorage, api) {
  $scope.send = function() {
    api.exec("core.profile_add", $scope.model).then(function(result){
      $location.path('/');
    });
  };

  $scope.valid = function() {
    return $scope.model.name &&
    $scope.model.graduated &&
    $scope.model.profession &&
    $scope.model.university &&
    $scope.model.confirm;
  };

  $scope.publish = function() {
    $scope.model.token = $localStorage.token;
    api.exec("core.profile_publish", $scope.model).then(function(result){
      $location.path('/');
    });
  };
  $scope.model= {
    name: '',
    name_changed: false,
    name_old: '',
    graduated: '',
    profession: '',
    university: '',
    children: false,
    children_study: '',
    children_other: '',
    contacts: '',
    phone: '',
    email: '',
    confirm: false,
    photo: '',
    type: 'profile',
    //video
    confirm_email: '',
    //text
    text_name: '',
    profile_text:'',
    // profile
    //step1
    conditions: {
      laws: false,
      humanity: false,
      moral: false,
      freedom: false,
      choise: false,
      initiative: false,
      other_checked: false,
      other: ''
    },
    competitions: {
      responsibility: false,
      perseverance: false,
      creativity: false,
      openness: false,
      independence: false,
      prioritization: false,
      communicativeness: false,
      analitial: false,
      teamwork: false,
      leadership: false,
      design: false,
      reflexivity: false,
      other_checked: false,
      other: ''
    },
    most_needed_quality: '',
    spaces: {
      masters: false,
      clubs: false,
      constitution: false,
      charity: false,
      self_assessment: false,
      atmosphere: false,
      projects: false,
      planning: false,
      expeditions: false,
      deepenig: false,
      historic_games: false,
      museems: false,
      sports: false,
      mass_media: false,
      internships: false,
      lyceum: false,
      celebration: false,
      theater: false,
      summer_school: false,
      hike: false,
      capms: false,
      trips: false,
      business_game: false,
      other_checked: false,
      other: ''
    },
    deficiencies: '',
    teachers: '',
    profession_choose: '',
    //step2
    study_after_school: '',
    university_for_admission: '',
    change_profession: '',
    change_university: '',
    profession_quality: '',
    university_quality: '',
    profession_interests: '',
    profession_education_points: '',
    high_school_graduate: '',
    schoolmates: '',
    school_alteatives: '',
    students_help: {
        conference: false,
        internship: false,
        master_class_checked: false,
        master_class: '',
        lyceum: false,
        lecture: false,
        other_checked: false,
        other: ''
    }
  };
  if ($routeParams.id) {
    api.exec("core.profile_get", {id: $routeParams.id}).then(function(result){
      $scope.model = result;
    });
  }
  // } else {
  //   $scope.model= {
  //     name: 'Иванов Иван Иванович',
  //     name_changed: true,
  //     name_old: 'Петров',
  //     graduated: 1999,
  //     profession: 'Инженер',
  //     university: 'МГУ',
  //     children: true,
  //     children_study: 'other',
  //     children_other: 'Придурки',
  //     contacts: 'teachers',
  //     phone: '89160131977',
  //     email: 'asd@gmail.com',
  //     confirm: true,
  //     photo: '',
  //     type: 'profile',
  //     //video
  //     confirm_email: '',
  //     //text
  //     text_name: '',
  //     text: '',
  //     // profile
  //     //step1
  //     conditions: {
  //       laws: true,
  //       humanity: true,
  //       moral: true,
  //       freedom: true,
  //       choise: true,
  //       initiative: true,
  //       other_checked: true,
  //       other: 'condition 1'
  //     },
  //     competitions: {
  //       responsibility: true,
  //       perseverance: true,
  //       creativity: true,
  //       openness: true,
  //       independence: true,
  //       prioritization: true,
  //       communicativeness: true,
  //       analitial: true,
  //       teamwork: true,
  //       leadership: true,
  //       design: true,
  //       reflexivity: true,
  //       other_checked: true,
  //       other: 'competition 1'
  //     },
  //     most_needed_quality: 'most_needed_quality',
  //     spaces: {
  //       masters: true,
  //       clubs: true,
  //       constitution: true,
  //       charity: true,
  //       self_assessment: true,
  //       atmosphere: true,
  //       projects: true,
  //       planning: true,
  //       expeditions: true,
  //       deepenig: true,
  //       historic_games: true,
  //       museems: true,
  //       sports: true,
  //       mass_media: true,
  //       internships: true,
  //       lyceum: true,
  //       celebration: true,
  //       theater: true,
  //       summer_school: true,
  //       hike: true,
  //       capms: true,
  //       trips: true,
  //       business_game: true,
  //       other_checked: true,
  //       other: 'spaces 1'
  //     },
  //     deficiencies: 'deficiencies',
  //     teachers: 'teachers',
  //     profession_choose: 'profession_choose',
  //     //step2
  //     study_after_school: 'study_after_school',
  //     university_for_admission: 'university_for_admission',
  //     change_profession: 'change_profession',
  //     change_university: 'change_university',
  //     profession_quality: 'profession_quality',
  //     university_quality: 'university_quality',
  //     profession_interests: 'profession_interests',
  //     profession_education_points: 'profession_education_points',
  //     high_school_graduate: 'high_school_graduate',
  //     schoolmates: 'schoolmates',
  //     school_alteatives: 'school_alteatives',
  //     students_help: {
  //         conference: true,
  //         internship: true,
  //         master_class_checked: true,
  //         master_class: 'master_class',
  //         lyceum: true,
  //         lecture: true,
  //         other_checked: true,
  //         other: 'students_help'
  //     }
  //   };
  // }

  $scope.conditionsView = [
    {field: 'laws', name: 'участвовать в создании законов общей школьной жизни, в решении важных для всего школьного сообщества вопросов, в том числе связанных с учебным процессом;'},
    {field: 'humanity', name:'получить опыт уважения человеческого достоинства и принятия другого человека таким, каков он есть;'},
    {field: 'moral', name:'возможность глубокого и неформального обсуждения мировоззренческих взглядов, этических проблем, нравственных ценностей;'},
    {field: 'freedom', name:'возможность свободно высказывать свою точку зрения;'},
    {field: 'choise', name:'получить опыт разнообразного выбора, понимания про себя, свои особенности, интересы;'},
    {field: 'initiative', name:'возможность проявлять и реализовывать инициативы;'},
    {field: 'other_checked', name:'другое'}
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
    {field: 'other_checked', name:'другое'},
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
    {field: 'other_checked', name:'другое'},
  ];
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
  $scope.token = $localStorage.token;
  $scope.step = 1;
  $scope.next = function() {
    $scope.step = 2;
  };
  $scope.prev = function() {
    $scope.step = 1;
  };
}
module.exports = FormController;