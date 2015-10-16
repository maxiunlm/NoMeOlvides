/// <reference path='../../../NoMeOlvides/Scripts/jquery-2.1.4.js' />
/// <reference path='../../../nomeolvides/scripts/underscore.js' />
/// <reference path="../../../NoMeOlvides/Scripts/log4javascript.js" />
/// <reference path='../../../NoMeOlvides/Scripts/angular.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-mocks.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-route.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate-loader-url.js' />
/// <reference path='Fixture/ContactCommonFixture.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Common/AuditManager.js' />
/// <reference path="../../../NoMeOlvides/Scripts/Common/Globals.js" />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/App.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/CRUD.js' />

describe('ContactController', function () {
    var rootScope;
    var controller;

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_, _$rootScope_) {
        controller = _$controller_;
        rootScope = _$rootScope_;
    }));

    describe('DetailsAction - Load Details Form - ', function () {
        var $scope;
        var $controller;
        var $routeParams;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            $scope.Contacts = contactListX1;
        }));

        it('DetailsAction - Invokes the _.findIndex method to find the Contact item by its Id', function () {
            spyOn(_, 'findIndex').and.callThrough();
            $routeParams = { id: firstContact.Id };

            $controller = controller('DetailsAction', { $scope: $scope, $routeParams: $routeParams });

            expect(_.findIndex).toHaveBeenCalled();
        });

        it('DetailsAction - Load data Contact to the Details Form Page', function () {
            $routeParams = { id: firstContact.Id };

            $controller = controller('DetailsAction', { $scope: $scope, $routeParams: $routeParams });

            expect($scope.Contact).toBe(firstContact);
        });

        it('DetailsAction - Stablish isForm == false status for the GUI', function () {
            $routeParams = { id: firstContact.Id };

            $controller = controller('DetailsAction', { $scope: $scope, $routeParams: $routeParams });

            expect($scope.isForm).toEqual(false);
        });
    });
});