
app.controller('ContactController', function ($scope, $http) {
    $scope.initializeGlobalVariables = function () {
        $scope.Errors = {};
        $scope.Contacts = contacts;
    }

    $scope.initializeGlobalVariables();
});

app.controller('CreateAction', function ($scope, $location, $http) {
    $scope.http = $http;

    $scope.Create = function () {
        $scope.http.post(applicationNamePath + 'ContactApi', $scope.Contact)
            .success($scope.OnCreateSuccesss)
            .error(ErrorManager.getInstance().OnGenealErrorEvent);
    };

    $scope.OnCreateSuccesss = function (data) {
        //throw (JSON.stringify(data.Errors));
        $scope.Errors = data.Errors;
        if (data.Errors.HasError)
        {
            return;
        }

        $scope.Contact.Id = data.Contact.Id;
    };
});