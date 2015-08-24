/// <reference path='../../../NoMeOlvides/Scripts/jquery-2.1.4.js' />
/// <reference path="../../../NoMeOlvides/Scripts/aop.js" />
/// <reference path="../../../nomeolvides/scripts/underscore.js" />
/// <reference path='../../../NoMeOlvides/Scripts/angular.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-mocks.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-route.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate-loader-url.js' />
/// <reference path='../../../NoMeOlvides/Scripts/i18n/angular-locale_es-ar.js />
/// <reference path='../../../NoMeOlvides/Scripts/Common/ErrorManager.js' />
/// <reference path="../../../NoMeOlvides/Scripts/Common/AuditManager.js" />
/// <reference path='Fixture/CommonFixture.js' />
/// <reference path='Fixture/ContactCommonFixture.js' />
/// <reference path='Fixture/ContactCreateFixture.js' />
/// <reference path="Fixture/AuditManagerCommonFixture.js" />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/App.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Common/TranslateProvider.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/CRUD.js' />

describe('ContactController - ', function () {
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
        contacts = [];

        spyOn(console, 'log').and.callFake(function () { });
    }));
    
    // TODO: Hay problemas para testar el Asynchronous !!!!
    //describe('BDD - ', function () {
    //    var $scope;
    //    var $controller;

    //    beforeEach(inject(function () {
    //        $scope = rootScope.$new();
    //        contacts = [];
    //        $scope.Contacts = [];
    //    }));

    //    it('Delete - Delete contact with contact ID', function () {
    //        controller('CreateAction', { $scope: $scope });
    //        $controller = controller('DeleteAction', { $scope: $scope });
    //        $scope.Contact = newContact;
    //        $scope.Create();
    //        //var contactId = $scope.Contact.Id;

    //        $scope.Delete();

    //        expect($scope.Contact.Id).not.toBeUndefined();
    //        expect($scope.Contact.Id).not.toBeNull();
    //    });
        
    //    it('Create - With all fields create a new contact', function () {
    //        $controller = controller('CreateAction', { $scope: $scope });
    //        $scope.Contact = newContact;

    //        $scope.Create();

    //        expect($scope.Contact.Id).not.toBeUndefined();
    //        expect($scope.Contact.Id).not.toBeNull();
    //    });

    //    it('Edit - With all fields save the updated values', function () {
    //        $controller = controller('CreateAction', { $scope: $scope });
    //        $scope.Contact = newContact;
    //        $scope.Create();
    //        $controller = controller('EditAction', { $scope: $scope });
    //        $scope.Contact.Alias = "El Mazzi (6)";
    //        $scope.Contact.Name = "Maximiliano";
    //        $scope.Contact.Surname = "Gauna";
    //        $scope.Contact.Email = "c@c.com";
    //        $scope.Contact.Phone = 666;
    //        $scope.Contact.Cellphone = 666;
    //        $scope.Contact.Address = "Trulala 666";
    //        $scope.Contact.Password = "Secret... SHHHH!!!!";

    //        $scope.Edit();

    //        expect($scope.Contact.Alias).toEqual("El Mazzi (6)");
    //        expect($scope.Contact.Name).toEqual("Maximiliano");
    //        expect($scope.Contact.Surname).toEqual("Gauna");
    //        expect($scope.Contact.Email).toEqual("c@c.com");
    //        expect($scope.Contact.Phone).toEqual(666);
    //        expect($scope.Contact.Cellphone).toEqual(666);
    //        expect($scope.Contact.Address).toEqual("Trulala 666");
    //        expect($scope.Contact.Password).toEqual("Secret... SHHHH!!!!");
    //        $scope.Delete();
    //    });

    //    it('Search - With all fields search contacts', function () {
    //        $controller = controller('SearchAction', { $scope: $scope });
    //        $scope.Contact = newContact;

    //        $scope.Search();

    //        expect($scope.Contacts).not.toBeUndefined();
    //        expect($scope.Contacts).not.toBeNull();
    //    });
    //});

    describe('App.js - App config Route Provider - ', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function ($httpBackend) {
            $scope = rootScope.$new(); //{ };
            contacts = [];
            $controller = controller('ContactController', { $scope: $scope });

            $httpBackend.expectGET('/').respond(200);
        }));
        
        it('Create - Contacts list must be declared', function () {
            expect($scope.Contacts).toBeDefined();
        });

        it('Definition of Navigation - ROOT (~/)', function () {
            expect(route.routes['/'].templateUrl).toEqual('Scripts/Contact/Templates/Search.html');
            expect(route.routes['/'].controller).toEqual('SearchAction');
        });

        it('Definition of Navigation - Create', function () {
            expect(route.routes['/Create'].templateUrl).toEqual('Scripts/Contact/Templates/Create.html');
            //expect(route.routes['/Create'].title).toEqual('createContactTitle');
            expect(route.routes['/Create'].controller).toEqual('CreateAction');
        });

        it('Definition of Navigation - Details', function () {
            expect(route.routes['/Details/:id'].templateUrl).toEqual('Scripts/Contact/Templates/Details.html');
            //expect(route.routes['/Details/:id'].title).toEqual('detailsContactTitle');
            expect(route.routes['/Details/:id'].controller).toEqual('DetailsAction');
        });

        it('Definition of Navigation - Update', function () {
            expect(route.routes['/Edit/:id'].templateUrl).toEqual('Scripts/Contact/Templates/Edit.html');
            //expect(route.routes['/Edit/:id'].title).toEqual('editContactTitle');
            expect(route.routes['/Edit/:id'].controller).toEqual('EditAction');
        });

        it('Definition of Navigation - Delete', function () {
            expect(route.routes['/Delete/:id'].templateUrl).toEqual('Scripts/Contact/Templates/Delete.html');
            //expect(route.routes['/Delete/:id'].title).toEqual('deleteContactTitle');
            expect(route.routes['/Delete/:id'].controller).toEqual('DeleteAction');
        });

        it('Definition of Navigation - otherwise', function () {
            expect(route.routes[null].redirectTo).toEqual('/');
        });
    });

    describe('CRUD.js - Data querys - ', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            contacts = [];

            $controller = controller('ContactController', { $scope: $scope });
        }));

        it('List Contacts - Verify that an EMPTY Contact list is loaded to the Scope', function () {

            $scope.initializeGlobalVariables();

            expect($scope.Contacts.length).toEqual(emptyItemsCount);
            expect($scope.hasResults).toEqual(false);
            expect($scope.isForm).toEqual(false);
        });

        it('List Contacts - Verify that a Contact list with ONE ITEM is loaded to the Scope', function () {
            contacts = [firstContact];

            $scope.initializeGlobalVariables();

            expect($scope.Contacts.length).toEqual(oneItemCount);
            expect($scope.hasResults).toEqual(true);
            expect($scope.isForm).toEqual(false);
            expect($scope.Contacts[firstItemIndex].ContactsId).toEqual(firstContact.ContactsId);
            expect($scope.Contacts[firstItemIndex].Alias).toEqual(firstContact.Alias);
            expect($scope.Contacts[firstItemIndex].Name).toEqual(firstContact.Name);
            expect($scope.Contacts[firstItemIndex].Surname).toEqual(firstContact.Surname);
            expect($scope.Contacts[firstItemIndex].Email).toEqual(firstContact.Email);
            expect($scope.Contacts[firstItemIndex].Phone).toEqual(firstContact.Phone);
            expect($scope.Contacts[firstItemIndex].Cellphone).toEqual(firstContact.Cellphone);
            expect($scope.Contacts[firstItemIndex].Address).toEqual(firstContact.Address);
            expect($scope.Contacts[firstItemIndex].Password).toEqual(firstContact.Password);
        });

        it('List Contacts - Verify that a Contact list with TWO ITEMs is loaded to the Scope', function () {
            contacts = [firstContact, secondContact];

            $scope.initializeGlobalVariables();

            expect($scope.Contacts.length).toEqual(twoItemsCount);
            expect($scope.hasResults).toEqual(true);
            expect($scope.isForm).toEqual(false);
            expect($scope.Contacts[firstItemIndex].Id).toEqual(firstContact.Id);
            expect($scope.Contacts[firstItemIndex].Alias).toEqual(firstContact.Alias);
            expect($scope.Contacts[firstItemIndex].Name).toEqual(firstContact.Name);
            expect($scope.Contacts[firstItemIndex].Surname).toEqual(firstContact.Surname);
            expect($scope.Contacts[firstItemIndex].Email).toEqual(firstContact.Email);
            expect($scope.Contacts[firstItemIndex].Phone).toEqual(firstContact.Phone);
            expect($scope.Contacts[firstItemIndex].Cellphone).toEqual(firstContact.Cellphone);
            expect($scope.Contacts[firstItemIndex].Address).toEqual(firstContact.Address);
            expect($scope.Contacts[firstItemIndex].Password).toEqual(firstContact.Password);
            expect($scope.Contacts[secondItemIndex].Id).toEqual(secondContact.Id);
            expect($scope.Contacts[secondItemIndex].Alias).toEqual(secondContact.Alias);
            expect($scope.Contacts[secondItemIndex].Name).toEqual(secondContact.Name);
            expect($scope.Contacts[secondItemIndex].Surname).toEqual(secondContact.Surname);
            expect($scope.Contacts[secondItemIndex].Email).toEqual(secondContact.Email);
            expect($scope.Contacts[secondItemIndex].Phone).toEqual(secondContact.Phone);
            expect($scope.Contacts[secondItemIndex].Cellphone).toEqual(secondContact.Cellphone);
            expect($scope.Contacts[secondItemIndex].Address).toEqual(secondContact.Address);
            expect($scope.Contacts[secondItemIndex].Password).toEqual(secondContact.Password);
        });
    });

    describe('ContactController - Auditory with AOP - ', function () {
        var $scope;
        var $controller;

        beforeEach(inject(function () {
            $scope = rootScope.$new();
            contacts = [];

            //controller('CreateAction', { $scope: $scope });
            //controller('DeleteAction', { $scope: $scope });
            //controller('EditAction', { $scope: $scope });
            //controller('SearchAction', { $scope: $scope });
            $controller = controller('ContactController', { $scope: $scope });
        }));

        it('With an Instance of "AuditManager" object', function () {


            expect(auditManager instanceof AuditManager).toBeTruthy();
        });

        it('With an Instance of "AuditManager" object with the correct parameters', function () {


            expect(auditManager.maxAttemps).toEqual(maxAttemps);
            expect(auditManager.retryMessage).toEqual(retryMessage);
        });

        it('Invokes "jQuery.aop.around" method for "initializeGlobalVariables"', function () {
            spyOn(jQuery.aop, 'around').and.callThrough();

            $controller = controller('ContactController', { $scope: $scope });

            //expect(jQuery.aop.around).toHaveBeenCalledWith({ target: window, method: 'initializeGlobalVariables' }, invocationCallback);
            expect(jQuery.aop.around).toHaveBeenCalled();
            expect(jQuery.aop.around.calls.argsFor(firstItemIndex)[firstItemIndex].target).toEqual(window);
            expect(jQuery.aop.around.calls.argsFor(firstItemIndex)[firstItemIndex].method).toEqual('initializeGlobalVariables');
            expect(jQuery.aop.around.calls.argsFor(firstItemIndex)[secondItemIndex]).toEqual(jasmine.any(Function));
        });
    });
});