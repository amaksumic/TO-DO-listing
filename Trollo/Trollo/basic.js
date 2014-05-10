
    angular.module("myapp", [])
       .controller("MyController", function ($scope, $http) {
           $scope.myForm = {};
           

           $scope.myForm.submitTheForm = function (item, event) {
               console.log("--> Submitting form");
               var dataObject = {
                   name: $scope.myForm.name
                  , car: $scope.myForm.car
               };

               
               var responsePromise = $http.get('api/TaskApi/GetTasksByCreator?id='+ dataObject.name, {});
               responsePromise.success(function (data) {
                   //  console.log(dataFromServer.title
                   $scope.task = data;
                   
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