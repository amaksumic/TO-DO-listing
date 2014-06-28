var routerApp = angular.module('routerApp', ['ui.router']).
    service('AuthService', [function () {
        var userIsAuthenticated = false;

        this.setUserAuthenticated = function (value) {
            userIsAuthenticated = value;
        };

        this.getUserAuthenticated = function () {
            return userIsAuthenticated;
        };


    }]);




var odabraniBoard = 1;
var odabraniList = 1;
var odabraniTask = 1;
var changed = 0;
var usernamezapretragu;


routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/pocetna');

    $stateProvider

        // PRIJAVA I ODJAVA
        .state('prijava', {
            url: '/prijava',
            templateUrl: 'login.html'
        })
        .state('pocetna', {
            url: '/pocetna',
            templateUrl: 'home.html'
        })
        .state('registracija', {
            url: '/registracija',
            templateUrl: 'registracija.html'
        })
        // nested list with custom controller
        .state('pocetna.nije', {
            url: '/nije',
            templateUrl: 'nije.html'
        })
        .state('pocetna.korisnik', {
            url: '/korisnik',
            templateUrl: 'korisnik.html'
        })
        .state('pocetna.board', {
            url: '/board',
            templateUrl: 'board.html'
        })
        .state('pocetna.task', {
            url: '/task',
            templateUrl: 'task.html'
        })
        .state('pocetna.profil', {
            url: '/profil',
            templateUrl: 'profil.html'
        })
        .state('pocetna.pregled', {
            url: '/pregled/:id',
            templateUrl: 'pregled.html',
            controller: 'ViewBoard'
        })

        .state('pocetna.boards', {
            url: '/boards',
            templateUrl: 'board.html'
        })

        .state('pocetna.calendar', {
            url: '/calendar',
            templateUrl: 'nije.html'
        })
        .state('pocetna.assignments', {
            url: '/assignments',
            templateUrl: 'assignments.html'
        })
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'prijava.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': {
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }
            }

        });

}).run(['$rootScope', 'AuthService', '$location', function ($rootScope, AuthService, $location) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        // Everytime the route in our app changes check auth status
        if (AuthService.getUserAuthenticated() == false) {
            // if you're logged out send to login page.
            $location.path('/registracija');
            event.preventDefault();
        }
    });
}]);

