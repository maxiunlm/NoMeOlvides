/// <reference path="../../../NoMeOlvides/Scripts/webcamjs-master/webcam.js" />
/// <reference path="Fixture/CommonFixture.js" />
/// <reference path="Fixture/WebcamManagerFixture.js" />
/// <reference path="../../../NoMeOlvides/Scripts/Common/WebcamManager.js" />


// https://github.com/jhuckaby/webcamjs
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
            sut = new WebcamManager(myCameraTagsId);
            htmlTagVisibilitySyle.style.display = undefined;
            htmlSecondTagVisibilitySyle.style.display = undefined;
        });

        it('With the Ids Tag defined invokes the "playSoundEffect" method from the "WebcamManager" object', function () {
            spyOn(sut, 'playSoundEffect').and.callFake(function () {
            });
            spyOn(document, 'getElementById').and.callFake(function () {
                return htmlTagVisibilitySyle
            });

            sut.previewSnapshot();

            expect(sut.playSoundEffect).toHaveBeenCalled();
        });

        it('With the Ids Tag defined invokes the "freeze" method from the "Webcam" object that freeze the camera so user can preview current frame', function () {
            spyOn(Webcam, 'freeze').and.callFake(function () {
            });
            spyOn(document, 'getElementById').and.callFake(function () {
                return htmlTagVisibilitySyle
            });

            sut.previewSnapshot();

            expect(Webcam.freeze).toHaveBeenCalled();
        });

        it('Is "preTakeButtonsId" attribute defined and exists the Html Tag invokes the "getElementById" method from the "document" object', function () {
            spyOn(document, 'getElementById').and.callFake(function (tagId) {
                return tagId === myCameraTagsId.preTakeButtonsId ? htmlTagVisibilitySyle : htmlSecondTagVisibilitySyle;
            });

            sut.previewSnapshot();

            expect(document.getElementById).toHaveBeenCalledWith(myCameraTagsId.preTakeButtonsId);
        });

        it('Is "preTakeButtonsId" attribute defined hide this HTML tag', function () {
            spyOn(document, 'getElementById').and.callFake(function (tagId) {
                return tagId === myCameraTagsId.preTakeButtonsId ? htmlTagVisibilitySyle : htmlSecondTagVisibilitySyle;
            });

            sut.previewSnapshot();

            expect(htmlTagVisibilitySyle.style.display).toEqual(displayNone);
        });

        it('Is "postTakeButtonsId" attribute defined and exists the Html Tag invokes the "getElementById" method from the "document" object', function () {
            spyOn(document, 'getElementById').and.callFake(function (tagId) {
                return tagId === myCameraTagsId.preTakeButtonsId ? htmlTagVisibilitySyle : htmlSecondTagVisibilitySyle;
            });

            sut.previewSnapshot();

            expect(document.getElementById).toHaveBeenCalledWith(myCameraTagsId.postTakeButtonsId);
        });

        it('Is "postTakeButtonsId" attribute defined display this HTML tag', function () {
            spyOn(document, 'getElementById').and.callFake(function (tagId) {
                return tagId === myCameraTagsId.preTakeButtonsId ? htmlTagVisibilitySyle : htmlSecondTagVisibilitySyle;
            });

            sut.previewSnapshot();

            expect(htmlSecondTagVisibilitySyle.style.display).toEqual(displayVisible);
        });

        it('With the "preTakeButtonsId" parameter defined and exists the Html Tag invokes the "getElementById" method from the "document" object', function () {
            spyOn(document, 'getElementById').and.callFake(function (tagId) {
                return tagId === preTakeButtonsId ? htmlTagVisibilitySyle : htmlSecondTagVisibilitySyle;
            });

            sut.previewSnapshot(preTakeButtonsId, undefined);

            expect(document.getElementById).toHaveBeenCalledWith(preTakeButtonsId);
        });

        it('With the "preTakeButtonsId" parameter defined hide this HTML tag', function () {
            spyOn(document, 'getElementById').and.callFake(function (tagId) {
                return tagId === preTakeButtonsId ? htmlTagVisibilitySyle : htmlSecondTagVisibilitySyle;
            });

            sut.previewSnapshot(preTakeButtonsId, undefined);

            expect(htmlTagVisibilitySyle.style.display).toEqual(displayNone);
        });

        it('With the "postTakeButtonsId" parameter defined and exists the Html Tag invokes the "getElementById" method from the "document" object', function () {
            spyOn(document, 'getElementById').and.callFake(function (tagId) {
                return tagId === postTakeButtonsId ? htmlTagVisibilitySyle : htmlSecondTagVisibilitySyle;
            });

            sut.previewSnapshot(undefined, postTakeButtonsId);

            expect(document.getElementById).toHaveBeenCalledWith(postTakeButtonsId);
        });

        it('With the "postTakeButtonsId" parameter defined hide this HTML tag', function () {
            spyOn(document, 'getElementById').and.callFake(function (tagId) {
                return tagId === postTakeButtonsId ? htmlTagVisibilitySyle : htmlSecondTagVisibilitySyle;
            });

            sut.previewSnapshot(undefined, postTakeButtonsId);

            expect(htmlSecondTagVisibilitySyle.style.display).toEqual(displayNone);
        });

        it('Without any parameter or attribute defined throws an exception', function () {
            sut = new WebcamManager();

            expect(function () { sut.previewSnapshot(); }).toThrowError(TypeError);
        });
    });

    describe('cancelPreview - ', function () {
        beforeEach(function () {
            sut = new WebcamManager(myCameraTagsId);
            htmlTagVisibilitySyle.style.display = undefined;
            htmlSecondTagVisibilitySyle.style.display = undefined;
        });

        it('With the Ids Tag defined invokes the "unfreeze" method from the "Webcam" object that unfreeze the camera so user can preview current frame', function () {
            spyOn(Webcam, 'unfreeze').and.callFake(function () {
            });
            spyOn(document, 'getElementById').and.callFake(function () {
                return htmlTagVisibilitySyle
            });

            sut.cancelPreview();

            expect(Webcam.unfreeze).toHaveBeenCalled();
        });

        it('Is "preTakeButtonsId" attribute defined and exists the Html Tag invokes the "getElementById" method from the "document" object', function () {
            spyOn(document, 'getElementById').and.callFake(function (tagId) {
                return tagId === myCameraTagsId.preTakeButtonsId ? htmlTagVisibilitySyle : htmlSecondTagVisibilitySyle;
            });

            sut.cancelPreview();

            expect(document.getElementById).toHaveBeenCalledWith(myCameraTagsId.preTakeButtonsId);
        });

        it('Is "preTakeButtonsId" attribute defined display this HTML tag', function () {
            spyOn(document, 'getElementById').and.callFake(function (tagId) {
                return tagId === myCameraTagsId.preTakeButtonsId ? htmlTagVisibilitySyle : htmlSecondTagVisibilitySyle;
            });

            sut.cancelPreview();

            expect(htmlTagVisibilitySyle.style.display).toEqual(displayVisible);
        });

        it('Is "postTakeButtonsId" attribute defined and exists the Html Tag invokes the "getElementById" method from the "document" object', function () {
            spyOn(document, 'getElementById').and.callFake(function (tagId) {
                return tagId === myCameraTagsId.preTakeButtonsId ? htmlTagVisibilitySyle : htmlSecondTagVisibilitySyle;
            });

            sut.cancelPreview();

            expect(document.getElementById).toHaveBeenCalledWith(myCameraTagsId.postTakeButtonsId);
        });

        it('Is "postTakeButtonsId" attribute defined hide this HTML tag', function () {
            spyOn(document, 'getElementById').and.callFake(function (tagId) {
                return tagId === myCameraTagsId.preTakeButtonsId ? htmlTagVisibilitySyle : htmlSecondTagVisibilitySyle;
            });

            sut.cancelPreview();

            expect(htmlSecondTagVisibilitySyle.style.display).toEqual(displayNone);
        });

        it('With the "preTakeButtonsId" parameter defined and exists the Html Tag invokes the "getElementById" method from the "document" object', function () {
            spyOn(document, 'getElementById').and.callFake(function (tagId) {
                return tagId === preTakeButtonsId ? htmlTagVisibilitySyle : htmlSecondTagVisibilitySyle;
            });

            sut.cancelPreview(preTakeButtonsId, undefined);

            expect(document.getElementById).toHaveBeenCalledWith(preTakeButtonsId);
        });

        it('With the "preTakeButtonsId" parameter defined display this HTML tag', function () {
            spyOn(document, 'getElementById').and.callFake(function (tagId) {
                return tagId === preTakeButtonsId ? htmlTagVisibilitySyle : htmlSecondTagVisibilitySyle;
            });

            sut.cancelPreview(preTakeButtonsId, undefined);

            expect(htmlTagVisibilitySyle.style.display).toEqual(displayVisible);
        });

        it('With the "postTakeButtonsId" parameter defined and exists the Html Tag invokes the "getElementById" method from the "document" object', function () {
            spyOn(document, 'getElementById').and.callFake(function (tagId) {
                return tagId === postTakeButtonsId ? htmlTagVisibilitySyle : htmlSecondTagVisibilitySyle;
            });

            sut.cancelPreview(undefined, postTakeButtonsId);

            expect(document.getElementById).toHaveBeenCalledWith(postTakeButtonsId);
        });

        it('With the "postTakeButtonsId" parameter defined display this HTML tag', function () {
            spyOn(document, 'getElementById').and.callFake(function (tagId) {
                return tagId === postTakeButtonsId ? htmlTagVisibilitySyle : htmlSecondTagVisibilitySyle;
            });

            sut.cancelPreview(undefined, postTakeButtonsId);

            expect(htmlSecondTagVisibilitySyle.style.display).toEqual(displayVisible);
        });

        it('Without any parameter or attribute defined throws an exception', function () {
            sut = new WebcamManager();

            expect(function () { sut.cancelPreview(); }).toThrowError(TypeError);
        });
    });

    describe('turnOff - ', function () {
        beforeEach(function () {
            sut = new WebcamManager();
        });

        it('Without any parameter invokes the "off" method from de "Webcam" object to remove all listeners', function () {
            spyOn(Webcam, 'off').and.callFake(function () { });

            sut.turnOff();

            expect(Webcam.off).toHaveBeenCalled();
        });
    });

    describe('onError - ', function () {
        beforeEach(function () {
            sut = new WebcamManager();
        });

        it('With a callback function invokes the "on" method of the "Webcam" object to set the error event', function () {
            spyOn(Webcam, 'on').and.callFake(function (event, callback) { });

            sut.onError();

            expect(Webcam.on).toHaveBeenCalledWith(onErrorEventName, onErrorEventCallback);
        });

        it('Without any callback function invokes the "on" method of the "Webcam" object to set the error event', function () {
            spyOn(Webcam, 'on').and.callFake(function (event, callback) { });

            sut.onError();

            expect(Webcam.on).toHaveBeenCalledWith(onErrorEventName, jasmine.any(Function));
        });
    });

    describe('savePhoto - ', function () {
        beforeEach(function () {
            sut = new WebcamManager();
        });

        it('There is an overwritable function "savePhoto" for the developer', function () {


            expect(typeof (sut.savePhoto) === 'function').toBeTruthy();
        });
    });
});
