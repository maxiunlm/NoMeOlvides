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

    describe('CONSTRUCTOR - ', function () {
        beforeEach(function () {
            sut = new VoiceManager(translateFake);
        });

        it('inherits of "webkitSpeechRecognition"', function () {


            expect((sut.prototype || sut.__proto__) instanceof webkitSpeechRecognition).toBeTruthy()
        });

        it('the constructor is of "VoiceManager" type', function () {


            expect(VoiceManager.constructor === VoiceManager).toBeTruthy()
        });

        it('Overwritable method "showInfo" is defined', function () {


            expect(sut.showInfo).toBeDefined();
            expect(_.isFunction(sut.showInfo)).toBeTruthy()
        });

        it('Overwritable method "onUndeclared" is defined', function () {


            expect(sut.onUndeclared).toBeDefined();
            expect(_.isFunction(sut.onUndeclared)).toBeTruthy()
        });

        it('Without "autoStart" parameter initializa attributes', function () {


            expect(sut.interimResults).toEqual(true);
            expect(sut.lang).toEqual(argentineSpanishLanguage);
            expect(sut.continuous).toEqual(true);
            expect(sut.voiceForm instanceof VoiceForm).toBeTruthy();
            expect(sut.recognizing).toBeUndefined();
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

        // TODO: No functiona !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //////it('If "webkitSpeechRecognition" is not declared in "window" invokes "onUndeclared" method', function () {
        //////    var onUndeclaredCalled = false;
        //////    VoiceManager.prototype = Object.create(emptyObjectFake.prototype);
        //////    VoiceManager.constructor = VoiceManager;
        //////    VoiceManager.prototype.onUndeclared = function () { };
        //////    spyOn(VoiceManager.prototype, 'onUndeclared').and.callFake(function () {
        //////        onUndeclaredCalled = true;
        //////    });

        //////    sut = new VoiceManager();

        //////    expect(VoiceManager.prototype.onUndeclared).toHaveBeenCalled();
        //////    VoiceManager.prototype = Object.create(webkitSpeechRecognition.prototype);
        //////    VoiceManager.constructor = VoiceManager;
        //////});
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
});
