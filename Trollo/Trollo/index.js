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

var odabraniBoard = 1;
var odabraniList = 1;
var odabraniTask = 1;
var changed = 0;
var usernamezapretragu ;


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

}).run(['$rootScope', 'AuthService', '$location', function($rootScope, AuthService, $location){
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        // Everytime the route in our app changes check auth status
        if (AuthService.getUserAuthenticated()==false) {
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

           }).controller("BrisanjeKorisnika", function ($scope, $http) {

               $scope.brisanjeKorisnika = {};

               $scope.brisanjeKorisnika.submitTheForm = function (item, event) {
                   console.log("--> Submitting form");


                   var dataObject = {
                       id: $scope.brisanjeKorisnika.id

                   };

                   var responsePromise = $http.get("api/UserApi/Deleteuser?id=1" /*+ dataObject.id*/, {});

                   responsePromise.success(function (data) {
                       $scope.user = data;
                       window.location = 'index.html#/prijava';
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

           }).controller("Login", function ($scope, $http, $window) {

               $scope.login = {};

               $scope.login.submitTheForm = function (item, event) {
                   console.log("--> Submitting form");


                   var dataObject = {
                       user: $scope.login.name,
                       pass: $scope.login.pass
                   };

                   var responsePromise = $http.get("api/UserApi/Login?username=" + dataObject.user + "&pass=" + dataObject.pass, {});

                   responsePromise.success(function (data) {
                       if (data != "null") {
                           $scope.user = data;
                           usernamezapretragu = $scope.login.name;
                           $window.sessionStorage.token = data.username;
                           $window.sessionStorage.idu= data.idUser;
                           window.location = 'index.html#/pocetna/boards';
                           AuthService.setUserAuthenticated(true);
                           usernamezapretragu = $scope.login.name;
                           //location.path = '/home';
                       }
                       else {
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

           }).controller("AddUser", function ($scope, $http) {

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
                       alert("New user has been added to your board!");
                      
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

                       var responsePromise = $http.get("api/UserApi/Registration?username=" + dataObject.user + "&pass=" + dataObject.pass + "&email=" + dataObject.email, {});

                       responsePromise.success(function (data) {
                           $scope.user = data;
                           window.location = 'index.html';
                           $window.sessionStorage.token = data.username;
                       });

                       responsePromise.error(function (data, status, headers, config) {
                           alert("Submitting form failed!");
                           window.location = 'index.html#/prijava';
                       });

                   }
               };




           }).controller("Username", function ($scope, $http ,$window) {
               var responsePromise = $http.get("api/UserApi/GetPath?username=" + usernamezapretragu, {});

               responsePromise.success(function (data) {
                   console.log(data);
                   $scope.image = "http://localhost:49338/Uploads/" + data;

                   $scope.username2 = $window.sessionStorage.token;
                   $scope.username3 = $window.sessionStorage.token;
               });
              

           }).controller("ViewBoard", function ($scope, $stateParams, $http) {
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

        var responsePromise = $http.get("api/UserApi/GetPath?username=" + usernamezapretragu, {});

        responsePromise.success(function (data) {
            console.log(data);
            $scope.image = "http://localhost:49338/Uploads/" + data.picture;

            $scope.username2 = $window.sessionStorage.token;
            $scope.username3 = $window.sessionStorage.token;
        });

    })



       .controller("NoviBoard", function ($scope, $http, $window) {


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

        

        .controller("MainSchedulerCtrl", function ($scope, $http) {
            
            //
            var idUsera;
            //dobavi username korisnika

            


            //dobavi id korisnika
            var responsePromise = $http.get('api/UserApi/GetId?username=' + usernamezapretragu);

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
                        var prviDatum = ""+ $scope.obaveze[i].startDate;
                        var t = prviDatum.split(".");

                        console.log(t[0]);
                        console.log(t[1]);
                        

                        var godina = t[2].split(" ");
                        console.log(godina[0]);
                        var date1 = new Date(godina[0],t[1]-1,t[0]);
                            

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

                        var date2 = new Date(godina2[0], t2[1]-1, t2[0]);
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

            };
            //postavi pocetni datum na kontrole koji se inicijalno prikazuje
                $scope.scheduler = { date: new Date(2014, 05, 1) };



        })
   

        .controller("NoviList", function ($scope, $stateParams, $http, $window) {

            odabraniBoard = $stateParams.id;
            console.log($stateParams.id);
            $scope.sortOrder = "title";

            $scope.colors =
                         [
                          { id: 2, name: "Gray" },
                          { id: 3, name: "Blue" },
                          { id: 4, name: "Green" },
                          { id: 5, name: "Orange" },
                          { id: 6, name: "Red" }
                         ];
            $scope.selectedColor= 2;
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
                var responsePromise = $http.get('api/BoardMembersAPI/brisanjeUsera?idKor=' + id, {});

                responsePromise.success(function (data) {
                    alert("User has been deleted from your board!");
                   // $window.location.reload();

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
            $scope.submitTaskUpdate = function () {
                console.log("--> Submitting task");

                console.log(odabraniList);
                console.log($stateParams.id);
                if ($scope.NoviList.opis != null && $scope.NoviList.crveno != null) {
                    var response = $http.get('api/TaskApi/UpdateTask?id=' + $scope.selectTask.idTask + '&comment=' + $scope.NoviList.opis + '&label=' + $scope.NoviList.crveno+'&color='+$scope.selectedColor.id);
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
        .controller("obaveze", function ($scope, $http) {

            console.log(usernamezapretragu);
            
            
            var responsePromise = $http.get('api/UserApi/GetId?username=' + usernamezapretragu);
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

routerApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        fd.append('username', usernamezapretragu);
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

routerApp.controller('myCtrl', ['$scope', 'fileUpload', function ($scope,  fileUpload) {

    $scope.uploadFile = function () {
        var file = $scope.myFile;
        //console.log('file is ' + JSON.stringify(file));
        //var uploadUrl = "api/UserAPI/UpdateAvatar";
        console.log('file is ' + file.name);
        fileUpload.uploadFileToUrl(file, '/User/UpdateAvatar');
    };

}]);