var TranslationsLoader = function (angular, app) {
    this.type;
    this.obj;
    this.angular = angular;
    this.app = app;

    this.createFactoryResponse = function (options) {
        //if (!options || !angular.isString(options.prefix) || !angular.isString(options.suffix))
        //    throw new Error('Couldn\'t load static files, no prefix or suffix specified!\n¡No se ha podio cargar los archivos, no ha especificado en prefijo o el sufijo!');
        var deferred = this.type.defer();
        return this.obj({ url: [options.prefix, options.key, options.suffix].join(''), method: 'GET', params: '' })
            .success(function (type) {
                deferred.resolve(type)
            }).error(function () {
                deferred.reject(options.key)
            }), deferred.promise
    }

    this.crateFactory = function (type, obj) {
        this.type = type;
        this.obj = obj;

        return this.createFactoryResponse;
    };

    this.load = function () {
        angular.module('pascalprecht.translate').factory('$translateStaticFilesLoader', ['$q', '$http', this.crateFactory]);

        app.config(['$translateProvider', function ($translateProvider) {
            //$translateProvider.translations('', { 'pageTitle': 'Don't forget me' }); // by default --> 'en'
            //$translateProvider.translations('es_AR', { 'pageTitle': 'No me olvides' });

            $translateProvider.useStaticFilesLoader({
                //prefix: '/NoMeOlvides/Scripts/Common/locale-',
                //suffix: '.json'
                prefix: '/NoMeOlvides/WebApi/TranslationsApi?lang=',
                suffix: ''
            });

            //$translateProvider.preferredLanguage('es_AR'); // 'es' for all Spanish
            $translateProvider.preferredLanguage('es'); // by default --> 'en'
        }]);
    };
};

var myTranslations = new TranslationsLoader(angular, app);

myTranslations.load();
