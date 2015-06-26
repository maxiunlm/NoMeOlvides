/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/jquery-2.1.4.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/angular.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/angular-mocks.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/angular-route.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/angular-translate.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/angular-translate-loader-url.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/Contact/App.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/Contact/CRUD.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/Common/ErrorManager.js" />
var applicationNamePath = "/";

describe('ContactController', function () {
    var Contact = {};

    //var expectedResponse = { "Errors": { "HasError": false } };
    var onErrorHttpMock = {};
    onErrorHttpMock.error = function (callBack) {
    };
    var onSuccessHttpMock = {}
    onSuccessHttpMock.success = function (callBack) {
        return onErrorHttpMock;
    };
    var httpMock = {};
    httpMock.post = function (uri, form) {
        return onSuccessHttpMock;
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

    describe('CreateAction', function () {
        var $scope;
        var $location;
        var $controller;

        beforeEach(inject(function ($injector, $httpBackend) {
            $scope = rootScope.$new();
            //$httpBackend = $injector.get('$httpBackend');

            $controller = controller('CreateAction', { $scope: $scope, $location: location, $httpBackend: $httpBackend });
        }));

        it('Create - Must do the Http Post Method call', function () { //$controller// <-- Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.
            $scope.Contact = Contact;
            $scope.http = httpMock;
            spyOn($scope.http, 'post').and.callThrough();
            //// XOR
            ////$scope.http = jasmine.createSpyObj('http', ['post']);
            ////$scope.http.post.and.callFake(httpMock.post);

            $scope.Create();

            expect($scope.http.post).toHaveBeenCalled();
            //expect(isPostCalled).toEqual(true);
        });
    });
});