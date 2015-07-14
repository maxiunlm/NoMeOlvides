﻿app.controller('ContactController', function ($scope, $http) {
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
            .success($scope.onCreateSuccess)
            .error(ErrorManager.getInstance().onGenealErrorEvent);
    };

    $scope.onCreateSuccess = function (data) {
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

app.controller('DeleteAction', function ($scope, $location, $http) { //, $filter
    $scope.http = $http;

    $scope.Delete = function () {
        $scope.http.delete(applicationNamePath + 'ContactApi/' + escape($scope.Contact.Id), {})
            .success($scope.onDeleteSuccess)
            .error(ErrorManager.getInstance().onGenealErrorEvent);
    }

    $scope.onDeleteSuccess = function (data) {
        $scope.Errors = data.Errors;
        $scope.transactionSuccessMessage = 'emptyText';

        if (data.Errors.HasError) {
            return;
        }

        $scope.transactionSuccessMessage = 'transactionSuccessMessage';
    };
});

app.controller('EditAction', function ($scope, $http) {
    $scope.http = $http;

    $scope.Edit = function () {
        $scope.http.put(applicationNamePath + 'ContactApi/', $scope.Contact);
    };

    $scope.onEditSuccess = function (data) {
    };
});