routerApp.controller('scotchController', function ($scope) {

    $scope.message = 'test';

    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];

}).controller("MyController", function ($scope, $http) {
    $scope.myForm = {};


    $scope.myForm.submitTheForm = function (item, event) {
        console.log("--> Submitting form");
        var dataObject = {
            name: $scope.myForm.name
           , car: $scope.myForm.car
        };


        var responsePromise = $http.get('api/TaskApi/GetTasksByCreator?id=' + dataObject.name, {});
        responsePromise.success(function (data) {
            //  console.log(dataFromServer.title
            $scope.task = data;

        });
        responsePromise.error(function (data, status, headers, config) {
            alert("Submitting form failed!");
        });
    }

})

   .controller("Pretraga", function ($scope, $http) {

       $scope.pretragaKorisnika = {};

       $scope.pretragaKorisnika.submitTheForm = function (item, event) {
           console.log("--> Submitting form");


           var dataObject = {
               username: $scope.pretragaKorisnika.username
           };

           // $scope.performPostcodeLookup = function () {
           //   var url = "http://api/UserApi/GetUserByUsername?" +
           //    "username=" + $scope.pretragaKorisnika.username;

           var responsePromise = $http.get("api/UserApi/GetUserByUsername?username=" + dataObject.username, {});

           responsePromise.success(function (data) {
               $scope.user = data;
           });


           responsePromise.error(function (data, status, headers, config) {
               alert("Submitting form failed!");
           });
       }

   })

           .controller("Pretraga", function ($scope, $http) {

               $scope.pretragaKorisnika = {};

               $scope.pretragaKorisnika.submitTheForm = function (item, event) {
                   console.log("--> Submitting form");


                   var dataObject = {
                       username: $scope.pretragaKorisnika.username
                   };

                   // $scope.performPostcodeLookup = function () {
                   //   var url = "http://api/UserApi/GetUserByUsername?" +
                   //    "username=" + $scope.pretragaKorisnika.username;

                   var responsePromise = $http.get("api/UserApi/GetUserByUsername?username=" + dataObject.username, {});

                   responsePromise.success(function (data) {
                       $scope.user = data;
                   });


                   responsePromise.error(function (data, status, headers, config) {
                       alert("Submitting form failed!");
                   });
               }

           })

           .controller("PretragaEmail", function ($scope, $http) {

               $scope.pretragaKorisnika2 = {};

               $scope.pretragaKorisnika2.submitTheForm = function (item, event) {
                   console.log("--> Submitting form");


                   var dataObject = {
                       email: $scope.pretragaKorisnika2.email
                   };

                   var responsePromise = $http.get("api/UserApi/GetUserByEmail?email=" + dataObject.email, {});

                   responsePromise.success(function (data) {
                       $scope.user = data;
                   });


                   responsePromise.error(function (data, status, headers, config) {
                       alert("Submitting form failed!");
                   });
               }

           }).controller("UpdatePassword", function ($scope, $http) {

               $scope.updatePassword = {};

               $scope.updatePassword.submitTheForm = function (item, event) {
                   console.log("--> Submitting form");


                   var dataObject = {
                       novi: $scope.updatePassword.novi,
                       repeate: $scope.updatePassword.repeate
                   };

                   var responsePromise = $http.get("api/UserApi/UpdatePassword?id=1" + /*dataObject.id + */ "&novi=" + dataObject.novi + "&repeate=" + dataObject.repeate, {});

                   responsePromise.success(function (data) {
                       $scope.user = data;
                   });


                   responsePromise.error(function (data, status, headers, config) {
                       alert("Submitting form failed!");
                   });

               }
           }).controller("UpdateEmail", function ($scope, $http) {

               $scope.updateEmail = {};

               $scope.updateEmail.submitTheForm = function (item, event) {
                   console.log("--> Submitting form");


                   var dataObject = {
                       email: $scope.updateEmail.email
                   };

                   var responsePromise = $http.get("api/UserApi/UpdateEmail?id=1" + /*dataObject.id + */  "&noviemail=" + dataObject.email, {});

                   responsePromise.success(function (data) {
                       $scope.user = data;
                   });


                   responsePromise.error(function (data, status, headers, config) {
                       alert("Submitting form failed!");
                   });
               }

           }).controller("BrisanjeKorisnika", function ($scope, $http, $window) {

               $scope.brisanjeKorisnika = {};

               $scope.idUsera = 0;
               var responsePromise = $http.get('api/UserApi/GetId?username=' + $window.sessionStorage.token);

               responsePromise.success(function (data) {
                   $scope.idUsera = data;
               });

               $scope.brisanjeKorisnika.submitTheForm = function () {
                   console.log("--> Submitting form");


                   var responsePromise = $http.get("api/UserApi/Deleteuser?id=" + $scope.idUsera, {});

                   responsePromise.success(function (data) {
                       $scope.user = data;
                       window.location = 'index.html#/prijava';
                       window.location.reload();
                   });


                   responsePromise.error(function (data, status, headers, config) {
                       alert("Submitting form failed!");
                   });
               }

           }).controller("UpdateUsername", function ($scope, $http) {

               $scope.updateUsername = {};

               $scope.updateUsername.submitTheForm = function (item, event) {
                   console.log("--> Submitting form");


                   var dataObject = {
                       novi: $scope.updateUsername.username
                   };

                   var responsePromise = $http.get("api/UserApi/UpdateUsername?id=1" + /*dataObject.id + */  "&novi=" + dataObject.novi, {});

                   responsePromise.success(function (data) {
                       $scope.user = data;
                   });


                   responsePromise.error(function (data, status, headers, config) {
                       alert("Submitting form failed!");
                   });
               }

           }).controller("Login", function ($scope, $http, $window, $locale) {

               $scope.login = {};

               $scope.login.submitTheForm = function (item, event) {
                   console.log("--> Submitting form");


                   var dataObject = {
                       user: $scope.login.name,
                       pass: $scope.login.pass
                   };

                   var responsePromise = $http.get("api/UserApi/Login?username=" + dataObject.user + "&pass=" + dataObject.pass, {});
                   $window.sessionStorage.jezik = "en-us";
                   responsePromise.success(function (data) {
                       if (data != "null") {
                           $scope.user = data;
                           usernamezapretragu = $scope.login.name;
                           $window.sessionStorage.token = data.username;

                           if ($scope.login.language == "english") {
                               $scope.login.jezik = "Scripts/i18n/angular-locale_en-us.js";
                               $locale.id = "en-us";
                               $window.sessionStorage.jezik = "en-us";
                           }
                           else if ($scope.login.language == "bosanski") {
                               $scope.login.jezik = "Scripts/i18n/angular-locale_en-vg.js";
                               $locale.id = "en-vg";
                               $window.sessionStorage.jezik = "en-vg";
                           }
                           else if ($scope.login.language == "japan") {
                               $scope.login.jezik = "Scripts/i18n/angular-locale_ja-jp.js";
                               $locale.id = "ja-jp";
                               $window.sessionStorage.jezik = "ja-jp";
                           }

                           $window.sessionStorage.idu = data.idUser;
                           window.location = 'index.html#/pocetna/boards';

                           usernamezapretragu = $scope.login.name;
                           AuthService.setUserAuthenticated(true);
                           //location.path = '/home';
                       }
                       else {
                           alert("Wrong username or password!");
                           window.location = 'index.html#/prijava';
                       }
                   });

                   responsePromise.error(function (data, status, headers, config) {
                       alert("Submitting form failed!");
                       window.location = 'index.html#/prijava';
                   });
               }

           }).controller("odjava", function ($scope, $window) {
               $scope.odjava = function () {
                   $window.sessionStorage.token = "";
                   $scope.username2 = "";
                   $scope.username3 = "";

                   window.location = 'index.html#/prijava';
               };

           }).controller("AddUser", function ($scope, $http, $window) {

               $scope.addUser = {};

               $scope.addUser.submitTheForm = function (item, event) {
                   console.log("--> Submitting form");
                   console.log(username2);

                   var dataObject = {
                       username: $scope.addUser.username

                   };
                   //console.log(dataObject.username);
                   var responsePromise = $http.get('api/BoardMembersAPI/UserToBoard?username=' + dataObject.username + '&id=' + username2, {});

                   responsePromise.success(function (data) {
                       $window.location.reload();

                   });

                   responsePromise.error(function (data, status, headers, config) {
                       alert("Submitting form failed!");
                       console.log(username2);
                       //window.location = 'index.html#/prijava';
                   });
               }
           }).controller("Registracija", function ($scope, $http, $window) {

               $scope.userForm = {};
               // function to submit the form after all validation has occurred			
               $scope.submitForm = function () {

                   // check to make sure the form is completely valid
                   if ($scope.userForm.$valid) {
                       console.log("--> Submitting form");


                       var dataObject = {
                           user: $scope.user.name,
                           pass: $scope.user.username,
                           email: $scope.user.email
                       };
                       $window.sessionStorage.jezik = "en-us";

                       var responsePromise = $http.get("api/UserApi/Registration?username=" + dataObject.user + "&pass=" + dataObject.pass + "&email=" + dataObject.email, {});

                       responsePromise.success(function (data) {
                           $scope.user = data;

                           usernamezapretragu = $scope.login.name;

                           window.location = 'index.html#/pocetna/boards';
                           $window.sessionStorage.token = data.username;
                           $window.sessionStorage.idu = data.idUser;


                           usernamezapretragu = $scope.login.name;
                           if ($scope.login.language == "english") {
                               $scope.login.jezik = "Scripts/i18n/angular-locale_en-us.js";
                               $locale.id = "en-us";
                               $window.sessionStorage.jezik = "en-us";
                           }
                           else if ($scope.login.language == "bosanski") {
                               $scope.login.jezik = "Scripts/i18n/angular-locale_en-vg.js";
                               $locale.id = "en-vg";
                               $window.sessionStorage.jezik = "en-vg";
                           }
                           else if ($scope.login.language == "japan") {
                               $scope.login.jezik = "Scripts/i18n/angular-locale_ja-jp.js";
                               $locale.id = "ja-jp";
                               $window.sessionStorage.jezik = "ja-jp";
                           }
                       });

                       responsePromise.error(function (data, status, headers, config) {
                           alert("Submitting form failed!");
                           window.location = 'index.html#/prijava';
                       });

                   }
               };


           }).controller("ViewBoard", function ($scope, $stateParams, $http, $window) {

               if ($window.sessionStorage.jezik == "en-vg") {
                   $scope.Title = "Projekat";
                   $scope.Overview = "Pregled";
               }

               if ($window.sessionStorage.jezik == "en-us") {
                   $scope.Title = "Board";
                   $scope.Overview = "Overview";
               }
               if ($window.sessionStorage.jezik == "ja-jp") {
                   $scope.Title = "项目";
                   $scope.Overview = "概观";
               }

               console.log($stateParams.id);
               username2 = $stateParams.id;
               var responsePromise = $http.get("api/BoardApi/GetTitle?id=" + $stateParams.id, {});

               responsePromise.success(function (data) {
                   window.location = 'index.html#/pocetna/pregled/' + $stateParams.id;
                   console.log(data);
                   $scope.board = data;
               });

               responsePromise.error(function (data, status, headers, config) {
                   alert("Submitting form failed!");
                   window.location = 'index.html#/prijava';
               });

           })
    .controller("Username", function ($scope, $http, $window) {

        if ($window.sessionStorage.jezik == "en-vg") {
            $scope.profile = "Profil";
            $scope.assignments = "Obaveze";
            $scope.home = "Početna";
            $scope.calendar = "Kalendar";
            $scope.myboards = "Projekti";
            $scope.Logout = "Odjava";
        }

        if ($window.sessionStorage.jezik == "en-us") {
            $scope.profile = "Profile";
            $scope.assignments = "My Assignments";
            $scope.home = "Home";
            $scope.calendar = "My Calendar";
            $scope.myboards = "My Boards";
            $scope.Logout = "Logout";
        }

        if ($window.sessionStorage.jezik == "ja-jp") {
            $scope.profile = "轮廓";
            $scope.assignments = "我的任务";
            $scope.home = "家";
            $scope.calendar = "日历";
            $scope.myboards = "我的项目";
            $scope.Logout = "结账";
        }

        var responsePromise = $http.get("api/UserApi/GetPath?username=" + $window.sessionStorage.token, {});

        responsePromise.success(function (data) {
            console.log(data);


            $scope.username2 = $window.sessionStorage.token;
            $scope.image = "http://localhost:49338/Uploads/" + data.picture;
            $scope.username3 = $window.sessionStorage.token;
        });

        $scope.updateEmail = {};

        $scope.updateEmail.submitTheForm = function (item, event) {
            console.log("--> Submitting form");


            var dataObject = {
                email: $scope.updateEmail.email
            };

            var responsePromise = $http.get('api/UserApi/GetId?username=' + $window.sessionStorage.token);

            responsePromise.success(function (data) {
                id_user = data;

                var responsePromise = $http.get("api/UserApi/UpdateEmail?id=" + id_user + "&noviemail=" + dataObject.email, {});

                responsePromise.success(function (data) {
                    $scope.user = data;
                    $scope.email3 = dataObject.email;
                });
                responsePromise.error(function (data, status, headers, config) {
                    alert("Submitting form failed!");
                });
            });

            responsePromise.error(function (data, status, headers, config) {
                alert("Submitting form failed!");
            });
            $scope.email3 = dataObject.email;
        }

    })



       .controller("NoviBoard", function ($scope, $http, $window) {

           if ($window.sessionStorage.jezik == "en-vg") {
               $scope.dodaj = "Dodaj";
               $scope.newb = "Novi projekat";
               $scope.imeboard = "Ime projekta";
               $scope.myboards = "Projekti";
           }
           else if ($window.sessionStorage.jezik == "ja-jp") {
               $scope.dodaj = "加";
               $scope.newb = "新项目";
               $scope.imeboard = "项目名称";
               $scope.myboards = "项目";
           }
           else {
               $scope.dodaj = "Add";
               $scope.newb = "Add board";
               $scope.imeboard = "New board name";
               $scope.myboards = "My Boards";
           }

           $scope.sortOrder = "title";
           idu = $window.sessionStorage.idu
           $http.get('api/BoardApi/Getboard?id=' + idu).
            success(function (data) {
                $scope.boardsList = data;
            });
           $scope.submitBoard = function () {
               console.log("--> Submitting board");

               var board = {
                   //idBoarda
                   idBoard: 0,
                   title: $scope.NoviBoard.name,
                   creationDate: new Date(),
                   //kao Board owner ide Id logovanog usera, jer inace sve boardove sprema za nepostojeceg usera
                   //sa id=4 !!
                   boardOwner: idu
               };

               var response = $http.post('api/boardapi/postboard', board);

               response.success(function (data) {
                   //ponovo ucitaj boardove sa novododanim
                   $http.get('api/BoardApi/Getboard?id=' + idu).
                   success(function (data) {
                       $scope.boardsList = data;
                   });
               });

               response.error(function (data, status, headers, config) {
                   alert("Submitting board failed!");
                   window.location = 'index.html#/pocetna/board';
               })
           };



           $scope.pregled = function (id) {
               window.location = "index.html#/pocetna/pregled/" + id;
               $scope.nesto = id;
               // window.alert("ID odabranog board-a je: "+id);
           };
       })



        .controller("MainSchedulerCtrl", function ($scope, $http, $window) {
            //
            var idUsera;
            //dobavi username korisnika         


            //dobavi id korisnika
            var responsePromise = $http.get('api/UserApi/GetId?username=' + $window.sessionStorage.token);

            responsePromise.success(function (data) {
                idUsera = data;

                //pomocne varijable
                var title;
                var date1;
                var date2;
                var id1;

                //preuzmi evente koje je korisnik kreirao
                var responsePromise2 = $http.get('api/TaskApi/GetCalendarTasks?id=' + idUsera);

                responsePromise2.success(function (data) {
                    $scope.obaveze = data;
                    console.log($scope.obaveze);

                    $scope.dogadjaji = [{ id: 1, text: "", start_date: new Date(2012, 05, 10), end_date: new Date(2012, 05, 10) }];

                    //iteriraj kroz listu dogadjaja i vezi je za kontrolu
                    for (var i in $scope.obaveze) {
                        title = $scope.obaveze[i].title;

                        //prvi datum
                        var prviDatum = "" + $scope.obaveze[i].startDate;
                        var t = prviDatum.split(".");

                        console.log(t[0]);
                        console.log(t[1]);


                        var godina = t[2].split(" ");
                        console.log(godina[0]);
                        var date1 = new Date(godina[0], t[1] - 1, t[0]);


                        //var dan1 = prviDatum.getDay();
                        //var mjesec1 = prviDatum.getMonth();
                        //var godine1 = prviDatum.getFullYear();
                        console.log(date1);
                        //console.log(dan1 + " " + mjesec1 + " " + godine1);
                        //date1 = new Date(godine1, dan1, mjesec1);

                        //Drugi datum format

                        var drugiDatum = "" + $scope.obaveze[i].endDate
                        var t2 = drugiDatum.split(".");

                        var godina2 = t2[2].split(" ");

                        var date2 = new Date(godina2[0], t2[1] - 1, t2[0]);
                        console.log(date2);
                        //var drugiDatum = new Date($scope.obaveze[i].endDate);
                        //var dan2 = drugiDatum.getDay();
                        //var mjesec2 = drugiDatum.getMonth();
                        //var godine2 = drugiDatum.getFullYear();

                        //date2 = new Date(godine2, dan2, mjesec2);
                        //console.log(dan2 + " " + mjesec2 + " " + godine2);



                        //  window.alert("title: " + title + " start: " + date1 + " end: "+date2);
                        //date1 = $scope.obaveze[i].startDate;
                        //date2 = $scope.obaveze[i].endDate;
                        id1 = $scope.obaveze[i].id;
                        //window.alert(title);
                        $scope.dogadjaj = [{ id: title, text: title, start_date: date1, end_date: date2 }];
                        $scope.dogadjaji = $scope.dogadjaji.concat($scope.dogadjaj);

                    }
                    //vezi dogadjaje za kontrolu 
                    $scope.events = $scope.dogadjaji;
                });
            });
            $scope.submitEvent = function () {
                //var date = $scope.NoviEvent.start;
                //window.alert(date.getDay());

                console.log("--> Submitting task");
                //window.alert($scope.NoviEvent.title);
                var task = {
                    title: $scope.NoviEvent.title,
                    startTime: $scope.NoviEvent.start,
                    endTime: $scope.NoviEvent.end,
                    taskCreator: idUsera,
                    label: 0
                };

                console.log(task);
                var response = $http.post('api/TaskApi/CreateTask', task);
                $window.location.reload();

            };
            //postavi pocetni datum na kontrole koji se inicijalno prikazuje
            $scope.scheduler = { date: new Date(2014, 05, 1) };
        })


        .controller("NoviList", function ($scope, $stateParams, $http, $window) {

            odabraniBoard = $stateParams.id;
            console.log($stateParams.id);
            $scope.sortOrder = "title";
            if ($window.sessionStorage.jezik == "en-vg") {
                $scope.Adduser = "Novi član";
                $scope.Addlist = "Nova lista";
                $scope.Boardusers = "Članovi projekta";
                $scope.Lists = "Liste";
                $scope.Addtask = "Novi zadatak";
                $scope.Newlistname = "Naziv liste";
                $scope.Newtaskname = "Naziv zadatka";
                $scope.Addcolor = "Boja";
                $scope.Deletemember = "Obriši člana";
                $scope.AddDescription = "Opis zadatka";
                $scope.Addcolor = "Boja";
                $scope.Priority = "Prioritet";
                $scope.RED = "CRVENA";
                $scope.Add = "Dodaj";
                $scope.Update = "Izmijeni";
                $scope.Done = "Premjesti u Done!"
                $scope.Start = "Početak";
                $scope.End = "Kraj";
            }
            else if ($window.sessionStorage.jezik == "ja-jp") {
                $scope.Adduser = "新成员";
                $scope.Addlist = "新叶";
                $scope.Boardusers = "该项目的成员";
                $scope.Lists = "表";
                $scope.Addtask = "新招聘";
                $scope.Newlistname = "名单";
                $scope.Newtaskname = "工作名称";
                $scope.Addcolor = "颜色";
                $scope.Deletemember = "删除文章";
                $scope.AddDescription = "任务描述";
                $scope.Addcolor = "颜色";
                $scope.Priority = "优先";
                $scope.RED = "红";
                $scope.Add = "加";
                $scope.Update = "更新";
                $scope.Done = "移动完成了！";
                $scope.Start = "开头";
                $scope.End = "完结";
            }
            else {
                $scope.Adduser = "Add member";
                $scope.Addlist = "Add list";
                $scope.Boardusers = "Board members";
                $scope.Lists = "Lists";
                $scope.Addtask = "Add task";
                $scope.Newlistname = "New list name";
                $scope.Newtaskname = "New task name";
                $scope.Addcolor = "Color";
                $scope.Deletemember = "Delete member";
                $scope.AddDescription = "Add Description";
                $scope.Addcolor = "Color";
                $scope.Priority = "Priority";
                $scope.RED = "RED";
                $scope.Add = "Add";
                $scope.Update = "Update";
                $scope.Done = "Move to Done!";
                $scope.Start = "Start";
                $scope.End = "End";
            }

            odabraniBoard = $stateParams.id;
            console.log($stateParams.id);
            $scope.sortOrder = "title";

            if ($window.sessionStorage.jezik == "en-vg") {

                $scope.colors =
                [
                      { id: 2, name: "siva" },
                      { id: 3, name: "plava" },
                      { id: 4, name: "zelena" },
                      { id: 5, name: "naradžasta" },
                      { id: 6, name: "crvena" }
                ];
            }
            else if ($window.sessionStorage.jezik == "ja-jp") {

                $scope.colors =
                [
                      { id: 2, name: "灰色" },
                      { id: 3, name: "蓝色" },
                      { id: 4, name: "绿色" },
                      { id: 5, name: "橙" },
                      { id: 6, name: "红" }
                ];
            }
            else {
                $scope.colors =
                             [
                              { id: 2, name: "Gray" },
                              { id: 3, name: "Blue" },
                              { id: 4, name: "Green" },
                              { id: 5, name: "Orange" },
                              { id: 6, name: "Red" }
                             ];
            }
            $scope.selectedColor = 2;
            var responsePromise = $http.get('api/ListApi/GetLists?id=' + odabraniBoard, {});

            responsePromise.success(function (data) {
                $scope.list = data;
            });

            var responsePromise = $http.get('api/TaskApi/Gettasks', {});

            responsePromise.success(function (data) {
                $scope.task = data;
            });

            var responsePromise = $http.get('api/BoardMembersAPI/GetUsers?id=' + odabraniBoard, {});

            responsePromise.success(function (data) {
                $scope.user = data;
            });
            $scope.submitList = function () {
                console.log("--> Submitting list");

                var list = {
                    title: $scope.NoviList.name,
                    ownerBoard: odabraniBoard
                };
                console.log($stateParams.id);
                var response = $http.post('api/ListApi/PostList', list);
                response.success(function (data) {

                    var responsePromise = $http.get('api/ListApi/GetLists?id=' + odabraniBoard, {});

                    responsePromise.success(function (data) {
                        $scope.list = data;
                    });

                    var responsePromise = $http.get('api/TaskApi/Gettasks', {});

                    responsePromise.success(function (data) {
                        $scope.task = data;
                    });
                });

                response.error(function (data, status, headers, config) {
                    alert("Submitting board failed!");
                    window.location = 'index.html#/pocetna/pregled';
                })
            };



            $scope.pregled = function (odabraniList) {
                window.location = "index.html#/pocetna/pregled/" + odabraniBoard;
                $scope.nesto = odabraniList;
                // window.alert("ID odabranog board-a je: "+id);
            };
            $scope.pregledLista = function (id) {
                odabraniList = id;
            };

            $scope.obrisiKorisnika = function (id) {
                var responsePromise = $http.get('api/BoardMembersAPI/brisanjeUsera?idKor=' + id + '&idbo=' + odabraniBoard, {});

                responsePromise.success(function (data) {

                    $window.location.reload();

                });
                response.error(function (data, status, headers, config) {
                    alert("Submitting user failed!");
                    window.location = 'index.html#/pocetna/pregled';
                });

            };

            $scope.obrisiKorisnikaTask = function (idU, idt) {
                var responsePromise = $http.get('api/TaskmembersAPI/brisanjeUsera?idKor=' + idU + "&&idT=" + idt, {});

                responsePromise.success(function (data) {
                    alert("User has been deleted from your task!");
                    $window.location.reload();

                });
                response.error(function (data, status, headers, config) {
                    alert("Submitting user failed!");
                    window.location = 'index.html#/pocetna/pregled';
                });

            };

            $scope.pregledTask = function (task) {

                $scope.selectTask = task;
                $scope.boja = task.taskOwner;
                var responsePromise = $http.get('api/TaskmembersAPI/GetUsers?id=' + task.idTask, {});

                responsePromise.success(function (data) {
                    $scope.TaskUser = data;
                });
            };



            $scope.submitTask = function () {
                console.log("--> Submitting task");

                var task = {
                    title: $scope.NoviList.tasktitle,
                    ownerList: odabraniList,
                    label: 0
                };

                console.log(odabraniList);
                console.log($stateParams.id);
                console.log(task);
                var response = $http.post('api/TaskApi/CreateTask', task);
                response.success(function (data) {

                    var responsePromise = $http.get('api/ListApi/GetLists?id=' + odabraniBoard, {});

                    responsePromise.success(function (data) {
                        $scope.list = data;
                    });

                    var responsePromise = $http.get('api/TaskApi/Gettasks', {});

                    responsePromise.success(function (data) {
                        $scope.task = data;
                    });
                });
            }
            $scope.submitTaskDone = function (idT) {
                var responsePromise = $http.get('api/TaskApi/taskToDone?idt=' + idT, {});
                responsePromise.success(function (data) {
                    $window.location.reload();
                });
            }
            $scope.submitTaskUpdate = function () {
                console.log("--> Submitting task");

                console.log(odabraniList);
                console.log($stateParams.id);
                if ($scope.NoviList.opis != null && $scope.NoviList.crveno != null) {
                    var response = $http.get('api/TaskApi/UpdateTask?id=' + $scope.selectTask.idTask + '&comment=' + $scope.NoviList.opis + '&label=' + $scope.NoviList.crveno + '&color=' + $scope.selectedColor.id + '&start=' + $scope.NoviList.start + '&end=' + $scope.NoviList.end, {});
                    response.success(function (data) {

                        var responsePromise = $http.get('api/ListApi/GetLists?id=' + odabraniBoard, {});

                        responsePromise.success(function (data) {
                            $scope.list = data;
                        });

                        var responsePromise = $http.get('api/TaskApi/Gettasks', {});

                        responsePromise.success(function (data) {
                            $scope.task = data;
                        });
                    })
                }
                if ($scope.NoviList.taskuser != null) {
                    var responsePromise = $http.get('api/TaskApi/TaskToMember?username=' + $scope.NoviList.taskuser + '&idtask=' + $scope.selectTask.idTask, {});

                    responsePromise.success(function (data) {
                        var responsePromise = $http.get('api/ListApi/GetLists?id=' + odabraniBoard, {});

                        responsePromise.success(function (data) {
                            $scope.list = data;
                        });

                        var responsePromise = $http.get('api/TaskApi/Gettasks', {});

                        responsePromise.success(function (data) {
                            $scope.task = data;
                        });
                        alert('Task update!');
                    });
                }



            }
        })
        .controller("obaveze", function ($scope, $http, $locale, $window) {

            console.log(usernamezapretragu);
            if ($locale.id == "en-vg") {
                $scope.assignments = 'Zadaci';
                $scope.inlist = 'u listi';
                $scope.taska = 'Zadatak';
                $scope.withinboard = 'unutar projekta';
            }
            else if ($locale.id == "ja-jp") {
                $scope.assignments = '任务';
                $scope.inlist = '列表';
                $scope.taska = '任务';
                $scope.withinboard = '项目';
            }
            else {
                $scope.assignments = 'My Assignments';
                $scope.inlist = 'in list';
                $scope.taska = 'Task';
                $scope.withinboard = 'within board';
            }

            var responsePromise = $http.get('api/UserApi/GetId?username=' + $window.sessionStorage.token);
            responsePromise.success(function (data) {
                iduser = data;
                console.log(iduser);
                var responsePromise = $http.get('api/TaskApi/GetTasksByOwner?id=' + iduser);

                responsePromise.success(function (data) {
                    $scope.obaveze = data;
                });
            });

            $scope.preusmjeri = function (id) {
                window.location = "index.html#/pocetna/pregled/" + id;
            };

        });


