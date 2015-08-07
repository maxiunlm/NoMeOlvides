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

                sut.crateFactory(typeParameter, obtFake);

                expect(sut.type).toEqual(typeParameter);
                expect(sut.obj).toEqual(obtFake);
            });

            it('Returns the "createFactoryResponse" callback method', function () {

                var result = sut.crateFactory(typeParameter, obtFake);

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
                sut = new TranslationsLoader(angular, app);
            });

            it('', function () {
            });
        });
    });
});
