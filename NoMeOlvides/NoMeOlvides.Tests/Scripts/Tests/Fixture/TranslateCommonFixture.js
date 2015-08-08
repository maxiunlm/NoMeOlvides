var moduleName = 'pascalprecht.translate';
var factoryName = '$translateStaticFilesLoader';
var $qParameter = '$q';
var $httpParameter = '$http';
var methodGet = 'GET';
var spanishLanguage = 'es';
var prefix = '/NoMeOlvides/WebApi/TranslationsApi?lang=';
var suffix = stringEmpty;
var $translateProviderParameter = '$translateProvider';
var translationkey = spanishLanguage;
var deferredFake = {
    promise: {},
    resolve: function (type) { },
    reject: function (optionsKey) { }
};
var typeParameter = {
    defer: function () {
        return deferredFake;
    }
};
var factoryResponseOptions = {
    key: translationkey,
    prefix: prefix,
    suffix: suffix
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
var objCtor = new Object();
var objFake = function (config) {
    objCtor.prototype.config = config;

    return objCtor;
}
objCtor.prototype.success = function (callback) {
    return this;
}
objCtor.prototype.error = function (callback) {
    return this;
}