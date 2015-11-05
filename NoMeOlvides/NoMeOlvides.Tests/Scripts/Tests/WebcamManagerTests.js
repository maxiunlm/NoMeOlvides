/// <reference path="../../../NoMeOlvides/Scripts/webcamjs-master/webcam.js" />
/// <reference path="Fixture/CommonFixture.js" />
/// <reference path="Fixture/WebcamManagerFixture.js" />
/// <reference path="../../../NoMeOlvides/Scripts/Common/WebcamManager.js" />

describe('WebcamManager - ', function () {
    var sut;

    beforeEach(function () {
        sut = undefined;
    });

    describe('CONSTRUCTOR - ', function () {
        it('Without parameters instances an "WebcamManager" object', function () {

            sut = new WebcamManager();

            expect(sut).toBeDefined();
            expect(sut.cameraTagId).toBeUndefined();
            expect(sut.webcamSet).toEqual(defaultWebcamSet);
            expect(sut.shutterSoundFilePath).toEqual(applicationNamePath + defaultShutterSoundFilePath);
            expect(sut.isShutterSoundEnabled).toEqual(defaultIsShutterSoundEnabledTrue);
            expect(sut.shutter instanceof Audio).toBeTruthy();
            expect(sut.shutter.autoplay).toEqual(expectationFalsy);
            expect(sut.shutter.src).toEqual(applicationNamePath + defaultShutterSoundFilePath + (navigator.userAgent.match(/Firefox/) ? shutterOggFormat : shutterMp3Format));
        });

        it('Without parameters invokes the "set" method from the "Webcam" object', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });

            sut = new WebcamManager();

            expect(Webcam.set).toHaveBeenCalledWith(defaultWebcamSet);
        });

        it('With all the parameters instances an "WebcamManager" object', function () {

            sut = new WebcamManager(myCameraTagId
                , smallWebcamSet
                , isShutterSoundEnabledFalse);

            expect(sut).toBeDefined();
            expect(sut.cameraTagId).toEqual(myCameraTagId);
            expect(sut.webcamSet).toEqual(smallWebcamSet);
            expect(sut.shutterSoundFilePath).toEqual(applicationNamePath + defaultShutterSoundFilePath);
            expect(sut.isShutterSoundEnabled).toEqual(isShutterSoundEnabledFalse);
            expect(sut.shutter instanceof Audio).toBeTruthy();
            expect(sut.shutter.autoplay).toEqual(expectationFalsy);
            expect(sut.shutter.src).toEqual(applicationNamePath + defaultShutterSoundFilePath + (navigator.userAgent.match(/Firefox/) ? shutterOggFormat : shutterMp3Format));

        });

        it('With all the parameters invokes the "set" method from the "Webcam" object', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });

            sut = new WebcamManager(myCameraTagId
                , smallWebcamSet
                , isShutterSoundEnabledFalse);

            expect(Webcam.set).toHaveBeenCalledWith(smallWebcamSet);
        });

        it('Is the "cameraTagId" undefined never invokes the "attach" method from the "Webcam" object', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });
            spyOn(Webcam, 'attach').and.callFake(function (id) {
            });

            sut = new WebcamManager(undefined
                , smallWebcamSet
                , isShutterSoundEnabledFalse);

            expect(Webcam.attach).not.toHaveBeenCalled();
        });

        it('Is the "cameraTagId" null never invokes the "attach" method from the "Webcam" object', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });
            spyOn(Webcam, 'attach').and.callFake(function (id) {
            });

            sut = new WebcamManager(null
                , smallWebcamSet
                , isShutterSoundEnabledFalse);

            expect(Webcam.attach).not.toHaveBeenCalled();
        });

        it('Is the "cameraTagId" defined invokes the "attach" method from the "Webcam" object', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });
            spyOn(Webcam, 'attach').and.callFake(function (id) {
            });

            sut = new WebcamManager(myCameraTagId
                , smallWebcamSet
                , isShutterSoundEnabledFalse);

            expect(Webcam.attach).toHaveBeenCalledWith(camerTagIdPrefix + myCameraTagId);
        });
    });

    describe('configureSettings - ', function () {
        beforeEach(function () {
            sut = new WebcamManager();
        });

        it('With the "WebcamSet" parameter invokes the "set" method from the "Webcam" object', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });

            sut.configureSettings(smallWebcamSet);

            expect(Webcam.set).toHaveBeenCalledWith(smallWebcamSet);
        });

        it('Without parameters invokes the "set" method from the "Webcam" object with the default "WebcamSet" parameter', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });

            sut.configureSettings();

            expect(Webcam.set).toHaveBeenCalledWith(defaultWebcamSet);
        });
    });

    describe('attachCamera - ', function () {
        beforeEach(function () {
            sut = new WebcamManager();
        });
        
        it('With the "cameraTagId" parameter undefined and the "cameraTagId" attribute too, never invokes the "attach" method from the "Webcam" object', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });
            spyOn(Webcam, 'attach').and.callFake(function (id) {
            });

            sut.attachCamera(undefined);

            expect(Webcam.attach).not.toHaveBeenCalled();
        });

        it('With the "cameraTagId" parameter null and the "cameraTagId" attribute too, never invokes the "attach" method from the "Webcam" object', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });
            spyOn(Webcam, 'attach').and.callFake(function (id) {
            });

            sut.attachCamera(null);

            expect(Webcam.attach).not.toHaveBeenCalled();
        });
        
        it('With the "cameraTagId" parameter undefined but the "cameraTagId" attribute defined, invokes the "attach" method from the "Webcam" object', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });
            spyOn(Webcam, 'attach').and.callFake(function (id) {
            });

            sut.attachCamera(myCameraTagId);

            expect(Webcam.attach).toHaveBeenCalledWith(camerTagIdPrefix + myCameraTagId);
        });

        it('With the "cameraTagId" parameter null but the "cameraTagId" attribute defined, invokes the "attach" method from the "Webcam" object', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });
            spyOn(Webcam, 'attach').and.callFake(function (id) {
            });

            sut.attachCamera(myCameraTagId);

            expect(Webcam.attach).toHaveBeenCalledWith(camerTagIdPrefix + myCameraTagId);
        });

        it('With the "cameraTagId" parameter defined invokes the "attach" method from the "Webcam" object', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });
            spyOn(Webcam, 'attach').and.callFake(function (id) {
            });

            sut.attachCamera(myCameraTagId);

            expect(Webcam.attach).toHaveBeenCalledWith(camerTagIdPrefix + myCameraTagId);
        });
    });

    describe('previewSnapshot - ', function () {
        beforeEach(function () {
            sut = new WebcamManager();
        });

        it('', function () {
        });
    });

    describe('cancelPreview - ', function () {
        beforeEach(function () {
            sut = new WebcamManager();
        });

        it('', function () {
        });
    });

    describe('savePhoto - ', function () {
        beforeEach(function () {
            sut = new WebcamManager();
        });

        it('', function () {
        });
    });
});
