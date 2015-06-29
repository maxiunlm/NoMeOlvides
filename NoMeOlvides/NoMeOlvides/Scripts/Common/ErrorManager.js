var ErrorManager = {
    getInstance: (function () { // BEGIN iife
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
    }()) // END iife
};
// Invoke: ErrorManager.getInstance().onGenealErrorEvent(data);