/// <reference path="../../../nomeolvides/scripts/jquery-2.1.4.js" />
/// <reference path="../../../nomeolvides/scripts/jquery-migrate-1.2.1.js" />
/// <reference path='../../../NoMeOlvides/Scripts/underscore.js' />
//         / <reference path='../../../NoMeOlvides/Scripts/angular.js' />
/// <reference path='Fixture/CommonFixture.js' />
/// <reference path='Fixture/VoiceFormFixture.js' />
/// <reference path='Fixture/VoiceManagerFixture.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Common/VoiceForm.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Common/VoiceManager.js' />

describe('VoiceManager - ', function () {
    var sut;

    beforeEach(function () { });

    describe('GLOBALS - ', function () {


        it('Global method "onUndeclared" is defined', function () {


            expect(onUndeclared).toBeDefined();
            expect(_.isFunction(onUndeclared)).toBeTruthy();
        });
    });

    describe('CONSTRUCTOR - ', function () {
        beforeEach(function () {
            sut = new VoiceManager(translateFake);
        });

        it('inherits of "webkitSpeechRecognition"', function () {



            if ($.browser.webkit && navigator.userAgent.indexOf('PhantomJS') == -1) {
                expect(sut instanceof webkitSpeechRecognition.__proto__).toBeTruthy();
            } else {
                expect(sut instanceof webkitSpeechRecognition).toBeFalsy();
            }
        });

        it('the constructor is of "VoiceManager" type', function () {


            expect(VoiceManager.constructor === VoiceManager).toBeTruthy()
        });

        it('Overwritable method "showInfo" is defined', function () {


            expect(sut.showInfo).toBeDefined();
            expect(_.isFunction(sut.showInfo)).toBeTruthy()
        });

        it('Without "autoStart" parameter initializa attributes', function () {


            expect(sut.interimResults).toBeTruthy();
            expect(sut.lang).toEqual(argentineSpanishLanguage);
            expect(sut.continuous).toBeTruthy();
            expect(sut.voiceForm instanceof VoiceForm).toBeTruthy();
            expect(sut.recognizing).toBeFalsy();
            expect(sut.translate).toBeDefined();
        });

        it('With "autoStart" parameter initializa attributes', function () {

            sut = new VoiceManager(translateFake, autoStartTrue);

            expect(sut.recognizing).toEqual(autoStartTrue);
        });

        it('Without "translate" parameter throws an exception', function () {

            expect(function () { sut = new VoiceManager() }).toThrowError(Error);

        });

        it('With null "translate" parameter throws an exception', function () {

            expect(function () { sut = new VoiceManager() }).toThrowError(Error);

        });

        it('With an asigned language invokes the "translate.preferredLanguage" method', function () {
            spyOn(translateFake, 'preferredLanguage').and.callThrough();

            sut = new VoiceManager(translateFake);

            expect(translateFake.preferredLanguage).toHaveBeenCalled();
        });

        it('With an asigned language calls the "translate.preferredLanguage" method that returns "argentineSpanishLanguage"', function () {
            spyOn(translateFake, 'preferredLanguage').and.callFake(function () {
                return argentineSpanishLanguage;
            });

            sut = new VoiceManager(translateFake);

            expect(sut.lang).toEqual(argentineSpanishLanguage);
        });

        it('Without an asigned language calls the "translate.preferredLanguage" method that returns an empty String but the final language is "englishLanguage"', function () {
            spyOn(translateFake, 'preferredLanguage').and.callFake(function () {
                return stringEmpty;
            });

            sut = new VoiceManager(translateFake);

            expect(sut.lang).toEqual(englishLanguage);
        });

        describe('onresult - ', function () {
            beforeEach(function () {
                sut = new VoiceManager(translateFake);
            });

            it('With an event result invokes "VoiceForm.evalCommand" method with the "command"', function () {
                spyOn(sut.voiceForm, 'evalCommand').and.callFake(function (command) { });

                sut.onresult(eventFake);

                expect(sut.voiceForm.evalCommand).toHaveBeenCalledWith(correctCommand);
            });

            it('With an event result invokes "showInfo" method with the "command" text', function () {
                spyOn(sut, 'showInfo').and.callFake(function (command) { });

                sut.onresult(eventFake);

                expect(sut.showInfo).toHaveBeenCalledWith(correctCommand);
            });
        });

        it('If "webkitSpeechRecognition" is not declared in "window" invokes "onUndeclared" method', function () {
            if ($.browser.webkit && navigator.userAgent.indexOf('PhantomJS') != -1) {
                window.webkitSpeechRecognition = undefined;
            }
            VoiceManager.prototype = Object.create(emptyObjectFake.prototype);
            VoiceManager.constructor = VoiceManager;
            spyOn(window, 'onUndeclared').and.callFake(function () {
                onUndeclaredCalled = true;
            });

            sut = new VoiceManager(translateFake);

            if ($.browser.webkit && navigator.userAgent.indexOf('PhantomJS') == -1) {
                expect(window.onUndeclared).not.toHaveBeenCalled();
            } else {
                expect(window.onUndeclared).toHaveBeenCalled();
            }

            webkitSpeechRecognition = function () { };
            if ($.browser.webkit && navigator.userAgent.indexOf('PhantomJS') == -1) {
                webkitSpeechRecognition.prototype = Object.create(webkitSpeechRecognitionFake.prototype);
            } else {
                webkitSpeechRecognition.prototype = Object.create(webkitSpeechRecognitionFake.prototype);
            }
            VoiceManager.prototype = Object.create(webkitSpeechRecognition.prototype.__proto__);
            VoiceManager.constructor = VoiceManager;
        });
    });
});
