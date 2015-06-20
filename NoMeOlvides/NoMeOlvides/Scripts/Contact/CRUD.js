app.controller('ContactController', function ($scope, $http) {
    $scope.transactionResultStetus = false;

    $scope.initializeGlobalVariables = function () {
        $scope.Contacts = contacts;
    }

    $scope.initializeGlobalVariables();
});