var routerApp = angular.module('routerApp', ['ui.router']);
var username2 = "Hana";

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

        .state('pocetna.pregled', {
            url: '/pregled',
            templateUrl: 'pregled.html'
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

           })
           .controller("IzmjenaKorisnika", function ($scope, $http) {

               $scope.izmjenaKorisnika = {};

               $scope.izmjenaKorisnika.submitTheForm = function (item, event) {
                   console.log("--> Submitting form");


                   var dataObject = {
                       id: $scope.izmjenaKorisnika.id,
                       stari: $scope.izmjenaKorisnika.stari,
                       novi: $scope.izmjenaKorisnika.novi,
                       noviemail: $scope.izmjenaKorisnika.noviemail
                   };

                   var responsePromise = $http.get("api/UserApi/IzmjenaUsera?id=1" + /*dataObject.id +*/ "&stari=" + dataObject.stari + "&novi=" + dataObject.novi + "&noviemail=" + dataObject.noviemail, {});

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
                       window.location = 'index.html#/prijava';;
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
                       id: $scope.updateUsername.id,
                       pass: $scope.updateUsername.pass,
                       novi: $scope.updateUsername.novi
                   };

                   var responsePromise = $http.get("api/UserApi/UpdateUsername?id=1" + /*dataObject.id + */"&pass=" + dataObject.pass + "&novi=" + dataObject.novi, {});

                   responsePromise.success(function (data) {
                       $scope.user = data;
                   });


                   responsePromise.error(function (data, status, headers, config) {
                       alert("Submitting form failed!");
                   });
               }

           }).controller("Login", function ($scope, $http) {

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
                       window.location = 'index.html';
                       username2 = "Hana";
                       //location.path = '/home';
                   });

                   responsePromise.error(function (data, status, headers, config) {
                       alert("Submitting form failed!");
                       //window.location = 'index.html#/prijava';
                   });
               }

           }).controller("Registracija", function ($scope, $http) {

               $scope.registracija = {};

               $scope.registracija.submitTheForm = function (item, event) {
                   console.log("--> Submitting form");


                   var dataObject = {
                       user: $scope.registracija.name,
                       pass: $scope.registracija.pass,
                       email: $scope.registracija.email
                   };

                   var responsePromise = $http.get("api/UserApi/Registration?username=" + dataObject.user + "&pass=" + dataObject.pass + "&email=" + dataObject.email, {});

                   responsePromise.success(function (data) {
                       $scope.user = data;
                       window.location = 'index.html#/prijava';
                   });

                   responsePromise.error(function (data, status, headers, config) {
                       alert("Submitting form failed!");
                       window.location = 'index.html#/prijava';
                   });
               }

           }).controller("Username", function ($scope) {

               $scope.username2 = username2;

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

                    //ponovo ucitaj boardove sa novo dodanim
                    $http.get('api/BoardApi/Getboard?id=4').
                    success(function (data) {
                        $scope.boardsList = data;
                    });
                });

                response.error(function (data, status, headers, config) {
                    alert("Submitting board failed!");
                    window.location = 'index.html#/pocetna/board';
                });



            };

            $scope.pregled = function (id) {
                window.location = 'index.html#/pocetna/pregled';
                $scope.nesto = id;
                window.alert("ID odabranog board-a je: "+id);

            };
        });


