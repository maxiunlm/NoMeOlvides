/// <reference path='../../../NoMeOlvides/Scripts/jquery-2.1.4.js' />
/// <reference path="../../../NoMeOlvides/Scripts/aop.js" />
/// <reference path='../../../nomeolvides/scripts/underscore.js' />
/// <reference path="../../../NoMeOlvides/Scripts/log4javascript.js" />
/// <reference path='../../../NoMeOlvides/Scripts/angular.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-mocks.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-route.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate-loader-url.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Common/ErrorManager.js" />
/// <reference path="../../../NoMeOlvides/Scripts/Common/AuditManager.js" />
/// <reference path='Fixture/ContactCommonFixture.js' />
/// <reference path="Fixture/AuditManagerCommonFixture.js" />
/// <reference path="../../../NoMeOlvides/Scripts/Common/Globals.js" />
/// <reference path="../../../NoMeOlvides/Scripts/Common/WebcamManager.js" />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/App.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/CRUD.js' />

describe('ContactController - DeleteAction - ', function () {
    var location;
    var rootScope;
    var controller;

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) { // , _$route_, _$translateProvider_
        //route = _$route_;
        location = _$location_;
        rootScope = _$rootScope_;
        controller = _$controller_;

        spyOn(console, 'log').and.callFake(function () { });
    }));

    describe('Load Delete Form - ', function () {
        var $scope;
        var $controller;
        var $routeParams;

        beforeEach(inject(function (_$routeParams_) { //
            $scope = rootScope.$new();
            $scope.Contacts = contactListX1;
            //$routeParams = _$routeParams_;
        }));

        it('Invokes the _.findIndex method to find the Contact item by its Id', function () {
            spyOn(_, 'findIndex').and.callThrough();
            $routeParams = { id: firstContact.Id };

            $controller = controller('DeleteAction', { $scope: $scope, $routeParams: $routeParams });

            expect(_.findIndex).toHaveBeenCalledWith(jasmine.any(Object), { Id: contactId });
        });

        it('Load data Contact to the Delete Form Page', function () {
            $routeParams = { id: firstContact.Id };

            $controller = controller('DeleteAction', { $scope: $scope, $routeParams: $routeParams });

            expect($scope.Contact).toBe(firstContact);
        });

        it('Stablish isForm == TRUE status for the GUI', function () {
            $routeParams = { id: firstContact.Id };

            $controller = controller('DeleteAction', { $scope: $scope, $routeParams: $routeParams });

            expect($scope.isForm).toEqual(true);
        });
        
        it('Invokes "jQuery.aop.around" method for "Delete"', function () {
            spyOn(jQuery.aop, 'around').and.callThrough();

            $controller = controller('DeleteAction', { $scope: $scope });

            expect(jQuery.aop.around).toHaveBeenCalledWith({ target: $scope, method: 'Delete' }, invocationCallback);
        });

        it('Invokes "jQuery.aop.afterThrow" method for "Delete"', function () {
            spyOn(jQuery.aop, 'afterThrow').and.callThrough();

            $controller = controller('DeleteAction', { $scope: $scope });

            expect(jQuery.aop.afterThrow).toHaveBeenCalled();//({ target: $scope, method: 'Delete' }, $scope.retryDeleteCallback);
            expect(jQuery.aop.afterThrow.calls.argsFor(firstItemIndex)[firstItemIndex].target).toEqual($scope);
            expect(jQuery.aop.afterThrow.calls.argsFor(firstItemIndex)[firstItemIndex].method).toEqual('Delete');
            expect(jQuery.aop.afterThrow.calls.argsFor(firstItemIndex)[secondItemIndex]).toEqual(jasmine.any(Function));
        });
    });

    describe('Delete -', function () {
        var $scope;
        var $controller;
        var httpBackend;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            $scope.Contacts = contactListX1;
            $scope.Contact = firstContact;
            $routeParams = { id: firstContact.Id };

            $controller = controller('DeleteAction', { $scope: $scope, $routeParams: $routeParams });
        }));

        it(' Must call the Http Post Method to delete a Contact', function () {
            $scope.http = httpMock;
            spyOn($scope.http, 'delete').and.callThrough();

            $scope.Delete();

            expect($scope.http.delete).toHaveBeenCalledWith(contactBaseUriForId + contactId, {});
        });

        it('Must call the "escape" Method for special characters on an URI', function () {
            $scope.http = httpMock;
            spyOn(window, 'escape').and.callThrough();

            $scope.Delete();

            expect(window.escape).toHaveBeenCalledWith(contactId);
        });
    });
    
    describe('Call Response Events - ', function () {
        var $scope;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            $scope.Contacts = contactListX1;
            callBackSuccessData = null;
            callBackErrorData = null;

            $controller = controller('DeleteAction', { $scope: $scope, $location: location });
        }));

        it('After call http post Method must call success event $scope.onDeleteSuccess', function() {
            $scope.http = httpMock;
            $scope.Contact = { "Id": contactId };
            callBackSuccessData = callBackSuccessDataWithoutError;
            spyOn($scope, "onDeleteSuccess").and.callFake(function (data) {
            });

            $scope.Delete();

            expect($scope.onDeleteSuccess).toHaveBeenCalledWith(callBackSuccessDataWithoutError);
        });

        it('After call http post Method must call error event ErrorManager.getInstance().onGenealErrorEvent', function() {
            $scope.http = httpMock;
            $scope.Contact = { "Id": contactId };
            callBackErrorData = callBackSuccessDataWithError;
            spyOn(ErrorManager.getInstance(), "onGenealErrorEvent").and.callFake(function (data) {
            });

            $scope.Delete();

            expect(ErrorManager.getInstance().onGenealErrorEvent).toHaveBeenCalledWith(callBackSuccessDataWithError);
        });

        it('Stablish isForm == FALSE status for the GUI', function () {
            $scope.Contact = firstContact;
            $routeParams = { id: firstContact.Id };

            $scope.Delete();

            expect($scope.isForm).toEqual(false);
        });
    });

    describe('onDeleteSuccess - ', function () {
        var $scope;
        var $controller

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            $scope.Contacts = contactListX1;
            $scope.Contact = {};
            $controller = controller('DeleteAction', { $scope: $scope, $location: location });
        }));

        it('With data result of a delete contact OK', function () {
            $scope.Contact = firstContact;
            $scope.Contacts = contactListX2;

            $scope.onDeleteSuccess(httpDataResultOk);

            expect($scope.Errors.HasError).toEqual(false);
            expect($scope.Errors.Messages.length).toEqual(emptyItemsCount);
            expect($scope.Contacts.length).toEqual(oneItemCount);
            expect(_.findIndex($scope.Contacts, { "Id": $scope.Contact.Id })).toEqual(notFoundIndex);
        });

        it('With data result of a delete contact with ONE Error Message', function () {

            $scope.onDeleteSuccess(httpDataResultErrorX1);

            expect($scope.Errors.HasError).toEqual(true);
            expect($scope.transactionSuccessMessage).toEqual(emptyTextString);
            expect($scope.Errors.Messages.length).toEqual(oneItemCount);
            expect($scope.Errors.Messages[firstItemIndex]).toEqual(errorMessage1)
        });

        it('With data result of a delete contact with TWO Error Messages', function () {

            $scope.onDeleteSuccess(httpDataResultErrorX2);

            expect($scope.Errors.HasError).toEqual(true);
            expect($scope.transactionSuccessMessage).toEqual(emptyTextString);
            expect($scope.Errors.Messages.length).toEqual(twoItemsCount);
            expect($scope.Errors.Messages[firstItemIndex]).toEqual(errorMessage1);
            expect($scope.Errors.Messages[secondItemIndex]).toEqual(errorMessage2);
        });

        it('With data result of a delete contact invokes method findIndex of Underscore object', function () {
            $scope.Contact = firstContact;
            $scope.Contacts = contactListX2;
            spyOn(_, 'findIndex').and.callThrough();

            $scope.onDeleteSuccess(httpDataResultOk);

            expect(_.findIndex).toHaveBeenCalledWith([], { Id: contactId });
        });

        it('With data result of a delete contact invokes method splice of Array.prototype object', function () {
            $scope.Contact = firstContact;
            $scope.Contacts = contactListX2;
            spyOn(Array.prototype, "splice").and.callThrough();

            $scope.onDeleteSuccess(httpDataResultOk);

            expect(Array.prototype.splice).toHaveBeenCalledWith(-1, 1);
        });

        it('With data result of a delete contact returns to root Uri', function () {
            $scope.Contact = firstContact;
            $scope.Contacts = contactListX2;

            $scope.onDeleteSuccess(httpDataResultOk);

            expect(location.path()).toBe('/');
        });
    });

    describe('$scope.retryDeleteCallback - ', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            $scope.Contacts = contactListX1;
            $routeParams = { id: firstContact.Id };
            auditManager = new AuditManager();

            $controller = controller('DeleteAction', { $scope: $scope, $routeParams: $routeParams });
        }));

        it('Invokes "$scope.auditManager.afterThrowRetryEvent" method', function () {
            spyOn(AuditManager.prototype, 'afterThrowRetryEvent').and.callFake(function () { });

            $scope.retryDeleteCallback(exception, method);

            expect(AuditManager.prototype.afterThrowRetryEvent).toHaveBeenCalledWith(exception, $scope, $scope.Delete, method);
        });
    });
});