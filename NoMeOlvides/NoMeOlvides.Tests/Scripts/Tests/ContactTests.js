/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/jquery-2.1.4.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/angular.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/angular-mocks.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/angular-route.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/angular-translate.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/angular-translate-loader-url.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/i18n/angular-locale_es-ar.js />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/Contact/App.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/Common/TranslateProvider.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/Contact/CRUD.js' />

var firstItemIndex = 0;
var secondItemIndex = 1;
var emptyItemsCount = 0;
var oneItemCount = 1;
var twoItemsCount = 2;

var firstContact = {
    "Id": "5580024fdbe5410c9ca00b4d",
    "Alias": "El Mazzi (6)",
    "Name": "Maximiliano",
    "Surname": "Gauna",
    "Email": "maxiunlm@gmail.com",
    "Phone": 666,
    "CellPhone": 666,
    "Address": "Trulala 666",
    "Password": "Secret... SHHHH!!!!"
};
var secondContact = {
    "Id": "5580083cdbe5412c347db261",
    "Alias": "KB",
    "Name": "Kill",
    "Surname": "Bill",
    "Email": "a@a.com",
    "Phone": 6662,
    "CellPhone": 6662,
    "Address": "Trulala 6662",
    "Password": "Secret2... SHHHH!!!!"
};

var contacts = [];

describe('ContactController', function () {
    var location;
    var rootScope;
    var route;
    var controller;
    //var translateProvider

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_, _$location_, _$route_, _$rootScope_) { // , _$translateProvider_ ???
        // The injector unwraps the underscores (_) from around the parameter names when matching
        location = _$location_;
        rootScope = _$rootScope_;
        route = _$route_;
        controller = _$controller_;
        //translateProvider = _$translateProvider_;
    }));


    //describe('', function () { });
    describe('ContactController - App.js - App config Route Provider', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function ($httpBackend) {
            $scope = {};
            $controller = controller('ContactController', { $scope: $scope });

            $httpBackend.expectGET('/').respond(200);
        }));


        it('Definition of Navigation - ROOT (~/)', function () {
            expect(route.routes['/'].templateUrl).toEqual('Scripts/Contact/Templates/List.html');
        });

        it('Definition of Navigation - CREATE', function () {
            expect(route.routes['/Create'].templateUrl).toEqual('Scripts/Contact/Templates/Create.html');
            //expect(route.routes['/Create'].title).toEqual('CreateContactTitle');
            expect(route.routes['/Create'].controller).toEqual('CreateAction');
        });

        it('Definition of Navigation - Details', function () {
            expect(route.routes['/Details/:id'].templateUrl).toEqual('Scripts/Contact/Templates/Details.html');
            //expect(route.routes['/Details/:id'].title).toEqual('DetailsContactTitle');
            expect(route.routes['/Details/:id'].controller).toEqual('DetailsAction');
        });

        it('Definition of Navigation - Update', function () {
            expect(route.routes['/Edit/:id'].templateUrl).toEqual('Scripts/Contact/Templates/Edit.html');
            //expect(route.routes['/Edit/:id'].title).toEqual('EditContactTitle');
            expect(route.routes['/Edit/:id'].controller).toEqual('EditAction');
        });

        it('Definition of Navigation - Delete', function () {
            expect(route.routes['/Delete/:id'].templateUrl).toEqual('Scripts/Contact/Templates/Delete.html');
            //expect(route.routes['/Delete/:id'].title).toEqual('DeleteContactTitle');
            expect(route.routes['/Delete/:id'].controller).toEqual('DeleteAction');
        });

        it('Definition of Navigation - otherwise', function () {
            expect(route.routes[null].redirectTo).toEqual('/');
        });
    });

    describe('ContactController - CRUD.js -- Data querys', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function () {
            $scope = {};
            contacts = [];

            $controller = controller('ContactController', { $scope: $scope });
        }));

        it('List Contacts - Verify that an EMPTY Contact list is loaded to the Scope', function () {

            $scope.initializeGlobalVariables();

            expect($scope.Contacts.length).toEqual(emptyItemsCount);
        });

        it('List Contacts - Verify that a Contact list with ONE ITEM is loaded to the Scope', function () {
            contacts = [firstContact];

            $scope.initializeGlobalVariables();

            expect($scope.Contacts.length).toEqual(oneItemCount);
            expect($scope.Contacts[firstItemIndex].ContactsId).toEqual(firstContact.ContactsId);
            expect($scope.Contacts[firstItemIndex].Alias).toEqual(firstContact.Alias);
            expect($scope.Contacts[firstItemIndex].Name).toEqual(firstContact.Name);
            expect($scope.Contacts[firstItemIndex].Surname).toEqual(firstContact.Surname);
            expect($scope.Contacts[firstItemIndex].Email).toEqual(firstContact.Email);
            expect($scope.Contacts[firstItemIndex].Phone).toEqual(firstContact.Phone);
            expect($scope.Contacts[firstItemIndex].CellPhone).toEqual(firstContact.CellPhone);
            expect($scope.Contacts[firstItemIndex].Address).toEqual(firstContact.Address);
            expect($scope.Contacts[firstItemIndex].Password).toEqual(firstContact.Password);
        });

        it('List Contacts - Verify that a Contact list with TWO ITEMs is loaded to the Scope', function () {
            contacts = [firstContact, secondContact];

            $scope.initializeGlobalVariables();

            expect($scope.Contacts.length).toEqual(twoItemsCount);
            expect($scope.Contacts[firstItemIndex].Id).toEqual(firstContact.Id);
            expect($scope.Contacts[firstItemIndex].Alias).toEqual(firstContact.Alias);
            expect($scope.Contacts[firstItemIndex].Name).toEqual(firstContact.Name);
            expect($scope.Contacts[firstItemIndex].Surname).toEqual(firstContact.Surname);
            expect($scope.Contacts[firstItemIndex].Email).toEqual(firstContact.Email);
            expect($scope.Contacts[firstItemIndex].Phone).toEqual(firstContact.Phone);
            expect($scope.Contacts[firstItemIndex].CellPhone).toEqual(firstContact.CellPhone);
            expect($scope.Contacts[firstItemIndex].Address).toEqual(firstContact.Address);
            expect($scope.Contacts[firstItemIndex].Password).toEqual(firstContact.Password);
            expect($scope.Contacts[secondItemIndex].Id).toEqual(secondContact.Id);
            expect($scope.Contacts[secondItemIndex].Alias).toEqual(secondContact.Alias);
            expect($scope.Contacts[secondItemIndex].Name).toEqual(secondContact.Name);
            expect($scope.Contacts[secondItemIndex].Surname).toEqual(secondContact.Surname);
            expect($scope.Contacts[secondItemIndex].Email).toEqual(secondContact.Email);
            expect($scope.Contacts[secondItemIndex].Phone).toEqual(secondContact.Phone);
            expect($scope.Contacts[secondItemIndex].CellPhone).toEqual(secondContact.CellPhone);
            expect($scope.Contacts[secondItemIndex].Address).toEqual(secondContact.Address);
            expect($scope.Contacts[secondItemIndex].Password).toEqual(secondContact.Password);
        });
    });

    //describe('', function () { });
    //beforeEach(inject(function () { }));
    //it('', function () { });
});