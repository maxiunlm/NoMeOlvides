
var auditManager = new AuditManager(3, 'genericRetryMessage');

function invocationCallback(invocation) {
    auditManager.aroundLogEvent(invocation);
};
