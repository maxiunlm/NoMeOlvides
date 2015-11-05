var WebcamManager = function (cameraTagId, webcamSet, isShutterSoundEnabled) {
    this.cameraTagId = cameraTagId;
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

    if (this.cameraTagId) {
        Webcam.attach('#' + this.cameraTagId);
    }
};

WebcamManager.prototype.configureSettings = function (webcamSet) {
    Webcam.set(webcamSet || this.webcamSet);
}

WebcamManager.prototype.attachCamera = function (cameraTagId) {
    var tagId = cameraTagId || this.cameraTagId;

    if (tagId) {
        Webcam.attach('#' + tagId);
    }
}

WebcamManager.prototype.previewSnapshot = function () {
    //////// play sound effect
    //////try { shutter.currentTime = 0; } catch (e) {; } // fails in IE
    //////shutter.play();

    //////// freeze camera so user can preview current frame
    //////Webcam.freeze();

    //////// swap button sets
    //////document.getElementById('pre_take_buttons').style.display = 'none';
    //////document.getElementById('post_take_buttons').style.display = '';
}

WebcamManager.prototype.cancelPreview = function () {
    //////// cancel preview freeze and return to live camera view
    //////Webcam.unfreeze();

    //////// swap buttons back to first set
    //////document.getElementById('pre_take_buttons').style.display = '';
    //////document.getElementById('post_take_buttons').style.display = 'none';
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