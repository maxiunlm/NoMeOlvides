var app = angular.module('app', ['ngRoute', 'pascalprecht.translate']);


/*
app.TranslateLocaleDictionaries = function (key) {
    var service = angular.injector(['ng', 'app']).get("$translate");
    return service.instant(key);
}
//*/

app.config(function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'Scripts/Contact/Templates/Search.html', controller: 'SearchAction' })
        //.when('/Create', { templateUrl: 'Scripts/Contact/Templates/Create.html', title: app.TranslateLocaleDictionaries('createContactTitle'), controller: 'CreateAction' })
        .when('/Create', { templateUrl: 'Scripts/Contact/Templates/Create.html', controller: 'CreateAction' }) // , title: 'createContactTitle'
        .when('/Details/:id', { templateUrl: 'Scripts/Contact/Templates/Details.html', controller: 'DetailsAction' }) // , title: 'detailsContactTitle'
        .when('/Edit/:id', { templateUrl: 'Scripts/Contact/Templates/Edit.html', controller: 'EditAction' }) // , title: 'editContactTitle'
        .when('/Delete/:id', { templateUrl: 'Scripts/Contact/Templates/Delete.html', controller: 'DeleteAction' }) // , title: 'deleteContactTitle'
        .otherwise({ redirectTo: '/' });
});