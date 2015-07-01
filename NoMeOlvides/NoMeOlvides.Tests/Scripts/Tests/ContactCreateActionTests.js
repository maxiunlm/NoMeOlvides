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
/// <reference path="Fixture/ContactCreateFixture.js" />

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

    describe('CreadteAction - Call Http Methods', function () {
        var $scope;
        var $controller;
        var httpBackend;

        beforeEach(inject(function ($injector, $httpBackend) {
            //$httpBackend = $injector.get('$httpBackend');
            $scope = rootScope.$new();
            httpBackend = $httpBackend;
            $scope.Contact = Contact;
            callBackErrorData = null;
            callBackSuccessData = null;

            $controller = controller('CreateAction', { $scope: $scope, $location: location, $httpBackend: httpBackend });
            originalHttp = $scope.http;
        }));

        it('Create - Must call the Http Post Method for a new Contact', function () { //$controller// <-- Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.
            $scope.http = httpMock;
            spyOn($scope.http, 'post').and.callThrough();
            //// XOR
            ////$scope.http = jasmine.createSpyObj('http', ['post']);
            ////$scope.http.post.and.callFake(httpMock.post);

            $scope.Create();

            expect($scope.http.post).toHaveBeenCalled();
        });
    });


    describe('CreateAction - On success event', function () {
        var $scope;
        var $controller;
        //var $location;
        //var $http;

        beforeEach(inject(function () { //$httpBackend
            $scope = rootScope.$new();
            $scope.Contacts = [];
            newContact.Id = null;

            $controller = controller('CreateAction', { $scope: $scope });

            //$http = $httpBackend;
        }));


        it('Create - onCreateSuccesss- With data result of a new contact OK', function () {
            $scope.Contact = newContact;

            $scope.onCreateSuccesss(httpDataResultOk);

            expect($scope.Contact.Id).not.toBeUndefined();
            expect($scope.Contact.Id).not.toBeNull();
            expect($scope.transactionSuccessMessage).toEqual('transactionSuccessMessage'); // TODO: VER !!! 'Your operation was successful');
            expect($scope.Errors.HasError).toEqual(false);
            expect($scope.Errors.Messages.length).toEqual(emptyItemsCount);
        });

        it('Create - onCreateSuccesss- With data result of a new contact with ONE Error Message', function () {
            $scope.Contact = newContact;

            $scope.onCreateSuccesss(httpDataResultErrorX1);

            //expect($scope.Contact.Id).toBeUndefined();
            expect($scope.Contact.Id).toBeNull();
            expect($scope.Errors.HasError).toEqual(true);
            expect($scope.transactionSuccessMessage).toEqual('emptyText');
            expect($scope.Errors.Messages.length).toEqual(oneItemCount);
            expect($scope.Errors.Messages[firstItemIndex]).toEqual(errorMessage1);
        });

        it('Create - onCreateSuccesss- With data result of a new contact with TWO Error Messages', function () {
            $scope.Contact = newContact;

            $scope.onCreateSuccesss(httpDataResultErrorX2);

            //expect($scope.Contact.Id).toBeUndefined();
            expect($scope.Contact.Id).toBeNull();
            expect($scope.Errors.HasError).toEqual(true);
            expect($scope.transactionSuccessMessage).toEqual('emptyText');
            expect($scope.Errors.Messages.length).toEqual(twoItemsCount);
            expect($scope.Errors.Messages[firstItemIndex]).toEqual(errorMessage1);
            expect($scope.Errors.Messages[secondItemIndex]).toEqual(errorMessage2);
        });
    });

    //describe('CreateAction - Call Success Events', function () {
    //    var $scope;
    //    var $controller;

    //    beforeEach(inject(function ($httpBackend) {
    //        //$httpBackend = $injector.get('$httpBackend');
    //        $scope = rootScope.$new();
    //        $scope.Contact = Contact;

    //        $controller = controller('CreateAction', { $scope: $scope, $location: location, $httpBackend: $httpBackend });
    //    }));

    //    //it('Create - After call http post Method must call success event $scope.onCreateSuccesss', inject(function ($http, $httpBackend) {
    //    //    var url = '/path/to/resource',
    //    //    header = { 'LWSSO': 'token value' };

    //    //    spyOn($scope, 'onCreateSuccesss').and.callFake(function (data) {
    //    //        return;
    //    //    });
    //    //    errorCallback = jasmine.createSpy('error');

    //    //    $httpBackend.expectPOST(applicationNamePath + 'ContactApi', Contact, function (headers) {
    //    //        // check if the header was send, if it wasn't the expectation won't match the request and the test will fail
    //    //        return headers['LWSSO'] === 'token value';
    //    //    }).respond(200, JSON.stringify(callBackSuccessDataWithoutError));

    //    //    $scope.Create();

    //    //    expect($scope.onCreateSuccesss).toHaveBeenCalled();
    //    //}));

    //    ////it("expects POST http calls and returns mock data", inject(function ($http, $httpBackend) {
    //    ////    $scope.http = $http;
    //    ////    var url = applicationNamePath + 'ContactApi',
    //    ////        data = Contact,
    //    ////        header = {'LWSSO': 'token value'},
    //    ////        successCallback = jasmine.createSpy('success'),
    //    ////        errorCallback = jasmine.createSpy('error');

    //    ////    // Create expectation
    //    ////    // headers is a unction that receives http header object and returns true
    //    ////    // if the headers match the current expectation.
    //    ////    $httpBackend.expectPOST(url, data, function(headers) {
    //    ////        // check if the header was send, if it wasn't the expectation won't
    //    ////        // match the request and the test will fail
    //    ////        return headers['LWSSO'] === 'token value';
    //    ////    }).respond(200, JSON.stringify(callBackSuccessDataWithoutError));

    //    ////    // Call http service
    //    ////    $scope.http({
    //    ////        method: 'POST',
    //    ////        url: url,
    //    ////        data: data,
    //    ////        headers: header
    //    ////    }).success(successCallback).error(errorCallback);

    //    ////    // flush response
    //    ////    $httpBackend.flush();

    //    ////    // Verify expectations
    //    ////    expect(successCallback).toHaveBeenCalled();
    //    ////    expect(successCallback.mostRecentCall.args).toContain(JSON.stringify(callBackSuccessDataWithoutError));
    //    ////    expect(successCallback.mostRecentCall.args).toContain(200);
    //    ////}));
    //});
});