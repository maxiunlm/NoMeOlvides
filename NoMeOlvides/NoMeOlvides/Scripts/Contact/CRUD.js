app.controller('ContactController', function ($scope, $http) {
    $scope.initializeGlobalVariables = function () {
        $scope.Errors = {};
        $scope.Contacts = contacts;
        throw 'asdf';
        return $scope;
    }

    /////////////////////////////// CONFIG
    $scope.aopManager = new AopManager();

    jQuery.aop.around({ target: $scope, method: 'initializeGlobalVariables' }, function (invocation) {
        $scope.aopManager.aroundLogThrowCatchEvent(invocation);
    });

    //jQuery.aop.before({ target: $scope, method: 'initializeGlobalVariables' }, function (arguments, method) {
    //    $scope.aopManager.beforeLogEvent(arguments, method);
    //});
    //jQuery.aop.afterFinally({ target: $scope, method: 'initializeGlobalVariables' }, function (result, exception, method) {
    //    $scope.aopManager.afterFinallyEvent(result, exception, $scope, method);
    //});

    //jQuery.aop.around({ target: $scope, method: 'initializeGlobalVariables' }, function (invocation) {
    //    $scope.aopManager.aroundLogEvent(invocation);
    //});
    //jQuery.aop.afterThrow({ target: $scope, method: 'initializeGlobalVariables' }, function (exception, method) {
    //    $scope.aopManager.afterThrowRetryEvent(exception, $scope, $scope.initializeGlobalVariables, method);
    //});

    //////jQuery.aop.afterThrow({ target: $scope, method: 'initializeGlobalVariables' }, function (exception, method) {
    //////    $scope.aopManager.afterThrowCatchEvent(exception, method);
    //////});
    //////jQuery.aop.after({ target: $scope, method: 'initializeGlobalVariables' }, function (result, method) {
    //////    $scope.aopManager.afterLogEvent(result, method);
    //////});

    $scope.initializeGlobalVariables('hola', 'mundo');
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

        if (data.Errors.HasError) {
            return;
        }

        $scope.Contact.Id = data.Contact.Id;
        $scope.Contacts.push($scope.Contact);
        $scope.transactionSuccessMessage = 'transactionSuccessMessage';//$filter('translate')('transactionSuccessMessage');
        //////// TODO TDD ???!!!
        //////$scope.refreshResult();
        $location.url("/");
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

        var contactIndex = _.findIndex($scope.Contacts, { "Id": $scope.Contact.Id });
        $scope.Contacts.splice(contactIndex, 1);
        $scope.transactionSuccessMessage = 'transactionSuccessMessage';
        //////// TODO TDD ???!!!
        //////$scope.refreshResult();
        $location.url("/");
    };
});

app.controller('EditAction', function ($scope, $http) {
    $scope.http = $http;

    $scope.Edit = function () {
        $scope.http.put(applicationNamePath + 'ContactApi/', $scope.Contact)
            .success($scope.onEditSuccess)
            .error(ErrorManager.getInstance().onGenealErrorEvent);
    };

    $scope.onEditSuccess = function (data) {
        $scope.Errors = data.Errors;
        $scope.transactionSuccessMessage = 'emptyText';

        if (data.Errors.HasError) {
            return;
        }

        $scope.transactionSuccessMessage = 'transactionSuccessMessage';
        $location.url("/");
    };
});

app.controller('DetailsAction', function ($scope, $location) {
    $scope.onDetailsBack = function () {
        $location.url("/");
    };


    /////////////////////////////// CONFIG
    var aopManager = new AopManager();

    jQuery.aop.around({ target: $scope, method: 'onDetailsBack' }, function (invocation, method) {
        aopManager.aroundLogEvent(invocation, method);
    });
});