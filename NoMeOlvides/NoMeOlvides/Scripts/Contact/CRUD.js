app.controller('SearchAction', function ($scope, $http) {
    $scope.http = $http;

    // TODO: TERMINAR CON TDD !!!!!!!!!!!!!!!!!!!!!!!
    $scope.Search = function () {
        $scope.http.get();
    };
});

app.controller('CreateAction', function ($scope, $location, $http) {//, $filter) {
    $scope.http = $http;
    $scope.isForm = true;

    $scope.Create = function () {
        $scope.http.post(applicationNamePath + 'WebApi/ContactApi', $scope.Contact)
            .success($scope.onCreateSuccess)
            .error(ErrorManager.getInstance().onGenealErrorEvent);

        $scope.isForm = false;
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

app.controller('DeleteAction', function ($scope, $routeParams, $location, $http) { //, $filter
    $scope.http = $http;
    var contactIndex = _.findIndex($scope.Contacts, { "Id": $routeParams.id });
    $scope.Contact = $scope.Contacts[contactIndex];
    $scope.isForm = true;

    $scope.Delete = function () {
        $scope.http.delete(applicationNamePath + 'WebApi/ContactApi/' + escape($scope.Contact.Id), {})
            .success($scope.onDeleteSuccess)
            .error(ErrorManager.getInstance().onGenealErrorEvent);

        $scope.isForm = false;
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

app.controller('EditAction', function ($scope, $routeParams, $location, $http) {
    $scope.http = $http;
    var contactIndex = _.findIndex($scope.Contacts, { "Id": $routeParams.id });
    $scope.Contact = $scope.Contacts[contactIndex];
    $scope.isForm = true;

    $scope.Edit = function () {
        $scope.http.put(applicationNamePath + 'WebApi/ContactApi/', $scope.Contact)
            .success($scope.onEditSuccess)
            .error(ErrorManager.getInstance().onGenealErrorEvent);

        $scope.isForm = false;
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

app.controller('DetailsAction', function ($scope, $routeParams) {
    var contactIndex = _.findIndex($scope.Contacts, { "Id": $routeParams.id });
    $scope.Contact = $scope.Contacts[contactIndex];
    $scope.isForm = false;
});

app.controller('ContactController', function ($scope, $http) {
    $scope.initializeGlobalVariables = function () {
        $scope.Errors = {};
        $scope.Contacts = contacts;
        $scope.hasResults = (contacts.length > 0);
        $scope.isForm = false;
    }

    /////////////////////////////// CONFIG
    $scope.auditManager = new AuditManager(3, 'genericRetryMessage');

    $scope.invocationCallback = function (invocation) {
        $scope.auditManager.aroundLogEvent(invocation);
    };

    jQuery.aop.around({ target: $scope, method: 'initializeGlobalVariables' }, $scope.invocationCallback);

    $scope.retryCreateCallback = function (exception, method) {
        $scope.auditManager.afterThrowRetryEvent(exception, $scope, $scope.Create, method);
    };

    jQuery.aop.afterThrow({ target: $scope, method: 'Create' }, $scope.retryCreateCallback);
    jQuery.aop.around({ target: $scope, method: 'Create' }, $scope.invocationCallback);

    $scope.retrySearchCallback = function (exception, method) {
        $scope.auditManager.afterThrowRetryEvent(exception, $scope, $scope.Search, method);
    };

    jQuery.aop.afterThrow({ target: $scope, method: 'Search' }, $scope.retrySearchCallback);
    jQuery.aop.around({ target: $scope, method: 'Search' }, $scope.invocationCallback);

    $scope.retryDeleteCallback = function (exception, method) {
        $scope.auditManager.afterThrowRetryEvent(exception, $scope, $scope.Delete, method);
    };

    jQuery.aop.afterThrow({ target: $scope, method: 'Delete' }, $scope.retryDeleteCallback);
    jQuery.aop.around({ target: $scope, method: 'Delete' }, $scope.invocationCallback);

    $scope.retryEditCallback = function (exception, method) {
        $scope.auditManager.afterThrowRetryEvent(exception, $scope, $scope.Edit, method);
    };

    jQuery.aop.afterThrow({ target: $scope, method: 'Edit' }, $scope.retryEditCallback);
    jQuery.aop.around({ target: $scope, method: 'Edit' }, $scope.invocationCallback);

    //////jQuery.aop.around({ target: $scope, method: 'initializeGlobalVariables' }, function (invocation) {
    //////    $scope.auditManager.aroundLogThrowCatchEvent(invocation);
    //////});

    ////jQuery.aop.before({ target: $scope, method: 'initializeGlobalVariables' }, function (arguments, method) {
    ////    $scope.auditManager.beforeLogEvent(arguments, method);
    ////});
    ////jQuery.aop.afterFinally({ target: $scope, method: 'initializeGlobalVariables' }, function (result, exception, method) {
    ////    $scope.auditManager.afterFinallyEvent(result, exception, method);
    ////});

    ////////jQuery.aop.afterThrow({ target: $scope, method: 'initializeGlobalVariables' }, function (exception, method) {
    ////////    $scope.auditManager.afterThrowCatchEvent(exception, method);
    ////////});
    ////////jQuery.aop.after({ target: $scope, method: 'initializeGlobalVariables' }, function (result, method) {
    ////////    $scope.auditManager.afterLogEvent(result, method);
    ////////});

    $scope.initializeGlobalVariables();
});
