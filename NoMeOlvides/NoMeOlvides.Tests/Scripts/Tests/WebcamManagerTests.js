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

            sut = new WebcamManager(myCameraTagsId
                , smallWebcamSet
                , isShutterSoundEnabledFalse);

            expect(sut).toBeDefined();
            expect(sut.cameraTagsId).toEqual(myCameraTagsId);
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

            sut = new WebcamManager(myCameraTagsId
                , smallWebcamSet
                , isShutterSoundEnabledFalse);

            expect(Webcam.set).toHaveBeenCalledWith(smallWebcamSet);
        });

        it('Is "cameraTagId" undefined never invokes the "attach" method from the "Webcam" object', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });
            spyOn(Webcam, 'attach').and.callFake(function (id) {
            });

            sut = new WebcamManager(undefined
                , smallWebcamSet
                , isShutterSoundEnabledFalse);

            expect(Webcam.attach).not.toHaveBeenCalled();
        });

        it('Is "cameraTagId" null never invokes the "attach" method from the "Webcam" object', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });
            spyOn(Webcam, 'attach').and.callFake(function (id) {
            });

            sut = new WebcamManager(null
                , smallWebcamSet
                , isShutterSoundEnabledFalse);

            expect(Webcam.attach).not.toHaveBeenCalled();
        });

        it('Is "cameraTagId" defined invokes the "attach" method from the "Webcam" object', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });
            spyOn(Webcam, 'attach').and.callFake(function (id) {
            });

            sut = new WebcamManager(myCameraTagsId
                , smallWebcamSet
                , isShutterSoundEnabledFalse);

            expect(Webcam.attach).toHaveBeenCalledWith(camerTagIdPrefix + myCameraTagsId.cameraTagId);
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

            sut.attachCamera(myCameraTagsId.cameraTagId);

            expect(Webcam.attach).toHaveBeenCalledWith(camerTagIdPrefix + myCameraTagsId.cameraTagId);
        });

        it('With the "cameraTagId" parameter null but the "cameraTagId" attribute defined, invokes the "attach" method from the "Webcam" object', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });
            spyOn(Webcam, 'attach').and.callFake(function (id) {
            });

            sut.attachCamera(myCameraTagsId.cameraTagId);

            expect(Webcam.attach).toHaveBeenCalledWith(camerTagIdPrefix + myCameraTagsId.cameraTagId);
        });

        it('With the "cameraTagId" parameter defined invokes the "attach" method from the "Webcam" object', function () {
            spyOn(Webcam, 'set').and.callFake(function (webcamSet) {
            });
            spyOn(Webcam, 'attach').and.callFake(function (id) {
            });

            sut.attachCamera(myCameraTagsId.cameraTagId);

            expect(Webcam.attach).toHaveBeenCalledWith(camerTagIdPrefix + myCameraTagsId.cameraTagId);
        });
    });

    describe('setShutterCurrentTime - ', function () {
        beforeEach(function () {
            sut = new WebcamManager();
        });

        it('Without parameters set the "currentTime" attribute of "shutter" object to "0"', function () {

            sut.setShutterCurrentTime();

            expect(sut.shutter.currentTime).toEqual(defaultShutterCurrentTime);
        });

        it('With the "currentTime" parameter set the "currentTime" attribute of "shutter" object', function () {

            sut.setShutterCurrentTime(myShutterCurrentTime);

            expect(sut.shutter.currentTime).toEqual(myShutterCurrentTime);
        });
    });

    describe('playSoundEffect - ', function () {
        beforeEach(function () {
            sut = new WebcamManager();
        });

        it('With attribute "isShutterSoundEnabled" enabled and without parameters invokes the "setShutterCurrentTime" method from "sut"', function () {
            spyOn(sut, 'setShutterCurrentTime').and.callFake(function () {
            });

            sut.playSoundEffect();

            expect(sut.setShutterCurrentTime).toHaveBeenCalled();
        });

        it('With attribute "isShutterSoundEnabled" enabled invokes the "play" method of "shutter" object', function () {
            spyOn(sut.shutter, 'play').and.callFake(function () {
            });

            sut.playSoundEffect();

            expect(sut.shutter.play).toHaveBeenCalled();
        });

        it('With attribute "isShutterSoundEnabled" disabled never invokes the "play" method of "shutter" object', function () {
            sut = new WebcamManager(undefined, undefined, false);
            spyOn(sut.shutter, 'play').and.callFake(function () {
            });

            sut.playSoundEffect();

            expect(sut.shutter.play).not.toHaveBeenCalled();
        });

        it('With attribute "isShutterSoundEnabled" disabled and without parameters never invokes the "setShutterCurrentTime" method from "sut"', function () {
            sut = new WebcamManager(undefined, undefined, false);
            spyOn(sut, 'setShutterCurrentTime').and.callFake(function () {
            });

            sut.playSoundEffect();

            expect(sut.setShutterCurrentTime).not.toHaveBeenCalled();
        });
    });

    describe('previewSnapshot - ', function () {
        beforeEach(function () {
            sut = new WebcamManager();
        });

        it('without parameters invokes the "playSoundEffect" method from the "WebcamManager" object', function () {
            spyOn(sut, 'playSoundEffect').and.callFake(function () {
            });

            sut.previewSnapshot();

            expect(sut.playSoundEffect).toHaveBeenCalled();
        });

        it('without parameters invokes the "freeze" method from the "Webcam" object that freeze camera so user can preview current frame', function () {
            spyOn(Webcam, 'freeze').and.callFake(function () {
            });

            sut.previewSnapshot();

            expect(Webcam.freeze).toHaveBeenCalled();
        });

        it('Is "preTakeButtonsId" defined invokes the "getElementById" method from the "document" object', function () {
            spyOn(document, 'getElementById').and.callFake(function () {
            });

            sut.previewSnapshot();

            expect(document.getElementById).toHaveBeenCalled();
        });

        it('Is "preTakeButtonsId" defined hide this HTML tag', function () {
            spyOn(document, 'getElementById').and.callFake(function () {
            });

            sut.previewSnapshot();

            expect(Webcam.freeze).toHaveBeenCalled();
        });

        it('without parameters invokes the "" method from the "" object', function () {
            spyOn(Webcam, 'freeze').and.callFake(function () {
            });

            sut.previewSnapshot();

            expect(Webcam.freeze).toHaveBeenCalled();
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
