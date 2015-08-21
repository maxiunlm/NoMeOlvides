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
    });
});