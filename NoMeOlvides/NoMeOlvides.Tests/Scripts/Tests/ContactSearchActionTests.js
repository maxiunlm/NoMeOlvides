/// <reference path='../../../NoMeOlvides/Scripts/jquery-2.1.4.js' />
/// <reference path="../../../NoMeOlvides/Scripts/aop.js" />
/// <reference path='../../../nomeolvides/scripts/underscore.js' />
/// <reference path="../../../NoMeOlvides/Scripts/log4javascript.js" />
/// <reference path='../../../NoMeOlvides/Scripts/angular.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-mocks.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-route.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate-loader-url.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Common/ErrorManager.js' />
/// <reference path="../../../NoMeOlvides/Scripts/Common/AuditManager.js" />
/// <reference path='Fixture/CommonFixture.js' />
/// <reference path='Fixture/ContactCommonFixture.js' />
/// <reference path="Fixture/AuditManagerCommonFixture.js" />
/// <reference path="../../../NoMeOlvides/Scripts/Common/Globals.js" />
/// <reference path="../../../NoMeOlvides/Scripts/Common/WebcamManager.js" />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/App.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/CRUD.js' />

describe('ContactController - SearchAction - ', function () {
    var rootScope;
    var controller;
    var location;

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
        rootScope = _$rootScope_;
        controller = _$controller_;
        location = _$location_;

        spyOn(console, 'log').and.callFake(function () { });
    }));

    describe('Load Search Action Form - ', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
        }));
        
        it('Invokes "jQuery.aop.around" method for "Search"', function () {
            spyOn(jQuery.aop, 'around').and.callThrough();

            $controller = controller('SearchAction', { $scope: $scope });

            expect(jQuery.aop.around).toHaveBeenCalledWith({ target: $scope, method: 'Search' }, invocationCallback);
        });

        it('Invokes "jQuery.aop.afterThrow" method for "Search"', function () {
            spyOn(jQuery.aop, 'afterThrow').and.callThrough();

            $controller = controller('SearchAction', { $scope: $scope });

            expect(jQuery.aop.afterThrow).toHaveBeenCalled();//({ target: $scope, method: 'Search' }, $scope.retrySearchCallback);
            expect(jQuery.aop.afterThrow.calls.argsFor(firstItemIndex)[firstItemIndex].target).toEqual($scope);
            expect(jQuery.aop.afterThrow.calls.argsFor(firstItemIndex)[firstItemIndex].method).toEqual('Search');
            expect(jQuery.aop.afterThrow.calls.argsFor(firstItemIndex)[secondItemIndex]).toEqual(jasmine.any(Function));
        });
    });

    describe('Seacrh - ', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            $controller = controller('SearchAction', { $scope: $scope });
        }));

        it('Must call the Http GET Method to get the Contact list result', function () {
            $scope.http = httpMock;
            $scope.Contact = searchContactWithAllTheFields;
            spyOn($scope.http, 'get').and.callThrough();

            $scope.Search();

            expect($scope.http.get).toHaveBeenCalledWith(contactBaseUri, $scope.Contact);
        });
    });

    describe('Call Response Events', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            $scope.Contacts = undefined;
            callBackSuccessData = null;
            callBackErrorData = null;

            $controller = controller('SearchAction', { $scope: $scope, $location: location });
        }));

        it('Search - After call http post Method must call success event $scope.onSearchSuccess', function() {
            $scope.http = httpMock;
            $scope.Contact = searchContactWithAllTheFields;
            callBackSuccessData = callBackSuccessDataWithoutError;
            spyOn($scope, 'onSearchSuccess').and.callFake(function (data) {
            });

            $scope.Search();

            expect($scope.onSearchSuccess).toHaveBeenCalledWith(callBackSuccessDataWithoutError);
        });

        it('Search - After call http post Method must call error event ErrorManager.getInstance().onGenealErrorEvent', function() {
            $scope.http = httpMock;
            $scope.Contact = searchContactWithAllTheFields;
            callBackErrorData = callBackSuccessDataWithError;
            spyOn(ErrorManager.getInstance(), "onGenealErrorEvent").and.callFake(function (data) {
            });

            $scope.Search();

            expect(ErrorManager.getInstance().onGenealErrorEvent).toHaveBeenCalledWith(callBackSuccessDataWithError);
        });
    });

    describe('onSearchSuccess - ', function () {
        beforeEach(inject(function () {
            $scope = rootScope.$new();
            $scope.Contacts = [];
            $scope.Contact = {};
            $controller = controller('SearchAction', { $scope: $scope, $location: location });
        }));

        it('With data result of a search contact with ONE Error Message', function () {

            $scope.onSearchSuccess(httpDataResultErrorX1);

            expect($scope.Errors.HasError).toEqual(true);
            expect($scope.transactionSuccessMessage).toEqual(emptyTextString);
            expect($scope.Errors.Messages.length).toEqual(oneItemCount);
            expect($scope.Errors.Messages[firstItemIndex]).toEqual(errorMessage1)
        });

        it('With data result of a search contact with TWO Error Messages', function () {

            $scope.onSearchSuccess(httpDataResultErrorX2);

            expect($scope.Errors.HasError).toEqual(true);
            expect($scope.transactionSuccessMessage).toEqual(emptyTextString);
            expect($scope.Errors.Messages.length).toEqual(twoItemsCount);
            expect($scope.Errors.Messages[firstItemIndex]).toEqual(errorMessage1);
            expect($scope.Errors.Messages[secondItemIndex]).toEqual(errorMessage2);
        });

        it('With data result of a search contact OK', function () {

            $scope.onDeleteSuccess(contactListX1);

            expect($scope.Errors.HasError).toEqual(false);
            expect($scope.Errors.Messages.length).toEqual(emptyItemsCount);
            expect($scope.Contacts.length).toEqual(oneItemCount);
            expect(_.findIndex($scope.Contacts, { "Id": $scope.Contact.Id })).toEqual(firstItemIndex);
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