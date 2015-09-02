var maxAttemps = 3;
var initialCounterAttempIndex = 0;
var attemptCounter = 1000;
var hasAnotherAttemptTrue = true;
var hasAnotherAttemptFalse = false;
var retryMessage = 'genericRetryMessage';
var aopMethod = 'aopMethod';
var aopObject = new Object();
var typeParam = 'typeParam';
var objectParam = 'objectParam';
var typeMessage = 'INFO';
var typeErrorMessage = 'ERROR';
var argument1 = 'argument1';
var argument2 = 'argument2';
var method = 'method';
var patternLayout = '%d{HH:mm:ss} %-5p - %m%n';
var ajaxAppenderUrl = 'webapi/log4javascript';
var loggerFake = {
    addAppender: function (appender) { }
};
var getLoggerFake = function () {
    return loggerFake;
}
var proceedFakeFunction = function () { };
var invocationEmpty = {
    arguments: [],
    method: undefined,
    proceed: proceedFakeFunction
};
var invocationDataX1 = {
    arguments: [argument1],
    method: method,
    proceed: proceedFakeFunction
};
var invocationDataX2 = {
    arguments: [argument1, argument2],
    method: method,
    proceed: proceedFakeFunction
};
var callbackEmpty = {
    arguments: [],
    apply: function () { }
};
var callbackX1 = {
    arguments: [argument1],
    apply: function (aopObject, arguments) {
        this.arguments = arguments;
    }
};
var callbackX2 = {
    arguments: [argument1, argument2],
    apply: function (aopObject, arguments) {
        this.arguments = arguments;
    }
};
