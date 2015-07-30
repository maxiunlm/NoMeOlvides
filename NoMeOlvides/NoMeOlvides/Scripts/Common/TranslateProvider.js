angular.module("pascalprecht.translate").factory("$translateStaticFilesLoader",
    ["$q", "$http",
        function (type, obj) {
            return function (options) {
                if (!options || !angular.isString(options.prefix) || !angular.isString(options.suffix))
                    throw new Error("Couldn't load static files, no prefix or suffix specified!");
                var deferred = type.defer();
                return obj({ url: [options.prefix, options.key, options.suffix].join(""), method: "GET", params: "" })
                    .success(function (type) {
                        deferred.resolve(type)
                    }).error(function () {
                        deferred.reject(options.key)
                    }), deferred.promise
            }
        }
    ]
);

app.config(['$translateProvider', function ($translateProvider) {
    //$translateProvider.translations('', { "pageTitle": "Don't forget me" }); // by default --> 'en'
    //$translateProvider.translations('es_AR', { "pageTitle": "No me olvides" });

    $translateProvider.useStaticFilesLoader({
        //prefix: '/NoMeOlvides/Scripts/Common/locale-',
        //suffix: '.json'
        prefix: '/NoMeOlvides/WebApi/TranslationsApi?lang=',
        suffix: ''
    });

    //$translateProvider.preferredLanguage('es_AR'); // 'es' for all Spanish
    $translateProvider.preferredLanguage('es'); // by default --> 'en'
}]);

