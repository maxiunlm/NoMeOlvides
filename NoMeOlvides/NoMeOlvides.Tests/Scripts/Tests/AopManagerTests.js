/// <reference path='../../../NoMeOlvides/Scripts/angular.js' />
/// <reference path="Fixture/CommonFixture.js" />
/// <reference path="Fixture/AopManagerCommonFixture.js" />
/// <reference path='../../../NoMeOlvides/Scripts/Common/AopManager.js" />

describe('AopManager - ', function () {
    var sut;

    beforeEach(function () {
    });

    describe('CONSTRUCTOR - ', function () {
        beforeEach(function () {
            sut = new AopManager();
        });

        it('Without parameters initialize the object attributes', function () {


            expect(sut.counterAttempIndex).toEqual(0);
            expect(sut.hasAnotherAttempt).toEqual(false);
            expect(sut.maxAttemps).toEqual(3);
            expect(sut.retryMessage).toEqual('Retry?');
        });

        it('With parameters initialize the object attributes', function () {

            sut = new AopManager(maxAttemps, retryMessage);

            expect(sut.counterAttempIndex).toEqual(0);
            expect(sut.hasAnotherAttempt).toEqual(false);
            expect(sut.maxAttemps).toEqual(maxAttemps);
            expect(sut.retryMessage).toEqual(retryMessage);
        });
    });

    describe('getHasAnotherAttempt - ', function () {
        beforeEach(function () {
            sut = new AopManager();
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
            sut = new AopManager();
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

        it('Invoke the log method of console object', function () {
            spyOn(console, 'log').and.callFake(function () {
            });

            sut.log();

            expect(console.log).toHaveBeenCalled();
        });

        it('With all the parameters generate a log message', function () {
            var hasObjectParamUsed = false;
            spyOn(console, 'log').and.callFake(function (param1, objectParam) {
                if (angular.isDefined(objectParam)) {
                    hasObjectParamUsed = true;
                }
            });

            sut.log(aopMethod, method, typeParam, objectParam, typeMessage, attemptCounter);

            expect(sut.lastLogMessage).not.toBeNull();
            expect(sut.lastLogMessage).not.toBeUndefined();
            expect(sut.lastLogMessage.indexOf(aopMethod) > 0).toBeTruthy();
            expect(sut.lastLogMessage.indexOf(method) > 0).toBeTruthy();
            expect(sut.lastLogMessage.indexOf(typeParam) > 0).toBeTruthy();
            expect(sut.lastLogMessage.indexOf(typeMessage) > 0).toBeTruthy();
            expect(sut.lastLogMessage.indexOf(attemptCounter) > 0).toBeTruthy();
            expect(hasObjectParamUsed).toBeTruthy();
        });
    });

    describe('beforeLogEvent - ', function () {
        beforeEach(function () {
            sut = new AopManager();
        });

        it('With any parameters invokes "log" method ', function () {
            spyOn(sut, 'log').and.callFake(function () { });

            sut.beforeLogEvent(arguments, method);

            expect(sut.log).toHaveBeenCalled();
        });

        it('With "aopMethod" parameter "undefined" calls "log" method with the string value "beforeLogEvent"', function () {
            var hasAopMethodDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod) {
                if (aopMethod === 'beforeLogEvent') {
                    hasAopMethodDeclared = true;
                }
            });

            sut.beforeLogEvent(arguments, method);

            expect(hasAopMethodDeclared).toBeTruthy();
        });

        it('With "aopMethod" parameter "null" calls "log" method with the string value "beforeLogEvent"', function () {
            var hasAopMethodDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod) {
                if (aopMethod === 'beforeLogEvent') {
                    hasAopMethodDeclared = true;
                }
            });

            sut.beforeLogEvent(arguments, method, null);

            expect(hasAopMethodDeclared).toBeTruthy();
        });

        it('With all parameters "undefined" calls "log" method with "aopMethod" parameter with the string value "beforeLogEvent"', function () {
            var hasAopMethodDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod) {
                if (aopMethod === 'beforeLogEvent') {
                    hasAopMethodDeclared = true;
                }
            });

            sut.beforeLogEvent();

            expect(hasAopMethodDeclared).toBeTruthy();
        });

        it('With all parameters "null" calls "log" method with "aopMethod" parameter with the string value "beforeLogEvent"', function () {
            var hasAopMethodDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod) {
                if (aopMethod === 'beforeLogEvent') {
                    hasAopMethodDeclared = true;
                }
            });

            sut.beforeLogEvent(null, null, null);

            expect(hasAopMethodDeclared).toBeTruthy();
        });

        it('With all parameters "undefined" calls "log" method with the same parameters and "typeParam" = "Invocation arguments"', function () {
            var hasTypeParamDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod, method, typeParam, arguments) {
                if (typeParam === 'Invocation arguments') {
                    hasTypeParamDeclared = true;
                }
            });

            sut.beforeLogEvent();

            expect(hasTypeParamDeclared).toBeTruthy();
        });

        it('With all parameters "null" calls "log" method with the same parameters and "typeParam" = "Invocation arguments"', function () {
            var hasTypeParamDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod, method, typeParam, arguments) {
                if (typeParam === 'Invocation arguments') {
                    hasTypeParamDeclared = true;
                }
            });

            sut.beforeLogEvent(null, null, null);

            expect(hasTypeParamDeclared).toBeTruthy();
        });

        it('With all the parameters calls "log" method with the same parameters and "typeParam" = "Invocation arguments"', function () {
            var hasTypeParamDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod, method, typeParam, arguments) {
                if (typeParam === 'Invocation arguments') {
                    hasTypeParamDeclared = true;
                }
            });

            sut.beforeLogEvent(arguments, method, aopMethod);

            expect(hasTypeParamDeclared).toBeTruthy();
        });
    });

    describe('afterLogEvent - ', function () {
        beforeEach(function () {
            sut = new AopManager();
        });

        it('With any parameters invokes "log" method ', function () {
            spyOn(sut, 'log').and.callFake(function () { });

            sut.afterLogEvent(arguments, method);

            expect(sut.log).toHaveBeenCalled();
        });

        it('With "aopMethod" parameter "undefined" calls "log" method with the string value "afterLogEvent"', function () {
            var hasAopMethodDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod) {
                if (aopMethod === 'afterLogEvent') {
                    hasAopMethodDeclared = true;
                }
            });

            sut.afterLogEvent(arguments, method);

            expect(hasAopMethodDeclared).toBeTruthy();
        });

        it('With "aopMethod" parameter "null" calls "log" method with the string value "afterLogEvent"', function () {
            var hasAopMethodDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod) {
                if (aopMethod === 'afterLogEvent') {
                    hasAopMethodDeclared = true;
                }
            });

            sut.afterLogEvent(arguments, method, null);

            expect(hasAopMethodDeclared).toBeTruthy();
        });

        it('With all parameters "undefined" calls "log" method with "aopMethod" parameter with the string value "afterLogEvent"', function () {
            var hasAopMethodDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod) {
                if (aopMethod === 'afterLogEvent') {
                    hasAopMethodDeclared = true;
                }
            });

            sut.afterLogEvent();

            expect(hasAopMethodDeclared).toBeTruthy();
        });

        it('With all parameters "null" calls "log" method with "aopMethod" parameter with the string value "afterLogEvent"', function () {
            var hasAopMethodDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod) {
                if (aopMethod === 'afterLogEvent') {
                    hasAopMethodDeclared = true;
                }
            });

            sut.afterLogEvent(null, null, null);

            expect(hasAopMethodDeclared).toBeTruthy();
        });

        it('With all parameters "undefined" calls "log" method with the same parameters and "typeParam" = "Invocation result"', function () {
            var hasTypeParamDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod, method, typeParam, arguments) {
                if (typeParam === 'Invocation result') {
                    hasTypeParamDeclared = true;
                }
            });

            sut.afterLogEvent();

            expect(hasTypeParamDeclared).toBeTruthy();
        });

        it('With all parameters "null" calls "log" method with the same parameters and "typeParam" = "Invocation result"', function () {
            var hasTypeParamDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod, method, typeParam, arguments) {
                if (typeParam === 'Invocation result') {
                    hasTypeParamDeclared = true;
                }
            });

            sut.afterLogEvent(null, null, null);

            expect(hasTypeParamDeclared).toBeTruthy();
        });

        it('With all the parameters calls "log" method with the same parameters and "typeParam" = "Invocation result"', function () {
            var hasTypeParamDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod, method, typeParam, arguments) {
                if (typeParam === 'Invocation result') {
                    hasTypeParamDeclared = true;
                }
            });

            sut.afterLogEvent(arguments, method, aopMethod);

            expect(hasTypeParamDeclared).toBeTruthy();
        });
    });

    describe('aroundLogEvent - ', function () {
        beforeEach(function () {
            sut = new AopManager();
        });

        it('Without parameters throw an exception', function () {
            expect(function () {
                sut.aroundLogEvent();
            }).toThrow();
        });

        it('With an empty "invocation" parameter invoke to "beforeLogEvent" method', function () {
            spyOn(sut, 'beforeLogEvent').and.callFake(function (arguments, method, aopMethod) { });

            sut.aroundLogEvent(invocationEmpty);

            expect(sut.beforeLogEvent).toHaveBeenCalled();
        });

        it('With an empty "invocation" parameter call "beforeLogEvent" with "aopMethod" equals to "aroundLogEvent"', function () {
            var hasAopMethodDeclared = false;
            spyOn(sut, 'beforeLogEvent').and.callFake(function (arguments, method, aopMethod) {
                if (aopMethod === 'aroundLogEvent') {
                    hasAopMethodDeclared = true;
                }
            });

            sut.aroundLogEvent(invocationEmpty);

            expect(hasAopMethodDeclared).toBeTruthy();
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

            expect(sut.afterLogEvent).toHaveBeenCalled();
        });

        it('With an empty "invocation" parameter call "afterLogEvent" with "aopMethod" equals to "aroundLogEvent"', function () {
            var hasAopMethodDeclared = false;
            spyOn(sut, 'afterLogEvent').and.callFake(function (result, method, aopMethod) {
                if (aopMethod === 'aroundLogEvent') {
                    hasAopMethodDeclared = true;
                }
            });

            sut.aroundLogEvent(invocationEmpty);

            expect(hasAopMethodDeclared).toBeTruthy();
        });

        it('With a result of the invoke of "invocation.proceed" call "afterLogEvent" method', function () {
            var hasResultDeclared = false;
            spyOn(sut, 'afterLogEvent').and.callFake(function (result, method, aopMethod) {
                if (result === 'proceed') {
                    hasResultDeclared = true;
                }
            });
            spyOn(invocationEmpty, 'proceed').and.callFake(function () {
                return 'proceed';
            });

            sut.aroundLogEvent(invocationEmpty);

            expect(hasResultDeclared).toBeTruthy();
        });

        it('With a null result of the invoke of "invocation.proceed" call "afterLogEvent" method', function () {
            var hasResultNulled = false;
            spyOn(sut, 'afterLogEvent').and.callFake(function (result, method, aopMethod) {
                if (result === null) {
                    hasResultNulled = true;
                }
            });
            spyOn(invocationEmpty, 'proceed').and.callFake(function () {
                return null;
            });

            sut.aroundLogEvent(invocationEmpty);

            expect(hasResultNulled).toBeTruthy();
        });

        it('With an undefined result of the invoke of "invocation.proceed" call "afterLogEvent" method', function () {
            var hasResultUndefined = false;
            spyOn(sut, 'afterLogEvent').and.callFake(function (result, method, aopMethod) {
                if (angular.isUndefined(result)) {
                    hasResultUndefined = true;
                }
            });

            sut.aroundLogEvent(invocationEmpty);

            expect(hasResultUndefined).toBeTruthy();
        });
    });

    describe('afterThrowCatchEvent - ', function () {
        beforeEach(function () {
            sut = new AopManager();
        });

        it('With any parameters invokes "log" method ', function () {
            spyOn(sut, 'log').and.callFake(function () { });

            try {
                sut.afterThrowCatchEvent();
            } catch (e) {
                expect(sut.log).toHaveBeenCalled();
            }
        });

        it('With the parameter "typeParam" == "Exception throwed" calls "log" method ', function () {
            var hasTypeParamDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod, method, typeParam) {
                if (typeParam === 'Exception throwed') {
                    hasTypeParamDeclared = true;
                }
            });

            try {
                sut.afterThrowCatchEvent();
            } catch (e) {
                expect(hasTypeParamDeclared).toBeTruthy();
            }
        });

        it('With the parameter "typeMessage" == "ERROR" calls "log" method ', function () {
            var hasTypeMessageDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod, method, typeParam, objectParam, typeMessage) {
                if (typeMessage === 'ERROR') {
                    hasTypeMessageDeclared = true;
                }
            });

            try {
                sut.afterThrowCatchEvent();
            } catch (e) {
                expect(hasTypeMessageDeclared).toBeTruthy();
            }
        });

        it('With "aopMethod" parameter "undefined" calls "log" method with the string value "afterThrowCatchEvent"', function () {
            var hasAopMethodDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod) {
                if (aopMethod === 'afterThrowCatchEvent') {
                    hasAopMethodDeclared = true;
                }
            });

            try {
                sut.afterThrowCatchEvent(exception, method);
            } catch (e) {
                expect(hasAopMethodDeclared).toBeTruthy();
            }
        });
        
        it('With "aopMethod" parameter "null" calls "log" method with the string value "afterThrowCatchEvent"', function () {
            var hasAopMethodDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod) {
                if (aopMethod === 'afterThrowCatchEvent') {
                    hasAopMethodDeclared = true;
                }
            });

            try {
                sut.afterThrowCatchEvent(exception, method, null);
            } catch (e) {
                expect(hasAopMethodDeclared).toBeTruthy();
            }
        });

        it('With all parameters "undefined" calls "log" method with "aopMethod" parameter with the string value "afterThrowCatchEvent"', function () {
            var hasAopMethodDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod) {
                if (aopMethod === 'afterThrowCatchEvent') {
                    hasAopMethodDeclared = true;
                }
            });

            try {
                sut.afterThrowCatchEvent();
            } catch (e) {
                expect(hasAopMethodDeclared).toBeTruthy();
            }
        });

        it('With all parameters "null" calls "log" method with "aopMethod" parameter with the string value "afterThrowCatchEvent"', function () {
            var hasAopMethodDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod) {
                if (aopMethod === 'afterThrowCatchEvent') {
                    hasAopMethodDeclared = true;
                }
            });

            try {
                sut.afterThrowCatchEvent(null, null, null);
            } catch (e) {
                expect(hasAopMethodDeclared).toBeTruthy();
            }
        });

        it('With all the parameters except "attemptCounter" calls "log" method', function () {
            var hasAopMethodDeclared = false;
            var hasTypeMessageDeclared = false;
            var hasTypeParamDeclared = false;
            var hasMethodDeclared = false;
            var hasObjectParamDeclared = false;
            var hasAttemptCounterDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethodFake, methodFake, typeParam, objectParamFake, typeMessage, attemptCounter) {
                if (aopMethodFake === aopMethod) {
                    hasAopMethodDeclared = true;
                }
                if (typeParam === 'Exception throwed') {
                    hasTypeParamDeclared = true;
                }
                if (typeMessage === 'ERROR') {
                    hasTypeMessageDeclared = true;
                }
                if (methodFake === method) {
                    hasMethodDeclared = true;
                }
                if (objectParamFake === exception) {
                    hasObjectParamDeclared = true;
                }
                if (angular.isDefined(attemptCounter)) {
                    hasAttemptCounterDeclared = true;
                }
            });

            try {
                sut.afterThrowCatchEvent(exception, method, aopMethod);
            } catch (e) {
                expect(hasAopMethodDeclared).toBeTruthy();
                expect(hasTypeParamDeclared).toBeTruthy();
                expect(hasTypeMessageDeclared).toBeTruthy();
                expect(hasMethodDeclared).toBeTruthy();
                expect(hasObjectParamDeclared).toBeTruthy();
                expect(hasAttemptCounterDeclared).toBeFalsy();
            }
        });

        it('With an exception throws the same exception', function () {

            try {
                sut.afterThrowCatchEvent(exception, method, aopMethod);
            } catch (e) {
                expect(e instanceof Error).toBeTruthy();
                expect(e).toBe(exception);
            }

            // ??? No funciona -> expect(sut.afterThrowCatchEvent(exception, method, aopMethod)).toThrowError(Error, exception.message);
        });
    });

    describe('aroundLogThrowCatchEvent - ', function () {
        beforeEach(function () {
            sut = new AopManager();
        });

        it('Without parameters throw an exception', function () {
            expect(function () {
                sut.aroundLogThrowCatchEvent();
            }).toThrow();
        });

        it('With an empty "invocation" parameter invokes to "beforeLogEvent" method', function () {
            spyOn(sut, 'beforeLogEvent').and.callThrough();

            sut.aroundLogThrowCatchEvent(invocationEmpty);

            expect(sut.beforeLogEvent).toHaveBeenCalled();
        });

        it('With an "invocation" parameter invokes to "beforeLogEvent" method with the correct parameters', function () {
            var hasAopMethodDeclared = false;
            var hasArgumentsDeclared = false;
            var hasMethodDeclared = false;
            spyOn(sut, 'beforeLogEvent').and.callFake(function (arguments, method, aopMethod) {
                if (aopMethod === 'aroundLogThrowCatchEvent') {
                    hasAopMethodDeclared = true;
                }
                if (arguments === invocationDataX1.arguments) {
                    hasArgumentsDeclared = true;
                }
                if (method === invocationDataX1.method) {
                    hasMethodDeclared = true;
                }
            });

            sut.aroundLogThrowCatchEvent(invocationDataX1);

            expect(hasAopMethodDeclared).toBeTruthy();
            expect(hasArgumentsDeclared).toBeTruthy();
            expect(hasMethodDeclared).toBeTruthy();
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

            expect(sut.afterLogEvent).toHaveBeenCalled();
        });

        it('Calls "invocation.proceed" method without a result value, then never invokes afterLogEvent', function () {
            spyOn(invocationDataX1, 'proceed').and.callThrough();
            spyOn(sut, 'afterLogEvent').and.callThrough();

            sut.aroundLogThrowCatchEvent(invocationDataX1);

            expect(sut.afterLogEvent).not.toHaveBeenCalled();
        });

        it('With an "invocation" parameter invokes to "afterLogEvent" method with the correct parameters', function () {
            var hasAopMethodDeclared = false;
            var hasResultDeclared = false;
            var hasMethodDeclared = false;
            spyOn(sut, 'afterLogEvent').and.callFake(function (result, method, aopMethod) {
                if (aopMethod === 'aroundLogThrowCatchEvent') {
                    hasAopMethodDeclared = true;
                }
                if (result === stringResult) {
                    hasResultDeclared = true;
                }
                if (method === invocationDataX1.method) {
                    hasMethodDeclared = true;
                }
            });
            spyOn(invocationDataX1, 'proceed').and.callFake(function () {
                return stringResult;
            });

            sut.aroundLogThrowCatchEvent(invocationDataX1);

            expect(hasAopMethodDeclared).toBeTruthy();
            expect(hasResultDeclared).toBeTruthy();
            expect(hasMethodDeclared).toBeTruthy();
        });

        it('Calls "invocation.proceed" method that throws and exception, then invokes the "afterThrowCatchEvent" method', function () {
            spyOn(invocationDataX1, 'proceed').and.callFake(function () {
                throw exception;
            });
            spyOn(sut, 'afterThrowCatchEvent').and.callThrough();

            try {
                sut.aroundLogThrowCatchEvent(invocationDataX1);
            } catch (e) {
                expect(sut.afterThrowCatchEvent).toHaveBeenCalled();
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
            var hasAopMethodDeclared = false;
            var hasExceptionDeclared = false;
            var hasMethodDeclared = false;
            spyOn(sut, 'afterThrowCatchEvent').and.callFake(function (exceptionFake, method, aopMethod) {
                if (aopMethod === 'aroundLogThrowCatchEvent') {
                    hasAopMethodDeclared = true;
                }
                if (exceptionFake === exception) {
                    hasExceptionDeclared = true;
                }
                if (method === invocationDataX1.method) {
                    hasMethodDeclared = true;
                }
            });
            spyOn(invocationDataX1, 'proceed').and.callFake(function () {
                throw exception;
            });

            try {
                sut.aroundLogThrowCatchEvent(invocationDataX1);
            } finally {
                expect(hasAopMethodDeclared).toBeTruthy();
                expect(hasExceptionDeclared).toBeTruthy();
                expect(hasMethodDeclared).toBeTruthy();
            }
        });
    });

    describe('afterFinallyEvent - ', function () {
        beforeEach(function () {
            sut = new AopManager();
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
                expect(sut.afterLogEvent).toHaveBeenCalled();
                expect(sut.afterThrowCatchEvent).toHaveBeenCalled();
            }
        });

        it('With all the parameters always calls the "afterLogEvent" method with the correct parameters', function () {
            var hasAopMethodDeclared = false;
            var hasResultDeclared = false;
            var hasMethodDeclared = false;
            spyOn(sut, 'afterLogEvent').and.callFake(function (resultFake, methodFake, aopMethod) {
                if (aopMethod === 'afterFinallyEvent') {
                    hasAopMethodDeclared = true;
                }
                if (resultFake === stringResult) {
                    hasResultDeclared = true;
                }
                if (methodFake === invocationDataX1.method) {
                    hasMethodDeclared = true;
                }
            });
            spyOn(sut, 'afterThrowCatchEvent').and.callFake(function () { });

            sut.afterFinallyEvent(stringResult, exception, method);

            expect(hasAopMethodDeclared).toBeTruthy();
            expect(hasResultDeclared).toBeTruthy();
            expect(hasMethodDeclared).toBeTruthy();
        });

        it('With all the parameters always calls the "afterThrowCatchEvent" method with the correct parameters', function () {
            var hasAopMethodDeclared = false;
            var hasExceptionDeclared = false;
            var hasMethodDeclared = false;
            spyOn(sut, 'afterThrowCatchEvent').and.callFake(function (exceptionFake, methodFake, aopMethod) {
                if (aopMethod === 'afterFinallyEvent') {
                    hasAopMethodDeclared = true;
                }
                if (exceptionFake === exception) {
                    hasExceptionDeclared = true;
                }
                if (methodFake === method) {
                    hasMethodDeclared = true;
                }
            });
            spyOn(sut, 'afterLogEvent').and.callThrough();

            sut.afterFinallyEvent(stringResult, exception, method);

            expect(hasAopMethodDeclared).toBeTruthy();
            expect(hasExceptionDeclared).toBeTruthy();
            expect(hasMethodDeclared).toBeTruthy();
        });
    });

    describe('afterThrowRetryEvent - ', function () {
        beforeEach(function () {
            sut = new AopManager();
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

            expect(sut.log).toHaveBeenCalled();
        });

        it('With only an empty "callback" parameter, calls "getHasAnotherAttempt" method that returns true, then invokes "callback.apply" method', function () {
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return true;
            });
            spyOn(callbackEmpty, 'apply').and.callThrough();

            sut.afterThrowRetryEvent(undefined, undefined, callbackEmpty);

            expect(callbackEmpty.apply).toHaveBeenCalled();
        });

        it('With all the parameters, calls "getHasAnotherAttempt" method that returns true, then invokes "log" method', function () {
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return true;
            });
            spyOn(sut, 'log').and.callThrough();

            sut.afterThrowRetryEvent(exception, aopObject, callbackEmpty, method);

            expect(sut.log).toHaveBeenCalled();
        });

        it('With all the parameters, calls "getHasAnotherAttempt" method that returns true, then calls "log" method with the correct parameters', function () {
            var hasAopMethodDeclared = false;
            var hasExceptionDeclared = false;
            var hasMethodDeclared = false;
            var hasTypeParamDeclared = false;
            var hasTypeMessageDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod, methodFake, typeParam, objectParam, typeMessage) {
                if (aopMethod === 'afterThrowCatchEvent') {
                    hasAopMethodDeclared = true;
                }
                if (typeParam === 'Exception throwed') {
                    hasTypeParamDeclared = true;
                }
                if (typeMessage === 'ERROR') {
                    hasTypeMessageDeclared = true;
                }
                if (objectParam === exception) {
                    hasExceptionDeclared = true;
                }
                if (methodFake === method) {
                    hasMethodDeclared = true;
                }
            });
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return true;
            });

            sut.afterThrowRetryEvent(exception, aopObject, callbackX1, method);

            expect(hasAopMethodDeclared).toBeTruthy();
            expect(hasExceptionDeclared).toBeTruthy();
            expect(hasMethodDeclared).toBeTruthy();
            expect(hasTypeParamDeclared).toBeTruthy();
            expect(hasTypeMessageDeclared).toBeTruthy();
        });

        it('With all the parameters, calls "getHasAnotherAttempt" method that returns true, then invokes "callback.apply" method', function () {
            spyOn(callbackX1, 'apply').and.callThrough();
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return true;
            });

            sut.afterThrowRetryEvent(exception, aopObject, callbackX1, method);

            expect(callbackX1.apply).toHaveBeenCalled();
        });

        it('With all the parameters, calls "getHasAnotherAttempt" method that returns true, then invokes "callback.apply" method with the correct parameters', function () {
            var hasAopObjectDeclared = false;
            var hasArgumentsDeclared = false;
            spyOn(callbackX1, 'apply').and.callFake(function (aopObjectFake, arguments) {
                if (aopObjectFake === aopObject) {
                    hasAopObjectDeclared = true;
                }
                if (arguments === callbackX1.arguments) {
                    hasArgumentsDeclared = true;
                }
            });
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return true;
            });

            sut.afterThrowRetryEvent(exception, aopObject, callbackX1, method);

            expect(hasAopObjectDeclared).toBeTruthy();
            expect(hasArgumentsDeclared).toBeTruthy();
        });

        it('Without parameters, calls "getHasAnotherAttempt" method that returns false, then invokes "log" method', function () {
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return false;
            });
            spyOn(sut, 'log').and.callThrough();

            try {
                sut.afterThrowRetryEvent(undefined, undefined, callbackEmpty);
            } catch (e) {
                expect(sut.log).toHaveBeenCalled();
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

            try {
                sut.afterThrowRetryEvent(exception);
            } catch (e) {
                expect(e instanceof Error).toBeTruthy();
                expect(e).toBe(exception);
            }
        });

        it('With all the parameters, calls "getHasAnotherAttempt" method that returns false, then invokes "log" method with the correct parameters', function () {
            var hasAopMethodDeclared = false;
            var hasExceptionDeclared = false;
            var hasMethodDeclared = false;
            var hasTypeParamDeclared = false;
            var hasTypeMessageDeclared = false;
            var hasAttemptCounterDeclared = false;
            spyOn(sut, 'log').and.callFake(function (aopMethod, methodFake, typeParam, objectParam, typeMessage, attemptCounter) {
                if (aopMethod === 'afterThrowCatchEvent') {
                    hasAopMethodDeclared = true;
                }
                if (typeParam === 'Exception throwed') {
                    hasTypeParamDeclared = true;
                }
                if (typeMessage === 'ERROR') {
                    hasTypeMessageDeclared = true;
                }
                if (objectParam === exception) {
                    hasExceptionDeclared = true;
                }
                if (methodFake === method) {
                    hasMethodDeclared = true;
                }
                if (attemptCounter === (this.counterAttempIndex - 1)) {
                    hasAttemptCounterDeclared = true;
                }
            });
            spyOn(sut, 'getHasAnotherAttempt').and.callFake(function () {
                return false;
            });
            sut.counterAttempIndex = initialCounterAttempIndex;

            try {
                sut.afterThrowRetryEvent(exception, aopObject, callbackX1, method);
            } catch (e) {
                expect(hasAopMethodDeclared).toBeTruthy();
                expect(hasExceptionDeclared).toBeTruthy();
                expect(hasMethodDeclared).toBeTruthy();
                expect(hasTypeParamDeclared).toBeTruthy();
                expect(hasTypeMessageDeclared).toBeTruthy();
                expect(hasAttemptCounterDeclared).toBeTruthy();
            }
        });
    });
});