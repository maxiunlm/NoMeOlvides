var ErrorManager = {
    getInstance: (function () {
        var singleton;
        return function () {
            if (!singleton) {
                singleton = {

                    onGenealErrorEvent: function (data) {
                        var message = data;

                        if (data.HasError) {
                            message = data.Messages.join('\n\t* ');
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