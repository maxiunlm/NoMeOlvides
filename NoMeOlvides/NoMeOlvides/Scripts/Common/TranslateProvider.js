angular.module("pascalprecht.translate")
    .factory("$translateStaticFilesLoader",
    ["$q", "$http",
        function (a, b) {
            return function (c) {
                if (!c || !angular.isString(c.prefix) || !angular.isString(c.suffix))
                    throw new Error("Couldn't load static files, no prefix or suffix specified!");
                var d = a.defer();
                return b({ url: [c.prefix, c.key, c.suffix].join(""), method: "GET", params: "" })
                    .success(function (a) {
                        d.resolve(a)
                    }).error(function () {
                        d.reject(c.key)
                    }), d.promise
            }
        }]);

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