//-----------------//
//   u p l o a d    //
//------------------//

routerApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

routerApp.service('fileUpload', ['$http', '$window', function ($http, $window) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        fd.append('username', $window.sessionStorage.token);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .success(function () {
        })
        .error(function () {
        });
    }
}]);

routerApp.controller('myCtrl', ['$scope', 'fileUpload', function ($scope, fileUpload) {

    $scope.uploadFile = function () {
        var file = $scope.myFile;
        //console.log('file is ' + JSON.stringify(file));
        //var uploadUrl = "api/UserAPI/UpdateAvatar";
        console.log('file is ' + file.name);
        fileUpload.uploadFileToUrl(file, '/User/UpdateAvatar');
    };

}]);


// -----------------------------
//
// CUSTOM DIREKTIVE ZA PRIKAZ KALENDARA
//
//---------------------------------

routerApp.directive('dhxScheduler', function () {
    return {
        restrict: 'A',
        scope: false,
        transclude: true,
        template: '<div class="dhx_cal_navline" ng-transclude></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>',



        link: function ($scope, $element, $attrs, $controller) {
            //default state of the scheduler
            if (!$scope.scheduler)
                $scope.scheduler = {};
            $scope.scheduler.mode = $scope.scheduler.mode || "month";
            $scope.scheduler.date = $scope.scheduler.date || new Date();

            //watch data collection, reload on changes
            $scope.$watch($attrs.data, function (collection) {
                scheduler.clearAll();
                scheduler.parse(collection, "json");
            }, true);

            //mode or date
            $scope.$watch(function () {
                return $scope.scheduler.mode + $scope.scheduler.date.toString();
            }, function (nv, ov) {
                var mode = scheduler.getState();
                if (nv.date != mode.date || nv.mode != mode.mode)
                    scheduler.setCurrentView($scope.scheduler.date, $scope.scheduler.mode);
            }, true);

            //size of scheduler
            $scope.$watch(function () {
                return $element[0].offsetWidth + "." + $element[0].offsetHeight;
            }, function () {
                scheduler.setCurrentView();
            });

            //styling for dhtmlx scheduler
            $element.addClass("dhx_cal_container");

            //init scheduler
            scheduler.init($element[0], $scope.scheduler.mode, $scope.scheduler.date);
        }
    }
});

