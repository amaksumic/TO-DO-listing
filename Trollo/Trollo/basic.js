
angular.module("myapp", [])
   .controller("MyController", function ($scope, $http) {
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
                       id : $scope.izmjenaKorisnika.id,
                   stari: $scope.izmjenaKorisnika.stari,
                   novi :  $scope.izmjenaKorisnika.novi,
                   noviemail : $scope.izmjenaKorisnika.noviemail
               };

               var responsePromise = $http.get("api/UserApi/IzmjenaUsera?id=" +dataObject.id + "&stari=" + dataObject.stari + "&novi=" + dataObject.novi + "&noviemail=" + dataObject.noviemail, {});

               responsePromise.success(function (data) {
                   $scope.user = data;
               });


               responsePromise.error(function (data, status, headers, config) {
                   alert("Submitting form failed!");
               });
           }

           })  .controller("BrisanjeKorisnika", function ($scope, $http) {

               $scope.brisanjeKorisnika = {};

               $scope.brisanjeKorisnika.submitTheForm = function (item, event) {
                   console.log("--> Submitting form");


                   var dataObject = {
                       id : $scope.brisanjeKorisnika.id,
                      
                   };

                   var responsePromise = $http.get("api/UserApi/Deleteuser?id=" + dataObject.id, {});

                   responsePromise.success(function (data) {
                       $scope.user = data;
                   });


                   responsePromise.error(function (data, status, headers, config) {
                       alert("Submitting form failed!");
                   });
               }

           });


    function Boards($scope, $http) {
        $scope.sortOrder = "title";
        $http.get('api/BoardApi/Getboard?id=1').
        success(function (data) {
            $scope.boardsList = data;
        });
    }