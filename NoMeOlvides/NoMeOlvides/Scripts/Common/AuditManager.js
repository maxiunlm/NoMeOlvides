var AuditManager = function (maxAttemps, retryMessage, ajaxAppender) {
    this.counterAttempIndex = 0;
    this.hasAnotherAttempt = false;
    this.maxAttemps = maxAttemps || 3;
    this.retryMessage = retryMessage || 'Retry?';

    this.logger = log4javascript.getLogger();

    this.logMessageLayout = new log4javascript.PatternLayout('%d{HH:mm:ss} %-5p - %m%n');
    this.browserAppender = new log4javascript.BrowserConsoleAppender();
    this.browserAppender.setLayout(this.logMessageLayout);
    this.logger.addAppender(this.browserAppender);

    this.jsonLayout = new log4javascript.JsonLayout();
    this.ajaxAppender = ajaxAppender || new log4javascript.AjaxAppender('webapi/log4javascript');
    this.ajaxAppender.setThreshold(log4javascript.Level.WARN);
    this.ajaxAppender.setLayout(this.jsonLayout);
    this.ajaxAppender.addHeader("Content-Type", "application/json; charset=utf-8");
    this.logger.addAppender(this.ajaxAppender);
};

AuditManager.prototype.getHasAnotherAttempt = function () {
    this.hasAnotherAttempt = confirm(this.retryMessage) && this.counterAttempIndex < this.maxAttemps;
    this.counterAttempIndex++;

    return this.hasAnotherAttempt;
}

AuditManager.prototype.logFormattedInfoDataToServer = function (formattedMessage, objectParam) {
    try {
        this.logger.info([formattedMessage, JSON.stringify(objectParam)]);
    } catch (e) {
        this.logger.info([formattedMessage, objectParam]);
    }
}

AuditManager.prototype.logFormattedDataToServer = function (formattedMessage, objectParam, typeMessage) {
    if (typeMessage === 'ERROR') {
        objectParam.lastLogMessage = formattedMessage;
        this.logger.error(objectParam);
    } else {
        this.logFormattedInfoDataToServer(formattedMessage, objectParam);
    }
}

AuditManager.prototype.logFormattedData = function (formattedMessage, objectParam, typeMessage) {
    try {
        this.logFormattedDataToServer(formattedMessage, objectParam, typeMessage);
    } catch (exception) {
        console.log('Unespected Exception:\n'
            , exception
            , '\n\n\t--> Original message or exception:\n\n'
            , formattedMessage
            , objectParam);
    }
};

AuditManager.prototype.log = function (aopMethod, method, typeParam, objectParam, typeMessage, attemptCounter) {
    this.lastLogDatetime = new Date();
    attemptCounter = attemptCounter || -1;
    typeMessage = typeMessage || 'INFO';
    method = method || '';
    aopMethod = aopMethod || '';

    this.lastLogMessage = this.lastLogDatetime.toISOString() + ' -- ' + typeMessage + ' AOP ' + aopMethod + ' - '
        + (attemptCounter >= 0 ? 'It does not have another attempt [attemp number "' + attemptCounter + '"]: Callback ' : '')
        + 'Method [' + method + ']: ' + (typeParam ? typeParam + ': ' : '');

    this.logFormattedData(this.lastLogMessage, objectParam, typeMessage)
}

AuditManager.prototype.beforeLogEvent = function (arguments, method, aopMethod) {
    aopMethod = aopMethod || 'beforeLogEvent';

    this.log(aopMethod, method, 'Invocation arguments', arguments);
};

AuditManager.prototype.afterLogEvent = function (result, method, aopMethod) {
    aopMethod = aopMethod || 'afterLogEvent';

    this.log(aopMethod, method, 'Invocation result', result);
};

AuditManager.prototype.aroundLogEvent = function (invocation) {
    this.beforeLogEvent(invocation.arguments, invocation.method, 'aroundLogEvent');

    var result = invocation.proceed();

    this.afterLogEvent(result, invocation.method, 'aroundLogEvent');
};

AuditManager.prototype.afterThrowCatchEvent = function (exception, method, aopMethod) {
    aopMethod = aopMethod || 'afterThrowCatchEvent';

    this.log(aopMethod, method, 'Exception throwed', exception, 'ERROR');

    throw exception;
}

AuditManager.prototype.aroundLogThrowCatchEvent = function (invocation) {
    this.beforeLogEvent(invocation.arguments, invocation.method, 'aroundLogThrowCatchEvent');

    try {
        var result = invocation.proceed();
    }
    catch (exception) {
        this.afterThrowCatchEvent(exception, invocation.method, 'aroundLogThrowCatchEvent');
    }
    finally {
        if (result) {
            this.afterLogEvent(result, invocation.method, 'aroundLogThrowCatchEvent');
        }
    }
};

AuditManager.prototype.afterFinallyEvent = function (result, exception, method) {
    if (result) {
        this.afterLogEvent(result, method, 'afterFinallyEvent');
    }
    if (exception) {
        this.afterThrowCatchEvent(exception, method, 'afterFinallyEvent');
    }
}

AuditManager.prototype.afterThrowRetryEvent = function (exception, aopObject, callback, method) {
    var aopMethod = 'afterThrowCatchEvent';
    var typeParam = 'Exception throwed';
    var typeMessage = 'ERROR';

    if (this.getHasAnotherAttempt()) {
        this.log(aopMethod, method, typeParam, exception, typeMessage);

        callback.apply(aopObject, callback.arguments);
    }
    else {
        this.log(aopMethod, method, typeParam, exception, typeMessage, (this.counterAttempIndex - 1));

        this.counterAttempIndex = 0;

        throw exception;
    }
}
