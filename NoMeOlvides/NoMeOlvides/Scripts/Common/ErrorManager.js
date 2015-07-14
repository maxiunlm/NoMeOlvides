var ErrorManager = {
    getInstance: (function () {
        var singleton;
        return function () {
            if (!singleton) {
                singleton = {

                    onGenealErrorEvent: function (data) {
                        alert('ERROR: ' + data);
                    }

                }
            }
            return singleton;
        };
    }())
};
// Invoke: ErrorManager.getInstance().onGenealErrorEvent(data);