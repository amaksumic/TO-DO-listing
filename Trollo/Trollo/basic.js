
function Hello($scope, $http) {
    $http.get('api/TaskApi/GetTasksByCreator?id=1').
        success(function (data) {
            $scope.task = data;
        });
}

function login($scope, $http)
{
    $scope.formInfo = {};
    $http.get('/api/UserAPI/LoginApi?pass="12345"&name="novi"')
        .success(function (data) {
            $scope.user = data;
        });
}



function Boards($scope, $http) {
    $scope.sortOrder = "title";
    $http.get('api/BoardApi/Getboard?id=4').
    success(function (data) {
        $scope.boardsList= data;
    });

}



