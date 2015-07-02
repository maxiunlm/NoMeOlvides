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
    var rootScope;
    var controler;

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_, _$rootScope_) {
        rootScope = _$rootScope_;
        controler = _$controller_;
    }));

    describe('EditAction - Call Http PUT Method', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            $controller = controler('EditAction', { $scope: $scope });
        }));

        it('Edit - Must call the Http Put Method for update a Contact', function () {
            $scope.http = httpMock;
            spyOn($scope.http, 'put').and.callThrough();

            $scope.Edit();

            expect($scope.http.put).toHaveBeenCalled();
        });
    });

    describe('EditAction - On success event', function () {

        beforeEach(inject(function () {
        }));

        it('Edit - onEditSuccesss - With data result of a new contact OK', function () {

        });

        it('Edit - onEditSuccesss - With data result of a new contact with ONE Error Message', function () {

        });

        it('Edit - onEditSuccesss - With data result of a new contact with TWO Error Messages', function () {

        });
    });
});