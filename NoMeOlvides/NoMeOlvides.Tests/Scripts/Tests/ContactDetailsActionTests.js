/// <reference path='../../../NoMeOlvides/Scripts/jquery-2.1.4.js' />
/// <reference path='../../../nomeolvides/scripts/underscore.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-mocks.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-route.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate-loader-url.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/App.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/CRUD.js' />
/// <reference path='Fixture/ContactCommonFixture.js' />

describe('ContactController', function () {
    var location;
    var rootScope;
    var controller;

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
        controller = _$controller_;
        rootScope = _$rootScope_;
        location = _$location_;
    }));

    describe('DetailsAction - on Back event', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function () {
            $scope = rootScope.$new();

            $controller = controller('DetailsAction', { $scope: $scope, $location: location });
        }));

        it('DetailsAction - onDetailsBack - returns to the root Uri', function () {

            $scope.onDetailsBack();

            expect(location.path()).toBe('/');
        });
    });
});