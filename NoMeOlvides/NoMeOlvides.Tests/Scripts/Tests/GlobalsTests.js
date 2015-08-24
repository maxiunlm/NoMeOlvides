/// <reference path='../../../NoMeOlvides/Scripts/jquery-2.1.4.js' />
/// <reference path="../../../NoMeOlvides/Scripts/aop.js" />
/// <reference path="../../../NoMeOlvides/Scripts/Common/AuditManager.js" />
/// <reference path='Fixture/CommonFixture.js' />
/// <reference path="Fixture/AuditManagerCommonFixture.js" />
/// <reference path='../../../NoMeOlvides/Scripts/Contact/CRUD.js' />

describe('Globals - ', function () {
    beforeEach(function () {
        spyOn(console, 'log').and.callFake(function () { });
    });

    describe('CRUD.js  - ', function () {
        beforeEach(function () { });

        describe('AuditManager - ', function () {
            beforeEach(function () { });

            it('The global object "auditManager" must be declared', function () {


                expect(auditManager).toBeDefined();
                expect(auditManager instanceof AuditManager).toBeTruthy();
            });
        });

        describe('invocationCallback - ', function () {
            beforeEach(function () {
                auditManager = new AuditManager();
            });

            it('Without an AuditManager instanced object throws an exception', function () {
                auditManager = undefined;

                expect(function () { invocationCallback(invocationEmpty) }).toThrowError(TypeError);

            });

            it('With an AuditManager instanced object invokes "auditManager.aroundLogEvent" method', function () {
                spyOn(AuditManager.prototype, 'aroundLogEvent').and.callThrough();

                invocationCallback(invocationEmpty);

                expect(AuditManager.prototype.aroundLogEvent).toHaveBeenCalledWith(invocationEmpty);
            });

            it('Invokes "auditManager.aroundLogEvent" method for "initializeGlobalVariables"', function () {
                spyOn(AuditManager.prototype, 'aroundLogEvent').and.callThrough();

                invocationCallback(invocationEmpty);

                expect(AuditManager.prototype.aroundLogEvent).toHaveBeenCalledWith(jasmine.any(Object));
            });
        });
    });
});