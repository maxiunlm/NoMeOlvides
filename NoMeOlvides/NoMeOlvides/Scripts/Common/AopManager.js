﻿// TODO: TDD con Jasmine !!!
var AopManager = function (maxAttemps, retryMessage) {
    this.counterAttempIndex = 0;
    this.hasAnotherAttempt = false;
    this.maxAttemps = maxAttemps || 3;
    this.retryMessage = retryMessage || 'Retry?';
};

AopManager.prototype.getHasAnotherAttempt = function () {
    this.counterAttempIndex++;
    this.hasAnotherAttempt = confirm(this.retryMessage) && this.counterAttempIndex < this.maxAttemps;

    return this.hasAnotherAttempt;
}

AopManager.prototype.log = function (aopMethod, method, typeParam, objectParam, typeMessage, attemptCounter) {
    var today = new Date();
    attemptCounter = attemptCounter || -1;
    typeMessage = typeMessage || 'INFO'

    var logMessage = today.toISOString() + ' -- ' + typeMessage + ' AOP ' + aopMethod + ' - '
        + (attemptCounter >= 0 ? 'It does not have another attempt [attemp number "' + attemptCounter + '"]: Callback ' : '')
        + 'Method [' + method + ']: ' + (typeParam ? typeParam + ': ' : '');

    console.log(logMessage, objectParam);
}

AopManager.prototype.beforeLogEvent = function (arguments, method, aopMethod) {
    aopMethod = aopMethod || 'beforeLogEvent';

    this.log(aopMethod, method, 'Invocation arguments', arguments);
};

AopManager.prototype.afterLogEvent = function (result, method, aopMethod) {
    aopMethod = aopMethod || 'afterLogEvent';

    this.log(aopMethod, method, 'Invocation result', result);
};

AopManager.prototype.aroundLogEvent = function (invocation) {
    this.beforeLogEvent(invocation.arguments, invocation.method, 'aroundLogEvent');

    var result = invocation.proceed();

    this.afterLogEvent(result, invocation.method, 'aroundLogEvent');
};

AopManager.prototype.afterThrowCatchEvent = function (exception, method, aopMethod) {
    aopMethod = aopMethod || 'afterThrowCatchEvent';

    this.log(aopMethod, method, 'Exception throwed', exception, 'ERROR');

    throw (exception);
}

AopManager.prototype.aroundLogThrowCatchEvent = function (invocation) {
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

AopManager.prototype.afterFinallyEvent = function (result, exception, aopObject, method) {
    if (result) {
        this.afterLogEvent(result, method, 'afterFinallyEvent');
    }
    if (exception) {
        this.afterThrowCatchEvent(exception, aopObject, method, 'afterFinallyEvent');
    }
}

AopManager.prototype.afterThrowRetryEvent = function (exception, aopObject, callback, method) {
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

        throw (exception);
    }

    return -1;
}