/// <reference path='../../../NoMeOlvides/Scripts/jquery-2.1.4.js' />
/// <reference path="../../../NoMeOlvides/Scripts/aop.js" />
/// <reference path='../../../nomeolvides/scripts/underscore.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-mocks.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-route.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate-loader-url.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/App.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/CRUD.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Common/ErrorManager.js' />
/// <reference path='Fixture/CommonFixture.js' />
/// <reference path='Fixture/ContactCommonFixture.js' />
/// <reference path='Fixture/ContactCreateFixture.js' />

describe('ContactController - ', function () {
    var rootScope;
    var controller;

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_, _$rootScope_) {
        rootScope = _$rootScope_;
        controller = _$controller_;
    }));

    describe('SearchAction - Call Http GET Method - ', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            $controller = controller('SearchAction', { $scope: $scope });
        }));

        it('Seacrh - Must call the Http GET Method to get the Contact list result', function () {
            $scope.http = httpMock;
            spyOn($scope.http, 'get').and.callThrough();

            $scope.Search();

            expect($scope.http.get).toHaveBeenCalled();
        });

        it('Invokes "jQuery.aop.around" method for "Search"', function () {
            spyOn(jQuery.aop, 'around').and.callThrough();

            $controller = controller('ContactController', { $scope: $scope });

            expect(jQuery.aop.around).toHaveBeenCalledWith({ target: $scope, method: 'Search' }, $scope.invocationCallback);
        });

        it('Invokes "jQuery.aop.afterThrow" method for "Search"', function () {
            spyOn(jQuery.aop, 'afterThrow').and.callThrough();

            $controller = controller('ContactController', { $scope: $scope });

            expect(jQuery.aop.afterThrow).toHaveBeenCalledWith({ target: $scope, method: 'Search' }, $scope.retryInvocationCallback);
        });
    });

    describe('$scope.retrySearchCallback - ', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            contacts = [];

            controller('SearchAction', { $scope: $scope });
            $controller = controller('ContactController', { $scope: $scope });
        }));

        it('Invokes "$scope.auditManager.afterThrowRetryEvent" method', function () {
            spyOn(AuditManager.prototype, 'afterThrowRetryEvent').and.callFake(function () { });

            $scope.retrySearchCallback(exception, method);

            expect(AuditManager.prototype.afterThrowRetryEvent).toHaveBeenCalledWith(exception, $scope, $scope.Search, method);
        });
    });
});