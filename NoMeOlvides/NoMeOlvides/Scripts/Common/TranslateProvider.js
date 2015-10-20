var myTranslations;

var TranslationsLoader = function (angular, app) {
    this.type;
    this.obj = function () { };
    this.angular = angular;
    this.app = app;
    this.translateProvider = {};
};

TranslationsLoader.prototype.createFactoryResponse = function (options) {
    //if (!options || !angular.isString(options.prefix) || !angular.isString(options.suffix))
    //    throw new Error('Couldn\'t load static files, no prefix or suffix specified!\n¡No se ha podio cargar los archivos, no ha especificado en prefijo o el sufijo!');
    var deferred = myTranslations.type.defer();
    return myTranslations.obj({ url: [options.prefix, options.key, options.suffix].join(''), method: 'GET', params: '' })
        .success(function (type) {
            deferred.resolve(type)
        }).error(function () {
            deferred.reject(options.key)
        }), deferred.promise
}

TranslationsLoader.prototype.crateFactory = function (type, obj) {
    myTranslations = myTranslations || new TranslationsLoader(angular, app);
    this.type = myTranslations.type = type;
    this.obj = myTranslations.obj = obj;
    this.createFactoryResponse = this.createFactoryResponse || myTranslations.createFactoryResponse

    return this.createFactoryResponse;
};

TranslationsLoader.prototype.configureApp = function ($translateProvider) {
    ////$translateProvider.translations('', { 'pageTitle': 'Don't forget me' }); // by default --> 'en'
    ////$translateProvider.translations('es_AR', { 'pageTitle': 'No me olvides' });
    //$translateProvider.useStaticFilesLoader({
    //  prefix: '/NoMeOlvides/Scripts/Common/locale-',
    //  suffix: '.json'
    //});
    //$translateProvider.preferredLanguage('es_AR'); // 'es' for all Spanish

    this.translateProvider = $translateProvider;

    $translateProvider.useStaticFilesLoader({
        prefix: '/NoMeOlvides/WebApi/TranslationsApi?lang=',
        suffix: ''
    });

    $translateProvider.preferredLanguage('es'); // by default --> 'en'
};

TranslationsLoader.prototype.load = function () {
    angular.module('pascalprecht.translate').factory('$translateStaticFilesLoader', ['$q', '$http', this.crateFactory]);
    app.config(['$translateProvider', this.configureApp]);
};

myTranslations = new TranslationsLoader(angular, app);
myTranslations.load();
