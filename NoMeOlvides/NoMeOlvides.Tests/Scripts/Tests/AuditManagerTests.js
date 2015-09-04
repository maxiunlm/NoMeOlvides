/// <reference path='../../../NoMeOlvides/Scripts/angular.js' />
/// <reference path="../../../NoMeOlvides/Scripts/log4javascript.js" />
/// <reference path='Fixture/CommonFixture.js' />
/// <reference path='Fixture/AuditManagerCommonFixture.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Common/AuditManager.js' />

describe('AuditManager - ', function () {
    var sut;

    beforeEach(function () { });

    describe('CONSTRUCTOR - ', function () {
        beforeEach(function () {
            sut = new AuditManager();
        });

        it('Without parameters initialize the object attributes', function () {


            expect(sut.counterAttempIndex).toEqual(0);
            expect(sut.hasAnotherAttempt).toBeFalsy();
            expect(sut.maxAttemps).toEqual(3);
            expect(sut.logger).toBeDefined();
            expect(sut.logMessageLayout instanceof log4javascript.PatternLayout).toBeTruthy();
            expect(sut.browserAppender instanceof log4javascript.BrowserConsoleAppender).toBeTruthy();
            expect(sut.ajaxAppender instanceof log4javascript.AjaxAppender).toBeTruthy();
            expect(sut.jsonLayout instanceof log4javascript.JsonLayout).toBeTruthy();
            expect(sut.retryMessage).toEqual('Retry?');
            expect(sut.logMessageLayout.pattern).toEqual(patternLayout);
        });

        it('With parameters initialize the object attributes', function () {
            //spyOn(log4javascript.prototype, 'AjaxAppender').and.callThrough();

            sut = new AuditManager(maxAttemps, retryMessage);

            expect(sut.counterAttempIndex).toEqual(0);
            expect(sut.hasAnotherAttempt).toBeFalsy();
            expect(sut.maxAttemps).toEqual(maxAttemps);
            expect(sut.logger).toBeDefined();
            expect(sut.logMessageLayout instanceof log4javascript.PatternLayout).toBeTruthy();
            expect(sut.browserAppender instanceof log4javascript.BrowserConsoleAppender).toBeTruthy();
            expect(sut.ajaxAppender instanceof log4javascript.AjaxAppender).toBeTruthy();
            expect(sut.jsonLayout instanceof log4javascript.JsonLayout).toBeTruthy();
            expect(sut.retryMessage).toEqual(retryMessage);
            expect(sut.logMessageLayout.pattern).toEqual(patternLayout);
            // TODO: expect(log4javascript.prototype.AjaxAppender).toHaveBeenCalledWith(ajaxAppender); ??? 
        });

        it('With the "logMessageLayout" object invokes "setLayout" method from "browserAppender" object', function () {
            spyOn(log4javascript.BrowserConsoleAppender.prototype, 'setLayout').and.callThrough();

            sut = new AuditManager(maxAttemps, retryMessage);

            expect(log4javascript.BrowserConsoleAppender.prototype.setLayout).toHaveBeenCalledWith(sut.logMessageLayout);
        });

        it('With the "browserAppender" object invokes "addAppender" method from "logger" object', function () {
            spyOn(log4javascript, 'getLogger').and.callFake(getLoggerFake);
            spyOn(loggerFake, 'addAppender').and.callThrough();

            sut = new AuditManager(maxAttemps, retryMessage);

            expect(loggerFake.addAppender).toHaveBeenCalledWith(sut.browserAppender);
        });

        it('With the "log4javascript.Level.WARN" default level invokes "setThreshold" method from "ajaxAppender" object', function () {
            spyOn(log4javascript.AjaxAppender.prototype, 'setThreshold').and.callThrough();

            sut = new AuditManager(maxAttemps, retryMessage);

            expect(log4javascript.AjaxAppender.prototype.setThreshold).toHaveBeenCalledWith(log4javascript.Level.WARN);
        });

        it('With the "jsonLayout" object invokes "setLayout" method from "AjaxAppender" object', function () {
            spyOn(ajaxAppenderFake, 'setLayout').and.callThrough();

            sut = new AuditManager(maxAttemps, retryMessage, ajaxAppenderFake);

            expect(ajaxAppenderFake.setLayout).toHaveBeenCalledWith(sut.jsonLayout);
        });

        it('With the content type parameters invokes "addHeader" method from "ajaxAppender" object', function () {
            spyOn(ajaxAppenderFake, 'addHeader').and.callThrough();

            sut = new AuditManager(maxAttemps, retryMessage, ajaxAppenderFake);

            expect(ajaxAppenderFake.addHeader).toHaveBeenCalledWith(contentTypeDefinition, contentTypeValue);
        });

        it('With the "ajaxAppender" object invokes "addAppender" method from "logger" object', function () {
            spyOn(log4javascript, 'getLogger').and.callFake(getLoggerFake);
            spyOn(loggerFake, 'addAppender').and.callThrough();

            sut = new AuditManager(maxAttemps, retryMessage);

            expect(loggerFake.addAppender).toHaveBeenCalledWith(sut.ajaxAppender);
            //expect(loggerFake.addAppender.calls.count()).toEqual(twoItemsCount);
            //expect(loggerFake.addAppender.calls.argsFor(secondItemIndex)[firstItemIndex]).toEqual(sut.ajaxAppender);
        });
    });

    describe('getHasAnotherAttempt - ', function () {
        beforeEach(function () {
            sut = new AuditManager();
        });

        it('with user confirmation "OK" and counterAttempIndex less than maxAttemps', function () {
            sut.counterAttempIndex = sut.maxAttemps - 1;
            spyOn(window, 'confirm').and.returnValue(confirmationOk);

            var result = sut.getHasAnotherAttempt();

            expect(result).toEqual(hasAnotherAttemptTrue);
        });

        it('with user confirmation "OK" and counterAttempIndex equals to maxAttemps', function () {
            sut.counterAttempIndex = sut.maxAttemps;
            spyOn(window, 'confirm').and.returnValue(confirmationOk);

            var result = sut.getHasAnotherAttempt();

            expect(result).toEqual(hasAnotherAttemptFalse);
        });

        it('with user confirmation "OK" and counterAttempIndex greater than maxAttemps', function () {
            sut.counterAttempIndex = sut.maxAttemps + 1;
            spyOn(window, 'confirm').and.returnValue(confirmationOk);

            var result = sut.getHasAnotherAttempt();

            expect(result).toEqual(hasAnotherAttemptFalse);
        });

        it('with user confirmation "Cancel" and counterAttempIndex less than maxAttemps', function () {
            sut.counterAttempIndex = sut.maxAttemps - 1;
            spyOn(window, 'confirm').and.returnValue(confirmationCancel);

            var result = sut.getHasAnotherAttempt();

            expect(result).toEqual(hasAnotherAttemptFalse);
        });

        it('with user confirmation "Cancel" and counterAttempIndex equals to maxAttemps', function () {
            sut.counterAttempIndex = sut.maxAttemps;
            spyOn(window, 'confirm').and.returnValue(confirmationCancel);

            var result = sut.getHasAnotherAttempt();

            expect(result).toEqual(hasAnotherAttemptFalse);
        });

        it('with user confirmation "Cancel" and counterAttempIndex greater than maxAttemps', function () {
            sut.counterAttempIndex = sut.maxAttemps + 1;
            spyOn(window, 'confirm').and.returnValue(confirmationCancel);

            var result = sut.getHasAnotherAttempt();

            expect(result).toEqual(hasAnotherAttemptFalse);
        });
    });

    describe('log - ', function () {
        beforeEach(function () {
            sut = new AuditManager();
        });

        it('Instance a Date Object', function () {

            sut.log();

            expect(sut.lastLogDatetime).not.toBeNull();
            expect(sut.lastLogDatetime).not.toBeUndefined();
        });

        it('Invoke the toISOString method of a Date Object', function () {

            sut.log();

            expect(sut.lastLogMessage.indexOf(sut.lastLogDatetime.toISOString())).toEqual(startIndexOf);
        });

        it('Without parameters generate a log message', function () {

            sut.log();

            expect(sut.lastLogMessage).not.toBeNull();
            expect(sut.lastLogMessage).not.toBeUndefined();
        });

        it('Invokes the "Info" method of Logger object', function () {
            spyOn(sut.logger, 'info').and.callFake(function () { });

            sut.log();

            expect(sut.logger.info).toHaveBeenCalledWith([jasmine.any(String), undefined]);
        });

        it('With all the parameters generate a log Info message', function () {
            spyOn(sut.logger, 'info').and.callFake(function (param1, objectParam) { });

            sut.log(aopMethod, method, typeParam, objectParam, typeMessage, attemptCounter);

            expect(sut.lastLogMessage).not.toBeNull();
            expect(sut.lastLogMessage).not.toBeUndefined();
            expect(sut.lastLogMessage.indexOf(aopMethod) > 0).toBeTruthy();
            expect(sut.lastLogMessage.indexOf(method) > 0).toBeTruthy();
            expect(sut.lastLogMessage.indexOf(typeParam) > 0).toBeTruthy();
            expect(sut.lastLogMessage.indexOf(typeMessage) > 0).toBeTruthy();
            expect(sut.lastLogMessage.indexOf(attemptCounter) > 0).toBeTruthy();
            expect(sut.logger.info).toHaveBeenCalledWith([jasmine.any(String), objectParam]);
        });

        it('With all the parameters and "typeMessage === ERROR" generate a log Error message', function () {
            spyOn(sut.logger, 'error').and.callFake(function (param1, objectParam) { });

            sut.log(aopMethod, method, typeParam, exception, typeErrorMessage, attemptCounter);

            expect(sut.lastLogMessage).not.toBeNull();
            expect(sut.lastLogMessage).not.toBeUndefined();
            expect(sut.lastLogMessage.indexOf(aopMethod) > 0).toBeTruthy();
            expect(sut.lastLogMessage.indexOf(method) > 0).toBeTruthy();
            expect(sut.lastLogMessage.indexOf(typeParam) > 0).toBeTruthy();
            expect(sut.lastLogMessage.indexOf(typeErrorMessage) > 0).toBeTruthy();
            expect(sut.lastLogMessage.indexOf(attemptCounter) > 0).toBeTruthy();
            expect(sut.logger.error).toHaveBeenCalledWith([jasmine.any(String), exception]);
        });

        it('Calls the "error" method of Logger object that throws an Exception then Invokes the "log" method of "console" object', function () {
            spyOn(sut.logger, 'error').and.callFake(function (param1, objectParam) {
                throw exception;
            });
            spyOn(console, 'log').and.callFake(function (param1, objectParam) { });

            sut.log(aopMethod, method, typeParam, objectParam, typeErrorMessage);

            expect(console.log).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Error), jasmine.any(String), jasmine.any(String), objectParam);
            //expect(console.log.calls.argsFor(firstItemIndex)[firstItemIndex]).toEqual(jasmine.any(String));
            //expect(console.log.calls.argsFor(firstItemIndex)[secondItemIndex]).toEqual(jasmine.any(Error));
            //expect(console.log.calls.argsFor(firstItemIndex)[thirdItemIndex]).toEqual(jasmine.any(String));
            //expect(console.log.calls.argsFor(firstItemIndex)[fourthItemIndex]).toEqual(jasmine.any(String));
            //expect(console.log.calls.argsFor(firstItemIndex)[fifthItemIndex]).toEqual(objectParam);
        });

        it('Calls the "info" method of Logger object that throws an Exception then Invokes the "log" method of "console" object', function () {
            spyOn(sut.logger, 'info').and.callFake(function (param1, objectParam) {
                throw exception;
            });
            spyOn(console, 'log').and.callFake(function (param1, objectParam1, param2, objectParam2) { });

            sut.log();

            expect(console.log).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Error), jasmine.any(String), jasmine.any(String), undefined);
            //expect(console.log.calls.argsFor(firstItemIndex)[firstItemIndex]).toEqual(jasmine.any(String));
            //expect(console.log.calls.argsFor(firstItemIndex)[secondItemIndex]).toEqual(jasmine.any(Error));
            //expect(console.log.calls.argsFor(firstItemIndex)[thirdItemIndex]).toEqual(jasmine.any(String));
            //expect(console.log.calls.argsFor(firstItemIndex)[fourthItemIndex]).toEqual(jasmine.any(String));
            //expect(console.log.calls.argsFor(firstItemIndex)[fifthItemIndex]).toEqual(undefined);
        });
    });

    describe('beforeLogEvent - ', function () {
        beforeEach(function () {
            sut = new AuditManager();
        });

        it('With any parameters invokes "log" method ', function () {
            spyOn(sut, 'log').and.callFake(function () { });

            sut.beforeLogEvent(arguments, method);

            expect(sut.log).toHaveBeenCalledWith('beforeLogEvent', 'method', 'Invocation arguments', jasmine.any(Object));
        });

        it('With "aopMethod" parameter "undefined" calls "log" method with the string value "beforeLogEvent"', function () {
            spyOn(sut, 'log').and.callFake(function (aopMethod) { });

            sut.beforeLogEvent(arguments, method);

            expect(sut.log).toHaveBeenCalledWith('beforeLogEvent', 'method', 'Invocation arguments', jasmine.any(Object));
        });

        it('With "aopMethod" parameter "null" calls "log" method with the string value "beforeLogEvent"', function () {
            spyOn(sut, 'log').and.callFake(function (aopMethod) { });

            sut.beforeLogEvent(arguments, method, null);

            expect(sut.log).toHaveBeenCalledWith('beforeLogEvent', 'method', 'Invocation arguments', jasmine.any(Object));
        });

        it('With all parameters "undefined" calls "log" method with "aopMethod" parameter with the string value "beforeLogEvent"', function () {
            spyOn(sut, 'log').and.callThrough();

            sut.beforeLogEvent();

            expect(sut.log).toHaveBeenCalledWith('beforeLogEvent', undefined, jasmine.any(String), undefined);
        });

        it('With all parameters "null" calls "log" method with "aopMethod" parameter with the string value "beforeLogEvent"', function () {
            spyOn(sut, 'log').and.callThrough();

            sut.beforeLogEvent(null, null, null);

            expect(sut.log).toHaveBeenCalledWith('beforeLogEvent', null, jasmine.any(String), null);
        });

        it('With all parameters "undefined" calls "log" method with the same parameters and "typeParam" = "Invocation arguments"', function () {
            spyOn(sut, 'log').and.callThrough();

            sut.beforeLogEvent();

            expect(sut.log).toHaveBeenCalledWith(jasmine.any(String), undefined, 'Invocation arguments', undefined);
        });

        it('With all parameters "null" calls "log" method with the same parameters and "typeParam" = "Invocation arguments"', function () {
            spyOn(sut, 'log').and.callThrough();

            sut.beforeLogEvent(null, null, null);

            expect(sut.log).toHaveBeenCalledWith(jasmine.any(String), null, 'Invocation arguments', null);
        });

        it('With all the parameters calls "log" method with the same parameters and "typeParam" = "Invocation arguments"', function () {
            spyOn(sut, 'log').and.callThrough();

            sut.beforeLogEvent(arguments, method, aopMethod);

            expect(sut.log).toHaveBeenCalledWith(aopMethod, method, 'Invocation arguments', arguments);
        });
    });

    describe('afterLogEvent - ', function () {
        beforeEach(function () {
            sut = new AuditManager();
        });

        it('With any parameters invokes "log" method ', function () {
            spyOn(sut, 'log').and.callFake(function () { });

            sut.afterLogEvent(arguments, method);

            expect(sut.log).toHaveBeenCalledWith('afterLogEvent', method, 'Invocation result', arguments);
        });

        it('With "aopMethod" parameter "undefined" calls "log" method with the string value "afterLogEvent"', function () {
            spyOn(sut, 'log').and.callThrough();

            sut.afterLogEvent(arguments, method);

            expect(sut.log).toHaveBeenCalledWith('afterLogEvent', method, 'Invocation result', arguments);
        });

        it('With "aopMethod" parameter "null" calls "log" method with the string value "afterLogEvent"', function () {
            spyOn(sut, 'log').and.callThrough();

            sut.afterLogEvent(arguments, method, null);

            expect(sut.log).toHaveBeenCalledWith('afterLogEvent', method, 'Invocation result', arguments);
        });

        it('With all parameters "undefined" calls "log" method with "aopMethod" parameter with the string value "afterLogEvent"', function () {
            spyOn(sut, 'log').and.callThrough();

            sut.afterLogEvent();

            expect(sut.log).toHaveBeenCalledWith('afterLogEvent', undefined, jasmine.any(String), undefined);
        });

        it('With all parameters "null" calls "log" method with "aopMethod" parameter with the string value "afterLogEvent"', function () {
            spyOn(sut, 'log').and.callThrough();

            sut.afterLogEvent(null, null, null);

            expect(sut.log).toHaveBeenCalledWith('afterLogEvent', null, jasmine.any(String), null);
        });

        it('With all parameters "undefined" calls "log" method with the same parameters and "typeParam" = "Invocation result"', function () {
            spyOn(sut, 'log').and.callThrough();

            sut.afterLogEvent();

            expect(sut.log).toHaveBeenCalledWith(jasmine.any(String), undefined, 'Invocation result', undefined);
        });

        it('With all parameters "null" calls "log" method with the same parameters and "typeParam" = "Invocation result"', function () {
            spyOn(sut, 'log').and.callThrough();

            sut.afterLogEvent(null, null, null);

            expect(sut.log).toHaveBeenCalledWith(jasmine.any(String), null, 'Invocation result', null);
        });

        it('With all the parameters calls "log" method with the same parameters and "typeParam" = "Invocation result"', function () {
            spyOn(sut, 'log').and.callThrough();

            sut.afterLogEvent(arguments, method, aopMethod);

            expect(sut.log).toHaveBeenCalledWith(aopMethod, method, 'Invocation result', arguments);
        });
    });

    describe('aroundLogEvent - ', function () {
        beforeEach(function () {
            sut = new AuditManager();
        });

        it('Without parameters throw an exception', function () {
            expect(function () { sut.aroundLogEvent(); }).toThrow();
        });

        it('With an empty "invocation" parameter invoke to "beforeLogEvent" method', function () {
            spyOn(sut, 'beforeLogEvent').and.callFake(function (arguments, method, aopMethod) { });

            sut.aroundLogEvent(invocationEmpty);

            expect(sut.beforeLogEvent).toHaveBeenCalledWith([], undefined, 'aroundLogEvent');
        });

        it('With an empty "invocation" parameter call "beforeLogEvent" with "aopMethod" equals to "aroundLogEvent"', function () {
            spyOn(sut, 'beforeLogEvent').and.callFake(function (arguments, method, aopMethod) { });

            sut.aroundLogEvent(invocationEmpty);

            expect(sut.beforeLogEvent).toHaveBeenCalledWith(jasmine.any(Object), undefined, 'aroundLogEvent');
        });

        it('With an empty "invocation" parameter invoke to "invocation.proceed" method', function () {
            spyOn(invocationEmpty, 'proceed').and.callThrough();

            sut.aroundLogEvent(invocationEmpty);

            expect(invocationEmpty.proceed).toHaveBeenCalled();
        });

        it('With an empty "invocation" parameter invoke to "afterLogEvent" method', function () {
            var hasAopMethodDeclared = false;
            spyOn(sut, 'afterLogEvent').and.callFake(function (result, method, aopMethod) { });

            sut.aroundLogEvent(invocationEmpty);

            expect(sut.afterLogEvent).toHaveBeenCalledWith(undefined, undefined, 'aroundLogEvent');
        });

        it('With an empty "invocation" parameter call "afterLogEvent" with "aopMethod" equals to "aroundLogEvent"', function () {
            spyOn(sut, 'afterLogEvent').and.callFake(function (result, method, aopMethod) { });

            sut.aroundLogEvent(invocationEmpty);

            expect(sut.afterLogEvent).toHaveBeenCalledWith(undefined, undefined, 'aroundLogEvent');
        });

        it('With a result of the invoke of "invocation.proceed" call "afterLogEvent" method', function () {
            spyOn(sut, 'afterLogEvent').and.callFake(function (result, method, aopMethod) { });
            spyOn(invocationEmpty, 'proceed').and.callFake(function () {
                return 'proceed';
            });

            sut.aroundLogEvent(invocationEmpty);

            expect(sut.afterLogEvent).toHaveBeenCalledWith('proceed', undefined, 'aroundLogEvent');
        });

        it('With a null result of the invoke of "invocation.proceed" call "afterLogEvent" method', function () {
            spyOn(sut, 'afterLogEvent').and.callFake(function (result, method, aopMethod) { });
            spyOn(invocationEmpty, 'proceed').and.callFake(function () {
                return null;
            });

            sut.aroundLogEvent(invocationEmpty);

            expect(sut.afterLogEvent).toHaveBeenCalledWith(null, undefined, 'aroundLogEvent');
        });

        it('With an undefined result of the invoke of "invocation.proceed" call "afterLogEvent" method', function () {
            spyOn(sut, 'afterLogEvent').and.callFake(function (result, method, aopMethod) { });

            sut.aroundLogEvent(invocationEmpty);

            expect(sut.afterLogEvent).toHaveBeenCalledWith(undefined, undefined, 'aroundLogEvent');
        });
    });

    describe('afterThrowCatchEvent - ', function () {
        beforeEach(function () {
            sut = new AuditManager();
        });

        it('With any parameters invokes "log" method ', function () {
            spyOn(sut, 'log').and.callFake(function () { });

            try {
                sut.afterThrowCatchEvent();
            } catch (e) {
                expect(sut.log).toHaveBeenCalledWith('afterThrowCatchEvent', undefined, 'Exception throwed', undefined, 'ERROR');
            }
        });

        it('With the parameter "typeParam" == "Exception throwed" calls "log" method ', function () {
            spyOn(sut, 'log').and.callFake(function (aopMethod, method, typeParam) { });

            try {
                sut.afterThrowCatchEvent();
            } catch (e) {
                expect(sut.log).toHaveBeenCalledWith(jasmine.any(String), undefined, 'Exception throwed', undefined, jasmine.any(String));
            }
        });

        it('With the parameter "typeMessage" == "ERROR" calls "log" method ', function () {
            spyOn(sut, 'log').and.callFake(function (aopMethod, method, typeParam, objectParam, typeMessage) { });

            try {
                sut.afterThrowCatchEvent();
            } catch (e) {
                expect(sut.log).toHaveBeenCalledWith(jasmine.any(String), undefined, jasmine.any(String), undefined, 'ERROR');
            }
        });

        it('With "aopMethod" parameter "undefined" calls "log" method with the string value "afterThrowCatchEvent"', function () {
            spyOn(sut, 'log').and.callFake(function (aopMethod) { });

            try {
                sut.afterThrowCatchEvent(exception, method);
            } catch (e) {
                expect(sut.log).toHaveBeenCalledWith('afterThrowCatchEvent', method, jasmine.any(String), exception, jasmine.any(String));
            }
        });

        it('With "aopMethod" parameter "null" calls "log" method with the string value "afterThrowCatchEvent"', function () {
            spyOn(sut, 'log').and.callFake(function (aopMethod) { });

            try {
                sut.afterThrowCatchEvent(exception, method, null);
            } catch (e) {
                expect(sut.log).toHaveBeenCalledWith('afterThrowCatchEvent', method, jasmine.any(String), exception, jasmine.any(String));
            }
        });

        it('With all parameters "undefined" calls "log" method with "aopMethod" parameter with the string value "afterThrowCatchEvent"', function () {
            spyOn(sut, 'log').and.callFake(function (aopMethod) { });

            try {
                sut.afterThrowCatchEvent();
            } catch (e) {
                expect(sut.log).toHaveBeenCalledWith('afterThrowCatchEvent', undefined, jasmine.any(String), undefined, jasmine.any(String));
            }
        });

        it('With all parameters "null" calls "log" method with "aopMethod" parameter with the string value "afterThrowCatchEvent"', function () {
            spyOn(sut, 'log').and.callFake(function (aopMethod) { });

            try {
                sut.afterThrowCatchEvent(null, null, null);
            } catch (e) {
                expect(sut.log).toHaveBeenCalledWith('afterThrowCatchEvent', null, jasmine.any(String), null, jasmine.any(String));
            }
        });

        it('With all the parameters except "attemptCounter" calls "log" method', function () {
            spyOn(sut, 'log').and.callFake(function (aopMethodFake, methodFake, typeParam, objectParamFake, typeMessage, attemptCounter) { });

            try {
                sut.afterThrowCatchEvent(exception, method, aopMethod);
            } catch (e) {
                expect(sut.log).toHaveBeenCalledWith(aopMethod, method, 'Exception throwed', exception, 'ERROR');
            }
        });

        it('With an exception throws the same exception', function () {

            expect(function () { sut.afterThrowCatchEvent(exception, method, aopMethod) }).toThrowError(Error);

        });
    });

    describe('aroundLogThrowCatchEvent - ', function () {
        beforeEach(function () {
            sut = new AuditManager();
        });

        it('Without parameters throw an exception', function () {

            expect(function () { sut.aroundLogThrowCatchEvent(); }).toThrow();

        });

        it('With an empty "invocation" parameter invokes to "beforeLogEvent" method', function () {
            spyOn(sut, 'beforeLogEvent').and.callThrough();

            sut.aroundLogThrowCatchEvent(invocationEmpty);

            expect(sut.beforeLogEvent).toHaveBeenCalledWith([], undefined, 'aroundLogThrowCatchEvent');
        });

        it('With an "invocation" parameter invokes to "beforeLogEvent" method with the correct parameters', function () {
            spyOn(sut, 'beforeLogEvent').and.callFake(function (arguments, method, aopMethod) { });

            sut.aroundLogThrowCatchEvent(invocationDataX1);

            expect(sut.beforeLogEvent).toHaveBeenCalledWith(invocationDataX1.arguments, invocationDataX1.method, 'aroundLogThrowCatchEvent');
        });

        it('With an empty "invocation" parameter invokes to "invocation.proceed" method', function () {
            spyOn(invocationEmpty, 'proceed').and.callThrough();

            sut.aroundLogThrowCatchEvent(invocationEmpty);

            expect(invocationEmpty.proceed).toHaveBeenCalled();
        });

        it('Calls "invocation.proceed" method with a result value, then invokes afterLogEvent', function () {
            spyOn(invocationDataX1, 'proceed').and.callFake(function () {
                return stringResult;
            });
            spyOn(sut, 'afterLogEvent').and.callThrough();

            sut.aroundLogThrowCatchEvent(invocationDataX1);

            expect(sut.afterLogEvent).toHaveBeenCalledWith(stringResult, invocationDataX1.method, 'aroundLogThrowCatchEvent');
        });

        it('Calls "invocation.proceed" method without a result value, then never invokes afterLogEvent', function () {
            spyOn(invocationDataX1, 'proceed').and.callThrough();
            spyOn(sut, 'afterLogEvent').and.callThrough();

            sut.aroundLogThrowCatchEvent(invocationDataX1);

            expect(sut.afterLogEvent).not.toHaveBeenCalled();
        });

        it('With an "invocation" parameter invokes to "afterLogEvent" method with the correct parameters', function () {
            spyOn(sut, 'afterLogEvent').and.callFake(function (result, method, aopMethod) { });
            spyOn(invocationDataX1, 'proceed').and.callFake(function () {
                return stringResult;
            });

            sut.aroundLogThrowCatchEvent(invocationDataX1);

            expect(sut.afterLogEvent).toHaveBeenCalledWith(stringResult, invocationDataX1.method, 'aroundLogThrowCatchEvent');
        });

        it('Calls "invocation.proceed" method that throws and exception, then invokes the "afterThrowCatchEvent" method', function () {
            spyOn(invocationDataX1, 'proceed').and.callFake(function () {
                throw exception;
            });
            spyOn(sut, 'afterThrowCatchEvent').and.callThrough();

            try {
                sut.aroundLogThrowCatchEvent(invocationDataX1);
            } catch (e) {
                expect(sut.afterThrowCatchEvent).toHaveBeenCalledWith(exception, invocationDataX1.method, 'aroundLogThrowCatchEvent');
            }
        });

        it('Calls the "afterThrowCatchEvent" method for an exception and throws the same exception', function () {
            spyOn(invocationDataX1, 'proceed').and.callFake(function () {
                throw exception;
            });
            spyOn(sut, 'afterThrowCatchEvent').and.callThrough();

            try {
                sut.aroundLogThrowCatchEvent(invocationDataX1);
            } catch (e) {
                expect(e).toBe(exception);
            }
        });

        it('With an "invocation" parameter, calls "invocation.proceed" method that throws and exception, invokes to "aroundLogThrowCatchEvent" method with the correct parameters', function () {
            spyOn(sut, 'afterThrowCatchEvent').and.callFake(function (exceptionFake, method, aopMethod) { });
            spyOn(invocationDataX1, 'proceed').and.callFake(function () {
                throw exception;
            });

            try {
                sut.aroundLogThrowCatchEvent(invocationDataX1);
            } finally {
                expect(sut.afterThrowCatchEvent).toHaveBeenCalledWith(exception, invocationDataX1.method, 'aroundLogThrowCatchEvent');
            }
        });
    });

    describe('afterFinallyEvent - ', function () {
        beforeEach(function () {
            sut = new AuditManager();
        });

        it('Without parameters never invokes neither of the "afterLogEvent" or "afterThrowCatchEvent" methods', function () {
            spyOn(sut, 'afterLogEvent').and.callThrough();
            spyOn(sut, 'afterThrowCatchEvent').and.callThrough();

            sut.afterFinallyEvent();

            expect(sut.afterLogEvent).not.toHaveBeenCalled();
            expect(sut.afterThrowCatchEvent).not.toHaveBeenCalled();
        });

        it('With the parameter "result" == null, never invokes the "afterLogEvent" method', function () {
            spyOn(sut, 'afterLogEvent').and.callThrough();
            spyOn(sut, 'afterThrowCatchEvent').and.callThrough();

            sut.afterFinallyEvent(null, null, null);

            expect(sut.afterLogEvent).not.toHaveBeenCalled();
        });

        it('With the parameter "exception" == null, never invokes the "afterThrowCatchEvent" method', function () {
            spyOn(sut, 'afterLogEvent').and.callThrough();
            spyOn(sut, 'afterThrowCatchEvent').and.callThrough();

            sut.afterFinallyEvent(null, null, null);

            expect(sut.afterThrowCatchEvent).not.toHaveBeenCalled();
        });

        it('With all the parameters always invokes both of the "afterLogEvent" and "afterThrowCatchEvent" methods', function () {
            spyOn(sut, 'afterLogEvent').and.callThrough();
            spyOn(sut, 'afterThrowCatchEvent').and.callThrough();

            try {
                sut.afterFinallyEvent(stringResult, exception, method);
            } catch (e) {
                expect(sut.afterLogEvent).toHaveBeenCalledWith(stringResult, method, 'afterFinallyEvent');
                expect(sut.afterThrowCatchEvent).toHaveBeenCalledWith(exception, method, 'afterFinallyEvent');
            }
        });

        it('With all the parameters always calls the "afterLogEvent" method with the correct parameters', function () {
            spyOn(sut, 'afterLogEvent').and.callFake(function (resultFake, methodFake, aopMethod) { });
            spyOn(sut, 'afterThrowCatchEvent').and.callFake(function () { });

            sut.afterFinallyEvent(stringResult, exception, method);

            expect(sut.afterLogEvent).toHaveBeenCalledWith(stringResult, invocationDataX1.method, 'afterFinallyEvent');
        });

        it('With all the parameters always calls the "afterThrowCatchEvent" method with the correct parameters', function () {
            spyOn(sut, 'afterThrowCatchEvent').and.callFake(function (exceptionFake, methodFake, aopMethod) { });
            spyOn(sut, 'afterLogEvent').and.callThrough();

            sut.afterFinallyEvent(stringResult, exception, method);

            expect(sut.afterThrowCatchEvent).toHaveBeenCalledWith(exception, method, 'afterFinallyEvent');
        });
    });

    describe('afterThrowRetryEvent - ', function () {
        beforeEach(function () {
            sut = new AuditManager();
        });

        it('Without parameters throws a TypeError exception', function () {

            expect(sut.afterThrowRetryEvent).toThrowError(TypeError);

        });

        it('With only an empty "callback" parameter invokes "getHasAnotherAttempt" method', function () {
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return true;
            });

            sut.afterThrowRetryEvent(undefined, undefined, callbackEmpty);

            expect(sut.getHasAnotherAttempt).toHaveBeenCalled();
        });

        it('With only an empty "callback" parameter, calls "getHasAnotherAttempt" method that returns true, then invokes "log" method', function () {
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return true;
            });
            spyOn(sut, 'log').and.callThrough();

            sut.afterThrowRetryEvent(undefined, undefined, callbackEmpty);

            expect(sut.log).toHaveBeenCalledWith('afterThrowCatchEvent', undefined, 'Exception throwed', undefined, 'ERROR');
        });

        it('With only an empty "callback" parameter, calls "getHasAnotherAttempt" method that returns true, then invokes "callback.apply" method', function () {
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return true;
            });
            spyOn(callbackEmpty, 'apply').and.callThrough();

            sut.afterThrowRetryEvent(undefined, undefined, callbackEmpty);

            expect(callbackEmpty.apply).toHaveBeenCalledWith(undefined, []);
        });

        it('With all the parameters, calls "getHasAnotherAttempt" method that returns true, then invokes "log" method', function () {
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return true;
            });
            spyOn(sut, 'log').and.callThrough();

            sut.afterThrowRetryEvent(exception, aopObject, callbackEmpty, method);

            expect(sut.log).toHaveBeenCalledWith('afterThrowCatchEvent', method, 'Exception throwed', exception, 'ERROR');
        });

        it('With all the parameters, calls "getHasAnotherAttempt" method that returns true, then calls "log" method with the correct parameters', function () {
            spyOn(sut, 'log').and.callFake(function (aopMethod, methodFake, typeParam, objectParam, typeMessage) { });
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return true;
            });

            sut.afterThrowRetryEvent(exception, aopObject, callbackX1, method);

            expect(sut.log).toHaveBeenCalledWith('afterThrowCatchEvent', method, 'Exception throwed', exception, 'ERROR');
        });

        it('With all the parameters, calls "getHasAnotherAttempt" method that returns true, then invokes "callback.apply" method', function () {
            spyOn(callbackX1, 'apply').and.callThrough();
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return true;
            });

            sut.afterThrowRetryEvent(exception, aopObject, callbackX1, method);

            expect(callbackX1.apply).toHaveBeenCalledWith({}, ['argument1']);
        });

        it('With all the parameters, calls "getHasAnotherAttempt" method that returns true, then invokes "callback.apply" method with the correct parameters', function () {
            spyOn(callbackX1, 'apply').and.callFake(function (aopObjectFake, arguments) { });
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return true;
            });

            sut.afterThrowRetryEvent(exception, aopObject, callbackX1, method);

            expect(callbackX1.apply).toHaveBeenCalledWith(aopObject, callbackX1.arguments);
        });

        it('Without parameters, calls "getHasAnotherAttempt" method that returns false, then invokes "log" method', function () {
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return false;
            });
            spyOn(sut, 'log').and.callThrough();

            try {
                sut.afterThrowRetryEvent(undefined, undefined, callbackEmpty);
            } catch (e) {
                expect(sut.log).toHaveBeenCalledWith('afterThrowCatchEvent', undefined, 'Exception throwed', undefined, 'ERROR', -1);
            }
        });

        it('Without parameters, calls "getHasAnotherAttempt" method that returns false, then reset the "counterAttempIndex" counter', function () {
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return false;
            });

            try {
                sut.afterThrowRetryEvent(undefined, undefined, callbackEmpty);
            } catch (e) {
                expect(sut.counterAttempIndex).toEqual(initialCounterAttempIndex);
            }
        });

        it('Without parameters, calls "getHasAnotherAttempt" method that returns false, then throws an undefined exception', function () {
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return false;
            });

            try {
                sut.afterThrowRetryEvent(undefined, undefined, callbackEmpty);
            } catch (e) {
                expect(e).toBeUndefined();
            }
        });

        it('With an exception parameter, calls "getHasAnotherAttempt" method that returns false, then throws the same exception', function () {
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return false;
            });

            expect(function () { sut.afterThrowRetryEvent(exception); }).toThrowError(Error);

        });

        it('With all the parameters, calls "getHasAnotherAttempt" method that returns false, then invokes "log" method with the correct parameters', function () {
            spyOn(sut, 'log').and.callFake(function (aopMethod, methodFake, typeParam, objectParam, typeMessage, attemptCounter) { });
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return false;
            });
            sut.counterAttempIndex = initialCounterAttempIndex;

            try {
                sut.afterThrowRetryEvent(exception, aopObject, callbackX1, method);
            } catch (e) {
                expect(sut.log).toHaveBeenCalledWith('afterThrowCatchEvent', method, 'Exception throwed', exception, 'ERROR', (sut.counterAttempIndex - 1));
            }
        });
    });
});