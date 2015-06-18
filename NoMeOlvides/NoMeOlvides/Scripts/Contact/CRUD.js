app.controller('ContactController', function ($scope, $http) {
    $scope.initializeGlobalVariables = function () {
        $scope.Contacts = contacts;
    }

    $scope.initializeGlobalVariables();
});