// Depends of VoiceFormFixture.js !!!!!!!!!!!!!!!!
var eventFake = {
    results: [[{
        transcript: correctCommand // Depends of VoiceFormFixture.js !!!!!!!!!!!!!!!!
    }]]
};
var autoStartTrue = true;
var englishLanguage = 'en';
var emptyObjectFake = function () { };
var webkitSpeechRecognitionFake = function () {
    var continuous;
    var interimResults;
    var lang;
    var recognizing;
    var voiceForm;
    var onstart = function () { };
    var onend = function () { };
    var onresult = function (event) { };
    var onerror = function (event) { };
    var stop = function () { };
    var start = function () { };
};
if (!webkitSpeechRecognition) {
    var webkitSpeechRecognition = function () { };
    webkitSpeechRecognition.prototype = Object.create(webkitSpeechRecognitionFake.prototype);
}