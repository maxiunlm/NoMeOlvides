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
    //var location;
    //var route;
    var rootScope;
    var controller;

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_, _$rootScope_) { // , _$location_, _$route_, _$translateProvider_
        //location = _$location_;
        //route = _$route_;
        rootScope = _$rootScope_;
        controller = _$controller_;
    }));

    describe('DeleteAction - Call Http DELETE Method', function () {
        var $scope;
        var $controller;
        var httpBackend;
        //var filter

        beforeEach(inject(function () { //$injector, $httpBackend, $filter
            //$httpBackend = $injector.get('$httpBackend');
            //httpBackend = $httpBackend;
            //filter = $filter
            $scope = rootScope.$new();
            $scope.Contact = Contact;

            $controller = controller('DeleteAction', { $scope: $scope });//, $location: location, $httpBackend: httpBackend, $filter: filter });
        }));

        it('Delete - Must call the Http Post Method for delete a Contact', function () {
            $scope.http = httpMock;
            spyOn($scope.http, 'delete').and.callThrough();

            $scope.Delete();

            expect($scope.http.delete).toHaveBeenCalled();
        });

        it('Delete - Must call the "escape" Method for special characters on an URI', function () {
            $scope.http = httpMock;
            spyOn(window, 'escape').and.callThrough();

            $scope.Delete();

            expect(window.escape).toHaveBeenCalled();
        });
    });
    
    describe('DeleteAction - Call Response Events', function () {
        var $scope;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            callBackSuccessData = null;
            callBackErrorData = null;

            $controller = controller('DeleteAction', { $scope: $scope, $location: location });
        }));

        it('Delete - After call http post Method must call success event $scope.onDeleteSuccess', inject(function ($http, $httpBackend) {
            $scope.http = httpMock;
            $scope.Contact = { "Id": contactId };
            callBackSuccessData = callBackSuccessDataWithoutError;
            spyOn($scope, "onDeleteSuccess").and.callFake(function (data) {
            });

            $scope.Delete();

            expect($scope.onDeleteSuccess).toHaveBeenCalled();
        }));

        it('Delete - After call http post Method must call error event ErrorManager.getInstance().onGenealErrorEvent', inject(function ($http, $httpBackend) {
            $scope.http = httpMock;
            $scope.Contact = { "Id": contactId };
            callBackErrorData = callBackSuccessDataWithError;
            spyOn(ErrorManager.getInstance(), "onGenealErrorEvent").and.callFake(function (data) {
            });

            $scope.Delete();

            expect(ErrorManager.getInstance().onGenealErrorEvent).toHaveBeenCalled();
        }));
    });

    describe('DeleteAction - On success event', function () {
        var $scope;
        var $controller

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            $controller = controller('DeleteAction', { $scope: $scope });
        }));

        it('Delete - onDeleteSuccess - With data result of a delete contact OK', function () {
            $scope.Contact = { "Id": contactId };

            $scope.onDeleteSuccess(httpDataResultOk);

            expect($scope.Errors.HasError).toEqual(false);
            expect($scope.Errors.Messages.length).toEqual(emptyItemsCount);
        });

        it('Delete - onDeleteSuccess - With data result of a delete contact with ONE Error Message', function () {

            $scope.onDeleteSuccess(httpDataResultErrorX1);

            expect($scope.Errors.HasError).toEqual(true);
            expect($scope.transactionSuccessMessage).toEqual('emptyText');
            expect($scope.Errors.Messages.length).toEqual(oneItemCount);
            expect($scope.Errors.Messages[firstItemIndex]).toEqual(errorMessage1)
        });

        it('Delete - onDeleteSuccess - With data result of a delete contact with Two Error Messages', function () {

            $scope.onDeleteSuccess(httpDataResultErrorX2);

            expect($scope.Errors.HasError).toEqual(true);
            expect($scope.transactionSuccessMessage).toEqual('emptyText');
            expect($scope.Errors.Messages.length).toEqual(twoItemsCount);
            expect($scope.Errors.Messages[firstItemIndex]).toEqual(errorMessage1);
            expect($scope.Errors.Messages[secondItemIndex]).toEqual(errorMessage2);
        });
    });
});