
function Hello($scope, $http) {
    $http.get('api/TaskApi/GetTasksByCreator?id=1').
        success(function (data) {
            $scope.task = data;
        });
}


