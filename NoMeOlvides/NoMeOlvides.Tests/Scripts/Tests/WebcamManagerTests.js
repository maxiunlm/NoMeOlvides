/// <reference path="../../../NoMeOlvides/Scripts/webcamjs-master/webcam.js" />
/// <reference path="../../../NoMeOlvides/Scripts/Common/webcammanager.js" />
/// <reference path="Fixture/CommonFixture.js" />
/// <reference path="Fixture/WebcamManagerFixture.js" />

describe('WebcamManager - ', function () {
    var sut;

    beforeEach(function () {
        sut = undefined;
    });

    describe('CONSTRUCTOR - ', function () {
        it('Without parameters instances an "WebcamManager" object', function () {

            sut = new WebcamManager();

            expect(sut).toBeDefined();
            expect(sut.cameraTagId).toEqual(defaultCamerTagId);
            expect(sut.webcamSet).toEqual(defaultWebcamSet);
            expect(sut.shutterSoundFilePath).toEqual(defaultShutterSoundFilePath);
            expect(sut.isShutterSoundEnabled).toEqual(defaultIsShutterSoundEnabledTrue);
            expect(sut.shutter instanceof Audio).toBeTruthy();
            expect(sut.shutter.autoplay).toEqual(expectationFalsy);
            expect(sut.shutter.src).toEqual(defaultShutterSoundFilePath + (navigator.userAgent.match(/Firefox/) ? shutterOggFormat : shutterMp3Format));
        });

        it('With all the parameters instances an "WebcamManager" object', function () {

            sut = new WebcamManager(myCameraTagId
                , smallWebcamSet
                , isShutterSoundEnabledFalse);

            expect(sut).toBeDefined();
            expect(sut.cameraTagId).toEqual(myCameraTagId);
            expect(sut.webcamSet).toEqual(smallWebcamSet);
            expect(sut.shutterSoundFilePath).toEqual(defaultShutterSoundFilePath);
            expect(sut.isShutterSoundEnabled).toEqual(isShutterSoundEnabledFalse);
            expect(sut.shutter instanceof Audio).toBeTruthy();
            expect(sut.shutter.autoplay).toEqual(expectationFalsy);
            expect(sut.shutter.src).toEqual(defaultShutterSoundFilePath + (navigator.userAgent.match(/Firefox/) ? shutterOggFormat : shutterMp3Format));

        });
    });

    describe('configureSettings - ', function () {
        beforeEach(function () { });

        it('', function () {
        });
    });

    describe('attachCamera - ', function () {
        beforeEach(function () { });

        it('', function () {
        });
    });

    describe('previewSnapshot - ', function () {
        beforeEach(function () { });

        it('', function () {
        });
    });

    describe('cancelPreview - ', function () {
        beforeEach(function () { });

        it('', function () {
        });
    });

    describe('savePhoto - ', function () {
        beforeEach(function () { });

        it('', function () {
        });
    });
});
