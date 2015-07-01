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

    describe('DeleteAction - Call Http Methods', function () {
        var $scope;
        var $controller;
        var httpBackend;
        //var filter

        beforeEach(inject(function ($injector, $httpBackend) { //, $filter
            //$httpBackend = $injector.get('$httpBackend');
            $scope = rootScope.$new();
            httpBackend = $httpBackend;
            //filter = $filter
            $scope.Contact = Contact;
            callBackErrorData = null;
            callBackSuccessData = null;

            $controller = controller('DeleteAction', { $scope: $scope, $location: location, $httpBackend: httpBackend });//, $filter: filter });
            originalHttp = $scope.http;
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

    describe('DeleteAction - On success event', function () {
        var $scope;
        var $controller

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            $controller = controller('DeleteAction', { $scope: $scope });
        }));

        it('Delete - onDeleteSuccesss- With data result of a delete contact OK', function () {
            $scope.Contact = { "Id": contactId };

            $scope.onDeleteSuccesss(httpDataResultOk);

            expect($scope.Errors.HasError).toEqual(false);
            expect($scope.Errors.Messages.length).toEqual(emptyItemsCount);
        });

        it('Delete - onDeleteSuccesss- With data result of a delete contact with ONE Error Message', function () {
            $scope.Contact = { "Id": contactId };

            $scope.onDeleteSuccesss(httpDataResultErrorX1);

            expect($scope.Errors.HasError).toEqual(true);
            expect($scope.transactionSuccessMessage).toEqual('emptyText');
            expect($scope.Errors.Messages.length).toEqual(oneItemCount);
            expect($scope.Errors.Messages[firstItemIndex]).toEqual(errorMessage1)
        });

        it('Delete - onDeleteSuccesss- With data result of a delete contact with Two Error Messages', function () {
            $scope.Contact = { "Id": contactId };

            $scope.onDeleteSuccesss(httpDataResultErrorX2);

            expect($scope.Errors.HasError).toEqual(true);
            expect($scope.transactionSuccessMessage).toEqual('emptyText');
            expect($scope.Errors.Messages.length).toEqual(twoItemsCount);
            expect($scope.Errors.Messages[firstItemIndex]).toEqual(errorMessage1);
            expect($scope.Errors.Messages[secondItemIndex]).toEqual(errorMessage2);
        });
    });
});