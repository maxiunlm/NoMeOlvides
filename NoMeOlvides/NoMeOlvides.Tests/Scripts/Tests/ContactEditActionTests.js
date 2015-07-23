/// <reference path='../../../NoMeOlvides/Scripts/jquery-2.1.4.js' />
/// <reference path="../../../nomeolvides/scripts/underscore.js" />
/// <reference path='../../../NoMeOlvides/Scripts/angular.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-mocks.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-route.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate-loader-url.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/App.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/CRUD.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Common/ErrorManager.js" />
/// <reference path="Fixture/ContactCommonFixture.js" />

describe('ContactController - ', function () {
    var rootScope;
    var controller;
    var location;

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
        rootScope = _$rootScope_;
        controller = _$controller_;
        location = _$location_;
    }));

    describe('EditAction - Load Edit Form - ', function () {
        var $scope;
        var $controller;
        var $routeParams;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            $scope.Contacts = contactListX1;
        }));

        it('EditAction - Invokes the _.findIndex method to find the Contact item by its Id', function () {
            spyOn(_, 'findIndex').and.callThrough();
            $routeParams = { id: firstContact.Id };

            $controller = controller('EditAction', { $scope: $scope, $routeParams: $routeParams });

            expect(_.findIndex).toHaveBeenCalled();
        });

        it('EditAction - Load data Contact to the Edit Form Page', function () {
            $routeParams = { id: firstContact.Id };

            $controller = controller('EditAction', { $scope: $scope, $routeParams: $routeParams });

            expect($scope.Contact).toBe(firstContact);
        });

        it('EditAction - Stablish isForm == TRUE status for the GUI', function () {
            $routeParams = { id: firstContact.Id };

            $controller = controller('EditAction', { $scope: $scope, $routeParams: $routeParams });

            expect($scope.isForm).toEqual(true);
        });
    });

    describe('EditAction - Call Http PUT Method - ', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            $scope.Contacts = contactListX1;

            $controller = controller('EditAction', { $scope: $scope });
        }));

        it('Edit - Must call the Http Put Method for update a Contact', function () {
            $scope.http = httpMock;
            spyOn($scope.http, 'put').and.callThrough();

            $scope.Edit();

            expect($scope.http.put).toHaveBeenCalled();
        });
    });

    describe('EditAction - Call Response Events - ', function () {
        var $scope;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            $scope.Contacts = contactListX1;
            callBackSuccessData = null;
            callBackErrorData = null;

            $controller = controller('EditAction', { $scope: $scope, $location: location });
        }));

        it('Edit - After call http post Method must call success event $scope.onEditSuccess', inject(function ($http, $httpBackend) {
            $scope.http = httpMock;
            callBackSuccessData = callBackSuccessDataWithoutError;
            spyOn($scope, "onEditSuccess").and.callFake(function (data) {
            });
            
            $scope.Edit();

            expect($scope.onEditSuccess).toHaveBeenCalled();
        }));

        it('Edit - After call http post Method must call error event ErrorManager.getInstance().onGenealErrorEvent', inject(function ($http, $httpBackend) {
            $scope.http = httpMock;
            callBackErrorData = callBackSuccessDataWithError;
            spyOn(ErrorManager.getInstance(), "onGenealErrorEvent").and.callFake(function (data) {
            });

            $scope.Edit();

            expect(ErrorManager.getInstance().onGenealErrorEvent).toHaveBeenCalled();
        }));

        it('Edit - Stablish isForm == FALSE status for the GUI', function () {

            $scope.Edit();

            expect($scope.isForm).toEqual(false);
        });
    });

    describe('EditAction - On success event - ', function () {
        var $scope;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            $scope.Contacts = contactListX1;
            $scope.Contact = {};

            $controller = controller('EditAction', { $scope: $scope, $location: location });
        }));

        it('Edit - onEditSuccess - With data result of a modificated contact OK', function () {
            $scope.Contact = firstContact;

            $scope.onEditSuccess(httpDataResultOk);

            expect($scope.transactionSuccessMessage).toEqual('transactionSuccessMessage'); // TODO: VER !!! 'Your operation was successful');
            expect($scope.Errors.HasError).toEqual(false);
            expect($scope.Errors.Messages.length).toEqual(emptyItemsCount);
        });

        it('Edit - onEditSuccess - With data result of a modificated contact with ONE Error Message', function () {

            $scope.onEditSuccess(httpDataResultErrorX1);

            expect($scope.Errors.HasError).toEqual(true);
            expect($scope.transactionSuccessMessage).toEqual('emptyText');
            expect($scope.Errors.Messages.length).toEqual(oneItemCount);
            expect($scope.Errors.Messages[firstItemIndex]).toEqual(errorMessage1)
        });

        it('Edit - onEditSuccess - With data result of a modificated contact with TWO Error Messages', function () {

            $scope.onEditSuccess(httpDataResultErrorX2);

            expect($scope.Errors.HasError).toEqual(true);
            expect($scope.transactionSuccessMessage).toEqual('emptyText');
            expect($scope.Errors.Messages.length).toEqual(twoItemsCount);
            expect($scope.Errors.Messages[firstItemIndex]).toEqual(errorMessage1);
            expect($scope.Errors.Messages[secondItemIndex]).toEqual(errorMessage2);
        });

        it('Edit - onEditSuccess - With data result of a modificated contact returns to root Uri', function () {
            $scope.Contact = firstContact;

            $scope.onEditSuccess(httpDataResultOk);

            expect(location.path()).toBe('/');
        });
    });
});