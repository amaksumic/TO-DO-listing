function List($scope, $http) {
    $http.get('api/ListApi/GetLists?id=1&s="boo"').
        success(function (data) {
            $scope.list = data;
        });
}