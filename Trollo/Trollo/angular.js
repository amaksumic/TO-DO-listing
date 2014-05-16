
angular.module("myapp", [])
   .controller("MyController", function ($scope, $http) {
       $scope.myForm = {};

       $scope.myForm.submitTheForm = function (item, event) {
           console.log("--> Submitting form");
           var dataObject = {
               name: $scope.myForm.name
              , pass: $scope.myForm.pass
                , email: $scope.myForm.email
           };

           var responsePromise = $http.get('api/UserAPI/Registration?username=' + dataObject.name + "&pass=" + dataObject.pass + "&email=" + dataObject.email, {});
           responsePromise.success(function (data) {
               //  console.log(dataFromServer.title
               $scope.task = data;

           });
           responsePromise.error(function (data, status, headers, config) {
               alert("Submitting form failed!");
           });
       };
   }).controller("Login", function ($scope, $http) {
       $scope.loginForm = {};


       $scope.loginForm.submitTheForm = function (item, event) {
           console.log("--> Submitting form");
           var dataObject = {
               name: $scope.loginForm.name
              , pass: $scope.loginForm.pass

           };

           var responsePromise = $http.get('api/UserAPI/Login?username=' + dataObject.name + "&pass=" + dataObject.pass, {});
           responsePromise.success(function (data) {
               //  console.log(dataFromServer.title
               $scope.task = data;

           });
           responsePromise.error(function (data, status, headers, config) {
               alert("Submitting form failed!");
           });
       };
   }).controller("Odjava", function ($scope, $http) {

       $scope.odjava = {};

       $scope.odjava.submitTheForm = function (item, event) {
           console.log("--> Submitting form");

           var responsePromise = $http.get('api/UserAPI/Logout', {});
           responsePromise.success(function (data) {
               $scope.task = data;
           });
           responsePromise.error(function (data, status, headers, config) {
               alert("Submitting form failed!");
           });
       };
   });
