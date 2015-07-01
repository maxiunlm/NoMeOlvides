app.controller('ContactController', function ($scope, $http) {
    $scope.initializeGlobalVariables = function () {
        $scope.Errors = {};
        $scope.Contacts = contacts;
    }

    $scope.initializeGlobalVariables();
});

app.controller('CreateAction', function ($scope, $location, $http) {//, $filter) {
    $scope.http = $http;

    $scope.Create = function () {
        $scope.http.post(applicationNamePath + 'ContactApi', $scope.Contact)
            .success($scope.onCreateSuccesss)
            .error(ErrorManager.getInstance().onGenealErrorEvent);
    };

    $scope.onCreateSuccesss = function (data) {
        //throw (JSON.stringify(data.Errors));
        $scope.Errors = data.Errors;
        $scope.transactionSuccessMessage = 'emptyText';

        if (data.Errors.HasError)
        {
            return;
        }

        $scope.transactionSuccessMessage = 'transactionSuccessMessage';//$filter('translate')('transactionSuccessMessage');
        $scope.Contact.Id = data.Contact.Id;
    };
});

app.controller('DeleteAction', function ($scope, $location, $http, $filter) {
    $scope.http = $http;

    $scope.Delete = function () {
        $scope.http.delete(applicationNamePath + 'ContactApi/' + escape($scope.Contact.Id), {})
            .success($scope.onDeleteSuccesss)
            .error(ErrorManager.getInstance().onGenealErrorEvent);
    }

    $scope.onDeleteSuccesss = function (data) {
        $scope.Errors = data.Errors;
        $scope.transactionSuccessMessage = 'emptyText';

        if (data.Errors.HasError) {
            return;
        }

        $scope.transactionSuccessMessage = 'transactionSuccessMessage';
    };
});