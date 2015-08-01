/// <reference path='../../../NoMeOlvides/Scripts/Common/AopManager.js" />

describe('AopManager - ', function () {
    var sut;

    var maxAttemps = 1;
    var retryMessage = '¿Reintentar?';
    var confirmationOk = true;
    var confirmationCancel = false;
    var hasAnotherAttemptTrue = true;
    var hasAnotherAttemptFalse = false;
    var aopMethod = 'aopMethod';
    var method = 'method';
    var typeParam = 'typeParam';
    var objectParam = 'objectParam';
    var typeMessage = 'typeMessage';
    var attemptCounter = 1000;

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

            expect(result).toEqual(hasAnotherAttemptTrue)
        });

        it('with user confirmation "OK" and counterAttempIndex equals to maxAttemps', function () {
            sut.counterAttempIndex = sut.maxAttemps;
            spyOn(window, 'confirm').and.returnValue(confirmationOk);

            var result = sut.getHasAnotherAttempt();

            expect(result).toEqual(hasAnotherAttemptFalse)
        });

        it('with user confirmation "OK" and counterAttempIndex greater than maxAttemps', function () {
            sut.counterAttempIndex = sut.maxAttemps + 1;
            spyOn(window, 'confirm').and.returnValue(confirmationOk);

            var result = sut.getHasAnotherAttempt();

            expect(result).toEqual(hasAnotherAttemptFalse)
        });

        it('with user confirmation "Cancel" and counterAttempIndex less than maxAttemps', function () {
            sut.counterAttempIndex = sut.maxAttemps - 1;
            spyOn(window, 'confirm').and.returnValue(confirmationCancel);

            var result = sut.getHasAnotherAttempt();

            expect(result).toEqual(hasAnotherAttemptFalse)
        });

        it('with user confirmation "Cancel" and counterAttempIndex equals to maxAttemps', function () {
            sut.counterAttempIndex = sut.maxAttemps;
            spyOn(window, 'confirm').and.returnValue(confirmationCancel);

            var result = sut.getHasAnotherAttempt();

            expect(result).toEqual(hasAnotherAttemptFalse)
        });

        it('with user confirmation "Cancel" and counterAttempIndex greater than maxAttemps', function () {
            sut.counterAttempIndex = sut.maxAttemps + 1;
            spyOn(window, 'confirm').and.returnValue(confirmationCancel);

            var result = sut.getHasAnotherAttempt();

            expect(result).toEqual(hasAnotherAttemptFalse)
        });
    });

    describe('log', function () {
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

        it('With parameters generate a log message', function () {
            spyOn(console, 'log').and.callFake(function () {
            });

            sut.log(aopMethod, method, typeParam, objectParam, typeMessage, attemptCounter);

            expect(sut.lastLogMessage).not.toBeNull();
            expect(sut.lastLogMessage).not.toBeUndefined();
            expect(sut.lastLogMessage.indexOf() > 0).toBeUndefined();
        });
    });
    /*

    describe('', function () {
        beforeEach(function () {
            sut = new AopManager();
        });

        it('', function () {
        });
    });

    // */
});