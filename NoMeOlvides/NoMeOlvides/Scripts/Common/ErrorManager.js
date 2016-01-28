var ErrorManager = {
    getInstance: (function () {
        var singleton;
        return function () {
            if (!singleton) {
                singleton = {

                    onGenealErrorEvent: function (data) {
                        var message = data;

                        if (data.Errors != undefined && data.Errors.HasError) {
                            message = data.Errors.Messages.join('\n\t* ');
                        }

                        alert('ERROR: ' + message);
                    }

                }
            }
            return singleton;
        };
    }())
};
// Invoke: ErrorManager.getInstance().onGenealErrorEvent(data);