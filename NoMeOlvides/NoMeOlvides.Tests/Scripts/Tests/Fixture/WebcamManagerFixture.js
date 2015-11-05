//var defaultCamerTagId = 'camerTagId';
var myCameraTagId = 'myCameraTagId';
var camerTagIdPrefix = '#';
var defaultShutterSoundFilePath = 'Scripts/webcamjs-master/shutter/';
var myShutterSoundFilePath = 'shutter/';
var shutterOggFormat = 'shutter.ogg';
var shutterMp3Format = 'shutter.mp3';
var defaultIsShutterSoundEnabledTrue = true;
var isShutterSoundEnabledFalse = false;
var defaultWebcamSet = {
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
}
var smallWebcamSet = {
    // live preview size
    width: 128,
    height: 128,

    // device capture size
    dest_width: 320,
    dest_height: 320,

    // final cropped size
    crop_width: 256,
    crop_height: 256,

    // format and quality
    image_format: 'jpg',
    jpeg_quality: 90,

    // flip horizontal (mirror mode)
    flip_horiz: true
}
if (!window.Audio)
{
    window.Audio = function () {
        this.autoplay;
        this.src;
    };
}