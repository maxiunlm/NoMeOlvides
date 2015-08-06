/// <reference path='../../../NoMeOlvides/Scripts/angular.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-mocks.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate.js' />
/// <reference path='../../../NoMeOlvides/Scripts/angular-translate-loader-url.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/App.js' />
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
        });
    });
});
