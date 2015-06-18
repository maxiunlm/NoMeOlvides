var app = angular.module('app', ['ngRoute', 'pascalprecht.translate']);


/*
app.TranslateLocaleDictionaries = function (key) {
    var service = angular.injector(['ng', 'app']).get("$translate");
    return service.instant(key);
}
//*/

app.config(function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'Scripts/Contact/Templates/List.html' })
        //.when('/Create', { templateUrl: 'Scripts/Contact/Templates/Create.html', title: app.TranslateLocaleDictionaries('CreateContactTitle'), controller: 'CreateAction' })
        .when('/Create', { templateUrl: 'Scripts/Contact/Templates/Create.html', controller: 'CreateAction' }) // , title: 'CreateContactTitle'
        .when('/Details/:id', { templateUrl: 'Scripts/Contact/Templates/Details.html', controller: 'DetailsAction' }) // , title: 'DetailsContactTitle'
        .when('/Edit/:id', { templateUrl: 'Scripts/Contact/Templates/Edit.html', controller: 'EditAction' }) // , title: 'EditContactTitle'
        .when('/Delete/:id', { templateUrl: 'Scripts/Contact/Templates/Delete.html', controller: 'DeleteAction' }) // , title: 'DeleteContactTitle'
        .otherwise({ redirectTo: '/' });
});