routerApp.directive('dhxTemplate', ['$filter', function ($filter) {
    scheduler.aFilter = $filter;

    return {
        restrict: 'AE',
        terminal: true,

        link: function ($scope, $element, $attrs, $controller) {
            $element[0].style.display = 'none';

            var template = $element[0].innerHTML;
            template = template.replace(/[\r\n]/g, "").replace(/"/g, "\\\"").replace(/\{\{event\.([^\}]+)\}\}/g, function (match, prop) {
                if (prop.indexOf("|") != -1) {
                    var parts = prop.split("|");
                    return "\"+scheduler.aFilter('" + (parts[1]).trim() + "')(event." + (parts[0]).trim() + ")+\"";
                }
                return '"+event.' + prop + '+"';
            });
            var templateFunc = Function('sd', 'ed', 'event', 'return "' + template + '"');
            scheduler.templates[$attrs.dhxTemplate] = templateFunc;
        }
    };
}]);


// END..............DIREKTIVE


// -----------------------------
//
// DIREKTIVA ZA DRAG AND DROP
//
//--------------------------------

routerApp.directive('dndList', function () {

    return function (scope, element, attrs) {

        // variables used for dnd
        var toUpdate;
        var startIndex = -1;

        // watch the model, so we always know what element
        // is at a specific position
        scope.$watch(attrs.dndList, function (value) {
            toUpdate = value;
        }, true);

        // use jquery to make the element sortable (dnd). This is called
        // when the element is rendered
        $(element[0]).sortable({
            items: 'li',
            start: function (event, ui) {
                // on start we define where the item is dragged from
                startIndex = ($(ui.item).index());
            },
            stop: function (event, ui) {
                // on stop we determine the new index of the
                // item and store it there
                var newIndex = ($(ui.item).index());
                var toMove = toUpdate[startIndex];
                toUpdate.splice(startIndex, 1);
                toUpdate.splice(newIndex, 0, toMove);

                // we move items in the array, if we want
                // to trigger an update in angular use $apply()
                // since we're outside angulars lifecycle
                scope.$apply(scope.model);
            },
            axis: 'y'
        })
    }
});