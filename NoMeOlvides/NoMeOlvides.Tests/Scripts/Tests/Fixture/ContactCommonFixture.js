﻿/// <reference path="CommonFixture.js" />
var contactBaseUri = '/WebApi/ContactApi';
var contactBaseUriForId = '/WebApi/ContactApi/';
var contacts = [];
var Contact = {};
var auditManagerFake = {
    aroundLogEvent: function (invocation) { },
    afterThrowRetryEvent: function (exception, aopObject, callback, method) { }
};
var contactId = "5582a9d8dbe53f1b8059d787";
var searchContactWithAllTheFields = {
    "Alias": "El Mazzi (6)",
    "Name": "Maximiliano",
    "Surname": "Gauna",
    "Email": "maxiunlm@gmail.com",
    "Phone": 666,
    "Cellphone": 666,
    "Address": "Trulala 666",
    "Password": "Secret... SHHHH!!!!"
};
var firstContact = {
    "Id": contactId,
    "Alias": "El Mazzi (6)",
    "Name": "Maximiliano",
    "Surname": "Gauna",
    "Email": "maxiunlm@gmail.com",
    "Phone": 666,
    "Cellphone": 666,
    "Address": "Trulala 666",
    "Password": "Secret... SHHHH!!!!"
};
var secondContact = {
    "Id": "5580083cdbe5412c347db261",
    "Alias": "KB",
    "Name": "Kill",
    "Surname": "Bill",
    "Email": "a@a.com",
    "Phone": 6662,
    "Cellphone": 6662,
    "Address": "Trulala 6662",
    "Password": "Secret2... SHHHH!!!!"
};
var contactListX0 = [];
var contactListX1 = [firstContact];
var contactListX2 = [firstContact, secondContact];
var httpDataResultOk = {
    "Id": contactId,
    "Errors": callBackSuccessDataWithoutError.Errors
};
var httpSearchDataResultX0 = {
    "Contacts": contactListX0,
    "Errors": callBackSuccessDataWithoutError.Errors
};
var httpSearchDataResultX1 = {
    "Contacts": contactListX1,
    "Errors": callBackSuccessDataWithoutError.Errors
};
var httpSearchDataResultX2 = {
    "Contacts": contactListX2,
    "Errors": callBackSuccessDataWithoutError.Errors
};
var httpDataResultErrorX1 = {
    "Contact": {
        "Id": null
    },
    "Errors": callBackSuccessDataWithError.Errors
};
var httpDataResultErrorX2 = {
    "Contact": {
        "Id": null
    },
    "Errors": callBackSuccessDataWithTwoErrors.Errors
};
