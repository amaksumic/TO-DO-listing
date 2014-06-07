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
var username;


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
                           $window.sessionStorage.token = data.username;
                           window.location = 'index.html#/pocetna/boards';       
                           AuthService.setUserAuthenticated(true);
                           username = data.username;
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




           }).controller("Username", function ($scope, $window) {

               $scope.username2 = $window.sessionStorage.token;
               $scope.username3 = $window.sessionStorage.token;

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
    .controller("Username", function ($scope, $window) {

        $scope.username2 = $window.sessionStorage.token;
        $scope.username3 = $window.sessionStorage.token;

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



        .controller("NoviBoard", function ($scope, $http) {


            $scope.sortOrder = "title";
            $http.get('api/BoardApi/Getboard?id=4').
            success(function (data) {
                $scope.boardsList = data;
            });
            $scope.submitBoard = function () {
                console.log("--> Submitting board");

                var board = {
                    idBoard: 6,
                    title: $scope.NoviBoard.name,
                    creationDate: new Date(),
                    boardOwner: 4
                };

                var response = $http.post('api/boardapi/postboard', board);

                response.success(function (data) {
                    //ponovo ucitaj boardove sa novododanim
                    $http.get('api/BoardApi/Getboard?id=4').
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


        .controller("NoviList", function ($scope, $stateParams, $http, $window) {

            odabraniBoard = $stateParams.id;
            console.log($stateParams.id);
            $scope.sortOrder = "title";
            var responsePromise = $http.get('api/ListApi/GetLists?id=' + odabraniBoard, {});

            responsePromise.success(function (data) {
                $scope.list = data;
            });

            var responsePromise = $http.get('api/TaskApi/Gettasks', {});

            responsePromise.success(function (data) {
                $scope.task = data;
            });

            var responsePromise = $http.get('api/BoardMembersAPI/GetUsers?id='+ odabraniBoard, {});

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
                    $window.location.reload();

                });
                response.error(function (data, status, headers, config) {
                    alert("Submitting user failed!");
                    window.location = 'index.html#/pocetna/pregled';
                });
               
            };

            $scope.obrisiKorisnikaTask = function (idU,idt) {
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
                if ($scope.NoviList.opis != null && $scope.NoviList.crveno!=null){
                    var response = $http.get('api/TaskApi/UpdateTask?id=' + $scope.selectTask.idTask + '&comment=' + $scope.NoviList.opis + '&label=' + $scope.NoviList.crveno);
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
                if ($scope.NoviList.taskuser !=null){
                    var responsePromise = $http.get('api/TaskApi/TaskToMember?username=' + $scope.NoviList.taskuser + '&idtask=' + $scope.selectTask.idTask , {});

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



            }})
        .controller("obaveze", function ($scope, $http) {
            

            var responsePromise = $http.get('api/UserApi/GetId?username=' + username);
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

        })
        .controller("ImageUpload", function ($scope, $http) {

            $scope.submitImage = function () {
                console.log("--> Submitting tar voli kotolenka :D :D :D <3 <3");
                /*
                var response = $http.post('api/UserAPIController/UpdateAvatar', $scope.file);

                response.success(function (data) {
                    //ponovo ucitaj boardove sa novododanim
                    $http.get('api/BoardApi/Getboard?id=4').
                    success(function (data) {
                        $scope.boardsList = data;
                    });
                });
                */
            }
        });
        
