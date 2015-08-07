var moduleName = 'pascalprecht.translate';
var factoryName = '$translateStaticFilesLoader';
var $qParameter = '$q';
var $httpParameter = '$http';
var spanishLanguage = 'es';
var prefix = '/NoMeOlvides/WebApi/TranslationsApi?lang=';
var suffix = '';
var $translateProviderParameter = '$translateProvider';
var typeParameter = {
    defer: function () { }
};
var staticFilesLoaderOptions = {
    prefix: prefix,
    suffix: suffix
};
var modulePascalprechtTranslate = {
    factory: function () { }
};
var translateProvider = {
    useStaticFilesLoader: function (staticFilesLoaderOptions) { },
    preferredLanguage: function (language) { }
};
var obtFake = function (config) {
    this.config = config;
}
obtFake.prototype.success = function (callback) {
    return this;
}
obtFake.prototype.error = function (callback) {
    return this;
}