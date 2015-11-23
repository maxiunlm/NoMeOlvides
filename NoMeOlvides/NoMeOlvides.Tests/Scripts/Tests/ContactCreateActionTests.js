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
/// <reference path='Fixture/ContactCreateFixture.js' />
/// <reference path="Fixture/AuditManagerCommonFixture.js" />
/// <reference path='Fixture/VoiceFormFixture.js' />
/// <reference path='Fixture/VoiceManagerFixture.js' />
/// <reference path="../../../NoMeOlvides/Scripts/Common/Globals.js" />
/// <reference path="../../../NoMeOlvides/Scripts/Common/WebcamManager.js" />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/App.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Common/TranslateProvider.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Common/VoiceForm.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Common/VoiceManager.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/CRUD.js' />

describe('ContactController - CreateAction - ', function () {
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

        spyOn(console, 'log').and.callFake(function () { });
    }));

    describe('Load Creadte Form - ', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function () { 
            $scope = rootScope.$new();
            $scope.Contacts = contactListX1;

            //controller('ContactController', { $scope: $scope });
            $controller = controller('CreateAction', { $scope: $scope, $http: httpMock});
        }));

        it('Load the "$scope.Contact" object data', function () {


            expect($scope.Contact).toBeDefined();
            expect($scope.isForm).toBeTruthy();
            expect($scope.http).toEqual(httpMock);
            expect($scope.formFields).toEqual(formFields);
            expect($scope.translateProvider).toEqual(myTranslations.translateProvider);
            expect($scope.VoiceManager instanceof VoiceManager).toBeTruthy();
        });

        it('Invokes "jQuery.aop.afterThrow" method for "Create"', function () {
            spyOn(jQuery.aop, 'afterThrow').and.callThrough();

            $controller = controller('CreateAction', { $scope: $scope });

            expect(jQuery.aop.afterThrow).toHaveBeenCalled();//({ target: $scope, method: 'Create' }, $scope.retryCreateCallback);
            expect(jQuery.aop.afterThrow.calls.argsFor(firstItemIndex)[firstItemIndex].target).toEqual($scope);
            expect(jQuery.aop.afterThrow.calls.argsFor(firstItemIndex)[firstItemIndex].method).toEqual('Create');
            expect(jQuery.aop.afterThrow.calls.argsFor(firstItemIndex)[secondItemIndex]).toEqual(jasmine.any(Function));
        });

        it('Invokes "jQuery.aop.around" method for "Create"', function () {
            spyOn(jQuery.aop, 'around').and.callThrough();

            $controller = controller('CreateAction', { $scope: $scope });

            expect(jQuery.aop.around).toHaveBeenCalledWith({ target: $scope, method: 'Create' }, invocationCallback);
        });

        it('Instance the "$scope.formFields" array', function () {


            expect($scope.formFields).toBeDefined();
            expect($scope.formFields instanceof Array).toBeTruthy();
        });
    });

    describe('Call Http POST Method - Create - ', function () {
        var $scope;
        var $controller;
        //var httpBackend;

        beforeEach(inject(function () { //$injector, $httpBackend
            //$httpBackend = $injector.get('$httpBackend');
            //httpBackend = $httpBackend;
            $scope = rootScope.$new();
            $scope.Contact = newContact;

            $controller = controller('CreateAction', { $scope: $scope }); // , $location: location, $httpBackend: httpBackend
        }));

        it('Must call the Http Post Method to a new Contact', function () { //$controller// <-- Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.
            $scope.http = httpMock;
            spyOn($scope.http, 'post').and.callThrough();
            //// XOR
            ////$scope.http = jasmine.createSpyObj('http', ['post']);
            ////$scope.http.post.and.callFake(httpMock.post);

            $scope.Create();

            expect($scope.http.post).toHaveBeenCalledWith('/WebApi/ContactApi', jasmine.any(Object));
        });
    });

    describe('Call Response Events - Create - ', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function ($httpBackend) {
            //$httpBackend = $injector.get('$httpBackend');
            $scope = rootScope.$new();
            callBackSuccessData = null;
            callBackErrorData = null;

            $controller = controller('CreateAction', { $scope: $scope, $location: location, $httpBackend: $httpBackend });
        }));

        it('After call http post Method must call success event $scope.onCreateSuccess', inject(function ($http, $httpBackend) {
            $scope.http = httpMock;
            callBackSuccessData = callBackSuccessDataWithoutError;
            spyOn($scope, 'onCreateSuccess').and.callFake(function (data) {
            });

            $scope.Create();

            expect($scope.onCreateSuccess).toHaveBeenCalledWith(callBackSuccessDataWithoutError);
        }));

        it('After call http post Method must call error event ErrorManager.getInstance().onGenealErrorEvent', inject(function ($http, $httpBackend) {
            $scope.http = httpMock;
            callBackErrorData = callBackSuccessDataWithError;
            //////errorCallback = jasmine.createSpy('error'); ???? COMO es de esta manera ????
            spyOn(ErrorManager.getInstance(), 'onGenealErrorEvent').and.callFake(function (data) {
            });

            $scope.Create();

            expect(ErrorManager.getInstance().onGenealErrorEvent).toHaveBeenCalledWith(callBackSuccessDataWithError);
        }));

        //    ////it('expects POST http calls and returns mock data', inject(function ($http, $httpBackend) {
        //    ////    $scope.http = $http;
        //    ////    var url = applicationNamePath + 'WebApi/ContactApi',
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
    });

    describe('On success event - Create - onCreateSuccess - ', function () {
        var $scope;
        var $controller;
        //var $location;
        //var $http;

        beforeEach(inject(function () { //$httpBackend
            $scope = rootScope.$new();
            $scope.Contacts = [];
            newContact.Id = null;

            $controller = controller('CreateAction', { $scope: $scope, $location: location });

            //$http = $httpBackend;
        }));


        it('With data result of a new contact OK', function () {
            $scope.Contact = newContact;

            $scope.onCreateSuccess(httpDataResultOk);

            expect($scope.Contact.Id).not.toBeUndefined();
            expect($scope.Contact.Id).not.toBeNull();
            expect($scope.transactionSuccessMessage).toEqual('transactionSuccessMessage');
            expect($scope.Errors.HasError).toEqual(false);
            expect($scope.Errors.Messages.length).toEqual(emptyItemsCount);
        });

        it('With data result of a new contact with ONE Error Message', function () {
            $scope.Contact = newContact;

            $scope.onCreateSuccess(httpDataResultErrorX1);

            //expect($scope.Contact.Id).toBeUndefined();
            expect($scope.Contact.Id).toBeNull();
            expect($scope.Errors.HasError).toEqual(true);
            expect($scope.transactionSuccessMessage).toEqual('emptyText');
            expect($scope.Errors.Messages.length).toEqual(oneItemCount);
            expect($scope.Errors.Messages[firstItemIndex]).toEqual(errorMessage1);
        });

        it('With data result of a new contact with TWO Error Messages', function () {
            $scope.Contact = newContact;

            $scope.onCreateSuccess(httpDataResultErrorX2);

            //expect($scope.Contact.Id).toBeUndefined();
            expect($scope.Contact.Id).toBeNull();
            expect($scope.Errors.HasError).toEqual(true);
            expect($scope.transactionSuccessMessage).toEqual('emptyText');
            expect($scope.Errors.Messages.length).toEqual(twoItemsCount);
            expect($scope.Errors.Messages[firstItemIndex]).toEqual(errorMessage1);
            expect($scope.Errors.Messages[secondItemIndex]).toEqual(errorMessage2);
        });

        it('With data result of a new contact put it on the contact list', function () {
            $scope.Contact = newContact;

            $scope.onCreateSuccess(httpDataResultOk);

            expect($scope.Contact.Id).not.toBeNull();
            expect(_.findWhere($scope.Contacts, function (contact) { contact.Id === $scope.Contact.Id })).not.toBeNull();
            expect(_.findWhere($scope.Contacts, function (contact) { contact.Id === $scope.Contact.Id })).not.toBeUndefined();
        });

        it('With data result of a new contact returns to root Uri', function () {
            $scope.Contact = newContact;

            $scope.onCreateSuccess(httpDataResultOk);

            expect(location.path()).toBe('/');
        });
        
        it('Stablish isForm == FALSE status for the GUI', function () {
            $scope.Contact = newContact;

            $scope.onCreateSuccess(httpDataResultOk);

            expect($scope.isForm).toEqual(false);
        });
    });

    describe('$scope.retryCreateCallback - ', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            contacts = [];

            controller('CreateAction', { $scope: $scope });
            $controller = controller('ContactController', { $scope: $scope });
        }));

        it('Invokes "auditManager.afterThrowRetryEvent" method', function () {
            spyOn(AuditManager.prototype, 'afterThrowRetryEvent').and.callFake(function () { });

            $scope.retryCreateCallback(exception, method);

            expect(AuditManager.prototype.afterThrowRetryEvent).toHaveBeenCalledWith(exception, jasmine.any(Object), jasmine.any(Function), method);
        });
    });
});