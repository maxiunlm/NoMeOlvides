/// <reference path="../../../nomeolvides/scripts/underscore.js" />
/// <reference path='../../../NoMeOlvides/Scripts/angular.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-mocks.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate-loader-url.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/App.js' />
/// <reference path="Fixture/CommonFixture.js" />
/// <reference path="Fixture/TranslateCommonFixture.js" />
/// <reference path='../../../NoMeOlvides/Scripts/Common/TranslateProvider.js" />

describe('loadTranslations - ', function () {
    var sut;

    beforeEach(module('app'));

    describe('load - ', function () {

        describe('CONSTRUCTOR - ', function () {
            it('Set the constructor parameters into attributes', function () {

                sut = new TranslationsLoader(new Object(), new Object());

                expect(sut.angular).toBeDefined();
                expect(sut.app).toBeDefined();
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

                expect(angular.module).toHaveBeenCalled();
            });

            it('Calls "module" method with "pascalprecht.translate" parameter', function () {
                var hasModuleNameDeclared = false;
                spyOn(angular, 'module').and.callFake(function (name) {
                    if (name = moduleName) {
                        hasModuleNameDeclared = true;
                    }

                    return modulePascalprechtTranslate;
                });

                sut.load();

                expect(hasModuleNameDeclared).toBeTruthy();
            });

            it('Invokes "factory" method', function () {
                spyOn(angular, 'module').and.callFake(function () {
                    return modulePascalprechtTranslate;
                });
                spyOn(modulePascalprechtTranslate, 'factory').and.callFake(function () { });

                sut.load();

                expect(modulePascalprechtTranslate.factory).toHaveBeenCalled();
            });

            it('Calls "factory" method with "$translateStaticFilesLoader" parameter', function () {
                var hasFactoryNameDeclared = false;
                spyOn(angular, 'module').and.callFake(function () {
                    return modulePascalprechtTranslate;
                });
                spyOn(modulePascalprechtTranslate, 'factory').and.callFake(function (name) {
                    if (name === factoryName) {
                        hasFactoryNameDeclared = true;
                    }
                });

                sut.load();

                expect(hasFactoryNameDeclared).toBeTruthy();
            });

            it('Calls "factory" method with a correct vector parameter', function () {
                var has$qDeclared = false;
                var has$httpDeclared = false;
                var hasCrateFactoryDeclared = false;
                spyOn(angular, 'module').and.callFake(function () {
                    return modulePascalprechtTranslate;
                });
                spyOn(modulePascalprechtTranslate, 'factory').and.callFake(function (name, vector) {
                    if (vector[firstItemIndex] === $qParameter) {
                        has$qDeclared = true;
                    }
                    if (vector[secondItemIndex] === $httpParameter) {
                        has$httpDeclared = true;
                    }
                    if (_.isFunction(vector[thirdItemIndex])) {
                        hasCrateFactoryDeclared = true;
                    }
                });

                sut.load();

                expect(has$qDeclared).toBeTruthy();
                expect(has$httpDeclared).toBeTruthy();
                expect(hasCrateFactoryDeclared).toBeTruthy();
            });
        });

        describe('app - ', function () {
            beforeEach(function () {
                sut = new TranslationsLoader(angular, app);
            });

            it('Invokes "config" method', function () {
                spyOn(app, 'config').and.callFake(function () { });

                sut.load();

                expect(app.config).toHaveBeenCalled();
            });

            it('Calls "config" method with a correct vector parameter', function () {
                var has$translateProviderParameterDeclared = false;
                var hasConfigureAppDeclared = false;
                spyOn(app, 'config').and.callFake(function (vector) {
                    if (vector[firstItemIndex] === $translateProviderParameter) {
                        has$translateProviderParameterDeclared = true;
                    }
                    if (_.isFunction(vector[secondItemIndex])) {
                        hasConfigureAppDeclared = true;
                    }
                });

                sut.load();

                expect(has$translateProviderParameterDeclared).toBeTruthy();
                expect(hasConfigureAppDeclared).toBeTruthy();
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

            it('With "$translateProvider" invokes "useStaticFilesLoader" method', function () {
                spyOn(translateProvider, 'useStaticFilesLoader').and.callThrough();

                sut.configureApp(translateProvider);

                expect(translateProvider.useStaticFilesLoader).toHaveBeenCalled();
            });

            it('With "$translateProvider" calls "useStaticFilesLoader" method with the correct parameters', function () {
                var hasOptionsDeclared = false;
                spyOn(translateProvider, 'useStaticFilesLoader').and.callFake(function (options) {
                    if (options.prefix === staticFilesLoaderOptions.prefix
                        && options.suffix === staticFilesLoaderOptions.suffix) {
                        hasOptionsDeclared = true;
                    }
                });

                sut.configureApp(translateProvider);

                expect(hasOptionsDeclared).toBeTruthy();
            });

            it('With "$translateProvider" invokes "preferredLanguage" method', function () {
                spyOn(translateProvider, 'preferredLanguage').and.callThrough();

                sut.configureApp(translateProvider);

                expect(translateProvider.preferredLanguage).toHaveBeenCalled();
            });

            it('With "$translateProvider" calls "preferredLanguage" method with the correct parameters', function () {
                var hasLanguageDeclared = false;
                spyOn(translateProvider, 'preferredLanguage').and.callFake(function (language) {
                    if (language === spanishLanguage) {
                        hasLanguageDeclared = true;
                    }
                });

                sut.configureApp(translateProvider);

                expect(hasLanguageDeclared).toBeTruthy();
            });
        });

        describe('createFactoryResponse - ', function () {
            beforeEach(function () {
                myTranslations = sut = new TranslationsLoader(angular, app);
            });

            it('Without a "type" defined throws an exception', function ()
            {
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

                expect(myTranslations.obj).toHaveBeenCalled();
            });

            it('With all the parameters calls "obj" method with the correct parameters', function () {
                sut.type = typeParameter;
                var hasUrlDeclared = false;
                var hasMethodDeclared = false;
                var hasParamsDeclared = false;
                spyOn(myTranslations, 'obj').and.callFake(function (config) {
                    if (config.url === [factoryResponseOptions.prefix, factoryResponseOptions.key, factoryResponseOptions.suffix].join('')) {
                        hasUrlDeclared = true;
                    }
                    if (config.method === methodGet) {
                        hasMethodDeclared = true;
                    }
                    if (config.params === stringEmpty) {
                        hasParamsDeclared = true;
                    }

                    return objCtor;
                });

                sut.createFactoryResponse(factoryResponseOptions);

                expect(hasUrlDeclared).toBeTruthy();
                expect(hasMethodDeclared).toBeTruthy();
                expect(hasParamsDeclared).toBeTruthy();
            });

            it('With the correct parameters invokes "obj.success" method', function () {
                sut.type = typeParameter;
                spyOn(sut, 'obj').and.callFake(function () {
                    return objCtor;
                });
                spyOn(objCtor, 'success').and.callThrough();

                sut.createFactoryResponse(factoryResponseOptions);

                expect(objCtor.success).toHaveBeenCalled();
            });

            it('On a "success" event invokes "deferred.resolve" method', function () {
                sut.type = typeParameter;             
                spyOn(sut, 'obj').and.callFake(function () {
                    return objCtor;
                });
                spyOn(objCtor, 'success').and.callThrough();
                spyOn(deferredFake, 'resolve').and.callThrough();

                sut.createFactoryResponse(factoryResponseOptions);

                expect(deferredFake.resolve).toHaveBeenCalled();
            });

            it('On a "success" event calls "deferred.resolve" method with de correct parameters', function () {
                sut.type = typeParameter;
                spyOn(sut, 'obj').and.callFake(function () {
                    return objCtor;
                });
                var hasTypeDeclared = false;
                spyOn(objCtor, 'success').and.callThrough();
                spyOn(deferredFake, 'resolve').and.callFake(function (type) {
                    if (type === typeParameter) {
                        hasTypeDeclared = true;
                    }
                });

                sut.createFactoryResponse(factoryResponseOptions);
            
                expect(hasTypeDeclared).toBeTruthy();
            });

            it('With the correct parameters invokes "obj.error" method', function () {
                sut.type = typeParameter;
                spyOn(sut, 'obj').and.callFake(function () {
                    return objCtor;
                });
                spyOn(objCtor, 'error').and.callThrough();

                sut.createFactoryResponse(factoryResponseOptions);

                expect(objCtor.error).toHaveBeenCalled();
            });

            it('On an "error" event invokes "deferred.reject" method', function () {
                sut.type = typeParameter;
                spyOn(sut, 'obj').and.callFake(function () {
                    return objCtor;
                });
                spyOn(objCtor, 'error').and.callThrough();
                spyOn(deferredFake, 'reject').and.callThrough();

                sut.createFactoryResponse(factoryResponseOptions);

                expect(deferredFake.reject).toHaveBeenCalled();
            });

            it('On an "error" event invokes "deferred.reject" method with de correct parameters', function () {
                sut.type = typeParameter;
                spyOn(sut, 'obj').and.callFake(function (config) {
                    objCtor.config = config;

                    return objCtor;
                });
                var hasOptionsKeyDeclared = false;
                spyOn(objCtor, 'error').and.callThrough();
                spyOn(deferredFake, 'reject').and.callFake(function (optionsKey) {
                    if (optionsKey === factoryResponseOptions.key) {
                        hasOptionsKeyDeclared = true;
                    }
                });

                sut.createFactoryResponse(factoryResponseOptions);
        
                expect(hasOptionsKeyDeclared).toBeTruthy();
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
