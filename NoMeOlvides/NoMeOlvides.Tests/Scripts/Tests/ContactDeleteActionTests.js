/// <reference path='../../../NoMeOlvides/Scripts/jquery-2.1.4.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-mocks.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-route.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate-loader-url.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/App.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/CRUD.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Common/ErrorManager.js" />
/// <reference path="Fixture/ContactCommonFixture.js" />

describe('ContactController', function () {
    var Contact = {};
    var callBackErrorData = null;
    var callBackSuccessData = null;
    var callBackSuccessDataWithoutError = { "Errors": { "HasError": false } };
    var callBackSuccessDataWithError = { "Errors": { "HasError": true, "Messages": ["Has an Error"] } };

    var httpMock = {};
    httpMock.post = function (uri, form) {
        return this;
    };
    httpMock.success = function (callBack) {
        if (callBack && callBackSuccessData != null) {
            callBack(callBackSuccessData);
        }
        return this;
    };
    httpMock.error = function (callBack) {
        if (callBack && callBackErrorData != null) {
            callBack(callBackErrorData);
        }
        return this;
    };

    var location;
    var rootScope;
    var route;
    var controller;

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_, _$location_, _$route_, _$rootScope_) { // , _$translateProvider_ ???
        location = _$location_;
        rootScope = _$rootScope_;
        route = _$route_;
        controller = _$controller_;
    }));

    describe('CreadteAction - Call Http Methods', function () {
        var $scope;
        var $controller;
        var httpBackend;

        beforeEach(inject(function ($injector, $httpBackend) {
            //$httpBackend = $injector.get('$httpBackend');
            $scope = rootScope.$new();
            httpBackend = $httpBackend;
            $scope.Contact = Contact;
            callBackErrorData = null;
            callBackSuccessData = null;

            $controller = controller('DeleteAction', { $scope: $scope, $location: location, $httpBackend: httpBackend });
            originalHttp = $scope.http;
        }));

        it('Delete - Must call the Http Post Method for delete a Contact', function () {
            $scope.http = httpMock;
            spyOn($scope.http, 'post').and.callThrough();

            $scope.Delete();

            expect($scope.http.post).toHaveBeenCalled();
        });
    });
});