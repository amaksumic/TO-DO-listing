var routerApp = angular.module('routerApp', ['ui.router']);


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
            templateUrl: 'nije.html'
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

});

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

               $scope.updateUsername = {};

               $scope.updateUsername.submitTheForm = function (item, event) {
                   console.log("--> Submitting form");


                   var dataObject = {
                       novi: $scope.updateUsername.novi,
                       repeate: $scope.updateUsername.repeate
                   };

                   var responsePromise = $http.get("api/UserApi/UpdatePassword?id=1" + /*dataObject.id + */ + "&novi=" + dataObject.novi + "&repeate=" + dataObject.repeate, {});

                   responsePromise.success(function (data) {
                       $scope.user = data;
                   });


                   responsePromise.error(function (data, status, headers, config) {
                       alert("Submitting form failed!");
                   });
           
               }
        }).controller("UpdateEmail", function ($scope, $http) {

            $scope.updateUsername = {};

            $scope.updateUsername.submitTheForm = function (item, event) {
                console.log("--> Submitting form");


                var dataObject = {
                    email: $scope.updateUsername.email
                };

                var responsePromise = $http.get("api/UserApi/UpdateEmail?id=1" + /*dataObject.id + */ + "&noviemail=" + dataObject.novi, {});

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
                       id: $scope.updateUsername.username
                   };

                   var responsePromise = $http.get("api/UserApi/UpdateUsername?id=1" + /*dataObject.id + */ + "&novi=" + dataObject.novi, {});

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
                       $scope.user = data;
                       window.location = 'index.html#/pocetna/boards';
                       $window.sessionStorage.token = data.username;
                       //location.path = '/home';
                   });

                   responsePromise.error(function (data, status, headers, config) {
                       alert("Submitting form failed!");
                       //window.location = 'index.html#/prijava';
                   });
               }

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

           }) .controller("ViewBoard",  function($scope, $stateParams, $http ) {    
               console.log($stateParams.id);
               username2 = $stateParams.id;
               var responsePromise = $http.get("api/BoardApi/GetTitle?id=" + $stateParams.id, {});

               responsePromise.success(function (data) {
                   window.location = 'index.html#/pocetna/pregled/'+$stateParams.id;
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
                window.location = "index.html#/pocetna/pregled/"+id;
                $scope.nesto = id;
                window.alert("ID odabranog board-a je: "+id);
            };
        });


