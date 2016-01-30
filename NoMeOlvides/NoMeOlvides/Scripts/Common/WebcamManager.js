var WebcamManager = function (cameraTagsId, webcamSet, isShutterSoundEnabled) {
    var self = this;
    this.cameraTagsId = cameraTagsId;
    this.shutterSoundFilePath = (applicationNamePath || '/') + 'Scripts/webcamjs-master/shutter/';
    this.isShutterSoundEnabled = isShutterSoundEnabled || isShutterSoundEnabled == undefined || isShutterSoundEnabled == null;

    // Code to handle taking the snapshot and displaying it locally preload shutter audio clip
    this.shutter = new Audio();
    this.shutter.autoplay = false;
    this.shutter.src = this.shutterSoundFilePath + (navigator.userAgent.match(/Firefox/) ? 'shutter.ogg' : 'shutter.mp3');

    this.webcamSet = webcamSet || {
        // live preview size
        width: 320,
        height: 240,

        // device capture size
        dest_width: 640,
        dest_height: 480,

        // final cropped size
        crop_width: 480,
        crop_height: 480,

        // format and quality
        image_format: 'png',
        jpeg_quality: 90,

        // flip horizontal (mirror mode)
        flip_horiz: false
    };

    Webcam.set(this.webcamSet);

    if (this.cameraTagsId && this.cameraTagsId.cameraTagId) {
        Webcam.attach('#' + this.cameraTagsId.cameraTagId);
    }
};

WebcamManager.prototype.configureSettings = function (webcamSet) {
    Webcam.set(webcamSet || this.webcamSet);
}

WebcamManager.prototype.attachCamera = function (cameraTagId) {
    var tagId = cameraTagId
        || ((this.cameraTagsId !== undefined && this.cameraTagsId.cameraTagId)
        ? this.cameraTagsId.cameraTagId
        : false);

    if (tagId) {
        Webcam.attach('#' + tagId);
    }

    // TODO: TDD !!!
    if (this.cameraTagsId && this.cameraTagsId.previewSnapshot) {
        $('#' + this.cameraTagsId.previewSnapshot).on("click", $.proxy(this, "previewSnapshot"));
    }

    if (this.cameraTagsId && this.cameraTagsId.cancelPreview) {
        $('#' + this.cameraTagsId.cancelPreview).on("click", $.proxy(this, "cancelPreview"));
    }

    if (this.cameraTagsId && this.cameraTagsId.savePhoto) {
        $('#' + this.cameraTagsId.savePhoto).on("click", $.proxy(this, "savePhoto"));
    }
}

WebcamManager.prototype.setShutterCurrentTime = function (currentTime) {
    try {
        this.shutter.currentTime = currentTime? currentTime: 0;
    } catch (e) { // fails in IE
    }
}

WebcamManager.prototype.playSoundEffect = function () {
    if (this.isShutterSoundEnabled) {
        this.setShutterCurrentTime();
        this.shutter.play();
    }
}

WebcamManager.prototype.previewSnapshot = function (preTakeButtonsId, postTakeButtonsId) {
    this.playSoundEffect();

    Webcam.freeze();

    document.getElementById(preTakeButtonsId || this.cameraTagsId.preTakeButtonsId).style.display = 'none';
    document.getElementById(postTakeButtonsId || this.cameraTagsId.postTakeButtonsId).style.display = '';
}

WebcamManager.prototype.cancelPreview = function () {
    Webcam.unfreeze();

    document.getElementById(preTakeButtonsId || this.cameraTagsId.preTakeButtonsId).style.display = '';
    document.getElementById(postTakeButtonsId || this.cameraTagsId.postTakeButtonsId).style.display = 'none';
}

WebcamManager.prototype.turnOff = function () {
    Webcam.off();
}

WebcamManager.prototype.onErrorDefaultCallback = function (errorMessage) {
    alert(errorMessage);
}

WebcamManager.prototype.onError = function (callback) {
    Webcam.on('error', callback || this.onErrorDefaultCallback);
}

WebcamManager.prototype.savePhoto = function () {
    // You must override this method
    ////////// actually snap photo (from preview freeze) and display it
    ////////Webcam.snap(function (data_uri) {
    ////////    // display results in page
    ////////    document.getElementById('results').innerHTML =
    ////////        '<h2>Here is your large, cropped image:</h2>' +
    ////////        '<img src="' + data_uri + '"/><br/></br>' +
    ////////        '<a href="' + data_uri + '" target="_blank">Open image in new window...</a>';

    ////////    // shut down camera, stop capturing
    ////////    Webcam.reset();

    ////////    // show results, hide photo booth
    ////////    document.getElementById('my_camera_results').style.display = '';
    ////////    document.getElementById('my_photo_booth').style.display = 'none';
    ////////});
}