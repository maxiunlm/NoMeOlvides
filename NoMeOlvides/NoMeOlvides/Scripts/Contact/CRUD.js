﻿//(function () { // Trae problemas para el TDD !!!

// TODO:  TDD!!!!!!!!!!!!!!!!!!!!!
var formFields = [
       { "Id": "Alias", "TranslateKey": "alias", "Description": "Alias" },
       { "Id": "Name", "TranslateKey": "name", "Description": "Nombre" },
       { "Id": "Surname", "TranslateKey": "surname", "Description": "Apellido" },
       { "Id": "Email", "TranslateKey": "email", "Description": "Email" },
       { "Id": "Phone", "TranslateKey": "phone", "Description": "Phone" },
       { "Id": "Cellphone", "TranslateKey": "cellphone", "Description": "Cellphone" },
       { "Id": "Address", "TranslateKey": "address", "Description": "Address" },
       { "Id": "Password", "TranslateKey": "password", "Description": "Password" }
];
//[ // TODO: La descripcion se tiene que cargar del Translate !!!!!!!!!!!!!!!!!!!!!!
//        { "Description": "Alias", "TranslateKey": "alias" },
//        { "Description": "", "TranslateKey": "name" },
//        { "Description": "", "TranslateKey": "surname" },
//        { "Description": "", "TranslateKey": "email" },
//        { "Description": "", "TranslateKey": "phone" },
//        { "Description": "", "TranslateKey": "cellphone" },
//        { "Description": "", "TranslateKey": "address" },
//        { "Description": "", "TranslateKey": "password" }
//];

app.controller('ContactController', ['$scope', function ($scope, $http) {
    $scope.initializeGlobalVariables = function () {
        $scope.Errors = {};
        $scope.Contacts = contacts;
        $scope.hasResults = (contacts.length > 0);
        $scope.isForm = false;
    }

    /////////////////////////////// CONFIG

    jQuery.aop.around({ target: window, method: 'initializeGlobalVariables' }, invocationCallback);

    $scope.initializeGlobalVariables();
}]);

app.controller('SearchAction', ['$scope', '$http', function ($scope, $http) {
    $scope.http = $http;

    $scope.Search = function () {
        $scope.http.get(applicationNamePath + 'WebApi/ContactApi', $scope.Contact) // TODO: FALLA EN LA LLAMADA (Llega NULL al Server) + escape(JSON.stringify($scope.Contact))
            .success($scope.onSearchSuccess)
            .error(ErrorManager.getInstance().onGenealErrorEvent);
    };

    $scope.onSearchSuccess = function (data) {
        $scope.Errors = data.Errors;
        $scope.transactionSuccessMessage = 'emptyText';

        if (data.Errors.HasError) {
            $scope.Contacts = [];
            return;
        }

        $scope.Contacts = data.Contacts;
    };

    $scope.retrySearchCallback = function (exception, method) {
        auditManager.afterThrowRetryEvent(exception, $scope, $scope.Search, method);
    };

    jQuery.aop.around({ target: $scope, method: 'Search' }, invocationCallback);
    jQuery.aop.afterThrow({ target: $scope, method: 'Search' }, $scope.retrySearchCallback);
}]);

app.controller('CreateAction', ['$scope', '$location', '$http', function ($scope, $location, $http) {//, $filter) {
    $scope.http = $http;
    $scope.isForm = true;
    $scope.Contact = {};
    $scope.formFields = formFields;

    $scope.translateProvider = myTranslations.translateProvider;
    // //TODO:  TDD!!!!!!!!!!!!!!!!!!!!!
    //$scope.VoiceManager = new VoiceManager($scope.translateProvider, true, formFields);
    //$scope.VoiceManager.start();

    $scope.Create = function () {
        //throw new Error("What error!!!");
        $scope.http.post(applicationNamePath + 'WebApi/ContactApi', $scope.Contact)
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

        $scope.Contact.Id = data.Id;
        $scope.Contacts.push($scope.Contact);
        $scope.transactionSuccessMessage = 'transactionSuccessMessage';//$filter('translate')('transactionSuccessMessage');

        $scope.isForm = false;
        //////// TODO TDD ???!!!
        //////$scope.refreshResult();
        $location.url("/");
    };

    $scope.retryCreateCallback = function (exception, method) {
        auditManager.afterThrowRetryEvent(exception, $scope, $scope.Create, method);
    };

    jQuery.aop.around({ target: $scope, method: 'Create' }, invocationCallback);
    jQuery.aop.afterThrow({ target: $scope, method: 'Create' }, $scope.retryCreateCallback);
}]);

app.controller('DeleteAction', ['$scope', '$routeParams', '$location', '$http', function ($scope, $routeParams, $location, $http) { //, $filter
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

    $scope.retryDeleteCallback = function (exception, method) {
        auditManager.afterThrowRetryEvent(exception, $scope, $scope.Delete, method);
    };

    jQuery.aop.around({ target: $scope, method: 'Delete' }, invocationCallback);
    jQuery.aop.afterThrow({ target: $scope, method: 'Delete' }, $scope.retryDeleteCallback);
}]);

app.controller('EditAction', ['$scope', '$routeParams', '$location', '$http', function ($scope, $routeParams, $location, $http) {
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

    $scope.retryEditCallback = function (exception, method) {
        auditManager.afterThrowRetryEvent(exception, $scope, $scope.Edit, method);
    };

    jQuery.aop.around({ target: $scope, method: 'Edit' }, invocationCallback);
    jQuery.aop.afterThrow({ target: $scope, method: 'Edit' }, $scope.retryEditCallback);
}]);

app.controller('DetailsAction', ['$scope', '$routeParams', function ($scope, $routeParams) {
    var contactIndex = _.findIndex($scope.Contacts, { "Id": $routeParams.id });
    $scope.Contact = $scope.Contacts[contactIndex];
    $scope.isForm = false;
}]);
//})();