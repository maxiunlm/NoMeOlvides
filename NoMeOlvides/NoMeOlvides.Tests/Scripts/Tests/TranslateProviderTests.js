/// <reference path='../../../nomeolvides/scripts/underscore.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-mocks.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate-loader-url.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/App.js' />
/// <reference path='Fixture/CommonFixture.js' />
/// <reference path='Fixture/TranslateCommonFixture.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Common/TranslateProvider.js' />

describe('loadTranslations - ', function () {
    var sut;

    beforeEach(module('app'));

    describe('load - ', function () {

        describe('CONSTRUCTOR - ', function () {
            it('Set the constructor parameters into attributes', function () {

                sut = new TranslationsLoader(new Object(), new Object());

                expect(sut.angular).toBeDefined();
                expect(sut.app).toBeDefined();
                expect(sut.obj).toBeDefined();
                expect(sut.translateProvider).toBeDefined();
            });
        });

        describe('angular - ', function () {
            beforeEach(function () {
                sut = new TranslationsLoader(angular, app);
            });

            it('Invokes "module" method', function () {
                spyOn(angular, 'module').and.callFake(function () {
                    return modulePascalprechtTranslate;
                });

                sut.load();

                expect(angular.module).toHaveBeenCalledWith('pascalprecht.translate');
            });

            it('Calls "module" method with "pascalprecht.translate" parameter', function () {
                spyOn(angular, 'module').and.callFake(function (name) {
                    return modulePascalprechtTranslate;
                });

                sut.load();

                expect(angular.module).toHaveBeenCalledWith(moduleName);
            });

            it('Invokes "factory" method', function () {
                spyOn(angular, 'module').and.callFake(function () {
                    return modulePascalprechtTranslate;
                });
                spyOn(modulePascalprechtTranslate, 'factory').and.callFake(function () { });

                sut.load();

                expect(modulePascalprechtTranslate.factory).toHaveBeenCalledWith(factoryName, [$qParameter, $httpParameter, jasmine.any(Function)]);
            });

            it('Calls "factory" method with "$translateStaticFilesLoader" parameter', function () {
                spyOn(angular, 'module').and.callFake(function () {
                    return modulePascalprechtTranslate;
                });
                spyOn(modulePascalprechtTranslate, 'factory').and.callFake(function (name) { });

                sut.load();

                expect(modulePascalprechtTranslate.factory).toHaveBeenCalledWith(factoryName, jasmine.any(Array));
            });

            it('Calls "factory" method with a correct vector parameter', function () {
                spyOn(angular, 'module').and.callFake(function () {
                    return modulePascalprechtTranslate;
                });
                spyOn(modulePascalprechtTranslate, 'factory').and.callFake(function (name, vector) {
                });

                sut.load();

                expect(modulePascalprechtTranslate.factory).toHaveBeenCalledWith(factoryName, [$qParameter, $httpParameter, jasmine.any(Function)]);
            });
        });

        describe('app - ', function () {
            beforeEach(function () {
                sut = new TranslationsLoader(angular, app);
            });

            it('Invokes "config" method', function () {
                spyOn(app, 'config').and.callFake(function () { });

                sut.load();

                expect(app.config).toHaveBeenCalledWith(['$translateProvider', jasmine.any(Function)]);
            });

            it('Calls "config" method with a correct vector parameter', function () {
                spyOn(app, 'config').and.callFake(function (vector) { });

                sut.load();

                expect(app.config).toHaveBeenCalledWith([$translateProviderParameter, jasmine.any(Function)]);
            });
        });

        describe('crateFactory - ', function () {
            beforeEach(function () {
                sut = new TranslationsLoader(angular, app);
            });

            it('Without parameters clean the internal attributes', function () {

                sut.crateFactory();

                expect(sut.type).toBeUndefined();
                expect(sut.obj).toBeUndefined();
            });

            it('With null parameters put in null the internal attributes', function () {

                sut.crateFactory(null, null);

                expect(sut.type).toBeNull();
                expect(sut.obj).toBeNull();
            });

            it('With all the parameters assign internal attributes', function () {

                sut.crateFactory(typeParameter, objFake);

                expect(sut.type).toEqual(typeParameter);
                expect(sut.obj).toEqual(objFake);
            });

            it('Returns the "createFactoryResponse" callback method', function () {

                var result = sut.crateFactory(typeParameter, objFake);

                expect(result).toBe(sut.createFactoryResponse);
            });
        });

        describe('configureApp - ', function () {
            beforeEach(function () {
                sut = new TranslationsLoader(angular, app);
            });

            it('Without parameters throws an exception', function () {

                expect(function () { sut.configureApp() }).toThrowError(TypeError);

            });

            it('With "$translateProvider" assign "this.translateProvider" attribute', function () {

                sut.configureApp(translateProvider);

                expect(sut.translateProvider).toEqual(translateProvider);
            });

            it('With "$translateProvider" invokes "useStaticFilesLoader" method', function () {
                spyOn(translateProvider, 'useStaticFilesLoader').and.callThrough();

                sut.configureApp(translateProvider);

                expect(translateProvider.useStaticFilesLoader).toHaveBeenCalledWith({ prefix: prefix, suffix: suffix });
            });

            it('With "$translateProvider" calls "useStaticFilesLoader" method with the correct parameters', function () {
                spyOn(translateProvider, 'useStaticFilesLoader').and.callFake(function (options) { });

                sut.configureApp(translateProvider);

                expect(translateProvider.useStaticFilesLoader).toHaveBeenCalledWith({ prefix: staticFilesLoaderOptions.prefix, suffix: staticFilesLoaderOptions.suffix });
            });

            it('With "$translateProvider" invokes "preferredLanguage" method', function () {
                spyOn(translateProvider, 'preferredLanguage').and.callThrough();

                sut.configureApp(translateProvider);

                expect(translateProvider.preferredLanguage).toHaveBeenCalledWith(spanishLanguage);
            });

            it('With "$translateProvider" calls "preferredLanguage" method with the correct parameters', function () {
                spyOn(translateProvider, 'preferredLanguage').and.callFake(function (language) { });

                sut.configureApp(translateProvider);

                expect(translateProvider.preferredLanguage).toHaveBeenCalledWith(spanishLanguage);
            });
        });

        describe('createFactoryResponse - ', function () {
            beforeEach(function () {
                myTranslations = sut = new TranslationsLoader(angular, app);
            });

            it('Without a "type" defined throws an exception', function () {
                myTranslations.obj = objFake;

                expect(function () { sut.createFactoryResponse(factoryResponseOptions); }).toThrowError(TypeError);

            });

            it('Without a "obj" defined throws an exception', function () {
                myTranslations.type = typeParameter;

                expect(function () { sut.createFactoryResponse(factoryResponseOptions); }).toThrowError(TypeError);

            });

            it('Without parameters throws an exception', function () {
                sut.type = typeParameter;

                expect(function () { sut.createFactoryResponse(); }).toThrowError(TypeError);

            });

            it('With the correct parameters invokes "type.defer" method', function () {
                sut.type = typeParameter;
                spyOn(sut, 'obj').and.callFake(function () {
                    return objCtor;
                });
                spyOn(sut.type, 'defer').and.callThrough();

                sut.createFactoryResponse(factoryResponseOptions);

                expect(sut.type.defer).toHaveBeenCalled();
            });

            it('With the correct parameters invokes "obj" method', function () {
                sut.type = typeParameter;
                spyOn(myTranslations, 'obj').and.callFake(function () {
                    return objCtor;
                });

                sut.createFactoryResponse(factoryResponseOptions);

                expect(myTranslations.obj).toHaveBeenCalledWith({ url: prefix + spanishLanguage, method: methodGet, params: stringEmpty });
            });

            it('With all the parameters calls "obj" method with the correct parameters', function () {
                sut.type = typeParameter;
                var hasUrlDeclared = false;
                var hasMethodDeclared = false;
                var hasParamsDeclared = false;
                spyOn(myTranslations, 'obj').and.callFake(function (config) {
                    return objCtor;
                });

                sut.createFactoryResponse(factoryResponseOptions);

                expect(myTranslations.obj).toHaveBeenCalledWith({
                    url: [factoryResponseOptions.prefix, factoryResponseOptions.key, factoryResponseOptions.suffix].join(''),
                    method: methodGet,
                    params: stringEmpty
                });
            });

            it('With the correct parameters invokes "obj.success" method', function () {
                sut.type = typeParameter;
                spyOn(sut, 'obj').and.callFake(function () {
                    return objCtor;
                });
                spyOn(objCtor, 'success').and.callThrough();

                sut.createFactoryResponse(factoryResponseOptions);

                expect(objCtor.success).toHaveBeenCalledWith(jasmine.any(Function));
            });

            it('On a "success" event invokes "deferred.resolve" method', function () {
                sut.type = typeParameter;
                spyOn(sut, 'obj').and.callFake(function () {
                    return objCtor;
                });
                spyOn(objCtor, 'success').and.callThrough();
                spyOn(deferredFake, 'resolve').and.callThrough();

                sut.createFactoryResponse(factoryResponseOptions);

                expect(deferredFake.resolve).toHaveBeenCalledWith({ defer: jasmine.any(Function) });
            });

            it('On a "success" event calls "deferred.resolve" method with de correct parameters', function () {
                sut.type = typeParameter;
                spyOn(sut, 'obj').and.callFake(function () {
                    return objCtor;
                });
                spyOn(objCtor, 'success').and.callThrough();
                spyOn(deferredFake, 'resolve').and.callFake(function (type) { });

                sut.createFactoryResponse(factoryResponseOptions);

                expect(deferredFake.resolve).toHaveBeenCalledWith(typeParameter);
            });

            it('With the correct parameters invokes "obj.error" method', function () {
                sut.type = typeParameter;
                spyOn(sut, 'obj').and.callFake(function () {
                    return objCtor;
                });
                spyOn(objCtor, 'error').and.callThrough();

                sut.createFactoryResponse(factoryResponseOptions);

                expect(objCtor.error).toHaveBeenCalledWith(jasmine.any(Function));
            });

            it('On an "error" event invokes "deferred.reject" method', function () {
                sut.type = typeParameter;
                spyOn(sut, 'obj').and.callFake(function () {
                    return objCtor;
                });
                spyOn(objCtor, 'error').and.callThrough();
                spyOn(deferredFake, 'reject').and.callThrough();

                sut.createFactoryResponse(factoryResponseOptions);

                expect(deferredFake.reject).toHaveBeenCalledWith(spanishLanguage);
            });

            it('On an "error" event invokes "deferred.reject" method with de correct parameters', function () {
                sut.type = typeParameter;
                spyOn(sut, 'obj').and.callFake(function (config) {
                    objCtor.config = config;

                    return objCtor;
                });
                spyOn(objCtor, 'error').and.callThrough();
                spyOn(deferredFake, 'reject').and.callFake(function (optionsKey) { });

                sut.createFactoryResponse(factoryResponseOptions);

                expect(deferredFake.reject).toHaveBeenCalledWith(factoryResponseOptions.key);
            });

            it('Returns the "deferred.promise" object', function () {
                sut.type = typeParameter;
                sut.obj = objFake;

                var result = sut.createFactoryResponse(factoryResponseOptions);

                expect(result).toBe(deferredFake.promise);
            });
        });
    });
});
